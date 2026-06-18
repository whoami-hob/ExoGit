import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';


export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        ice: '',
        email: '',
        phone: '',
        address: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('clients.store'));
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Ajouter un nouveau client</h2>}
        >
            <Head title="Ajouter un client" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-8">
                        <form onSubmit={submit} className="space-y-6">
                            
                            {/* Nom du client */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nom du client / société <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                                {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* ICE */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">ICE (Maroc) <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        value={data.ice}
                                        onChange={(e) => setData('ice', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        maxLength={15}
                                        required
                                    />
                                    {errors.ice && <div className="text-red-500 text-xs mt-1">{errors.ice}</div>}
                                </div>

                                {/* E-mail */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Adresse e-mail <span className="text-red-500">*</span></label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Numéro de téléphone <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    maxLength={10}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Adresse <span className="text-red-500">*</span></label>
                                <textarea
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    rows="3"
                                    required
                                ></textarea>
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <Link
                                    href={route('clients.index')}
                                    className="text-sm text-gray-600 underline hover:text-gray-900 ml-4"style={{ marginRight: '20px'}}
                                >
                                    Annuler
                                </Link>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition"
                                >
                                    {processing ? 'En cours...' : 'Enregistrer'}
                                </button>
                            </div>
                            <p><span className="text-red-500">*</span>  :  champs obligatoires</p>
                        </form>
                    </div>
                </div>
            </div>
            
        </AuthenticatedLayout>
    );
}