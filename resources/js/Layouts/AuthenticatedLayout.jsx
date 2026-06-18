import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import {
    LayoutDashboard,
    Users,
    Package,
    FileText,
    FileSpreadsheet,
    Truck,
    ShoppingCart,
    Menu,
    X,
    LogOut,
    User as UserIcon,
    Trash2
} from 'lucide-react';

export default function AuthenticatedLayout({ auth, header, children }) {
    const user = auth?.user || usePage().props.auth?.user;
    const { flash } = usePage().props;

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [toast, setToast] = useState({ message: '', type: '' });
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (flash?.success) {
            setToast({ message: flash.success, type: 'success' });
            setShowToast(true);
            const timer = setTimeout(() => setShowToast(false), 4000);
            return () => clearTimeout(timer);
        } else if (flash?.error) {
            setToast({ message: flash.error, type: 'error' });
            setShowToast(true);
            const timer = setTimeout(() => setShowToast(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    const navigation = [
        { name: 'Dashboard', href: route('dashboard'), active: route().current('dashboard'), icon: LayoutDashboard },
        { name: 'Clients', href: route('clients.index'), active: route().current('clients.*'), icon: Users },
        { name: 'Produits', href: route('products.index'), active: route().current('products.*'), icon: Package },
        { name: 'Devis', href: route('devis.index'), active: route().current('devis.*'), icon: FileText },
        { name: 'Factures', href: route('factures.index'), active: route().current('factures.*'), icon: FileSpreadsheet },
    ];

    if (user?.role === 'admin') {
        navigation.push(
            { name: 'Fournisseurs', href: route('fournisseurs.index'), active: route().current('fournisseurs.*'), icon: Truck },
            { name: 'Achats', href: route('achats.index'), active: route().current('achats.*'), icon: ShoppingCart }
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar (Desktop) */}
            <div className="hidden md:flex flex-col w-64 bg-slate-900 shadow-xl fixed h-full z-20">
                <div className="flex items-center justify-center h-16 bg-slate-950/50">
                    <Link href="/">
                        <div className="flex items-center gap-2">
                            <ApplicationLogo className="block h-8 w-auto fill-white text-white" />
                            <span className="text-white font-bold text-xl tracking-wider">EXOGIT</span>
                        </div>
                    </Link>
                </div>

                <div className="flex-1 overflow-y-auto py-4 flex flex-col">
                    <nav className="px-3 space-y-1">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`
                                            group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                                            ${item.active
                                            ? 'bg-blue-600 text-white shadow-md'
                                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'}
                                        `}
                                >
                                    <Icon className={`mr-3 h-5 w-5 flex-shrink-0 ${item.active ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="mt-auto border-t border-slate-800 p-4 bg-slate-950/30">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-lg">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-medium text-white truncate">{user.name}</p>
                                <p className="text-xs text-blue-400 font-semibold uppercase">{user.role}</p>
                            </div>
                        </div>
                        <Link 
                            href={route('logout')} 
                            method="post" 
                            as="button"
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-red-900/30 hover:text-red-400 transition"
                        >
                            <LogOut className="w-4 h-4" />
                            Déconnexion
                        </Link>
                        <p className="mt-4 text-[10px] text-slate-500 text-center">
                            © {new Date().getFullYear()} EXOGIT. Tous droits réservés.
                        </p>
                    </div>
                </div>
            </div>


            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 flex md:hidden">
                    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}></div>
                    <div className="relative flex-1 flex flex-col max-w-xs w-full bg-slate-900 shadow-2xl">
                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                            <button
                                type="button"
                                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                onClick={() => setSidebarOpen(false)}
                            >
                                <span className="sr-only">Close sidebar</span>
                                <X className="h-6 w-6 text-white" aria-hidden="true" />
                            </button>
                        </div>

                        <div className="flex items-center justify-center h-16 bg-slate-950/50">
                            <Link href="/">
                                <div className="flex items-center gap-2">
                                    <ApplicationLogo className="block h-8 w-auto fill-white text-white" />
                                    <span className="text-white font-bold text-xl tracking-wider">EXOGIT</span>
                                </div>
                            </Link>
                        </div>

                        <div className="mt-5 flex-1 h-0 overflow-y-auto">
                            <nav className="px-3 space-y-1">
                                {navigation.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setSidebarOpen(false)}
                                            className={`
                                                group flex items-center px-3 py-2.5 text-base font-medium rounded-lg
                                                ${item.active
                                                    ? 'bg-blue-600 text-white shadow-md'
                                                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'}
                                            `}
                                        >
                                            <Icon className={`mr-4 h-6 w-6 flex-shrink-0 ${item.active ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col md:pl-64 min-w-0 transition-all duration-300">

                {/* Header */}
                <header className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow-sm border-b border-gray-200">
                    <button
                        type="button"
                        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden hover:bg-gray-50"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Menu className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <div className="flex-1 px-4 flex justify-between items-center sm:px-6 lg:px-8">
                        <div className="flex-1 flex">
                            {/* Optionnel: Barre de recherche globale ici */}
                        </div>
                        <div className="ml-4 flex items-center md:ml-6">

                            {/* Profile dropdown */}
                            {user && (
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition px-3 py-1.5 border border-gray-200 hover:bg-gray-50">
                                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold mr-2">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="hidden sm:flex text-gray-700 font-medium mr-1">{user.name}</span>
                                            <svg className="ml-1 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content align="right" width="48">
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <p className="text-sm leading-5 text-gray-900 font-medium">{user.name}</p>
                                            <p className="text-xs leading-5 text-gray-500 truncate">{user.email}</p>
                                        </div>
                                        <Dropdown.Link href={route('profile.edit')} className="flex items-center gap-2">
                                            <UserIcon className="w-4 h-4" /> Profil
                                        </Dropdown.Link>

                                        {user.role === 'admin' && (
                                            <>
                                                <Dropdown.Link href={route('users.index')} className="flex items-center gap-2">
                                                    <Users className="w-4 h-4" /> Utilisateurs
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('factures.trashed')} className="flex items-center gap-2 text-amber-600">
                                                    <Trash2 className="w-4 h-4" /> Corbeille Factures
                                                </Dropdown.Link>
                                            </>
                                        )}

                                        
                                    </Dropdown.Content>
                                </Dropdown>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 pb-12">
                    {/* Header Slot (Title) */}
                    {header && (
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
                            {header}
                        </div>
                    )}

                    {/* Main Children */}
                    {children}
                </main>

            </div>

            {/* Toast Notifications */}
            {showToast && (
                <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full bg-white rounded-xl shadow-2xl border border-gray-100 p-4 flex items-start space-x-3 transition duration-300 animate-in slide-in-from-bottom-5">
                    {toast.type === 'success' ? (
                        <div className="p-1.5 bg-green-50 text-green-600 rounded-lg"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg></div>
                    ) : (
                        <div className="p-1.5 bg-red-50 text-red-600 rounded-lg"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg></div>
                    )}
                    <div className="flex-1 pt-0.5">
                        <p className="text-sm font-semibold text-gray-900">{toast.type === 'success' ? 'Succès !' : 'Erreur !'}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{toast.message}</p>
                    </div>
                </div>
            )}
        </div>
    );
}