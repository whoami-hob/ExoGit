import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ auth, fournisseurs }) {
    const { data, setData, post, processing, errors } = useForm({
        fournisseur_id: '',
        nom_article: '',
        reference: '',
        montant: '',
        date_achat: '',
        mode_paiement: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('achats.store'));
    };

    return (
        <AuthenticatedLayout 
            auth={auth} 
            user={auth.user} 
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight"> Nouvel Achat</h2>}
        >
            <Head title="Ajouter Achat" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-8">
                        <form onSubmit={submit} className="space-y-6">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Fournisseur <span className='text-red-500'>*</span></label>
                                    <select 
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        onChange={e => setData('fournisseur_id', e.target.value)}
                                        required
                                    >
                                        <option value="">Sélectionnez un fournisseur</option>
                                        {fournisseurs.map(f => (
                                            <option key={f.id} value={f.id}>{f.nom}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Nom de l'Article <span className='text-red-500'>*</span></label>
                                    <input 
                                        type="text" 
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" 
                                        onChange={e => setData('nom_article', e.target.value)} 
                                        required 
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Référence (Facture) <span className='text-red-500'>*</span></label>
                                    <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" onChange={e => setData('reference', e.target.value)} required />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Montant (DH) <span className='text-red-500'>*</span></label>
                                    <input type="number" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" onChange={e => setData('montant', e.target.value)} required />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Mode de Paiement <span className='text-red-500'>*</span></label>
                                    <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" onChange={e => setData('mode_paiement', e.target.value)} required>
                                        <option value="">Choisir...</option>
                                        <option value="especes">Espèces</option>
                                        <option value="virement">Virement</option>
                                        <option value="cheque">Chèque</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Date d'achat <span className='text-red-500'>*</span></label>
                                <input type="date" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" onChange={e => setData('date_achat', e.target.value)} required />
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <Link href={route('achats.index')} className="text-gray-600  hover:text-gray-900 mr-6">
                                    Annuler
                                </Link>
                                <button 
                                    type="submit" 
                                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition" 
                                    disabled={processing}
                                >
                                    {processing ? 'En cours...' : 'Enregistrer'}
                                </button>
                            </div>
                        </form>
                        <span style={{color: 'red'}}>*</span> Champs obligatoires.
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}