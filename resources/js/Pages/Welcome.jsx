import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import AgeVerificationModal from '../Components/AgeVerificationModal';
import { 
    Wine, ShieldCheck, Bot, Sparkles, Lock, ArrowRight, CheckCircle2, 
    Zap, Award, Sliders, Globe, Clock, ChevronRight, MessageSquareText, FileText 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Welcome({ canApply }) {
    const [activeTab, setActiveTab] = useState('telegram');
    const [billingCycle, setBillingCycle] = useState('annual'); // 'monthly' | 'annual'

    const clubPrivileges = [
        {
            id: 'telegram',
            title: '24/7 Telegram AI Sommelier Bot',
            subtitle: 'Instant Voice & Photo Consultation',
            icon: Bot,
            description: 'Send voice notes or photos of wine lists while dining at Michelin-starred restaurants. Bordeux AI analyzes dish profiles, vintage ratings, and decanting durations within milliseconds.',
            highlights: [
                'Voice note pairing requests in English & French',
                'Instant decanting duration advice prior to serving',
                'Vintage weather condition & Parker scale (90-100) scoring'
            ]
        },
        {
            id: 'bento',
            title: 'Cellar Portfolio Vault',
            subtitle: 'Real-Time Cellar Portfolio Valuation',
            icon: Wine,
            description: 'Manage your private cellar collection in a sleek Bento dashboard. Track bottle maturity status, market valuation, and optimal storage temperature conditions.',
            highlights: [
                'Bento grid layout with instant filtering by region and price segment',
                'Automated AI vintage scoring (90-100 scale)',
                'Storage humidity & temperature condition guidance'
            ]
        },
        {
            id: 'profile',
            title: 'Bespoke Taste Algorithm',
            subtitle: 'Hyper-Personalized Palate Tuning',
            icon: Sliders,
            description: 'Configure your target budget segment and preferred flavor notes (cedar, graphite, violet, leather) while strictly excluding undesirable notes (green tannins, over-extracted oak).',
            highlights: [
                'Budget tiers from $500 to $50,000+ per bottle',
                'Dynamic blacklisted aroma filter (green tannins, burnt oak)',
                'Continuous self-learning from your cellar reviews'
            ]
        },
        {
            id: 'billing',
            title: 'Discreet S2S Payment Vault',
            subtitle: 'High-Ticket Merchant Direct Concierge',
            icon: Lock,
            description: 'Vetted club memberships processed via custom high-ticket merchant APIs (Ezzygate, Corefy, Cardaq) with 256-bit S2S signature encryption and zero third-party tracking.',
            highlights: [
                'Direct S2S signature validation protocol',
                'Flexible monthly or annual concierge billing',
                'Strict client anonymity and data privacy'
            ]
        }
    ];

    const tiers = [
        {
            name: 'Reserve Concierge',
            monthlyPrice: '€250',
            annualPrice: '€2,500',
            description: 'Essential access for growing collectors and wine enthusiasts.',
            features: [
                'Telegram AI Sommelier (Text queries)',
                'Cellar portfolio tracking (up to 100 bottles)',
                'Standard Taste Profile configuration',
                'Food & wine pairing guidance'
            ],
            cta: 'Apply for Reserve',
            popular: false
        },
        {
            name: 'Grand Cru Tier',
            monthlyPrice: '€500',
            annualPrice: '€5,000',
            description: 'Full sommelier intelligence and priority concierge support.',
            features: [
                'Unlimited Telegram Voice & Photo AI Querying',
                'Unlimited Bento Cellar Portfolio',
                'Advanced Taste Algorithm & Blacklist Filters',
                'Real-Time Auction & Vintage Maturity Alerts',
                'Direct S2S Payment Vault Access'
            ],
            cta: 'Apply for Grand Cru',
            popular: true
        },
        {
            name: 'Rare Vintage Vault',
            monthlyPrice: '€1,200',
            annualPrice: '€12,000',
            description: 'Bespoke human + AI concierge for world-class collectors.',
            features: [
                'Dedicated Human Sommelier Concierge',
                'Direct Domaine & Auction Vault Sourcing',
                'Bespoke Fine Dining Pairing White-Glove Support',
                'Private Cellar Valuation Reports & Insurance Audit',
                'VIP Club Invitations & Private Tastings'
            ],
            cta: 'Request Vault Access',
            popular: false
        }
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-slate-100 flex flex-col font-sans selection:bg-[#4a0e17] selection:text-white">
            <Head title="Private Sommelier & Wine Concierge Club — Bordeux AI" />
            <AgeVerificationModal />
            <Navbar />

            {/* HERO SECTION */}
            <header className="relative pt-20 pb-24 border-b border-[#d4af37]/15 overflow-hidden">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#4a0e17]/25 blur-[120px] pointer-events-none rounded-full" />
                <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-[#d4af37]/10 blur-[100px] pointer-events-none rounded-full" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass-panel-burgundy border border-[#d4af37]/40 text-[#f3cf65] text-xs font-bold uppercase tracking-widest mb-8 shadow-xl"
                    >
                        <Sparkles className="w-4 h-4 text-[#d4af37]" />
                        <span>By Private Invitation • Exclusive Club</span>
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-5xl leading-[1.15]"
                    >
                        Your Private AI Sommelier & <br />
                        <span className="gold-gradient-text">Wine Collection Concierge</span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 text-slate-300 text-base sm:text-xl max-w-3xl font-light leading-relaxed"
                    >
                        Bordeux AI delivers instant Telegram sommelier pairing guidance and automated cellar portfolio management with peak vintage precision.
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                    >
                        <Link
                            href={route('membership.apply')}
                            className="px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest bg-gradient-to-r from-[#4a0e17] via-[#6b1422] to-[#4a0e17] text-[#f3cf65] border border-[#d4af37]/50 hover:border-[#d4af37] shadow-2xl hover:shadow-[#4a0e17]/80 transition duration-300 flex items-center justify-center space-x-3"
                        >
                            <span>Apply For Private Access</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        
                        <Link
                            href={route('login')}
                            className="px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest glass-panel text-slate-200 hover:text-white border border-[#d4af37]/30 hover:border-[#d4af37] transition flex items-center justify-center space-x-2"
                        >
                            <Lock className="w-4 h-4 text-[#d4af37]" />
                            <span>Member Sign In</span>
                        </Link>
                    </motion.div>
                </div>
            </header>

            {/* METRICS BANNER */}
            <section className="py-12 border-b border-[#d4af37]/15 bg-[#070707]/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        <div className="space-y-1">
                            <p className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#f3cf65]">€2.5M+</p>
                            <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Managed Vault Value</p>
                        </div>
                        <div className="space-y-1">
                            <p className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#f3cf65]">&lt; 50ms</p>
                            <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Telegram AI Speed</p>
                        </div>
                        <div className="space-y-1">
                            <p className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#f3cf65]">100/100</p>
                            <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Vintage Accuracy</p>
                        </div>
                        <div className="space-y-1">
                            <p className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#f3cf65]">24 / 7</p>
                            <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Concierge Support</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHAT AWAITS IN PRIVATE CLUB */}
            <section className="py-24 border-b border-[#d4af37]/15 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
                    <div className="text-center max-w-3xl mx-auto space-y-4">
                        <span className="text-xs uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-[#4a0e17] text-[#f3cf65] border border-[#d4af37]/30">
                            Exclusive Privileges
                        </span>
                        <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight">
                            What Awaits You Inside <br />
                            <span className="gold-gradient-text">The Bordeux AI Private Club</span>
                        </h2>
                        <p className="text-slate-400 text-sm sm:text-base font-light">
                            Designed for high-net-worth collectors who appreciate quiet luxury, seamless technology, and zero-compromise wine pairing accuracy.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-5 space-y-4">
                            {clubPrivileges.map((item) => {
                                const IconComponent = item.icon;
                                const isActive = activeTab === item.id;

                                return (
                                    <div
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                                            isActive
                                                ? 'glass-panel-burgundy border-[#d4af37] shadow-xl translate-x-2'
                                                : 'glass-panel border-[#d4af37]/15 opacity-70 hover:opacity-100 hover:border-[#d4af37]/40'
                                        }`}
                                    >
                                        <div className="flex items-start space-x-4">
                                            <div className={`p-3 rounded-xl border ${
                                                isActive ? 'bg-[#4a0e17] border-[#d4af37] text-[#f3cf65]' : 'bg-[#120d12] border-slate-800 text-slate-400'
                                            }`}>
                                                <IconComponent className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="font-serif-luxury text-lg font-bold text-white">{item.title}</h3>
                                                <p className="text-xs text-[#d4af37] font-semibold">{item.subtitle}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="lg:col-span-7">
                            {clubPrivileges.map((item) => {
                                if (item.id !== activeTab) return null;
                                return (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="glass-panel p-8 sm:p-10 rounded-3xl border border-[#d4af37]/30 space-y-8 relative overflow-hidden"
                                    >
                                        <div className="space-y-4">
                                            <span className="text-xs uppercase tracking-widest font-bold text-[#f3cf65] px-3 py-1 rounded bg-[#4a0e17] border border-[#d4af37]/30">
                                                {item.subtitle}
                                            </span>
                                            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">{item.title}</h3>
                                            <p className="text-slate-300 text-sm leading-relaxed">{item.description}</p>
                                        </div>

                                        <div className="space-y-3 pt-4 border-t border-[#d4af37]/15">
                                            <p className="text-xs uppercase font-bold text-slate-400 tracking-wider">Key Capabilities:</p>
                                            <div className="space-y-2.5">
                                                {item.highlights.map((h, i) => (
                                                    <div key={i} className="flex items-center space-x-3 text-xs text-slate-200">
                                                        <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                                                        <span>{h}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* SOMMELIER DEMONSTRATION SHOWCASE */}
            <section className="py-24 border-b border-[#d4af37]/15 bg-[#070707]/90">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                        <span className="text-xs uppercase font-bold tracking-widest text-[#d4af37]">Dialogue Sample</span>
                        <h2 className="font-serif-luxury text-3xl font-bold text-white">Experience Bordeux AI Consultation</h2>
                        <p className="text-xs text-slate-400">Sample sommelier response formatted for fine dining</p>
                    </div>

                    <div className="max-w-3xl mx-auto glass-panel p-8 rounded-3xl border border-[#d4af37]/25 space-y-6">
                        {/* User Question */}
                        <div className="flex items-start space-x-4">
                            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                                VIP
                            </div>
                            <div className="flex-1 bg-[#120d12] p-4 rounded-2xl border border-slate-800 text-xs text-slate-200">
                                "I am at Le Jules Verne in Paris having roasted pigeon with winter black truffles. Recommend a bottle from my Grand Cru profile under €3,000."
                            </div>
                        </div>

                        {/* AI Sommelier Answer */}
                        <div className="flex items-start space-x-4">
                            <div className="w-8 h-8 rounded-full bg-[#4a0e17] border border-[#d4af37]/40 flex items-center justify-center text-xs font-bold text-[#f3cf65]">
                                AI
                            </div>
                            <div className="flex-1 glass-panel-burgundy p-5 rounded-2xl border border-[#d4af37]/30 text-xs text-slate-100 space-y-3">
                                <p className="leading-relaxed">
                                    Monsieur, for roasted pigeon with winter black truffles, I recommend opening a bottle of <strong className="text-[#f3cf65]">2010 Château Margaux Premier Grand Cru Classé</strong>.
                                </p>
                                <p className="text-slate-300">
                                    Its silky, tertiary aromas of truffle, cedar, and crushed violets will harmonize effortlessly with the gamey richness of the dish without overpowering the delicate meat. Decant for 45 minutes prior to serving at 16°C.
                                </p>
                                <div className="pt-2 border-t border-[#d4af37]/15 flex items-center justify-between text-[11px] text-[#d4af37] font-semibold">
                                    <span>AI Score: 99.5 / 100 • Bordeaux, France</span>
                                    <span>Added to Cellar Watchlist</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MEMBERSHIP TIERS COMPARISON */}
            <section className="py-24 border-b border-[#d4af37]/15">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                    <div className="text-center max-w-3xl mx-auto space-y-6">
                        <span className="text-xs uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-[#4a0e17] text-[#f3cf65] border border-[#d4af37]/30">
                            Membership Privileges
                        </span>
                        <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight">
                            Select Your Concierge Tier
                        </h2>
                        
                        {/* Monthly / Annual Toggle */}
                        <div className="inline-flex items-center p-1 rounded-2xl bg-[#120d12] border border-[#d4af37]/25 mx-auto">
                            <button
                                type="button"
                                onClick={() => setBillingCycle('monthly')}
                                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                                    billingCycle === 'monthly'
                                        ? 'bg-[#4a0e17] text-[#f3cf65] border border-[#d4af37]/40 shadow-lg'
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                Monthly Billing
                            </button>
                            <button
                                type="button"
                                onClick={() => setBillingCycle('annual')}
                                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center space-x-2 ${
                                    billingCycle === 'annual'
                                        ? 'bg-[#4a0e17] text-[#f3cf65] border border-[#d4af37]/40 shadow-lg'
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                <span>Annual Billing</span>
                                <span className="text-[10px] bg-[#d4af37]/20 text-[#f3cf65] px-2 py-0.5 rounded-full border border-[#d4af37]/40 font-extrabold">
                                    Save 17%
                                </span>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {tiers.map((t, idx) => {
                            const priceDisplay = billingCycle === 'annual' ? t.annualPrice : t.monthlyPrice;
                            const periodLabel = billingCycle === 'annual' ? '/ year' : '/ month';

                            return (
                                <div
                                    key={idx}
                                    className={`glass-panel p-8 sm:p-10 rounded-3xl border flex flex-col justify-between space-y-8 relative ${
                                        t.popular
                                            ? 'border-[#d4af37] bg-gradient-to-b from-[#4a0e17]/50 via-[#0a0a0a] to-[#0a0a0a] shadow-2xl scale-[1.03]'
                                            : 'border-[#d4af37]/20 opacity-90'
                                    }`}
                                >
                                    {t.popular && (
                                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#4a0e17] to-[#6b1422] text-[#f3cf65] text-[10px] font-bold uppercase tracking-widest border border-[#d4af37]">
                                            Recommended Choice
                                        </div>
                                    )}

                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="font-serif-luxury text-2xl font-bold text-white">{t.name}</h3>
                                            <p className="text-xs text-slate-400 mt-2 leading-relaxed">{t.description}</p>
                                        </div>

                                        <div className="flex items-baseline space-x-1">
                                            <span className="font-serif-luxury text-4xl font-bold text-[#f3cf65]">{priceDisplay}</span>
                                            <span className="text-xs text-slate-400 font-medium">{periodLabel}</span>
                                        </div>

                                        <div className="space-y-3 pt-4 border-t border-[#d4af37]/15">
                                            <p className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">Included Privileges:</p>
                                            <div className="space-y-2.5">
                                                {t.features.map((f, i) => (
                                                    <div key={i} className="flex items-center space-x-2.5 text-xs text-slate-300">
                                                        <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                                                        <span>{f}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <Link
                                        href={route('membership.apply')}
                                        className={`w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest text-center transition flex items-center justify-center space-x-2 ${
                                            t.popular
                                                ? 'bg-gradient-to-r from-[#4a0e17] via-[#6b1422] to-[#4a0e17] text-[#f3cf65] border border-[#d4af37]/50 hover:border-[#d4af37] shadow-xl'
                                                : 'glass-panel text-slate-200 hover:text-white border border-[#d4af37]/30 hover:border-[#d4af37]'
                                        }`}
                                    >
                                        <span>{t.cta}</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION BANNER */}
            <section className="py-20 bg-gradient-to-b from-[#0a0a0a] to-[#4a0e17]/20">
                <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
                    <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white">
                        Elevate Your Private Cellar Experience
                    </h2>
                    <p className="text-slate-300 text-sm max-w-xl mx-auto font-light">
                        Join an elite circle of wine connoisseurs and collectors. Submit your application for private membership today.
                    </p>
                    <div className="pt-4">
                        <Link
                            href={route('membership.apply')}
                            className="px-10 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest bg-gradient-to-r from-[#4a0e17] via-[#6b1422] to-[#4a0e17] text-[#f3cf65] border border-[#d4af37]/50 hover:border-[#d4af37] shadow-2xl transition inline-flex items-center space-x-3"
                        >
                            <span>Apply For Private Access</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="border-t border-[#d4af37]/10 bg-[#070707] py-8 text-center text-xs text-slate-500">
                <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p>© 2026 GREAT LEADERS LTD (Company No. 15954666). Registered Address: Dept 6193 43 Owston Road, Carcroft, Doncaster, DN6 8DA. All rights reserved.</p>
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
