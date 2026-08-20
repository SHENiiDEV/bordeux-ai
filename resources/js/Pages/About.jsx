import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import AgeVerificationModal from '../Components/AgeVerificationModal';
import { Wine, Award, ShieldCheck, Sparkles, Building2, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About({ companyName, companyNumber, companyAddress, supportEmail }) {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-slate-100 flex flex-col font-sans selection:bg-[#4a0e17] selection:text-white">
            <Head title="About Us — Bordeux AI Private Club" />
            <AgeVerificationModal />
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full space-y-16">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass-panel-burgundy border border-[#d4af37]/40 text-[#f3cf65] text-xs font-bold uppercase tracking-widest shadow-xl"
                    >
                        <Sparkles className="w-4 h-4 text-[#d4af37]" />
                        <span>Private Sommelier Heritage & AI Innovation</span>
                    </motion.div>

                    <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold tracking-tight text-white">
                        Where Fine Wine Tradition <br />
                        <span className="gold-gradient-text">Meets AI Precision</span>
                    </h1>

                    <p className="text-slate-300 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
                        Bordeux AI was founded to provide high-net-worth collectors, sommeliers, and epicurean connoisseurs with instant, zero-compromise wine pairing and cellar portfolio intelligence.
                    </p>
                </div>

                {/* Mission Pillars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="glass-panel p-8 rounded-3xl border border-[#d4af37]/20 space-y-4">
                        <div className="p-3 rounded-2xl bg-[#4a0e17] border border-[#d4af37]/30 text-[#f3cf65] w-fit">
                            <Wine className="w-6 h-6" />
                        </div>
                        <h3 className="font-serif-luxury text-xl font-bold text-white">Palate Precision</h3>
                        <p className="text-xs text-slate-300 font-light leading-relaxed">
                            Our self-learning DeepSeek sommelier algorithms analyze dish flavor chemistry, decanting windows, and vintage weather conditions down to Parker scale (90-100) precision.
                        </p>
                    </div>

                    <div className="glass-panel p-8 rounded-3xl border border-[#d4af37]/20 space-y-4">
                        <div className="p-3 rounded-2xl bg-[#4a0e17] border border-[#d4af37]/30 text-[#f3cf65] w-fit">
                            <Award className="w-6 h-6" />
                        </div>
                        <h3 className="font-serif-luxury text-xl font-bold text-white">Cellar Vault Assets</h3>
                        <p className="text-xs text-slate-300 font-light leading-relaxed">
                            Manage multi-million euro private wine collections in a sleek Bento vault with automated drinking window badges, aging progress, and instant CSV export reports.
                        </p>
                    </div>

                    <div className="glass-panel p-8 rounded-3xl border border-[#d4af37]/20 space-y-4">
                        <div className="p-3 rounded-2xl bg-[#4a0e17] border border-[#d4af37]/30 text-[#f3cf65] w-fit">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <h3 className="font-serif-luxury text-xl font-bold text-white">UK Corporate Standard</h3>
                        <p className="text-xs text-slate-300 font-light leading-relaxed">
                            Operated with strict corporate governance under United Kingdom commercial law. Transparent B2B invoicing, 14-day statutory refund protection, and AES-256 client confidentiality.
                        </p>
                    </div>
                </div>

                {/* Corporate Info Card */}
                <div className="glass-panel-burgundy p-10 rounded-3xl border border-[#d4af37]/30 space-y-6 max-w-4xl mx-auto shadow-2xl">
                    <div className="flex items-center space-x-3 border-b border-[#d4af37]/20 pb-4">
                        <Building2 className="w-6 h-6 text-[#d4af37]" />
                        <h2 className="font-serif-luxury text-2xl font-bold text-white">Corporate Governance & Merchant Details</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                        <div className="space-y-1">
                            <span className="text-slate-400 block uppercase font-bold text-[10px] tracking-wider">Company Legal Name</span>
                            <p className="font-bold text-white text-sm">{companyName || 'CHANGE IT UP SERVICES LTD'}</p>
                            <p className="text-[#d4af37] font-semibold text-[11px]">Company Reg No: {companyNumber || '16107295'}</p>
                        </div>

                        <div className="space-y-1">
                            <span className="text-slate-400 block uppercase font-bold text-[10px] tracking-wider">Registered Office Address</span>
                            <p className="font-medium text-slate-200 leading-relaxed">
                                {companyAddress || '14 Broadway, Nottingham, United Kingdom, NG1 1PS'}
                            </p>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-[#d4af37]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                        <span className="text-slate-400 font-light">Questions regarding corporate membership?</span>
                        <Link
                            href={route('contact')}
                            className="px-6 py-3 rounded-xl bg-[#4a0e17] text-[#f3cf65] border border-[#d4af37]/40 hover:border-[#d4af37] font-bold uppercase tracking-wider transition inline-flex items-center space-x-2"
                        >
                            <span>Contact Concierge Desk</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="border-t border-[#d4af37]/10 bg-[#070707] py-8 text-center text-xs text-slate-500">
                <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p>© 2026 {companyName || 'CHANGE IT UP SERVICES LTD'} (Company No. {companyNumber || '16107295'}). All rights reserved.</p>
                    <div className="flex space-x-6 shrink-0">
                        <Link href={route('legal.terms')} className="hover:text-[#d4af37] transition">Terms of Service</Link>
                        <Link href={route('legal.privacy')} className="hover:text-[#d4af37] transition">Privacy Policy</Link>
                        <Link href={route('legal.refund')} className="hover:text-[#d4af37] transition">Refund Policy</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
