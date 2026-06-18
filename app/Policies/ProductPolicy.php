<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Product;
use Illuminate\Auth\Access\HandlesAuthorization;

class ProductPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user) { return true; }
    public function view(User $user, Product $model) { return true; }
    public function create(User $user) { return true; }
    public function update(User $user, Product $model) { return $user->role === 'admin'; }
    public function delete(User $user, Product $model) { return $user->role === 'admin'; }
}
