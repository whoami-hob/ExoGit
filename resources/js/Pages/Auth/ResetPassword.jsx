import AuthLayout from '@/Layouts/AuthLayout';
import { Head, useForm } from '@inertiajs/react';
import { Lock, ArrowRight } from 'lucide-react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Réinitialiser le mot de passe">
            <h2 className="text-center text-2xl font-bold tracking-tight text-white mb-6">
                Nouveau mot de passe
            </h2>

            <form onSubmit={submit} className="space-y-6">
                {/* Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-300">Nouveau mot de passe</label>
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

                {/* Confirm Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-300">Confirmer le mot de passe</label>
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

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full flex justify-center items-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all disabled:opacity-70"
                >
                    {processing ? 'Réinitialisation...' : <>Réinitialiser <ArrowRight className="h-4 w-4" /></>}
                </button>
            </form>
        </AuthLayout>
    );
}