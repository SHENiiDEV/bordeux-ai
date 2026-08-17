import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import AgeVerificationModal from '../../Components/AgeVerificationModal';
import { Sliders, Sparkles, Check, Plus, X, Flame, ShieldAlert, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TasteProfileIndex({ profile }) {
    const { data, setData, put, processing, errors, recentlySuccessful } = useForm({
        budget_tier: profile?.budget_tier || 'Grand Cru ($2,500 - $10,000/bottle)',
        preferred_notes: profile?.preferred_notes || 'Bordeaux, Cabernet Sauvignon, Cedar wood, Graphite, Dark cherry',
        blacklisted_notes: profile?.blacklisted_notes || 'Over-extracted oak, Excessive residual sugar',
        tannin_level: 8,
        acidity_level: 7,
        body_level: 9,
        oak_level: 6,
    });

    const budgetTiers = [
        'Classic Reserve ($250 - $1,000/bottle)',
        'Premier Reserve ($1,000 - $2,500/bottle)',
        'Grand Cru ($2,500 - $10,000/bottle)',
        'Rare Vintage & Auction ($10,000+/bottle)',
    ];

    const presetPreferredNotes = [
        'Bordeaux Reds', 'Cabernet Sauvignon', 'Pinot Noir', 'Cedar Wood', 
        'Graphite', 'Dark Cherry', 'Blackcurrant', 'Violet', 'Leather', 
        'Truffle', 'Cassis', 'Smokey Oak', 'Chablis Minerality'
    ];

    const presetBlacklistedNotes = [
        'Over-extracted oak', 'Excessive residual sugar', 'High Alcohol Burn', 
        'Green Tannins', 'Brettanomyces', 'Oxidized Fruit', 'Synthetic Vanilla'
    ];

    const toggleNote = (note, field) => {
        const currentNotes = data[field] ? data[field].split(',').map(n => n.trim()).filter(Boolean) : [];
        let newNotes;
        if (currentNotes.includes(note)) {
            newNotes = currentNotes.filter(n => n !== note);
        } else {
            newNotes = [...currentNotes, note];
        }
        setData(field, newNotes.join(', '));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('taste-profile.update'));
    };

    const currentPreferredList = data.preferred_notes ? data.preferred_notes.split(',').map(n => n.trim()).filter(Boolean) : [];
    const currentBlacklistedList = data.blacklisted_notes ? data.blacklisted_notes.split(',').map(n => n.trim()).filter(Boolean) : [];

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-slate-100 flex flex-col font-sans">
            <Head title="Personal Taste Algorithm — Bordeux AI" />
            <AgeVerificationModal />
            <Navbar />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
                {/* Header */}
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4a0e17] to-[#160609] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shadow-xl">
                        <Sliders className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="font-serif-luxury text-3xl font-bold text-white tracking-tight">Personal Taste Algorithm</h1>
                        <p className="text-xs text-slate-400">Configure your taste parameters for hyper-personalized DeepSeek AI sommelier recommendations</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-3xl border border-[#d4af37]/20 space-y-10">
                    {recentlySuccessful && (
                        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center space-x-2">
                            <Check className="w-4 h-4 text-emerald-400" />
                            <span>Your taste algorithm parameters have been updated and synchronized with Bordeux AI.</span>
                        </div>
                    )}

                    {/* SECTION 1: Target Budget Segment */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-bold uppercase tracking-widest text-[#f3cf65] flex items-center space-x-2">
                                <span>1. Target Budget Tier Segment</span>
                            </label>
                            <span className="text-[10px] text-slate-400 uppercase font-medium">Controls AI price filter</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {budgetTiers.map((tier) => (
                                <button
                                    type="button"
                                    key={tier}
                                    onClick={() => setData('budget_tier', tier)}
                                    className={`p-4 rounded-2xl text-left border transition-all text-xs font-medium ${
                                        data.budget_tier === tier
                                            ? 'bg-gradient-to-r from-[#4a0e17] to-[#6b1422] border-[#d4af37] text-white font-bold shadow-xl'
                                            : 'bg-[#120d12]/70 border-slate-800 text-slate-400 hover:border-[#d4af37]/40'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span>{tier}</span>
                                        {data.budget_tier === tier && <Check className="w-4 h-4 text-[#f3cf65]" />}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* SECTION 2: Structural Taste Sliders */}
                    <div className="space-y-6 pt-4 border-t border-[#d4af37]/15">
                        <label className="text-xs font-bold uppercase tracking-widest text-[#f3cf65] block">
                            2. Structural Palate Preferences (1 – 10 Scale)
                        </label>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#070707]/80 p-6 rounded-2xl border border-slate-800">
                            {/* Tannin Slider */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-300 font-semibold">Tannin Structure (Silky vs Firm)</span>
                                    <span className="text-[#f3cf65] font-bold">{data.tannin_level} / 10</span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    value={data.tannin_level}
                                    onChange={(e) => setData('tannin_level', parseInt(e.target.value))}
                                    className="w-full accent-[#d4af37] bg-slate-800 rounded-lg h-1.5 cursor-pointer"
                                />
                            </div>

                            {/* Acidity Slider */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-300 font-semibold">Acidity & Freshness</span>
                                    <span className="text-[#f3cf65] font-bold">{data.acidity_level} / 10</span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    value={data.acidity_level}
                                    onChange={(e) => setData('acidity_level', parseInt(e.target.value))}
                                    className="w-full accent-[#d4af37] bg-slate-800 rounded-lg h-1.5 cursor-pointer"
                                />
                            </div>

                            {/* Body Slider */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-300 font-semibold">Body & Concentration</span>
                                    <span className="text-[#f3cf65] font-bold">{data.body_level} / 10</span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    value={data.body_level}
                                    onChange={(e) => setData('body_level', parseInt(e.target.value))}
                                    className="w-full accent-[#d4af37] bg-slate-800 rounded-lg h-1.5 cursor-pointer"
                                />
                            </div>

                            {/* Oak Slider */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-300 font-semibold">Oak Influence & Toast</span>
                                    <span className="text-[#f3cf65] font-bold">{data.oak_level} / 10</span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    value={data.oak_level}
                                    onChange={(e) => setData('oak_level', parseInt(e.target.value))}
                                    className="w-full accent-[#d4af37] bg-slate-800 rounded-lg h-1.5 cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>

                    {/* SECTION 3: Preferred Notes Selector */}
                    <div className="space-y-4 pt-4 border-t border-[#d4af37]/15">
                        <label className="text-xs font-bold uppercase tracking-widest text-[#f3cf65] block">
                            3. Preferred Flavor Notes & Grape Varieties
                        </label>
                        
                        {/* Quick Preset Tags */}
                        <div className="flex flex-wrap gap-2">
                            {presetPreferredNotes.map((note) => {
                                const isSelected = currentPreferredList.includes(note);
                                return (
                                    <button
                                        type="button"
                                        key={note}
                                        onClick={() => toggleNote(note, 'preferred_notes')}
                                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition ${
                                            isSelected
                                                ? 'bg-[#4a0e17] text-[#f3cf65] border-[#d4af37]'
                                                : 'bg-[#120d12]/80 border-slate-800 text-slate-400 hover:border-[#d4af37]/40'
                                        }`}
                                    >
                                        {isSelected ? `✓ ${note}` : `+ ${note}`}
                                    </button>
                                );
                            })}
                        </div>

                        <input
                            type="text"
                            maxLength={200}
                            value={data.preferred_notes}
                            onChange={(e) => setData('preferred_notes', e.target.value)}
                            placeholder="Add custom notes separated by comma..."
                            className="w-full bg-[#120d12]/90 border border-[#d4af37]/20 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                        />
                    </div>

                    {/* SECTION 4: Blacklisted Notes Selector */}
                    <div className="space-y-4 pt-4 border-t border-[#d4af37]/15">
                        <label className="text-xs font-bold uppercase tracking-widest text-rose-400 block">
                            4. Blacklisted Notes (Aromas or Flaws to Exclude)
                        </label>
                        
                        <div className="flex flex-wrap gap-2">
                            {presetBlacklistedNotes.map((note) => {
                                const isSelected = currentBlacklistedList.includes(note);
                                return (
                                    <button
                                        type="button"
                                        key={note}
                                        onClick={() => toggleNote(note, 'blacklisted_notes')}
                                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition ${
                                            isSelected
                                                ? 'bg-rose-950 text-rose-300 border-rose-600'
                                                : 'bg-[#120d12]/80 border-slate-800 text-slate-400 hover:border-rose-900/50'
                                        }`}
                                    >
                                        {isSelected ? `✕ ${note}` : `+ ${note}`}
                                    </button>
                                );
                            })}
                        </div>

                        <input
                            type="text"
                            maxLength={200}
                            value={data.blacklisted_notes}
                            onChange={(e) => setData('blacklisted_notes', e.target.value)}
                            placeholder="Add custom blacklisted notes separated by comma..."
                            className="w-full bg-[#120d12]/90 border border-rose-900/30 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-rose-500"
                        />
                    </div>

                    <div className="pt-6 flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#4a0e17] via-[#6b1422] to-[#4a0e17] text-[#f3cf65] text-xs font-bold uppercase tracking-wider border border-[#d4af37]/50 hover:border-[#d4af37] shadow-xl transition"
                        >
                            {processing ? 'Synchronizing...' : 'Save & Synchronize Taste Algorithm'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
