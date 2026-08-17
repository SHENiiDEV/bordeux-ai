import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import AgeVerificationModal from '../Components/AgeVerificationModal';
import { 
    Wine, Bot, Sliders, CreditCard, Sparkles, Send, CheckCircle2, 
    ShieldCheck, ArrowUpRight, Mic, Volume2, Search, Award, Compass 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Dashboard({ user, cellarCount, tasteProfile, recentWines }) {
    const [query, setQuery] = useState('');
    const [simulatedResponse, setSimulatedResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isVoiceSimulated, setIsVoiceSimulated] = useState(false);

    const promptPresets = [
        "Pairing for 45-day dry-aged Ribeye",
        "Decanting duration for 2010 Bordeaux Red",
        "Best 98+ rated Burgundy under €3,000",
        "Seafood pairing with Blanc de Blancs Champagne"
    ];

    const handlePresetClick = (preset) => {
        setQuery(preset);
    };

    const handleSimulatedSommelierQuery = (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setSimulatedResponse(null);

        setTimeout(() => {
            setSimulatedResponse({
                reply: `Monsieur ${user.name}, for your inquiry regarding "${query}", I recommend pairing a bottle of 2010 Château Margaux from your Grand Cru profile. Its silky tannins, crushed violet notes, and complex graphite finish will elevate the dining experience.`,
                suggestedWine: 'Château Margaux Premier Grand Cru Classé 2010',
                rating: 99.5,
                region: 'Margaux, Bordeaux, France',
                decanting: 'Decant 45 minutes prior to serving at 16°C',
            });
            setLoading(false);
        }, 1100);
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-slate-100 flex flex-col font-sans">
            <Head title="Sommelier Concierge Hub — Bordeux AI" />
            <AgeVerificationModal />
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
                {/* Header Welcome Banner */}
                <div className="glass-panel-burgundy p-8 rounded-3xl border border-[#d4af37]/30 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
                    <div className="space-y-2 relative z-10">
                        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#d4af37]/15 text-[#f3cf65] text-[11px] font-bold uppercase tracking-wider border border-[#d4af37]/40">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Vetted Member • Status: {user.membership_status?.toUpperCase()}</span>
                        </div>
                        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white tracking-tight">
                            Welcome back, <span className="gold-gradient-text">{user.name}</span>
                        </h1>
                        <p className="text-sm text-slate-300 max-w-xl font-light">
                            Your private sommelier service is synchronized with DeepSeek AI and ready on Telegram.
                        </p>
                    </div>

                    <div className="flex items-center space-x-4 relative z-10">
                        <Link
                            href={route('cellar.index')}
                            className="px-5 py-3 rounded-xl glass-panel text-xs font-semibold uppercase tracking-wider text-slate-200 hover:text-white border border-[#d4af37]/30 hover:border-[#d4af37] transition flex items-center space-x-2 shadow-lg"
                        >
                            <Wine className="w-4 h-4 text-[#d4af37]" />
                            <span>View Vault Cellar ({cellarCount})</span>
                        </Link>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left 2 Columns: Live AI Sommelier Query Console */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Interactive Concierge Query Panel */}
                        <div className="glass-panel p-8 rounded-3xl border border-[#d4af37]/20 space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="p-3 rounded-2xl bg-[#4a0e17]/60 border border-[#d4af37]/40 text-[#d4af37] shadow-inner">
                                        <Bot className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h2 className="font-serif-luxury text-xl font-bold text-white">Ask Bordeux AI Sommelier</h2>
                                        <p className="text-xs text-slate-400">Instant tasting notes, vintage ratings, and dish pairings</p>
                                    </div>
                                </div>
                                
                                <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800 flex items-center space-x-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1" />
                                    <span>DeepSeek Online</span>
                                </span>
                            </div>

                            {/* Preset Chips */}
                            <div className="flex flex-wrap gap-2">
                                {promptPresets.map((preset, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handlePresetClick(preset)}
                                        className="px-3 py-1.5 rounded-xl bg-[#120d12]/90 border border-slate-800 hover:border-[#d4af37]/40 text-[11px] text-slate-300 hover:text-white transition text-left"
                                    >
                                        💡 {preset}
                                    </button>
                                ))}
                            </div>

                            <form onSubmit={handleSimulatedSommelierQuery} className="space-y-4">
                                <div className="relative">
                                    <textarea
                                        rows={3}
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="e.g. Recommend a 98+ rated Bordeaux red to pair with grilled dry-aged ribeye under €2,000..."
                                        className="w-full bg-[#120d12]/90 border border-[#d4af37]/25 rounded-2xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition resize-none"
                                    />
                                    <button
                                        type="submit"
                                        disabled={loading || !query.trim()}
                                        className="absolute bottom-3 right-3 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4a0e17] via-[#6b1422] to-[#4a0e17] text-[#f3cf65] text-xs font-bold uppercase tracking-wider border border-[#d4af37]/40 hover:border-[#d4af37] transition flex items-center space-x-2 shadow-lg"
                                    >
                                        <span>{loading ? 'Consulting AI...' : 'Ask Sommelier'}</span>
                                        <Send className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </form>

                            {/* AI Response Card */}
                            <AnimatePresence>
                                {simulatedResponse && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="p-6 rounded-2xl glass-panel-burgundy border border-[#d4af37]/30 space-y-4 shadow-xl"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2 text-[#f3cf65] text-xs font-bold uppercase tracking-wider">
                                                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                                                <span>Sommelier Recommendation</span>
                                            </div>
                                            <span className="text-xs font-bold text-[#f3cf65] px-2.5 py-1 rounded bg-[#4a0e17] border border-[#d4af37]/30">
                                                AI Score: {simulatedResponse.rating} / 100
                                            </span>
                                        </div>

                                        <p className="text-sm text-slate-200 leading-relaxed font-light">
                                            {simulatedResponse.reply}
                                        </p>

                                        <div className="pt-3 border-t border-[#d4af37]/20 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                                            <div className="text-slate-300 font-semibold flex items-center space-x-1">
                                                <Wine className="w-4 h-4 text-[#d4af37]" />
                                                <span>{simulatedResponse.suggestedWine}</span>
                                            </div>
                                            <span className="text-slate-400 italic">{simulatedResponse.decanting}</span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Recent Cellar Highlight */}
                        <div className="glass-panel p-8 rounded-3xl border border-[#d4af37]/15 space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="font-serif-luxury text-lg font-bold text-white flex items-center space-x-2">
                                    <Wine className="w-5 h-5 text-[#d4af37]" />
                                    <span>Recent Cellar Additions</span>
                                </h3>
                                <Link href={route('cellar.index')} className="text-xs text-[#d4af37] hover:underline flex items-center space-x-1">
                                    <span>Manage All</span>
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {recentWines && recentWines.length > 0 ? (
                                    recentWines.map((wine) => (
                                        <div key={wine.id} className="p-4 rounded-2xl bg-[#120d12]/80 border border-[#d4af37]/15 space-y-2 hover:border-[#d4af37]/40 transition">
                                            <div className="flex items-start justify-between">
                                                <h4 className="text-sm font-bold text-white line-clamp-1">{wine.wine_name}</h4>
                                                <span className="text-[11px] font-bold text-[#f3cf65] px-2 py-0.5 rounded bg-[#4a0e17]">
                                                    {wine.ai_rating ? `${wine.ai_rating} pts` : '98 pts'}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-400">{wine.region}</p>
                                            <span className="inline-block text-[10px] uppercase font-semibold text-slate-500">
                                                {wine.price_segment}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-xs text-slate-500 col-span-2">No cellar entries yet. Consult the AI sommelier or add bottles manually.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Telegram Sync & Taste Profile Summary */}
                    <div className="space-y-8">
                        {/* Telegram Integration Panel */}
                        <div className="glass-panel p-6 rounded-3xl border border-[#d4af37]/20 space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-2xl bg-[#0088cc]/20 border border-[#0088cc]/40 flex items-center justify-center text-[#0088cc]">
                                    <Send className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-serif-luxury text-base font-bold text-white">Telegram Voice Bot Sync</h3>
                                    <p className="text-xs text-slate-400">Direct voice note & photo pairing</p>
                                </div>
                            </div>

                            <p className="text-xs text-slate-300 leading-relaxed">
                                Connect your Telegram account to send voice notes or dish photos directly to Bordeux AI while dining out.
                            </p>

                            {/* Simulated Voice Waveform */}
                            <div className="p-3.5 rounded-2xl bg-[#070707] border border-slate-800 space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-slate-400 font-mono">@BordeuxSommelierBot</span>
                                    <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider flex items-center">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-ping" />
                                        Voice Sync Ready
                                    </span>
                                </div>

                                <div className="flex items-center space-x-1 py-1">
                                    {[40, 75, 30, 90, 60, 100, 45, 80, 50, 95, 35, 70, 40].map((h, i) => (
                                        <div
                                            key={i}
                                            style={{ height: `${h}%` }}
                                            className="flex-1 bg-gradient-to-t from-[#4a0e17] to-[#d4af37] rounded-full h-6 opacity-80"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Taste Profile Mini Summary */}
                        <div className="glass-panel p-6 rounded-3xl border border-[#d4af37]/15 space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-serif-luxury text-base font-bold text-white flex items-center space-x-2">
                                    <Sliders className="w-4 h-4 text-[#d4af37]" />
                                    <span>Taste Algorithm</span>
                                </h3>
                                <Link href={route('taste-profile.show')} className="text-xs text-[#d4af37] hover:underline font-semibold">
                                    Configure
                                </Link>
                            </div>

                            <div className="space-y-3 text-xs">
                                <div>
                                    <span className="text-slate-400 block mb-1">Target Budget Tier:</span>
                                    <span className="font-semibold text-white px-2.5 py-1 rounded bg-[#4a0e17] border border-[#d4af37]/30 inline-block text-slate-200">
                                        {tasteProfile?.budget_tier || 'Reserve ($500 - $2,500)'}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-slate-400 block mb-1">Preferred Notes:</span>
                                    <p className="text-slate-300 font-medium">{tasteProfile?.preferred_notes || 'Bordeaux, Cabernet, Oak'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
