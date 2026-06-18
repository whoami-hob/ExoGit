import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ auth, fournisseur }) {
    const { data, setData, put, processing, errors } = useForm({
        nom: fournisseur.nom || '',
        email: fournisseur.email || '',
        telephone: fournisseur.telephone || '',
        adresse: fournisseur.adresse || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('fournisseurs.update', fournisseur.id));
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Modifier le Fournisseur : <span className="font-semibold" style={{ color: '#2d23e0' }}>{fournisseur.nom}</span></h2>}
        >
            <Head title="Modifier Fournisseur" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-8">
                        <form onSubmit={submit} className="space-y-6">
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nom et Prénom</label>
                                <input
                                    type="text"
                                    value={data.nom}
                                    onChange={(e) => setData('nom', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500"
                                    required
                                />
                                {errors.nom && <div className="text-red-500 text-xs mt-1">{errors.nom}</div>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Adresse e-mail</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    />
                                    {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Numéro de téléphone</label>
                                    <input
                                        type="text"
                                        value={data.telephone}
                                        onChange={(e) => setData('telephone', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        required maxLength={15}
                                    />
                                    {errors.telephone && <div className="text-red-500 text-xs mt-1">{errors.telephone}</div>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Adresse</label>
                                <textarea
                                    value={data.adresse}
                                    onChange={(e) => setData('adresse', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    rows="3"
                                ></textarea>
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <Link href={route('fournisseurs.index')} className="text-sm text-gray-600  hover:text-gray-900 ml-4" style={{marginRight: '20px'}}>
                                    Annuler
                                </Link>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition"
                                >
                                    {processing ? 'En cours...' : 'Mettre à jour'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}