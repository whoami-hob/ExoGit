import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { Search, AlertTriangle, FileSpreadsheet, Trash2, Printer, RefreshCw } from 'lucide-react';

export default function Index({ auth, facturesList = [] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFactureId, setSelectedFactureId] = useState(null);

    const openDeleteModal = (id) => {
        setSelectedFactureId(id);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        if (selectedFactureId) {
            router.delete(`/factures/${selectedFactureId}`, {
                onSuccess: () => {
                    setIsModalOpen(false);
                    setSelectedFactureId(null);
                }
            });
        }
    };

    const toggleStatus = (id) => {
        router.patch(route('factures.toggle-status', id));
    };

    const [search, setSearch] = useState(route().params.search || '');

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        
        router.get(route('factures.index'), 
            { search: value, status: route().params.status }, 
            { preserveState: true, replace: true }
        );
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <div>
                    <h2 className="font-bold text-2xl text-gray-900 leading-tight tracking-tight">Factures</h2>
                    <p className="text-sm text-gray-500 mt-1">Historique des factures générées à partir des devis.</p>
                </div>
            }
        >
            <Head title="Factures" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-6">
                
                {/* Actions Toolbar */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div className="flex flex-wrap gap-2">
                        <button 
                            onClick={() => router.get('/factures', {}, { preserveState: true })}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${!route().params.status ? 'bg-slate-800 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
                        >
                            Tout
                        </button>
                        <button 
                            onClick={() => router.get('/factures', { status: 'Payee' }, { preserveState: true })}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${route().params.status === 'Payee' ? 'bg-green-600 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:bg-green-50 hover:text-green-700'}`}
                        >
                            Payées
                        </button>
                        <button 
                            onClick={() => router.get('/factures', { status: 'En attente' }, { preserveState: true })}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${route().params.status === 'En attente' ? 'bg-amber-500 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:bg-amber-50 hover:text-amber-600'}`}
                        >
                            En attente
                        </button>
                    </div>

                    <div className="relative w-full md:w-72">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Rechercher par client..."
                            value={search}
                            onChange={handleSearch}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors bg-white shadow-sm"
                        />
                    </div>
                </div>

                {/* Table Container */}
                <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100 text-sm text-left">
                            <thead className="bg-gray-50/50">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">N° Facture</th>
                                    <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Client</th>
                                    <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Date d'émission</th>
                                    <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Statut</th>
                                    <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Total TTC</th>
                                    <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                                {facturesList.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center text-gray-400">
                                                <FileSpreadsheet className="w-12 h-12 mb-3 text-gray-200" />
                                                <p className="text-base font-medium text-gray-500">Aucune facture disponible</p>
                                                <p className="text-sm">Générez des factures à partir de vos devis.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    facturesList.map((facture) => (
                                        <tr key={facture.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg ring-1 ring-blue-100">
                                                    {facture.facture_number}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{facture.client?.name || 'Client inconnu'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                                {facture.facture_date ? new Date(facture.facture_date).toLocaleDateString('fr-FR') : '20/05/2026'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ring-inset ${facture.status === 'Payee' ? 'bg-green-50 text-green-700 ring-green-600/20' : 'bg-amber-50 text-amber-700 ring-amber-600/20'}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${facture.status === 'Payee' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                                                    {facture.status === 'Payee' ? 'Payée' : 'En attente'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">
                                                {parseFloat(facture.total_ttc || 0).toLocaleString('fr-FR', { minimumFractionDigits: 2 })} DH
                                            </td>
                                            
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end items-center gap-2">
                                                    <a 
                                                        href={`/factures/${facture.id}/pdf`} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer" 
                                                        className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                        title="Imprimer / PDF"
                                                    >
                                                        <Printer className="w-4 h-4" />
                                                    </a>

                                                    <button
                                                        type="button"
                                                        onClick={() => toggleStatus(facture.id)}
                                                        className={`p-1.5 rounded-lg transition-colors ${facture.status === 'Payee' ? 'text-gray-400 hover:text-amber-600 hover:bg-amber-50' : 'text-gray-400 hover:text-green-600 hover:bg-green-50'}`}
                                                        title={facture.status === 'Payee' ? 'Marquer En attente' : 'Marquer Payée'}
                                                    >
                                                        <RefreshCw className="w-4 h-4" />
                                                    </button>

                                                    {auth.user.role === 'admin' && (
                                                        <button
                                                            type="button"
                                                            onClick={() => openDeleteModal(facture.id)}
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
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto">
                    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)}></div>
                    <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 p-2 bg-red-50 text-red-600 rounded-full ring-1 ring-red-100">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Supprimer la facture</h3>
                                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                                    Êtes-vous sûr de vouloir supprimer cette facture ? Cette action est irréversible et supprimera définitivement toutes ses données associées.
                                </p>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end gap-3">
                            <button 
                                type="button" 
                                onClick={() => setIsModalOpen(false)} 
                                className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 ring-1 ring-inset ring-gray-300 transition-colors"
                            >
                                Annuler
                            </button>
                            <button 
                                type="button" 
                                onClick={confirmDelete} 
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