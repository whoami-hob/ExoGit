import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ auth, clients, products }) {
    const { data, setData, post, processing, errors } = useForm({
        client_id: '',
        devis_date: new Date().toISOString().split('T')[0], 
        items: [] 
    });

    const [totals, setTotals] = useState({ ht: 0, tva: 0, ttc: 0 });

    const addItemRow = () => {
        setData('items', [
            ...data.items,
            { product_id: '', quantity: 1, unit_price: 0, total: 0 }
        ]);
    };

    // حذف سطر منتج معين
    const removeItemRow = (index) => {
        const updatedItems = data.items.filter((_, i) => i !== index);
        setData('items', updatedItems);
    };

    const handleItemChange = (index, field, value) => {
        const updatedItems = [...data.items];
        updatedItems[index][field] = value;

        if (field === 'product_id') {
            const selectedProd = products.find(p => p.id == value);
            if (selectedProd) {
                updatedItems[index]['unit_price'] = selectedProd.price;
            }
        }

        const qty = parseFloat(updatedItems[index]['quantity']) || 0;
        const price = parseFloat(updatedItems[index]['unit_price']) || 0;
        updatedItems[index]['total'] = (qty * price).toFixed(2);

        setData('items', updatedItems);
    };

    useEffect(() => {
        let totalHT = 0;
        data.items.forEach(item => {
            totalHT += parseFloat(item.total) || 0;
        });
        const calculatedTVA = totalHT * 0.20; 
        const totalTTC = totalHT + calculatedTVA;

        setTotals({
            ht: totalHT.toFixed(2),
            tva: calculatedTVA.toFixed(2),
            ttc: totalTTC.toFixed(2)
        });
    }, [data.items]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('devis.store'));
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Nouveau Devis - EXOGIT</h2>}
        >
            <Head title="Créer un Devis" />

            <div className="py-12">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit} className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 space-y-6">
                        
                        <div className="flex justify-between items-center border-b pb-4">
                            <h3 className="text-lg font-bold text-gray-700">Création d'un devis commercial</h3>
                            <Link href={route('devis.index')} className="text-sm text-gray-600 hover:underline">← Retour</Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Sélectionner un Client *</label>
                                <select
                                    value={data.client_id}
                                    onChange={e => setData('client_id', e.target.value)}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <option value="">-- Choisir un client --</option>
                                    {clients.map(client => (
                                        <option key={client.id} value={client.id}>{client.name}</option>
                                    ))}
                                </select>
                                {errors.client_id && <p className="text-red-500 text-xs mt-1">{errors.client_id}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date du Devis *</label>
                                <input
                                    type="date"
                                    value={data.devis_date}
                                    onChange={e => setData('devis_date', e.target.value)}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                                {errors.devis_date && <p className="text-red-500 text-xs mt-1">{errors.devis_date}</p>}
                            </div>
                        </div>

                        <div className="border-t pt-6 mt-6">
                            <div className="flex flex-row justify-between items-center mb-4 bg-gray-50 p-3 rounded-lg border">
                                <h4 className="text-md font-bold text-gray-800">Articles / Services</h4>
                                <button
                                    type="button"
                                    onClick={addItemRow}
                                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md font-bold shadow-sm transition duration-150 block"
                                >
                                    + Ajouter une ligne 
                                </button>
                            </div>

                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Produit/Service</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 w-24">Quantité</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 w-36">Prix Unit. (HT)</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 w-32">Total Line</th>
                                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 w-16">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {data.items.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-4 py-4 text-center text-sm text-gray-400 italic">
                                                Cliquez sur "Ajouter une ligne" pour insérer des articles.
                                            </td>
                                        </tr>
                                    ) : (
                                        data.items.map((item, index) => (
                                            <tr key={index}>
                                                <td className="p-2">
                                                    <select
                                                        value={item.product_id}
                                                        onChange={e => handleItemChange(index, 'product_id', e.target.value)}
                                                        className="w-full border-gray-300 rounded-md text-sm"
                                                    >
                                                        <option value="">-- Choisir --</option>
                                                        {products.map(p => (
                                                            <option key={p.id} value={p.id}>{p.name}</option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td className="p-2">
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={item.quantity}
                                                        onChange={e => handleItemChange(index, 'quantity', e.target.value)}
                                                        className="w-full border-gray-300 rounded-md text-sm"
                                                    />
                                                </td>
                                                <td className="p-2">
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        value={item.unit_price}
                                                        onChange={e => handleItemChange(index, 'unit_price', e.target.value)}
                                                        className="w-full border-gray-300 rounded-md text-sm"
                                                    />
                                                </td>
                                                <td className="p-2 text-sm font-semibold text-gray-700 py-4">
                                                    {item.total} DH
                                                </td>
                                                <td className="p-2 text-center">
                                                    <button
                                                        type="button"
                                                        onClick={() => removeItemRow(index)}
                                                        className="text-red-500 hover:text-red-700 font-bold"
                                                    >
                                                        ✕
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex justify-end border-t pt-4">
                            <div className="w-64 space-y-2 text-sm">
                                <div className="flex justify-between text-gray-600">
                                    <span>Total Global (HT) :</span>
                                    <span>{totals.ht} DH</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>TVA (20%) :</span>
                                    <span>{totals.tva} DH</span>
                                </div>
                                <div className="flex justify-between text-md font-bold text-gray-800 border-t pt-2">
                                    <span>Total (TTC) :</span>
                                    <span>{totals.ttc} DH</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 border-t pt-4">
                            <Link href={route('devis.index')} className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50" style={{marginRight:'20px'}}>
                                Annuler
                            </Link>
                            <button
                                type="submit"
                                disabled={processing || data.items.length === 0}
                                className="px-4 py-2 bg-blue-700 hover:bg-blue-700 text-white rounded-md font-bold transition disabled:opacity-50"
                            >
                                {processing ? 'Enregistrement...' : 'Enregistrer le Devis'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}