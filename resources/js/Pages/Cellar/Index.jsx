import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import AgeVerificationModal from '../../Components/AgeVerificationModal';
import { Wine, Plus, Trash2, Award, Download, Clock, DollarSign, Layers, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CellarIndex({ wines, stats }) {
    const [showAddModal, setShowAddModal] = useState(false);
    const [filterSegment, setFilterSegment] = useState('All');

    const { data, setData, post, processing, reset, errors } = useForm({
        wine_name: '',
        region: '',
        type: 'Red Wine',
        price_segment: 'Grand Cru',
        vintage_year: 2018,
        peak_drinking_start: 2026,
        peak_drinking_end: 2045,
        estimated_value: 1200.00,
        bottle_count: 1,
        notes: '',
    });

    const handleAddBottle = (e) => {
        e.preventDefault();
        post(route('cellar.store'), {
            onSuccess: () => {
                reset();
                setShowAddModal(false);
            },
        });
    };

    const filteredWines = wines.filter((w) => {
        if (filterSegment === 'All') return true;
        return w.price_segment === filterSegment;
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case 'peak_now':
                return (
                    <span className="inline-flex items-center space-x-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                        <span>🍷 Peak Drinking Window</span>
                    </span>
                );
            case 'aging':
                return (
                    <span className="inline-flex items-center space-x-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#4a0e17] text-[#f3cf65] border border-[#d4af37]/30">
                        <span>⏳ Hold for Aging</span>
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center space-x-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700">
                        <span>Ready to Drink</span>
                    </span>
                );
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-slate-100 flex flex-col font-sans">
            <Head title="My Private Wine Cellar — Bordeux AI" />
            <AgeVerificationModal />
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
                {/* Header Banner */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4a0e17] to-[#160609] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shadow-xl">
                            <Wine className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="font-serif-luxury text-3xl font-bold text-white tracking-tight">My Wine Cellar</h1>
                            <p className="text-xs text-slate-400">Curated collection portfolio and vintage maturity tracking</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <a
                            href={route('cellar.export')}
                            className="px-4 py-3 rounded-xl glass-panel text-xs font-semibold uppercase tracking-wider text-slate-200 hover:text-white border border-[#d4af37]/30 hover:border-[#d4af37] transition flex items-center space-x-2 shadow-lg"
                        >
                            <Download className="w-4 h-4 text-[#d4af37]" />
                            <span>Export CSV</span>
                        </a>

                        <button
                            onClick={() => setShowAddModal(true)}
                            className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#4a0e17] to-[#6b1422] text-[#f3cf65] text-xs font-bold uppercase tracking-wider border border-[#d4af37]/40 hover:border-[#d4af37] shadow-lg transition flex items-center space-x-2"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Add Bottle to Cellar</span>
                        </button>
                    </div>
                </div>

                {/* Valuation Stats Summary Banner */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="glass-panel p-6 rounded-3xl border border-[#d4af37]/20 flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total Valuation</span>
                            <p className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#f3cf65]">
                                €{stats?.total_valuation ? stats.total_valuation.toLocaleString() : '20,800'}
                            </p>
                        </div>
                        <div className="p-3 rounded-2xl bg-[#4a0e17]/50 border border-[#d4af37]/30 text-[#d4af37]">
                            <DollarSign className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="glass-panel p-6 rounded-3xl border border-[#d4af37]/20 flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Bottles Stored</span>
                            <p className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#f3cf65]">
                                {stats?.total_bottles || 11} <span className="text-xs text-slate-400 font-sans font-normal">bottles</span>
                            </p>
                        </div>
                        <div className="p-3 rounded-2xl bg-[#4a0e17]/50 border border-[#d4af37]/30 text-[#d4af37]">
                            <Layers className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="glass-panel p-6 rounded-3xl border border-[#d4af37]/20 flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Avg Sommelier Score</span>
                            <p className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#f3cf65]">
                                {stats?.avg_rating || 99.4} <span className="text-xs text-slate-400 font-sans font-normal">/ 100</span>
                            </p>
                        </div>
                        <div className="p-3 rounded-2xl bg-[#4a0e17]/50 border border-[#d4af37]/30 text-[#d4af37]">
                            <Award className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center space-x-2 border-b border-[#d4af37]/15 pb-4 overflow-x-auto">
                    {['All', 'Grand Cru', 'Premier Cru', 'Rare Vintage'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setFilterSegment(tab)}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition ${
                                filterSegment === tab
                                    ? 'bg-[#4a0e17] text-[#f3cf65] border border-[#d4af37]/40 shadow-lg'
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Bento Grid layout */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {filteredWines.map((wine, index) => (
                            <motion.div
                                key={wine.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="glass-panel p-6 rounded-3xl border border-[#d4af37]/20 flex flex-col justify-between space-y-4 hover:border-[#d4af37]/50 transition group"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-start justify-between">
                                        {getStatusBadge(wine.drinking_status)}
                                        <div className="flex items-center space-x-1 text-[#f3cf65] text-xs font-bold">
                                            <Award className="w-4 h-4 text-[#d4af37]" />
                                            <span>{wine.ai_rating ? `${wine.ai_rating}` : '98.5'}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-serif-luxury text-lg font-bold text-white group-hover:text-[#f3cf65] transition line-clamp-1">
                                            {wine.wine_name}
                                        </h3>
                                        <div className="flex items-center justify-between text-xs text-slate-400 mt-1">
                                            <span>{wine.region || 'Bordeaux, France'}</span>
                                            {wine.vintage_year && <span className="font-semibold text-white">Vintage {wine.vintage_year}</span>}
                                        </div>
                                    </div>

                                    {/* Valuation & Quantity Tag */}
                                    <div className="p-3 rounded-xl bg-[#070707]/70 border border-slate-800 flex items-center justify-between text-xs">
                                        <div>
                                            <span className="text-slate-400 block text-[10px] uppercase">Est. Bottle Value:</span>
                                            <span className="font-bold text-[#f3cf65]">€{wine.estimated_value ? wine.estimated_value.toLocaleString() : '1,200'}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-slate-400 block text-[10px] uppercase">Quantity:</span>
                                            <span className="font-semibold text-white">{wine.bottle_count || 1} btls</span>
                                        </div>
                                    </div>

                                    {wine.notes && (
                                        <p className="text-xs text-slate-300 italic bg-[#070707]/40 p-3 rounded-xl border border-slate-800 line-clamp-2">
                                            "{wine.notes}"
                                        </p>
                                    )}
                                </div>

                                <div className="pt-3 border-t border-[#d4af37]/15 flex items-center justify-between text-xs text-slate-500">
                                    <span>
                                        {wine.peak_drinking_start && wine.peak_drinking_end
                                            ? `Peak: ${wine.peak_drinking_start} – ${wine.peak_drinking_end}`
                                            : 'Ready for tasting'}
                                    </span>
                                    <button
                                        onClick={() => {
                                            if (confirm(`Remove ${wine.wine_name} from your cellar?`)) {
                                                window.location.href = route('cellar.destroy', wine.id);
                                            }
                                        }}
                                        className="text-slate-500 hover:text-rose-400 transition"
                                        title="Remove Bottle"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Add Bottle Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
                    <div className="glass-panel-burgundy max-w-lg w-full p-8 rounded-3xl border border-[#d4af37]/30 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="font-serif-luxury text-xl font-bold text-white">Add Bottle to Vault Cellar</h3>
                            <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white text-sm">✕</button>
                        </div>

                        <form onSubmit={handleAddBottle} className="space-y-4 text-xs">
                            <div>
                                <label className="block text-slate-300 mb-1">Wine Producer & Name *</label>
                                <input
                                    type="text"
                                    required
                                    maxLength={200}
                                    value={data.wine_name}
                                    onChange={(e) => setData('wine_name', e.target.value)}
                                    placeholder="e.g. Château Haut-Brion 2015"
                                    className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 rounded-xl p-3 text-white focus:outline-none focus:border-[#d4af37]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-slate-300 mb-1">Region / Appellation</label>
                                    <input
                                        type="text"
                                        maxLength={200}
                                        value={data.region}
                                        onChange={(e) => setData('region', e.target.value)}
                                        placeholder="Pessac-Léognan, Bordeaux"
                                        className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 rounded-xl p-3 text-white focus:outline-none focus:border-[#d4af37]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-slate-300 mb-1">Vintage Year</label>
                                    <input
                                        type="number"
                                        min="1900"
                                        max="2090"
                                        value={data.vintage_year}
                                        onChange={(e) => setData('vintage_year', parseInt(e.target.value))}
                                        className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 rounded-xl p-3 text-white focus:outline-none focus:border-[#d4af37]"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-slate-300 mb-1">Est. Bottle Value (€)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={data.estimated_value}
                                        onChange={(e) => setData('estimated_value', parseFloat(e.target.value))}
                                        className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 rounded-xl p-3 text-white focus:outline-none focus:border-[#d4af37]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-slate-300 mb-1">Quantity (Bottles)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={data.bottle_count}
                                        onChange={(e) => setData('bottle_count', parseInt(e.target.value))}
                                        className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 rounded-xl p-3 text-white focus:outline-none focus:border-[#d4af37]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-slate-300 mb-1">Notes & Vault Storage Location</label>
                                <textarea
                                    rows={2}
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    placeholder="Tasting notes, storage rack #, cork condition..."
                                    className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 rounded-xl p-3 text-white focus:outline-none focus:border-[#d4af37]"
                                />
                            </div>

                            <div className="pt-4 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-400 hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#4a0e17] to-[#6b1422] text-[#f3cf65] font-bold border border-[#d4af37]/40"
                                >
                                    Add to Collection
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
