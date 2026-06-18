import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ auth, user }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        role: user.role,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('users.update', user.id));
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Modifier l'utilisateur : <span className="font-semibold" style={{ color: '#2d23e0' }}>{user.name}</span></h2>}
        >
            <Head title="Modifier utilisateur" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-8 shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nom</label>
                                <input type="text" className="mt-1 block w-full border-gray-300 rounded-md" value={data.name} onChange={e => setData('name', e.target.value)} required />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" className="mt-1 block w-full border-gray-300 rounded-md" value={data.email} onChange={e => setData('email', e.target.value)} required />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Rôle</label>
                                <select className="mt-1 block w-full border-gray-300 rounded-md" value={data.role} onChange={e => setData('role', e.target.value)}>
                                    <option value="admin">Admin</option>
                                    <option value="commercial">Commercial</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-end space-x-4">
                                <Link href={route('users.index')} className="text-gray-600 hover:underline">Annuler</Link>
                                <button type="submit" disabled={processing} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50">
                                    Mettre à jour
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}