import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import AgeVerificationModal from '../../Components/AgeVerificationModal';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function InvalidInvite({ message }) {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-slate-100 flex flex-col">
            <Head title="Invalid Invitation Code — Bordeux AI" />
            <AgeVerificationModal />
            <Navbar />

            <div className="max-w-md mx-auto px-4 py-16 flex-1 w-full flex items-center justify-center">
                <div className="glass-panel-burgundy p-8 rounded-3xl border border-rose-900/40 text-center space-y-6">
                    <div className="w-16 h-16 rounded-full bg-rose-950/60 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto">
                        <ShieldAlert className="w-8 h-8" />
                    </div>

                    <div>
                        <h1 className="font-serif-luxury text-2xl font-bold text-white">Invalid Invitation Code</h1>
                        <p className="text-xs text-slate-300 mt-2">{message}</p>
                    </div>

                    <div className="pt-2">
                        <Link
                            href={route('membership.apply')}
                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#4a0e17] to-[#6b1422] text-[#f3cf65] font-bold text-xs uppercase tracking-wider border border-[#d4af37]/40 inline-flex items-center space-x-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Apply for Membership</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
