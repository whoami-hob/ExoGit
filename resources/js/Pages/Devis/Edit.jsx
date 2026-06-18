import React, { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ auth, devis, clients, products }) {
    
   const { data, setData, put, processing, errors } = useForm({
        client_id: devis.client_id || '',
        devis_date: devis.devis_date || '',
        items: devis.items_formatted || [] 
    });

    const addLine = () => {
        setData('items', [
            ...data.items, 
            { product_id: '', quantity: 1, unit_price: 0 }
        ]);
    };

    const removeLine = (index) => {
        const newItems = data.items.filter((_, i) => i !== index);
        setData('items', newItems);
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...data.items];
        newItems[index][field] = value;

        if (field === 'product_id') {
            const selectedProd = products.find(p => p.id == value);
            if (selectedProd) {
                newItems[index]['unit_price'] = selectedProd.price || 0;
            }
        }
        setData('items', newItems);
    };

    const calculateTotals = () => {
        let totalHT = 0;
        data.items.forEach(item => {
            totalHT += (item.quantity || 0) * (item.unit_price || 0);
        });
        const tva = totalHT * 0.20;
        const totalTTC = totalHT + tva;
        return { totalHT, tva, totalTTC };
    };

    const { totalHT, tva, totalTTC } = calculateTotals();

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/devis/${devis.id}`);
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Modifier Le Devis <span className="text-blue-600">{devis.devis_number}</span></h2>}
        >
            <Head title="Modifier le Devis" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Sélectionner un Client *</label>
                                    <select
                                        value={data.client_id}
                                        onChange={e => setData('client_id', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                                    >
                                        <option value="">-- Choisir un client --</option>
                                        {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                    {errors.client_id && <p className="text-red-500 text-xs mt-1">{errors.client_id}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Date du Devis *</label>
                                    <input
                                        type="date"
                                        value={data.devis_date}
                                        onChange={e => setData('devis_date', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                                    />
                                    {errors.devis_date && <p className="text-red-500 text-xs mt-1">{errors.devis_date}</p>}
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="text-md font-bold text-gray-700">Articles / Services</h4>
                                    <button
                                        type="button"
                                        onClick={addLine}
                                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-1.5 px-3 rounded shadow transition duration-150"
                                    >
                                        + Ajouter une ligne
                                    </button>
                                </div>

                                <div className="space-y-2">
                                    {data.items.length > 0 && (
                                        <div className="hidden md:grid grid-cols-12 gap-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                            <div className="col-span-5">Produit / Service</div>
                                            <div className="col-span-2">Quantité</div>
                                            <div className="col-span-2">Prix Unit. (HT)</div>
                                            <div className="col-span-2 text-right">Total HT</div>
                                            <div className="col-span-1 text-center">Action</div>
                                        </div>
                                    )}

                                    {data.items.map((item, index) => (
                                        <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200 shadow-sm items-center">
                                            
                                            <div className="col-span-1 md:col-span-5">
                                                <label className="block text-xs font-medium text-gray-400 md:hidden mb-1">Produit / Service</label>
                                                <select
                                                    value={item.product_id}
                                                    onChange={e => handleItemChange(index, 'product_id', e.target.value)}
                                                    className="w-full rounded-md border-gray-300 shadow-sm text-sm focus:border-blue-500 focus:ring-blue-500"
                                                >
                                                    <option value="">-- Choisir --</option>
                                                    {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                                </select>
                                            </div>

                                            <div className="col-span-1 md:col-span-2">
                                                <label className="block text-xs font-medium text-gray-400 md:hidden mb-1">Quantité</label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={item.quantity}
                                                    onChange={e => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                                                    className="w-full rounded-md border-gray-300 shadow-sm text-sm focus:border-blue-500 focus:ring-blue-500"
                                                    placeholder="Qté"
                                                />
                                            </div>

                                            <div className="col-span-1 md:col-span-2">
                                                <label className="block text-xs font-medium text-gray-400 md:hidden mb-1">Prix Unit. (HT)</label>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    value={item.unit_price}
                                                    onChange={e => handleItemChange(index, 'unit_price', parseFloat(e.target.value) || 0)}
                                                    className="w-full rounded-md border-gray-300 shadow-sm text-sm focus:border-blue-500 focus:ring-blue-500"
                                                    placeholder="Prix Unitaire"
                                                />
                                            </div>

                                            <div className="col-span-1 md:col-span-2 text-left md:text-right font-semibold text-gray-700 px-1 text-sm bg-gray-100 md:bg-transparent p-2 md:p-0 rounded">
                                                <span className="inline md:hidden text-xs font-medium text-gray-400 mr-2">Total: </span>
                                                {((item.quantity || 0) * (item.unit_price || 0)).toFixed(2)} DH
                                            </div>

                                            <div className="col-span-1 md:col-span-1 text-center">
                                                <button
                                                    type="button"
                                                    onClick={() => removeLine(index)}
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded-md transition font-bold text-xl md:text-lg w-full md:w-auto"
                                                    title="Supprimer la ligne"
                                                >
                                                    &times;
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t pt-4 flex flex-col items-end space-y-2 text-sm text-gray-600">
                                <div>Total Global (HT) : <strong className="text-gray-900">{totalHT.toFixed(2)} DH</strong></div>
                                <div>TVA (20%) : <strong className="text-gray-900">{tva.toFixed(2)} DH</strong></div>
                                <div className="text-base font-bold text-gray-900 bg-gray-100 p-2 rounded">Total (TTC) : {totalTTC.toFixed(2)} DH</div>
                            </div>

                            <div className="flex justify-end space-x-3 border-t pt-4">
                                <Link href="/devis" className="px-4 py-2 border rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50 transition">
                                    Annuler
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-bold shadow-sm transition"
                                >
                                    {processing ? 'Enregistrement...' : 'Enregistrer les modifications'}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}