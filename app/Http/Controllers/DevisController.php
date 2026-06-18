<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Client;
use App\Models\Devis;
use App\Models\DevisItem;
use App\Models\Facture;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\DevisRequest;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class DevisController extends Controller
{
    use AuthorizesRequests;
    
   public function index()
    {
       $devisList = Devis::with(['client', 'items.product'])
                    ->orderBy('created_at', 'desc')
                    ->get();

        return Inertia::render('Devis/Index', [
            'devisList' => $devisList
        ]);
    }

    public function create()
    {
        $clients = Client::orderBy('name')->get();
        $products = Product::orderBy('name')->get();

        return Inertia::render('Devis/Create', [
            'clients' => $clients,
            'products' => $products
        ]);
    }

  
    public function store(DevisRequest $request)
    {
        // Validation is handled by DevisRequest

        $totalHT = 0;
        $itemsData = [];
        foreach ($request->items as $item) {
            $product = Product::findOrFail($item['product_id']);
            $unitPrice = $product->price;
            $lineTotal = $item['quantity'] * $unitPrice;
            $totalHT += $lineTotal;
            
            $itemsData[] = [
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'unit_price' => $unitPrice,
                'total' => $lineTotal,
            ];
        }
        $tvaProgress = 20.00; // 20%
        $totalTTC = $totalHT + ($totalHT * ($tvaProgress / 100));

        $year = date('Y');
        $latestDevis = Devis::whereYear('created_at', $year)->latest()->first();
        $sequence = $latestDevis ? ((int) substr($latestDevis->devis_number, -3)) + 1 : 1;
        $devisNumber = 'DEV-' . $year . '-' . str_pad($sequence, 3, '0', STR_PAD_LEFT);

        DB::transaction(function () use ($request, $devisNumber, $totalHT, $tvaProgress, $totalTTC, $itemsData) {
            
            $devis = Devis::create([
                'client_id' => $request->client_id,
                'devis_number' => $devisNumber,
                'devis_date' => $request->devis_date,
                'status' => 'En cours',
                'total_ht' => $totalHT,
                'tva' => $tvaProgress,
                'total_ttc' => $totalTTC,
            ]);

            foreach ($itemsData as $data) {
                $data['devis_id'] = $devis->id;
                DevisItem::create($data);
            }
        });

        return redirect()->route('devis.index')->with('success', 'Devis créé avec succès !');
    }

        /** Télécharger le PDF d'un devis */
   public function downloadPdf($id)
    {
        $devis = Devis::with(['client', 'items.product'])->findOrFail($id);
        $pdf = Pdf::loadView('devis-pdf', compact('devis'));
        $pdf->setPaper('a4', 'portrait')->setWarnings(false);
        return $pdf->stream('Devis_' . $devis->devis_number . '.pdf');
    }

    /** Supprimer un devis */
    public function destroy($id)
    {
        $devis = Devis::findOrFail($id);
        $this->authorize('delete', $devis);
        $devis->delete();
        return redirect()->route('devis.index')->with('success', 'Devis supprimé avec succès !');
    }

    /** Modifier un devis */
    public function edit($id)
    {
        $devis = Devis::with('items')->findOrFail($id);
        
        $formattedItems = $devis->items->map(function($item) {
            return [
                'product_id' => $item->product_id,
                'quantity' => (int) $item->quantity,
                'unit_price' => (float) $item->unit_price,
            ];
        });

        unset($devis->items);
        $devis->items_formatted = $formattedItems;

    
        $clients = Client::orderBy('name')->get();
        $products = Product::orderBy('name')->get();

        return inertia('Devis/Edit', [
            'devis' => $devis,
            'clients' => $clients,
            'products' => $products
        ]);
    }

    /** Mettre à jour un devis */
    public function update(DevisRequest $request, $id)
    {
        $devis = Devis::findOrFail($id);
        $this->authorize('update', $devis);

        \DB::transaction(function () use ($request, $devis) {
            
            $total_ht = 0;
            $itemsData = [];
            foreach ($request->items as $item) {
                $product = Product::findOrFail($item['product_id']);
                $unitPrice = $product->price;
                $lineTotal = $item['quantity'] * $unitPrice;
                $total_ht += $lineTotal;
                
                $itemsData[] = [
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'unit_price' => $unitPrice,
                    'total' => $lineTotal
                ];
            }
            $tva = $total_ht * 0.20;
            $total_ttc = $total_ht + $tva;

            $devis->update([
                'client_id' => $request->client_id,
                'devis_date' => $request->devis_date,
                'total_ht' => $total_ht,
                'tva' => 20.00, 
                'total_ttc' => $total_ttc,
            ]);

            $devis->items()->delete();

            foreach ($itemsData as $data) {
                $devis->items()->create($data);
            }
        });

        return redirect()->route('devis.index')->with('success', 'Devis mis à jour avec succès !');
    }

   public function validateToBC($id)
    {
        $devis = Devis::with(['client', 'items.product'])->findOrFail($id);
        
        $devis->update(['status' => 'Bon de commande']);

        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('bc-pdf', compact('devis'));
        $pdf->setPaper('a4', 'portrait')->setWarnings(false);
        
        return $pdf->stream('BC_' . $devis->devis_number . '.pdf');
    }

    public function convertToInvoice($id)
    {
        $devis = Devis::with('items')->findOrFail($id);
        if ($devis->status !== 'Bon de commande') {
        return redirect()->back()->with('error', 'Vous devez valider le Devis en BC avant de facturer.');
    }

        $facture = DB::transaction(function () use ($devis) {
            
            $year = date('Y');
            $lastFacture = Facture::whereYear('facture_date', $year)->orderBy('id', 'desc')->first();
            $sequence = $lastFacture ? ((int)substr($lastFacture->facture_number, -3)) + 1 : 1;
            $factureNumber = 'FACT-' . $year . '-' . str_pad($sequence, 3, '0', STR_PAD_LEFT);

            $facture = Facture::create([
                'facture_number' => $factureNumber,
                'client_id'      => $devis->client_id,
                'facture_date'   => now(), 
                'total_ht'       => $devis->total_ht,
                'total_ttc'      => $devis->total_ttc,
                'status'         => 'Payee',
            ]);

            foreach ($devis->items as $item) {
                $facture->items()->create([
                    'product_id' => $item->product_id,
                    'quantity'   => $item->quantity,
                    'unit_price' => $item->unit_price,
                    'total_line' => $item->quantity * $item->unit_price,
                ]);
            }

            $devis->update(['status' => 'Valide']);

            return $facture;
        });

       return redirect()->route('factures.index')->with('success', 'Devis converti en Facture avec succès !');
    }
}