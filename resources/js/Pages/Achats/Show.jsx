import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ auth, achat }) {
    return (
        <AuthenticatedLayout auth={auth} user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Détails de la facture : <span className='text-blue-500'>{achat.reference}</span></h2>}>
            <Head title="Détails Achat" />
            
            <div className="py-12">
                <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-xl border border-gray-100">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-800">Facture  <span className="text-lg">{achat.reference}</span></h3>
                        <a 
                            href={route('achats.pdf', achat.id)} 
                            target="_blank" 
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition shadow"
                        >
                            📥 Télécharger PDF
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-xs text-gray-500 uppercase">Fournisseur</p>
                            <p className="text-lg font-semibold">{achat.fournisseur.nom}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-xs text-gray-500 uppercase">Article</p>
                            <p className="text-lg font-semibold">{achat.nom_article}</p>
                        </div>
                        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                            <p className="text-xs text-indigo-500 uppercase">Montant Total</p>
                            <p className="text-2xl font-bold text-indigo-700">{achat.montant} DH</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-xs text-gray-500 uppercase">Mode de Paiement</p>
                            <p className="text-lg font-semibold uppercase">{achat.mode_paiement}</p>
                        </div>
                    </div>
                    
                    <div className="mt-8 flex justify-between items-center">
                        <Link href={route('achats.index')} className="text-gray-500 hover:text-gray-900 ">
                            ← Retour à la liste
                        </Link>
                        <p className="text-sm text-gray-400">Date d'enregistrement: {achat.date_achat}</p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}