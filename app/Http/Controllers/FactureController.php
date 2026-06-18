<?php

namespace App\Http\Controllers;

use App\Models\Facture;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class FactureController extends Controller
{
    use AuthorizesRequests;
    public function index(Request $request){
        $query = Facture::with('client')
            ->orderBy('created_at', 'desc');

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $query->whereHas('client', function($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%');
            });
        }

        $facturesList = $query->get();

        return Inertia::render('Factures/Index', [
            'facturesList' => $facturesList,
            'filters' => $request->only(['status', 'search']), 
        ]);
    }

    public function destroy(Facture $facture){
        $this->authorize('delete', $facture);
        $facture->items()->delete();
        $facture->delete();
        return redirect()->back();
    }

    public function trashed(Request $request){
        $query = Facture::onlyTrashed()->with('client');

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('facture_number', 'like', '%' . $search . '%')
                ->orWhereHas('client', function($subQuery) use ($search) {
                    $subQuery->where('name', 'like', '%' . $search . '%');
                });
            });
        }

        return Inertia::render('Factures/Trashed', [
            'factures' => $query->latest()->get(),
            'filters' => $request->only(['search']),
        ]);
    }

    public function restore($id){
        $facture = Facture::onlyTrashed()->findOrFail($id);
        $facture->restore();
        return redirect()->back()->with('success', 'Facture restaurée avec succès !');
    }

    public function toggleStatus(Facture $facture){
        $this->authorize('update', $facture);
        $facture->status = ($facture->status === 'Payee') ? 'En attente' : 'Payee';
        $facture->save();

        return redirect()->back()->with('success', 'Statut mis à jour !');
    }

    public function generatePDF(Facture $facture){
        $facture->load(['client', 'items.product']);
        $pdf = Pdf::loadView('pdf.facture', compact('facture'));
        return $pdf->stream('Facture_' . $facture->facture_number . '.pdf');
    }

}