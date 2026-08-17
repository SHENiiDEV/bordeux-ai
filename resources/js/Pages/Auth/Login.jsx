import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import AgeVerificationModal from '../../Components/AgeVerificationModal';
import { Lock, LogIn } from 'lucide-react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-slate-100 flex flex-col">
            <Head title="VIP Member Login — Bordeux AI" />
            <AgeVerificationModal />
            <Navbar />

            <div className="max-w-md mx-auto px-4 py-16 flex-1 w-full space-y-8">
                <div className="text-center space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#4a0e17] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] mx-auto">
                        <Lock className="w-6 h-6" />
                    </div>
                    <h1 className="font-serif-luxury text-3xl font-bold text-white tracking-tight">VIP Member Sign In</h1>
                    <p className="text-xs text-slate-400">Access your private cellar & sommelier concierge</p>
                </div>

                <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-3xl border border-[#d4af37]/20 space-y-5 text-xs">
                    <div>
                        <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Email Address</label>
                        <input
                            type="email"
                            required
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 rounded-xl p-3.5 text-white focus:outline-none focus:border-[#d4af37]"
                        />
                        {errors.email && <p className="text-rose-400 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Password</label>
                        <input
                            type="password"
                            required
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 rounded-xl p-3.5 text-white focus:outline-none focus:border-[#d4af37]"
                        />
                        {errors.password && <p className="text-rose-400 mt-1">{errors.password}</p>}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <label className="flex items-center space-x-2 text-slate-400 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="rounded bg-[#0a0a0a] border-slate-700 text-[#4a0e17] focus:ring-0"
                            />
                            <span>Remember session</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#4a0e17] to-[#6b1422] text-[#f3cf65] font-bold text-xs uppercase tracking-widest border border-[#d4af37]/50 hover:border-[#d4af37] shadow-lg transition flex items-center justify-center space-x-2"
                    >
                        <LogIn className="w-4 h-4" />
                        <span>Sign In to Vault</span>
                    </button>
                </form>
            </div>
        </div>
    );
}
