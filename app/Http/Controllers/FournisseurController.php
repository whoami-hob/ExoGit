<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Http\Requests\FournisseurRequest;

class FournisseurController extends Controller
{
    use AuthorizesRequests;
    public function index(Request $request)
    {
        $query = \App\Models\Fournisseur::query();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('nom', 'like', '%' . $search . '%')
                ->orWhere('email', 'like', '%' . $search . '%');
            });
        }

        $fournisseurs = $query->latest()->get();

        return inertia('Fournisseurs/Index', [
            'fournisseurs' => $fournisseurs,
            'filters' => $request->only(['search']),
        ]);
}

    public function create()
    {
        return inertia('Fournisseurs/Create');
    }

    public function store(FournisseurRequest $request)
    {
        $validated = $request->validated();

        \App\Models\Fournisseur::create($validated);

        return redirect()->route('fournisseurs.index')->with('success', 'Fournisseur ajouté avec succès !');
    }

    public function destroy(\App\Models\Fournisseur $fournisseur)
    {
        $this->authorize('delete', $fournisseur);
        $fournisseur->delete();
        return redirect()->route('fournisseurs.index')->with('success', 'Fournisseur supprimé !');
    }

    public function edit(\App\Models\Fournisseur $fournisseur)
    {
        return inertia('Fournisseurs/Edit', ['fournisseur' => $fournisseur]);
    }

    public function update(FournisseurRequest $request, \App\Models\Fournisseur $fournisseur)
    {
        $this->authorize('update', $fournisseur);

        $validated = $request->validated();

        $fournisseur->update($validated);
        return redirect()->route('fournisseurs.index')->with('success', 'Fournisseur mis à jour !');
    }

    public function showAchats(\App\Models\Fournisseur $fournisseur)
    {
        $fournisseur->load('achats');
        return inertia('Fournisseurs/Achats', ['fournisseur' => $fournisseur]);
    }

}
