import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import AgeVerificationModal from '../../Components/AgeVerificationModal';
import { KeyRound, ShieldCheck, UserCheck } from 'lucide-react';

export default function RegisterWithInvite({ code }) {
    const { data, setData, post, processing, errors } = useForm({
        invite_code: code,
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        telegram_username: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('invite.register'));
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-slate-100 flex flex-col">
            <Head title="Claim Invitation — Bordeux AI Private Club" />
            <AgeVerificationModal />
            <Navbar />

            <div className="max-w-md mx-auto px-4 py-12 flex-1 w-full space-y-8">
                <div className="text-center space-y-3">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#4a0e17] text-[#f3cf65] text-xs font-bold uppercase tracking-widest border border-[#d4af37]/30">
                        <KeyRound className="w-4 h-4 text-[#d4af37]" />
                        <span>Verified Invitation Token</span>
                    </div>
                    <h1 className="font-serif-luxury text-3xl font-bold text-white tracking-tight">
                        Claim Private Access
                    </h1>
                    <p className="text-xs text-slate-400 font-mono">Invite Code: {code}</p>
                </div>

                <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-3xl border border-[#d4af37]/20 space-y-5 text-xs">
                    <div>
                        <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Full Name *</label>
                        <input
                            type="text"
                            required
                            maxLength={200}
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 rounded-xl p-3 text-white focus:outline-none focus:border-[#d4af37]"
                        />
                        {errors.name && <p className="text-rose-400 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Email Address *</label>
                        <input
                            type="email"
                            required
                            maxLength={200}
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 rounded-xl p-3 text-white focus:outline-none focus:border-[#d4af37]"
                        />
                        {errors.email && <p className="text-rose-400 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Password *</label>
                        <input
                            type="password"
                            required
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 rounded-xl p-3 text-white focus:outline-none focus:border-[#d4af37]"
                        />
                        {errors.password && <p className="text-rose-400 mt-1">{errors.password}</p>}
                    </div>

                    <div>
                        <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Confirm Password *</label>
                        <input
                            type="password"
                            required
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 rounded-xl p-3 text-white focus:outline-none focus:border-[#d4af37]"
                        />
                    </div>

                    <div>
                        <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Telegram Username (@username)</label>
                        <input
                            type="text"
                            maxLength={200}
                            value={data.telegram_username}
                            onChange={(e) => setData('telegram_username', e.target.value)}
                            placeholder="@username"
                            className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 rounded-xl p-3 text-white focus:outline-none focus:border-[#d4af37]"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#4a0e17] to-[#6b1422] text-[#f3cf65] font-bold text-xs uppercase tracking-widest border border-[#d4af37]/50 hover:border-[#d4af37] shadow-lg transition flex items-center justify-center space-x-2"
                    >
                        <UserCheck className="w-4 h-4" />
                        <span>Activate Membership Account</span>
                    </button>
                </form>
            </div>
        </div>
    );
}
