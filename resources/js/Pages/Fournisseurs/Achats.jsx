import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Trash2, AlertTriangle, ArrowLeft, History } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function Achats({ auth, fournisseur }) {
    const { delete: destroy } = useForm();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [achatToDelete, setAchatToDelete] = useState(null);

    const openDeleteModal = (achatId) => {
        setAchatToDelete(achatId);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setAchatToDelete(null);
    };

    const handleDeleteConfirm = () => {
        if (achatToDelete) {
            destroy(route('achats.destroy', achatToDelete), {
                onSuccess: () => closeDeleteModal(),
            });
        }
    };

    return (
        <AuthenticatedLayout 
            auth={auth} 
            header={
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <Link href={route('fournisseurs.index')} className="text-gray-400 hover:text-blue-600 transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h2 className="font-bold text-2xl text-gray-900 leading-tight tracking-tight">Historique des Achats</h2>
                    </div>
                    <p className="text-sm text-gray-500 ml-8">
                        Fournisseur : <span className="font-semibold text-gray-700">{fournisseur.nom}</span>
                    </p>
                </div>
            }
        >
            <Head title={`Achats de ${fournisseur.nom}`} />
            
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-6">
                
                {/* Table Container */}
                <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100 text-sm text-left">
                            <thead className="bg-gray-50/50">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Référence (Facture)</th>
                                    <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Article</th>
                                    <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Montant</th>
                                    <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                                {fournisseur.achats.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center text-gray-400">
                                                <History className="w-12 h-12 mb-3 text-gray-200" />
                                                <p className="text-base font-medium text-gray-500">Aucun achat enregistré</p>
                                                <p className="text-sm">Ce fournisseur n'a pas encore d'historique d'achat.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    fournisseur.achats.map((achat) => (
                                        <tr key={achat.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{achat.reference}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{achat.nom_article}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-indigo-600 font-bold">
                                                {parseFloat(achat.montant || 0).toLocaleString('fr-FR', { minimumFractionDigits: 2 })} DH
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">
                                                {new Date(achat.date_achat).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end items-center gap-2">
                                                    {auth.user.role === 'admin' && (
                                                        <button 
                                                            type="button"
                                                            onClick={() => openDeleteModal(achat.id)} 
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
                                <h3 className="text-lg font-bold text-gray-900">Supprimer l'opération</h3>
                                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                                    Êtes-vous sûr de vouloir supprimer cette opération d'achat ? Cette action est irréversible.
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