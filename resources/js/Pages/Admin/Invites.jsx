import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import AgeVerificationModal from '../../Components/AgeVerificationModal';
import { ShieldCheck, Plus, Copy, Check, KeyRound } from 'lucide-react';

export default function AdminInvites({ invites }) {
    const { post, processing } = useForm();
    const [copiedCode, setCopiedCode] = React.useState(null);

    const handleGenerate = (e) => {
        e.preventDefault();
        post(route('admin.invites.store'));
    };

    const copyInviteUrl = (code) => {
        const url = `${window.location.origin}/invite/${code}`;
        navigator.clipboard.writeText(url);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-slate-100 flex flex-col font-sans">
            <Head title="Concierge Admin — Bordeux AI Invites" />
            <AgeVerificationModal />
            <Navbar />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4a0e17] to-[#160609] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
                            <KeyRound className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="font-serif-luxury text-3xl font-bold text-white tracking-tight">VIP Invitation Manager</h1>
                            <p className="text-xs text-slate-400">Generate and manage single-use invitation tokens for high-ticket clients</p>
                        </div>
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={processing}
                        className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#4a0e17] to-[#6b1422] text-[#f3cf65] text-xs font-bold uppercase tracking-wider border border-[#d4af37]/40 hover:border-[#d4af37] shadow-lg transition flex items-center space-x-2"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Generate VIP Invite Code</span>
                    </button>
                </div>

                <div className="glass-panel p-8 rounded-3xl border border-[#d4af37]/20 space-y-6">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-slate-300 border-collapse">
                            <thead>
                                <tr className="border-b border-[#d4af37]/20 text-slate-400 uppercase tracking-wider text-[10px]">
                                    <th className="py-3 px-4">Invite Token</th>
                                    <th className="py-3 px-4">Status</th>
                                    <th className="py-3 px-4">Expires At</th>
                                    <th className="py-3 px-4">Used By User</th>
                                    <th className="py-3 px-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {invites.map((inv) => (
                                    <tr key={inv.id} className="hover:bg-[#120d12]/50 transition">
                                        <td className="py-4 px-4 font-mono font-bold text-[#f3cf65]">
                                            {inv.code}
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`px-2.5 py-1 rounded text-[10px] uppercase font-bold tracking-wider ${
                                                inv.is_used
                                                    ? 'bg-rose-950/60 text-rose-300 border border-rose-800'
                                                    : 'bg-emerald-950/60 text-emerald-300 border border-emerald-800'
                                            }`}>
                                                {inv.is_used ? 'Used' : 'Available'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-slate-400">
                                            {inv.expires_at ? new Date(inv.expires_at).toLocaleDateString() : 'Never'}
                                        </td>
                                        <td className="py-4 px-4">
                                            {inv.recipient ? inv.recipient.name : '—'}
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            {!inv.is_used && (
                                                <button
                                                    onClick={() => copyInviteUrl(inv.code)}
                                                    className="px-3 py-1.5 rounded bg-[#4a0e17] text-[#f3cf65] hover:bg-[#6b1422] border border-[#d4af37]/30 transition inline-flex items-center space-x-1"
                                                >
                                                    {copiedCode === inv.code ? (
                                                        <>
                                                            <Check className="w-3.5 h-3.5" />
                                                            <span>Copied</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Copy className="w-3.5 h-3.5" />
                                                            <span>Copy Link</span>
                                                        </>
                                                    )}
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
