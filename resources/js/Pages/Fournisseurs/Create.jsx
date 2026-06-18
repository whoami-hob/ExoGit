import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        nom: '',
        email: '',
        telephone: '',
        adresse: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('fournisseurs.store'));
    };

    return (
        <AuthenticatedLayout auth={auth} user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Ajouter un Fournisseur</h2>}>
            <Head title="Ajouter Fournisseur" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={submit} className="bg-white p-6 shadow sm:rounded-lg">
                        <div className="mb-4">
                            <label className="block text-gray-700">Nom et Prénom     <span style={{color: 'red'}}>*</span></label>
                            <input type="text" className="w-full border-gray-300 rounded-md" value={data.nom} onChange={e => setData('nom', e.target.value)} required />
                            {errors.nom && <p className="text-red-500 text-sm">{errors.nom}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email    <span style={{color: 'red'}}>*</span></label>
                            <input type="email" className="w-full border-gray-300 rounded-md" value={data.email} onChange={e => setData('email', e.target.value)} required />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Téléphone    <span style={{color: 'red'}}>*</span></label>
                            <input type="text" className="w-full border-gray-300 rounded-md" value={data.telephone} onChange={e => setData('telephone', e.target.value)} required maxLength={10} />
                            {errors.telephone && <p className="text-red-500 text-sm">{errors.telephone}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Adresse      <span style={{color: 'red'}}>*</span></label>
                            <textarea className="w-full border-gray-300 rounded-md" value={data.adresse} onChange={e => setData('adresse', e.target.value)} required />
                        </div>
                        <div className="text-right">
                            <Link href={route('fournisseurs.index')} className="ml-4 bg-white-600 text-gray px-4 py-2 rounded "style={{marginRight:'20px'}} >Annuler</Link>
                            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={processing}>Enregistrer</button>
                        </div>
                        <span style={{color: 'red'}}>*</span> Champs obligatoires.
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}