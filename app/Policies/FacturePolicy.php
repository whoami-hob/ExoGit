<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Facture;
use Illuminate\Auth\Access\HandlesAuthorization;

class FacturePolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user) { return true; }
    public function view(User $user, Facture $model) { return true; }
    public function create(User $user) { return true; }
    public function update(User $user, Facture $model) { return $user->role === 'admin'; }
    public function delete(User $user, Facture $model) { return $user->role === 'admin'; }
}
