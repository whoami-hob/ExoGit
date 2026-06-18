import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function Trashed({ auth, factures, filters }) {
    const [search, setSearch] = useState(filters?.search || '');

    // نظام البحث التلقائي بنفس منطق صفحة العملاء
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            router.get(
                route('factures.trashed'), 
                { search: search }, 
                { preserveState: true, preserveScroll: true, replace: true }
            );
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    const restore = (id) => {
        router.post(route('factures.restore', id));
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Corbeille des Factures - <span className="font-semibold" style={{ color: '#2d23e0' }}>EXOGIT</span></h2>}
        >
            <Head title="Corbeille" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                            <h3 className="text-lg font-medium text-gray-700">Liste des factures supprimées</h3>
                            
                            <input
                                type="text"
                                placeholder="Rechercher par numéro ou client..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="border border-gray-300 rounded-md px-4 py-2 text-sm w-full md:w-64 focus:ring-2 focus:ring-blue-500 transition"
                            />
                        </div>

                        <div className="overflow-x-auto rounded-lg border border-gray-200">
                            <table className="min-w-full divide-y divide-gray-200 text-sm text-left text-gray-500">
                                <thead className="bg-gray-50 text-xs text-gray-700 uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-3 font-semibold">Numéro</th>
                                        <th className="px-6 py-3 font-semibold">Client</th>
                                        <th className="px-6 py-3 font-semibold text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {factures.length === 0 ? (
                                        <tr>
                                            <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                                                Aucune facture dans la corbeille.
                                            </td>
                                        </tr>
                                    ) : (
                                        factures.map((facture) => (
                                            <tr key={facture.id} className="hover:bg-gray-50 transition duration-150">
                                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{facture.facture_number}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{facture.client?.name || '---'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                                    <button 
                                                        onClick={() => restore(facture.id)}
                                                        className="text-blue-600 hover:text-blue-900 font-bold transition"
                                                    >
                                                        Restaurer
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}