<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Product;
use App\Models\Devis;
use App\Models\Facture; 
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $data = [
            'totalClients' => Client::count(),
            'totalProducts' => Product::count(),
            'totalDevis' => Devis::count(),
            'recentDevis' => Devis::with('client')->orderBy('created_at', 'desc')->take(5)->get(),
        ];

        if ($user->role === 'admin') {
            $data['totalRevenueHT'] = (float)Devis::where('status', 'Valide')->sum('total_ht');
            $data['totalRevenueTTC'] = (float)Devis::where('status', 'Valide')->sum('total_ttc');
        } else {
            $data['totalFactures'] = Facture::count(); 
            $data['totalRevenueHT'] = 0;
            $data['totalRevenueTTC'] = 0;
        }

        return Inertia::render('Dashboard', $data);
    }
}