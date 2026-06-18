<?php

namespace App\Policies;

use App\Models\Fournisseur;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class FournisseurPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user)
    {
        return true;
    }

    public function view(User $user, Fournisseur $fournisseur)
    {
        return true;
    }

    public function create(User $user)
    {
        return true;
    }

    public function update(User $user, Fournisseur $fournisseur)
    {
        // Ensure only authorized users can update
        // Adjust this logic if other roles are permitted
        return $user->role === 'admin';
    }

    public function delete(User $user, Fournisseur $fournisseur)
    {
        // Ensure only authorized users can delete
        return $user->role === 'admin';
    }
}
