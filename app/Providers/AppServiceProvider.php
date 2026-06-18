<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;

use App\Models\Fournisseur;
use App\Models\Client;
use App\Models\Product;
use App\Models\Devis;
use App\Models\Facture;
use App\Models\Achat;
use App\Models\User;

use App\Policies\FournisseurPolicy;
use App\Policies\ClientPolicy;
use App\Policies\ProductPolicy;
use App\Policies\DevisPolicy;
use App\Policies\FacturePolicy;
use App\Policies\AchatPolicy;
use App\Policies\UserPolicy;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::policy(Fournisseur::class, FournisseurPolicy::class);
        Gate::policy(Client::class, ClientPolicy::class);
        Gate::policy(Product::class, ProductPolicy::class);
        Gate::policy(Devis::class, DevisPolicy::class);
        Gate::policy(Facture::class, FacturePolicy::class);
        Gate::policy(Achat::class, AchatPolicy::class);
        Gate::policy(User::class, UserPolicy::class);
        
        Vite::prefetch(concurrency: 3);
    }
}
