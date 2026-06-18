<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Achat;
use Illuminate\Auth\Access\HandlesAuthorization;

class AchatPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user) { return true; }
    public function view(User $user, Achat $model) { return true; }
    public function create(User $user) { return true; }
    public function update(User $user, Achat $model) { return $user->role === 'admin'; }
    public function delete(User $user, Achat $model) { return $user->role === 'admin'; }
}
