import React, { useState, useMemo } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FileText, Search, Plus, Trash2, Edit2, CheckCircle, FileSpreadsheet, Printer, AlertTriangle } from 'lucide-react';

export default function Index({ auth, devisList = [] }) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [devisToDelete, setDevisToDelete] = useState(null);

    const [filterStatus, setFilterStatus] = useState('');
    const [filterProduct, setFilterProduct] = useState('');

    const { delete: destroy, processing } = useForm();

    const filteredDevis = useMemo(() => {
        return devisList.filter((devis) => {
            const matchStatus = !filterStatus || devis.status === filterStatus;
            const matchProduct = !filterProduct ||
                devis.items?.some(item =>
                    item.product?.name?.toLowerCase().includes(filterProduct.toLowerCase())
                );
            return matchStatus && matchProduct;
        });
    }, [devisList, filterStatus, filterProduct]);

    const openDeleteModal = (devis) => {
        setDevisToDelete(devis);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setDevisToDelete(null);
    };

    const handleDeleteConfirm = () => {
        if (devisToDelete) {
            destroy(`/devis/${devisToDelete.id}`, {
                onSuccess: () => closeDeleteModal(),
            });
        }
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <div>
                    <h2 className="font-bold text-2xl text-gray-900 leading-tight tracking-tight">Devis</h2>
                    <p className="text-sm text-gray-500 mt-1">Gérez et suivez l'état de vos propositions commerciales.</p>
                </div>
            }
        >
            <Head title="Devis" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-6">
                
                {/* Actions Toolbar */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    
                    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                        <div className="relative w-full sm:w-48">
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="block w-full py-2 pl-3 pr-10 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors bg-white shadow-sm"
                            >
                                <option value="">Tous les statuts</option>
                                <option value="En cours">En attente</option>
                                <option value="Bon de commande">Bon de Commande</option>
                                <option value="Valide">Validé</option>
                            </select>
                        </div>

                        <div className="relative w-full sm:w-56">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={filterProduct}
                                onChange={(e) => setFilterProduct(e.target.value)}
                                placeholder="Rechercher par produit..."
                                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors bg-white shadow-sm"
                            />
                        </div>

                        {(filterStatus || filterProduct) && (
                            <button
                                onClick={() => { setFilterStatus(''); setFilterProduct(''); }}
                                className="text-sm text-red-500 hover:text-red-600 font-semibold transition-colors"
                            >
                                Réinitialiser
                            </button>
                        )}
                    </div>
                    
                    <Link 
                        href="/devis/create"
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 shadow-sm shadow-blue-200 text-sm font-semibold transition whitespace-nowrap w-full sm:w-auto justify-center"
                    >
                        <Plus className="w-4 h-4" />
                        Nouveau Devis
                    </Link>
                </div>

                {/* Table Container */}
                <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100 text-sm text-left">
                            <thead className="bg-gray-50/50">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">N° Devis</th>
                                    <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Client</th>
                                    <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Produits</th>
                                    <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Statut</th>
                                    <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Total TTC</th>
                                    <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                                {filteredDevis.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center text-gray-400">
                                                <FileText className="w-12 h-12 mb-3 text-gray-200" />
                                                <p className="text-base font-medium text-gray-500">Aucun devis trouvé</p>
                                                <p className="text-sm">Essayez de modifier vos critères de recherche ou créez un nouveau devis.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredDevis.map((devis) => (
                                        <tr key={devis.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg ring-1 ring-blue-100">
                                                    {devis.devis_number}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{devis.client?.name || 'Client inconnu'}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-1 max-w-xs">
                                                    {devis.items?.map((item, idx) => (
                                                        <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20">
                                                            {item.product?.name} <span className="text-gray-400 ml-1">x{item.quantity}</span>
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">{devis.devis_date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ring-inset 
                                                    ${devis.status === 'Bon de commande' ? 'bg-indigo-50 text-indigo-700 ring-indigo-600/20' :
                                                    devis.status === 'Valide' ? 'bg-green-50 text-green-700 ring-green-600/20' :
                                                    'bg-amber-50 text-amber-700 ring-amber-600/20'}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 
                                                        ${devis.status === 'Bon de commande' ? 'bg-indigo-500' :
                                                        devis.status === 'Valide' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                                                    {devis.status === 'Bon de commande' ? 'Bon de Commande' :
                                                    devis.status === 'Valide' ? 'Validé' : 'En attente'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">
                                                {parseFloat(devis.total_ttc || 0).toLocaleString('fr-FR', { minimumFractionDigits: 2 })} DH
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end items-center gap-2">
                                                    {(devis.status === 'En cours' || devis.status === 'En attente') && (
                                                        <>
                                                            <a 
                                                                href={`/devis/${devis.id}/pdf`} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer"
                                                                className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                                title="Imprimer / PDF"
                                                            >
                                                                <Printer className="w-4 h-4" />
                                                            </a>
                                                            <a 
                                                                href={`/devis/${devis.id}/validate-to-bc`} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer"
                                                                onClick={() => setTimeout(() => window.location.reload(), 1000)} 
                                                                className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                                title="Valider vers Bon de commande"
                                                            >
                                                                <CheckCircle className="w-4 h-4" />
                                                            </a>
                                                            <Link 
                                                                href={`/devis/${devis.id}/edit`} 
                                                                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                                title="Modifier"
                                                            >
                                                                <Edit2 className="w-4 h-4" />
                                                            </Link>
                                                            {auth.user.role === 'admin' && (
                                                                <button 
                                                                    onClick={() => openDeleteModal(devis)} 
                                                                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                                    title="Supprimer"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            )}
                                                        </>
                                                    )}
                                                    {devis.status === 'Bon de commande' && (
                                                        <>
                                                            <Link 
                                                                href={route('devis.convert-to-invoice', { id: devis.id })} 
                                                                method="post" 
                                                                as="button" 
                                                                className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                                                title="Convertir en Facture"
                                                            >
                                                                <FileSpreadsheet className="w-4 h-4" />
                                                            </Link>
                                                            {auth.user.role === 'admin' && (
                                                                <button 
                                                                    onClick={() => openDeleteModal(devis)} 
                                                                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                                    title="Supprimer"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            )}
                                                        </>
                                                    )}
                                                    {devis.status === 'Valide' && auth.user.role === 'admin' && (
                                                        <button 
                                                            onClick={() => openDeleteModal(devis)} 
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
                                <h3 className="text-lg font-bold text-gray-900">Supprimer le devis</h3>
                                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                                    Êtes-vous sûr de vouloir supprimer le devis <strong className="text-gray-900">{devisToDelete?.devis_number}</strong> ?
                                    <span className="block mt-1 text-xs text-red-500/80 font-medium">Avertissement: Toutes les lignes associées seront supprimées.</span>
                                </p>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end gap-3">
                            <button 
                                type="button" 
                                onClick={closeDeleteModal} 
                                className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 ring-1 ring-inset ring-gray-300 transition-colors"
                                disabled={processing}
                            >
                                Annuler
                            </button>
                            <button 
                                type="button" 
                                onClick={handleDeleteConfirm} 
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold shadow-sm transition-colors disabled:opacity-50"
                                disabled={processing}
                            >
                                {processing ? 'Suppression...' : 'Oui, supprimer'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}