import AuthLayout from '@/Layouts/AuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Inscription">
            <h2 className="text-center text-2xl font-bold tracking-tight text-white mb-6">
                Créez votre compte
            </h2>

            <form onSubmit={submit} className="space-y-5">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-300">Nom complet</label>
                    <div className="mt-2 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                            type="text"
                            required
                            className="block w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-800/50 border-white/10 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20"
                            placeholder="Nom Prénom"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                    </div>
                    {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-300">Adresse email</label>
                    <div className="mt-2 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                            type="email"
                            required
                            className="block w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-800/50 border-white/10 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20"
                            placeholder="vous@exemple.com"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                    </div>
                    {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email}</p>}
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-300">Mot de passe</label>
                    <div className="mt-2 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                            type="password"
                            required
                            className="block w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-800/50 border-white/10 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20"
                            placeholder="••••••••"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                        />
                    </div>
                    {errors.password && <p className="mt-2 text-sm text-red-400">{errors.password}</p>}
                </div>

                {/* Password Confirmation */}
                <div>
                    <label className="block text-sm font-medium text-gray-300">Confirmer mot de passe</label>
                    <div className="mt-2 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                            type="password"
                            required
                            className="block w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-800/50 border-white/10 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20"
                            placeholder="••••••••"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                        />
                    </div>
                    {errors.password_confirmation && <p className="mt-2 text-sm text-red-400">{errors.password_confirmation}</p>}
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full flex justify-center items-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all disabled:opacity-70"
                    >
                        {processing ? 'Création...' : <>S'inscrire <ArrowRight className="h-4 w-4" /></>}
                    </button>
                </div>

                <p className="text-center text-sm text-gray-400 mt-4">
                    Déjà inscrit ?{' '}
                    <Link href={route('login')} className="text-blue-400 font-semibold hover:text-blue-300">
                        Connectez-vous
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}