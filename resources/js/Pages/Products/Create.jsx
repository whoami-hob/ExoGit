import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ auth }) {
    // تجهيز صندوق الاستمارة (Form) والبيانات الافتراضية
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        price: '',
    });

    // دالة إرسال البيانات عند الضغط على الحفظ
    const handleSubmit = (e) => {
        e.preventDefault();
        // إرسال البيانات عبر دالة POST إلى المسار المسمى products.store
        post(route('products.store'));
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Ajouter un Produit / Service - EXOGIT</h2>}
        >
            <Head title="Ajouter un Produit" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-medium">Nouveau Produit ou Service</h3>
                            <Link href={route('products.index')} className="text-gray-600 hover:underline text-sm">
                                ← Retour à la liste
                            </Link>
                        </div>

                        {/* نموذج الإدخال Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            {/* حقل اسم المنتج */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nom du produit / service <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Ex: Maintenance Serveur, Licence Cloud..."
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            {/* حقل الوصف */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    rows="4"
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Détails sur le service ou produit..."
                                ></textarea>
                                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Prix unitaire (HT) en DH <span className="text-red-500">*</span></label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={data.price}
                                    onChange={e => setData('price', e.target.value)}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Ex: 1500.00"
                                />
                                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                            </div>

                            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                                <Link
                                    href={route('products.index')}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition"
                                >
                                    Annuler
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                                >
                                    {processing ? 'Enregistrement...' : 'Enregistrer'}
                                </button>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}