import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import AgeVerificationModal from '../../Components/AgeVerificationModal';
import { ShieldCheck, Send, CheckCircle, Wine, Sparkles, ChevronRight, ChevronLeft, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ApplyMembership() {
    const [step, setStep] = useState(1);

    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        name: '',
        email: '',
        telegram_username: '',
        cellar_size: '250 - 1,000 bottles',
        estimated_budget: 'Grand Cru ($2,500 - $10,000/bottle)',
        region_focus: 'Bordeaux Grand Cru & Burgundy Pinot Noir',
        wine_interest: '',
    });

    const cellarSizes = [
        'Under 50 bottles (Growing Collection)',
        '50 – 250 bottles (Established Cellar)',
        '250 – 1,000 bottles (Grand Cru Portfolio)',
        '1,000+ bottles (Rare Vault Collection)',
    ];

    const budgetTiers = [
        'Classic Reserve ($250 - $1,000/bottle)',
        'Premier Reserve ($1,000 - $2,500/bottle)',
        'Grand Cru ($2,500 - $10,000/bottle)',
        'Rare Vintage & Auction ($10,000+/bottle)',
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('membership.apply.store'));
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-slate-100 flex flex-col font-sans selection:bg-[#4a0e17] selection:text-white">
            <Head title="Apply for Access — Bordeux AI Private Club" />
            <AgeVerificationModal />
            <Navbar />

            <div className="max-w-3xl mx-auto px-4 py-14 flex-1 w-full space-y-8">
                {/* Header */}
                <div className="text-center space-y-3">
                    <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass-panel-burgundy border border-[#d4af37]/40 text-[#f3cf65] text-xs font-bold uppercase tracking-widest shadow-xl">
                        <Sparkles className="w-4 h-4 text-[#d4af37]" />
                        <span>By Private Vetted Application</span>
                    </div>
                    <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold text-white tracking-tight">
                        Apply for Private Access
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto font-light">
                        Bordeux AI limits total active memberships to maintain zero-latency sommelier voice responses and absolute client privacy.
                    </p>
                </div>

                {/* Step Progress Bar */}
                <div className="glass-panel p-4 rounded-2xl border border-[#d4af37]/15 flex items-center justify-between text-xs font-semibold">
                    <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-[#f3cf65]' : 'text-slate-500'}`}>
                        <span className="w-6 h-6 rounded-full border flex items-center justify-center text-[11px] border-current">1</span>
                        <span className="hidden sm:inline">Credentials</span>
                    </div>
                    <div className="w-8 sm:w-16 h-0.5 bg-slate-800" />
                    <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-[#f3cf65]' : 'text-slate-500'}`}>
                        <span className="w-6 h-6 rounded-full border flex items-center justify-center text-[11px] border-current">2</span>
                        <span className="hidden sm:inline">Palate & Cellar</span>
                    </div>
                    <div className="w-8 sm:w-16 h-0.5 bg-slate-800" />
                    <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-[#f3cf65]' : 'text-slate-500'}`}>
                        <span className="w-6 h-6 rounded-full border flex items-center justify-center text-[11px] border-current">3</span>
                        <span className="hidden sm:inline">Concierge Review</span>
                    </div>
                </div>

                {/* Main Application Form Container */}
                <form onSubmit={handleSubmit} className="glass-panel p-8 sm:p-10 rounded-3xl border border-[#d4af37]/25 space-y-8 shadow-2xl relative">
                    {recentlySuccessful ? (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-8 rounded-2xl glass-panel-burgundy border border-[#d4af37]/40 text-center space-y-4"
                        >
                            <div className="w-16 h-16 rounded-full bg-[#4a0e17] border border-[#d4af37] flex items-center justify-center text-[#f3cf65] mx-auto shadow-xl">
                                <CheckCircle className="w-8 h-8" />
                            </div>
                            <h3 className="font-serif-luxury text-2xl font-bold text-white">Application Received</h3>
                            <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
                                Your application has been logged for concierge vetting. If approved, a single-use invitation token will be sent directly to your Telegram or email within 24-48 hours.
                            </p>
                        </motion.div>
                    ) : (
                        <AnimatePresence mode="wait">
                            {/* STEP 1: Personal Credentials */}
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-6 text-xs"
                                >
                                    <div className="border-b border-[#d4af37]/15 pb-4">
                                        <h3 className="font-serif-luxury text-xl font-bold text-white">1. Client Identification</h3>
                                        <p className="text-slate-400 text-[11px]">Enter your official credentials for membership verification</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Full Name *</label>
                                            <input
                                                type="text"
                                                required
                                                maxLength={200}
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                placeholder="Lord / Lady / Dr. Full Name"
                                                className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 rounded-xl p-3.5 text-white focus:outline-none focus:border-[#d4af37]"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Email Address *</label>
                                            <input
                                                type="email"
                                                required
                                                maxLength={200}
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                placeholder="concierge@domain.com"
                                                className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 rounded-xl p-3.5 text-white focus:outline-none focus:border-[#d4af37]"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Telegram Handle (for instant voice bot sync)</label>
                                            <input
                                                type="text"
                                                maxLength={200}
                                                value={data.telegram_username}
                                                onChange={(e) => setData('telegram_username', e.target.value)}
                                                placeholder="@username"
                                                className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 rounded-xl p-3.5 text-white focus:outline-none focus:border-[#d4af37]"
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-4 flex justify-end">
                                        <button
                                            type="button"
                                            onClick={() => setStep(2)}
                                            disabled={!data.name || !data.email}
                                            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4a0e17] to-[#6b1422] text-[#f3cf65] font-bold text-xs uppercase tracking-wider border border-[#d4af37]/40 flex items-center space-x-2"
                                        >
                                            <span>Continue to Cellar Profile</span>
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 2: Palate & Cellar Scale */}
                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-6 text-xs"
                                >
                                    <div className="border-b border-[#d4af37]/15 pb-4">
                                        <h3 className="font-serif-luxury text-xl font-bold text-white">2. Cellar Scale & Target Tiers</h3>
                                        <p className="text-slate-400 text-[11px]">Select your current portfolio size and valuation segment</p>
                                    </div>

                                    <div className="space-y-5">
                                        <div>
                                            <label className="block text-slate-300 font-semibold mb-2 uppercase tracking-wider">Current Cellar Size</label>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {cellarSizes.map((size) => (
                                                    <button
                                                        type="button"
                                                        key={size}
                                                        onClick={() => setData('cellar_size', size)}
                                                        className={`p-3.5 rounded-xl text-left border transition text-xs font-medium ${
                                                            data.cellar_size === size
                                                                ? 'bg-[#4a0e17] border-[#d4af37] text-white font-bold'
                                                                : 'bg-[#0a0a0a] border-slate-800 text-slate-400'
                                                        }`}
                                                    >
                                                        {size}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-slate-300 font-semibold mb-2 uppercase tracking-wider">Target Bottle Price Segment</label>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {budgetTiers.map((tier) => (
                                                    <button
                                                        type="button"
                                                        key={tier}
                                                        onClick={() => setData('estimated_budget', tier)}
                                                        className={`p-3.5 rounded-xl text-left border transition text-xs font-medium ${
                                                            data.estimated_budget === tier
                                                                ? 'bg-[#4a0e17] border-[#d4af37] text-white font-bold'
                                                                : 'bg-[#0a0a0a] border-slate-800 text-slate-400'
                                                        }`}
                                                    >
                                                        {tier}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 flex justify-between">
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            className="px-5 py-3.5 rounded-xl border border-slate-700 text-slate-400 hover:text-white flex items-center space-x-1"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                            <span>Back</span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setStep(3)}
                                            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4a0e17] to-[#6b1422] text-[#f3cf65] font-bold text-xs uppercase tracking-wider border border-[#d4af37]/40 flex items-center space-x-2"
                                        >
                                            <span>Continue to Final Review</span>
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 3: Collection Focus & Final Submit */}
                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-6 text-xs"
                                >
                                    <div className="border-b border-[#d4af37]/15 pb-4">
                                        <h3 className="font-serif-luxury text-xl font-bold text-white">3. Collection Focus & Objectives</h3>
                                        <p className="text-slate-400 text-[11px]">Describe your collection goals for the sommelier team</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Primary Region Focus</label>
                                            <input
                                                type="text"
                                                value={data.region_focus}
                                                onChange={(e) => setData('region_focus', e.target.value)}
                                                placeholder="e.g. Bordeaux Left Bank, Burgundy Grand Cru, Champagne, Napa Valley..."
                                                className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 rounded-xl p-3.5 text-white focus:outline-none focus:border-[#d4af37]"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Collection Objectives & Dining Preferences *</label>
                                            <textarea
                                                rows={4}
                                                required
                                                value={data.wine_interest}
                                                onChange={(e) => setData('wine_interest', e.target.value)}
                                                placeholder="Describe your dining frequency, fine wine investment objectives, or specific pairing requirements..."
                                                className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 rounded-xl p-3.5 text-white focus:outline-none focus:border-[#d4af37]"
                                            />
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-xl bg-[#070707] border border-slate-800 text-[11px] text-slate-400 flex items-center space-x-3">
                                        <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                                        <span>Applications are reviewed individually within 24-48 hours under AES-256 privacy protection.</span>
                                    </div>

                                    <div className="pt-4 flex justify-between">
                                        <button
                                            type="button"
                                            onClick={() => setStep(2)}
                                            className="px-5 py-3.5 rounded-xl border border-slate-700 text-slate-400 hover:text-white flex items-center space-x-1"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                            <span>Back</span>
                                        </button>

                                        <button
                                            type="submit"
                                            disabled={processing || !data.wine_interest}
                                            className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#4a0e17] via-[#6b1422] to-[#4a0e17] text-[#f3cf65] font-bold text-xs uppercase tracking-widest border border-[#d4af37]/50 hover:border-[#d4af37] shadow-xl transition flex items-center space-x-2"
                                        >
                                            <span>{processing ? 'Submitting Application...' : 'Submit Vetted Application'}</span>
                                            <Send className="w-4 h-4" />
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    )}
                </form>
            </div>
        </div>
    );
}
