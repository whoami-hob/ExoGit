import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ auth, achat, fournisseurs }) {
    const { data, setData, put, processing, errors } = useForm({
        fournisseur_id: achat.fournisseur_id || '',
        nom_article: achat.nom_article || '',
        reference: achat.reference || '',
        montant: achat.montant || '',
        date_achat: achat.date_achat || '',
        mode_paiement: achat.mode_paiement || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('achats.update', achat.id));
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Modifier l'achat : <span className="font-semibold" style={{ color: '#2d23e0' }}>{achat.reference}</span></h2>}
        >
            <Head title="Modifier Achat" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-8">
                        <form onSubmit={submit} className="space-y-6">
                            
                            {/* Fournisseur Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Fournisseur <span className="text-red-500">*</span></label>
                                <select
                                    value={data.fournisseur_id}
                                    onChange={(e) => setData('fournisseur_id', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    required
                                >
                                    <option value="">Sélectionner un fournisseur</option>
                                    {fournisseurs.map(f => (
                                        <option key={f.id} value={f.id}>{f.nom}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Nom de l'article <span className="text-red-500">*</span></label>
                                    <input type="text" value={data.nom_article} onChange={(e) => setData('nom_article', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Référence <span className="text-red-500">*</span></label>
                                    <input type="text" value={data.reference} onChange={(e) => setData('reference', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Montant (DH) <span className="text-red-500">*</span></label>
                                    <input type="number" step="0.01" value={data.montant} onChange={(e) => setData('montant', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Date d'achat <span className="text-red-500">*</span></label>
                                    <input type="date" value={data.date_achat} onChange={(e) => setData('date_achat', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Mode de paiement <span className="text-red-500">*</span></label>
                                <select
                                    value={data.mode_paiement}
                                    onChange={(e) => setData('mode_paiement', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    required
                                >
                                    <option value="">Sélectionnez un mode</option>
                                    <option value="Espèces">Espèces</option>
                                    <option value="Chèque">Chèque</option>
                                    <option value="Virement">Virement</option>
                                    <option value="Carte Bancaire">Carte Bancaire</option>
                                </select>
                                {errors.mode_paiement && <div className="text-red-500 text-xs mt-1">{errors.mode_paiement}</div>}
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <Link href={route('achats.index')} className="text-sm text-gray-600 " style={{marginRight: '20px'}}>Annuler</Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                                >
                                    {processing ? 'En cours...' : (
                                        <>
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                            Enregistrer
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}