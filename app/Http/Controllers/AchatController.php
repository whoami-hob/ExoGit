<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Http\Requests\AchatRequest;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class AchatController extends Controller
{
    use AuthorizesRequests;
    public function index(Request $request)
    {
        $query = \App\Models\Achat::with('fournisseur');

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('nom_article', 'like', '%' . $search . '%')
                ->orWhere('reference', 'like', '%' . $search . '%');
            });
        }

        $achats = $query->latest()->get();

        return inertia('Achats/Index', [
            'achats' => $achats,
            'filters' => $request->only(['search']),
        ]);
    }

    public function store(AchatRequest $request)
    {
        \App\Models\Achat::create($request->validated());

        return redirect()->route('achats.index')->with('success', 'Achat ajouté avec succès !');
    }
    public function create()
    {
        $fournisseurs = \App\Models\Fournisseur::all(); 
        return inertia('Achats/Create', ['fournisseurs' => $fournisseurs]);
    }

    public function show($id)
    {
        $achat = \App\Models\Achat::with('fournisseur')->findOrFail($id);
        
        return inertia('Achats/Show', [
            'achat' => $achat
        ]);
    }

    public function generatePdf($id)
    {
        $achat = \App\Models\Achat::with('fournisseur')->findOrFail($id);
        $pdf = Pdf::loadView('pdf.achat', ['achat' => $achat]);
        return $pdf->download('facture_'.$achat->reference.'.pdf');
    }

    public function destroy($id)
    {
        $achat = \App\Models\Achat::findOrFail($id);
        $this->authorize('delete', $achat);
        $achat->delete();

        return redirect()->back()->with('success', 'Opération supprimée avec succès.');
    }

    public function edit($id)
    {
        $achat = \App\Models\Achat::findOrFail($id);
        $fournisseurs = \App\Models\Fournisseur::all();
        return inertia('Achats/Edit', [
            'achat' => $achat,
            'fournisseurs' => $fournisseurs
        ]);
    }

    public function update(AchatRequest $request, $id)
    {
        $achat = \App\Models\Achat::findOrFail($id);
        $this->authorize('update', $achat);
        
        $achat->update($request->validated());
        return redirect()->route('achats.index')->with('success', 'Achat mis à jour avec succès !');
    }
}
