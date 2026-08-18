import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import AgeVerificationModal from '../../Components/AgeVerificationModal';
import { Lock, ShieldCheck, CheckCircle2, ArrowLeft, EyeOff } from 'lucide-react';

export default function PrivacyPolicy() {
    const sections = [
        {
            id: 'encryption',
            title: '1. AES-256 Encryption & Discretion Protocol',
            content: `Bordeux AI, operated by GREAT LEADERS LTD (Company No. 15954666), operates under strict high-society discretion standards. All personal taste profiles, cellar holdings, collection valuations, and transaction logs are encrypted using AES-256 vault standards. We enforce zero data sharing or monetization with third-party advertisers.`
        },
        {
            id: 'collection',
            title: '2. Information We Collect',
            content: `We collect minimal operational data required to deliver high-precision sommelier recommendations: (a) Client contact details and single-use invitation tokens, (b) Telegram account IDs for bot synchronization, (c) Palate preferences and blacklisted aroma notes, and (d) Wine cellar holdings and tasting notes.`
        },
        {
            id: 'telegram-privacy',
            title: '3. Telegram Voice & Photo Query Confidentiality',
            content: `Voice messages and wine list photo queries transmitted to @BordeuxSommelierBot are processed transiently via DeepSeek AI API endpoints strictly for real-time sommelier query execution. We do not store or retain raw audio recordings or camera images beyond the immediate query response cycle.`
        },
        {
            id: 'data-rights',
            title: '4. Client Data Rights & Export',
            content: `Members retain the absolute right to export their complete wine cellar portfolio dataset at any time, or request complete erasure ("Right to be Forgotten") by notifying their concierge representative at GREAT LEADERS LTD.`
        },
        {
            id: 'company-info',
            title: '5. Data Controller Information',
            content: `The Data Controller responsible for your personal information is GREAT LEADERS LTD, a company registered in England and Wales under Company Number 15954666. Registered Office Address: Dept 6193 43 Owston Road, Carcroft, Doncaster, DN6 8DA.`
        }
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-slate-100 flex flex-col font-sans selection:bg-[#4a0e17] selection:text-white">
            <Head title="Privacy Policy — Bordeux AI Private Club" />
            <AgeVerificationModal />
            <Navbar />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-10">
                {/* Header Banner */}
                <div className="glass-panel-burgundy p-8 sm:p-10 rounded-3xl border border-[#d4af37]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
                    <div className="space-y-3 relative z-10">
                        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#d4af37]/15 text-[#f3cf65] text-xs font-bold uppercase tracking-widest border border-[#d4af37]/40">
                            <EyeOff className="w-4 h-4 text-[#d4af37]" />
                            <span>Privacy & Discretion Standard</span>
                        </div>
                        <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight">
                            Privacy Policy
                        </h1>
                        <p className="text-xs text-slate-300 font-light">
                            GREAT LEADERS LTD (Company No. 15954666) • Effective Date: January 1, 2026
                        </p>
                    </div>

                    <Link
                        href={route('home')}
                        className="px-5 py-3 rounded-xl glass-panel text-xs font-bold uppercase tracking-wider text-slate-200 hover:text-white border border-[#d4af37]/30 hover:border-[#d4af37] transition flex items-center space-x-2 relative z-10 shrink-0"
                    >
                        <ArrowLeft className="w-4 h-4 text-[#d4af37]" />
                        <span>Return to Club</span>
                    </Link>
                </div>

                {/* Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Table of Contents */}
                    <div className="lg:col-span-4 space-y-4">
                        <div className="glass-panel p-6 rounded-3xl border border-[#d4af37]/20 sticky top-28 space-y-4">
                            <h3 className="font-serif-luxury text-base font-bold text-white uppercase tracking-wider border-b border-[#d4af37]/15 pb-3">
                                Table of Contents
                            </h3>
                            <nav className="space-y-2 text-xs">
                                {sections.map((s) => (
                                    <a
                                        key={s.id}
                                        href={`#${s.id}`}
                                        className="block p-2 rounded-xl text-slate-400 hover:text-[#f3cf65] hover:bg-[#4a0e17]/30 transition"
                                    >
                                        {s.title}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Main Clauses */}
                    <div className="lg:col-span-8 space-y-6">
                        {sections.map((s) => (
                            <div
                                key={s.id}
                                id={s.id}
                                className="glass-panel p-8 rounded-3xl border border-[#d4af37]/15 space-y-4 scroll-mt-28 hover:border-[#d4af37]/40 transition"
                            >
                                <h2 className="font-serif-luxury text-xl font-bold text-white flex items-center space-x-2">
                                    <CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0" />
                                    <span>{s.title}</span>
                                </h2>
                                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                                    {s.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-[#d4af37]/10 bg-[#070707] py-8 text-center text-xs text-slate-500">
                <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p>© 2026 GREAT LEADERS LTD (Company No. 15954666). Registered Address: Dept 6193 43 Owston Road, Carcroft, Doncaster, DN6 8DA. All rights reserved.</p>
                    <div className="flex space-x-6 shrink-0">
                        <Link href={route('legal.terms')} className="hover:text-[#d4af37] transition">Terms of Service</Link>
                        <Link href={route('legal.privacy')} className="text-[#d4af37] font-semibold">Privacy Policy</Link>
                        <Link href={route('legal.refund')} className="hover:text-[#d4af37] transition">Refund Policy</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
