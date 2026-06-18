import { Head } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function AuthLayout({ children, title }) {
    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-950 via-gray-900 to-black flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
            <Head title={title} />
            
            <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center mb-8">
                <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-900/50">
                    <ApplicationLogo className="h-8 w-8 fill-white text-white" />
                </div>
                <h2 className="mt-4 text-center text-3xl font-black text-white tracking-tight">EXOGIT</h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[420px]">
                <div className="bg-slate-900/60 backdrop-blur-xl py-8 px-4 sm:px-10 shadow-2xl shadow-black/50 sm:rounded-2xl border border-white/10">
                    {children}
                </div>
            </div>
        </div>
    );
}