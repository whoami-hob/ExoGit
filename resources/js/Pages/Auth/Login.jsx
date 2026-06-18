import { Head, Link, useForm } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-950 via-gray-900 to-black flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans selection:bg-blue-600 selection:text-white">
            <Head title="Connexion" />

            {/* Logo Area */}
            <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-900/50 group-hover:scale-105 transition-transform duration-300">
                        <ApplicationLogo className="h-8 w-8 fill-white text-white" />
                    </div>
                    <span className="text-3xl font-black tracking-tight text-white group-hover:text-blue-400 transition-colors">
                        EXOGIT
                    </span>
                </Link>
                <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-white">
                    Connectez-vous à votre compte
                </h2>
                <p className="mt-2 text-center text-sm text-gray-400">
                    Gérez votre activité commerciale en toute simplicité.
                </p>
            </div>

            {/* Login Card */}
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[420px]">
                <div className="bg-slate-900/60 backdrop-blur-xl py-8 px-4 sm:px-10 shadow-2xl shadow-black/50 sm:rounded-2xl border border-white/10">
                    
                    {status && (
                        <div className="mb-6 p-4 rounded-xl bg-emerald-900/30 border border-emerald-800 flex items-start">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-emerald-300">{status}</p>
                            </div>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={submit}>
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                Adresse email
                            </label>
                            <div className="mt-2 relative rounded-xl shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-500" aria-hidden="true" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className={`block w-full pl-10 pr-3 py-2.5 sm:text-sm rounded-xl transition-colors bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-offset-slate-900 ${
                                        errors.email
                                            ? 'border-red-500/50 text-red-200 placeholder-red-400/50 focus:border-red-500 focus:ring-red-500/20'
                                            : 'border-white/10 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20'
                                    }`}
                                    placeholder="vous@exemple.com"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-400 font-medium" id="email-error">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                    Mot de passe
                                </label>
                                {canResetPassword && (
                                    <div className="text-sm">
                                        <Link href={route('password.request')} className="font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                                            Mot de passe oublié ?
                                        </Link>
                                    </div>
                                )}
                            </div>
                            <div className="mt-2 relative rounded-xl shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-500" aria-hidden="true" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className={`block w-full pl-10 pr-3 py-2.5 sm:text-sm rounded-xl transition-colors bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-offset-slate-900 ${
                                        errors.password
                                            ? 'border-red-500/50 text-red-200 placeholder-red-400/50 focus:border-red-500 focus:ring-red-500/20'
                                            : 'border-white/10 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20'
                                    }`}
                                    placeholder="••••••••"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                            </div>
                            {errors.password && (
                                <p className="mt-2 text-sm text-red-400 font-medium" id="password-error">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center">
                            <input
                                id="remember"
                                name="remember"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500/30 border-white/20 bg-slate-800/50 rounded cursor-pointer transition-colors"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <label htmlFor="remember" className="ml-2 block text-sm text-gray-300 cursor-pointer select-none">
                                Se souvenir de moi
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="group relative w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 shadow-sm shadow-blue-600/30 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                            >
                                {processing ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Connexion en cours...
                                    </>
                                ) : (
                                    <>
                                        Se connecter
                                        <ArrowRight className="h-4 w-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
                
                {/* Footer Link (Optional, usually for SaaS) */}
                <p className="mt-8 text-center text-sm text-gray-500">
                    Un problème de connexion ?{' '}
                    <a href="mailto:[EMAIL_ADDRESS]" className="font-semibold text-gray-300 hover:text-white transition-colors">
                        Contactez le support technique
                    </a>
                </p>
            </div>
        </div>
    );
}
