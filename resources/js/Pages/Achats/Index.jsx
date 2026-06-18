import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react'; 
import { Edit2, Trash2, Plus, Search, AlertTriangle, Eye, ShoppingCart } from 'lucide-react';

export default function Index({ auth, achats, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [achatToDelete, setAchatToDelete] = useState(null);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            router.get(
                route('achats.index'), 
                { search: search }, 
                { 
                    preserveState: true, 
                    preserveScroll: true,
                    replace: true 
                }
            );
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    const openDeleteModal = (achat) => {
        setAchatToDelete(achat);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setAchatToDelete(null);
    };

    const handleDeleteConfirm = () => {
        if (achatToDelete) {
            router.delete(route('achats.destroy', achatToDelete.id), {
                onSuccess: () => closeDeleteModal(),
            });
        }
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <div>
                    <h2 className="font-bold text-2xl text-gray-900 leading-tight tracking-tight">Achats</h2>
                    <p className="text-sm text-gray-500 mt-1">Gérez vos opérations d'achat et vos dépenses.</p>
                </div>
            }
        >
            <Head title="Achats" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                
                {/* Actions Toolbar */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <div className="relative w-full sm:w-72">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Rechercher par réf ou article..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors bg-white shadow-sm"
                        />
                    </div>
                    
                    <Link 
                        href={route('achats.create')} 
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 shadow-sm shadow-blue-200 text-sm font-semibold transition whitespace-nowrap w-full sm:w-auto justify-center"
                    >
                        <Plus className="w-4 h-4" />
                        Nouvel Achat
                    </Link>
                </div>

                {/* Table Container */}
                <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100 text-sm text-left">
                            <thead className="bg-gray-50/50">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Référence</th>
                                    <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Fournisseur</th>
                                    <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Montant</th>
                                    <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                                {achats.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center text-gray-400">
                                                <ShoppingCart className="w-12 h-12 mb-3 text-gray-200" />
                                                <p className="text-base font-medium text-gray-500">Aucune opération trouvée</p>
                                                <p className="text-sm">Essayez de modifier vos critères de recherche.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    achats.map((achat) => (
                                        <tr key={achat.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-8 w-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 ring-1 ring-orange-100 mr-3">
                                                        <ShoppingCart className="w-4 h-4" />
                                                    </div>
                                                    <span className="font-semibold text-gray-900">{achat.reference}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600 font-medium">{achat.fournisseur?.nom || 'N/A'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-indigo-600 font-bold">
                                                {parseFloat(achat.montant || 0).toLocaleString('fr-FR', { minimumFractionDigits: 2 })} DH
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">
                                                {new Date(achat.date_achat).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end items-center gap-2">
                                                    <Link 
                                                        href={route('achats.show', achat.id)} 
                                                        className="p-1.5 text-gray-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                                                        title="Détails"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </Link>
                                                    <Link 
                                                        href={route('achats.edit', achat.id)} 
                                                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Modifier"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </Link>
                                                    {auth.user.role === 'admin' && (
                                                        <button 
                                                            type="button"
                                                            onClick={() => openDeleteModal(achat)} 
                                                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                            title="Supprimer"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal de suppression */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto">
                    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" onClick={closeDeleteModal}></div>
                    <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 p-2 bg-red-50 text-red-600 rounded-full ring-1 ring-red-100">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Supprimer l'achat</h3>
                                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                                    Êtes-vous sûr de vouloir supprimer la référence <strong className="text-gray-900">{achatToDelete?.reference}</strong> ? Cette action est irréversible.
                                </p>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end gap-3">
                            <button 
                                type="button" 
                                onClick={closeDeleteModal} 
                                className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 ring-1 ring-inset ring-gray-300 transition-colors"
                            >
                                Annuler
                            </button>
                            <button 
                                type="button" 
                                onClick={handleDeleteConfirm} 
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold shadow-sm transition-colors"
                            >
                                Oui, supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}