<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Client;
use Illuminate\Auth\Access\HandlesAuthorization;

class ClientPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user) { return true; }
    public function view(User $user, Client $model) { return true; }
    public function create(User $user) { return true; }
    public function update(User $user, Client $model) { return $user->role === 'admin'; }
    public function delete(User $user, Client $model) { return $user->role === 'admin'; }
}
