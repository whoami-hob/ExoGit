<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Devis;
use Illuminate\Auth\Access\HandlesAuthorization;

class DevisPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user) { return true; }
    public function view(User $user, Devis $model) { return true; }
    public function create(User $user) { return true; }
    public function update(User $user, Devis $model) { return $user->role === 'admin'; }
    public function delete(User $user, Devis $model) { return $user->role === 'admin'; }
}
