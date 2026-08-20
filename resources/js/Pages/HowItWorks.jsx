import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import AgeVerificationModal from '../Components/AgeVerificationModal';
import { Sparkles, Zap, Bot, Wine, FileText, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HowItWorks() {
    const steps = [
        {
            number: '01',
            title: 'Instant Provisioning',
            subtitle: 'Fast Account Setup & Initial AI Credits',
            icon: Zap,
            description: 'Apply for private membership or claim an invitation token. Your account is instantly provisioned with complimentary AI consultation credits to explore our sommelier intelligence engine.',
            highlights: [
                'Instant account activation & Telegram synchronization',
                '10 complimentary AI Sommelier consultation credits',
                'AES-256 encrypted palate vault setup'
            ]
        },
        {
            number: '02',
            title: 'Computer Vision Analysis',
            subtitle: 'Wine Label & Fine Dining Menu Parsing (< 1.2s)',
            icon: Wine,
            description: 'Upload a photo of a wine list or dining menu while at fine establishments. Our DeepSeek vision engine parses vintages, Parker ratings, and dish flavor profiles in under 1.2 seconds.',
            highlights: [
                'Sub-1.2 second optical vintage recognition',
                'Parker scale (90-100) scoring & weather vintage analysis',
                'Instant decanting duration recommendations'
            ]
        },
        {
            number: '03',
            title: 'Hands-Free Telemetry',
            subtitle: 'Voice Note Recording in Telegram Bot',
            icon: Bot,
            description: 'Send voice messages to @BordeuxSommelierBot while dining out. The bot transcribes, analyzes your meal, and returns tailored sommelier pairing audio & text responses.',
            highlights: [
                'Hands-free voice note recognition in English & French',
                'Automatic logging into your private cellar wishlist',
                'Zero-friction dining experience'
            ]
        },
        {
            number: '04',
            title: 'Palate Dashboards & B2B Invoices',
            subtitle: 'Portfolio Valuations & Tax Receipts',
            icon: FileText,
            description: 'Track cellar bottle maturity windows, overall portfolio valuations, and automatically download official UK B2B PDF tax invoices for accounting records.',
            highlights: [
                'Real-time cellar portfolio valuation tracking',
                'Peak drinking window maturity alert engine',
                'Official UK B2B PDF Tax Receipts issued by GREAT LEADERS LTD'
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-slate-100 flex flex-col font-sans selection:bg-[#4a0e17] selection:text-white">
            <Head title="How It Works — Bordeux AI Private Club" />
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
                        <span>Interactive Step-by-Step Workflow</span>
                    </motion.div>

                    <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold tracking-tight text-white">
                        How Bordeux AI Elevates <br />
                        <span className="gold-gradient-text">Your Cellar & Dining</span>
                    </h1>

                    <p className="text-slate-300 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
                        Discover how our high-precision AI sommelier engine seamlessly integrates with your Telegram app and private wine cellar portfolio.
                    </p>
                </div>

                {/* Steps Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {steps.map((step, idx) => {
                        const IconComp = step.icon;
                        return (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="glass-panel p-8 sm:p-10 rounded-3xl border border-[#d4af37]/20 flex flex-col justify-between space-y-6 relative hover:border-[#d4af37]/50 transition group"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="font-serif-luxury text-3xl font-bold text-[#f3cf65] opacity-80">
                                            {step.number}
                                        </span>
                                        <div className="p-3 rounded-2xl bg-[#4a0e17] border border-[#d4af37]/30 text-[#f3cf65]">
                                            <IconComp className="w-6 h-6" />
                                        </div>
                                    </div>

                                    <div>
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37] block mb-1">
                                            {step.subtitle}
                                        </span>
                                        <h3 className="font-serif-luxury text-2xl font-bold text-white group-hover:text-[#f3cf65] transition">
                                            {step.title}
                                        </h3>
                                    </div>

                                    <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-[#d4af37]/15 space-y-2">
                                    {step.highlights.map((h, i) => (
                                        <div key={i} className="flex items-center space-x-2 text-xs text-slate-300">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                                            <span>{h}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom CTA Banner */}
                <div className="glass-panel-burgundy p-10 rounded-3xl border border-[#d4af37]/30 text-center space-y-6 shadow-2xl relative overflow-hidden">
                    <h2 className="font-serif-luxury text-3xl font-bold text-white">Ready to Experience Private AI Sommelier Access?</h2>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-light">
                        Join an elite circle of wine connoisseurs and collectors. Submit your application for private membership today.
                    </p>
                    <div className="pt-2">
                        <Link
                            href={route('membership.apply')}
                            className="px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest bg-gradient-to-r from-[#4a0e17] via-[#6b1422] to-[#4a0e17] text-[#f3cf65] border border-[#d4af37]/50 hover:border-[#d4af37] shadow-xl transition inline-flex items-center space-x-2"
                        >
                            <span>Apply For Access</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="border-t border-[#d4af37]/10 bg-[#070707] py-8 text-center text-xs text-slate-500">
                <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p>© 2026 GREAT LEADERS LTD (Company No. 15954666). All rights reserved.</p>
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
