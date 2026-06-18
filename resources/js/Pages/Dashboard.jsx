import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, totalClients, totalProducts, totalDevis, totalRevenueHT, totalRevenueTTC, recentDevis, totalFactures }) {

    const stats = [
        { title: 'Total Clients', value: totalClients, icon: '👤', link: 'clients.index', color: 'blue' },
        { title: 'Produits', value: totalProducts, icon: '📦', link: 'products.index', color: 'indigo' },
        { title: 'Devis', value: totalDevis, icon: '📄', link: 'devis.index', color: 'purple' },
        { 
            title: auth.user.role === 'admin' ? 'Chiffre TTC' : 'Total Factures', 
            value: auth.user.role === 'admin' ? `${totalRevenueTTC.toLocaleString('fr-FR')} DH` : totalFactures, 
            icon: auth.user.role === 'admin' ? '💰' : '📑', 
            link: 'factures.index', 
            color: 'emerald' 
        },
    ];

    return (
        <AuthenticatedLayout
            auth={auth}
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-gray-900 leading-tight tracking-tight">Tableau de Bord - <span className="font-bold" style={{ color: '#0033FF' }}>EXOGIT</span></h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12 bg-gray-50/50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Welcome Section */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-gray-200 p-8 rounded-2xl shadow-sm">
                        <div>
                            <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                                Bienvenue, {auth.user.name} 
                            </h3>
                            <p className="text-gray-500 mt-1">
                                Voici un aperçu rapide de l'activité commerciale d'EXOGIT aujourd'hui.
                            </p>
                        </div>
                        <div className="px-4 py-2 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-600 font-medium">
                           <span className="font-bold" style={{ color: '#0033FF' }}>{new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((item, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.title}</p>
                                        <p className="text-2xl font-extrabold text-gray-900 mt-2">{item.value}</p>
                                    </div>
                                    <div className={`p-2 bg-${item.color}-50 rounded-lg text-${item.color}-600`}>
                                        {item.icon}
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <Link href={route(item.link)} className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                                        Gérer <span>→</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Recent Devis Table */}
                    <div className="bg-white shadow-sm rounded-2xl border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
                            <h3 className="text-lg font-bold text-gray-800">Derniers Devis Émis</h3>
                            <Link href={route('devis.index')} className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                                Voir tout →
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                                        <th className="px-6 py-3">N° Devis</th>
                                        <th className="px-6 py-3">Client</th>
                                        <th className="px-6 py-3">Date</th>
                                        <th className="px-6 py-3">Statut</th>
                                        <th className="px-6 py-3 text-right">Montant TTC</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                                    {recentDevis.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-8 text-center text-gray-400 italic">Aucun devis créé pour le moment.</td>
                                        </tr>
                                    ) : (
                                        recentDevis.map((d) => (
                                            <tr key={d.id} className="hover:bg-gray-50/40 transition duration-150">
                                                <td className="px-6 py-4 font-semibold text-blue-600">
                                                    <Link href={`/devis/${d.id}/edit`}>{d.devis_number}</Link>
                                                </td>
                                                <td className="px-6 py-4 font-medium text-gray-900">{d.client?.name}</td>
                                                <td className="px-6 py-4 text-gray-500">{new Date(d.devis_date).toLocaleDateString('fr-FR')}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${d.status === 'Valide' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                                                        {d.status === 'Valide' ? 'Validé' : 'En attente'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right font-bold text-gray-900">
                                                    {d.total_ttc.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} DH
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}