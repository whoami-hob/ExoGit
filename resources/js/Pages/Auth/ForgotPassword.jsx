import AuthLayout from '@/Layouts/AuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, ArrowRight } from 'lucide-react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <AuthLayout title="Mot de passe oublié">
            <h2 className="text-center text-2xl font-bold tracking-tight text-white mb-4">
                Mot de passe oublié ?
            </h2>
            
            <p className="text-sm text-gray-400 text-center mb-8">
                Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
            </p>

            {status && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-900/30 border border-emerald-800 text-emerald-300 text-sm">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">Adresse email</label>
                    <div className="mt-2 relative rounded-xl shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                            id="email"
                            type="email"
                            required
                            className="block w-full pl-10 pr-3 py-2.5 sm:text-sm rounded-xl transition-colors bg-slate-800/50 border-white/10 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20"
                            placeholder="vous@exemple.com"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                    </div>
                    {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email}</p>}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full flex justify-center items-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all disabled:opacity-70"
                >
                    {processing ? 'Envoi...' : <>Envoyer le lien <ArrowRight className="h-4 w-4" /></>}
                </button>

                <p className="mt-6 text-center">
                    <Link
                        href={route('login')}
                        className="font-medium text-blue-400 hover:text-blue-300 text-sm transition"
                    >
                        Retour à la connexion
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}