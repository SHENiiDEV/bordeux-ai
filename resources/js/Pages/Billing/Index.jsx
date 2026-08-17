import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import AgeVerificationModal from '../../Components/AgeVerificationModal';
import { CreditCard, ShieldCheck, Check, Lock, ExternalLink } from 'lucide-react';
import axios from 'axios';

export default function BillingIndex({ membership, transactions }) {
    const [selectedTier, setSelectedTier] = useState('grand_cru');
    const [billingCycle, setBillingCycle] = useState('annual'); // 'monthly' | 'annual'
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        setLoading(true);
        try {
            const res = await axios.post(route('billing.checkout'), {
                tier: selectedTier,
                gateway: 'ezzygate', // Automatic high-ticket gateway routing
                billing_cycle: billingCycle,
            });

            if (res.data?.invoice_url) {
                window.location.href = res.data.invoice_url;
            }
        } catch (err) {
            alert('Failed to initiate payment session. Please contact your concierge.');
        } finally {
            setLoading(false);
        }
    };

    const tiers = [
        {
            id: 'reserve',
            name: 'Reserve Concierge',
            monthlyPrice: '€250',
            annualPrice: '€2,500',
            description: 'Access to Telegram AI Sommelier & cellaring database',
        },
        {
            id: 'grand_cru',
            name: 'Grand Cru Tier',
            monthlyPrice: '€500',
            annualPrice: '€5,000',
            description: 'Full sommelier AI, custom vintage alerts & priority concierge response',
            popular: true,
        },
        {
            id: 'rare_vintage',
            name: 'Rare Vintage Private Access',
            monthlyPrice: '€1,200',
            annualPrice: '€12,000',
            description: 'Bespoke sommelier consultation, auction tracking & private vault concierge',
        },
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-slate-100 flex flex-col font-sans">
            <Head title="Private Membership & Billing — Bordeux AI" />
            <AgeVerificationModal />
            <Navbar />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4a0e17] to-[#160609] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
                            <CreditCard className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="font-serif-luxury text-3xl font-bold text-white tracking-tight">Membership Concierge</h1>
                            <p className="text-xs text-slate-400">Select your preferred membership tier and billing interval</p>
                        </div>
                    </div>

                    {/* Monthly / Annual Toggle */}
                    <div className="inline-flex items-center p-1 rounded-2xl bg-[#120d12] border border-[#d4af37]/25">
                        <button
                            type="button"
                            onClick={() => setBillingCycle('monthly')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
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
                            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center space-x-1.5 ${
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

                {/* Tiers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {tiers.map((t) => {
                        const displayPrice = billingCycle === 'annual' ? t.annualPrice : t.monthlyPrice;
                        const periodLabel = billingCycle === 'annual' ? '/ year' : '/ month';

                        return (
                            <div
                                key={t.id}
                                onClick={() => setSelectedTier(t.id)}
                                className={`glass-panel p-8 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-6 ${
                                    selectedTier === t.id
                                        ? 'border-[#d4af37] bg-gradient-to-b from-[#4a0e17]/40 to-[#0a0a0a] shadow-2xl scale-[1.02]'
                                        : 'border-[#d4af37]/15 opacity-80 hover:opacity-100'
                                }`}
                            >
                                <div className="space-y-4">
                                    {t.popular && (
                                        <span className="inline-block text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-[#d4af37]/20 text-[#f3cf65] border border-[#d4af37]/40">
                                            Most Selected
                                        </span>
                                    )}
                                    <h3 className="font-serif-luxury text-2xl font-bold text-white">{t.name}</h3>
                                    <p className="text-xs text-slate-300 leading-relaxed">{t.description}</p>
                                    <div className="flex items-baseline space-x-1">
                                        <span className="text-3xl font-bold text-[#f3cf65] font-serif-luxury">{displayPrice}</span>
                                        <span className="text-xs text-slate-400 font-medium">{periodLabel}</span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-[#d4af37]/15">
                                    <div className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-center transition ${
                                        selectedTier === t.id ? 'bg-[#d4af37] text-black' : 'bg-[#120d12] text-slate-400'
                                    }`}>
                                        {selectedTier === t.id ? 'Selected Tier' : 'Choose Tier'}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Checkout Panel */}
                <div className="glass-panel p-8 rounded-3xl border border-[#d4af37]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="text-xs text-slate-400 flex items-center space-x-2">
                        <Lock className="w-5 h-5 text-emerald-400 shrink-0" />
                        <span>256-bit Encrypted S2S Transactional Signature Protection. Direct concierge vault settlement.</span>
                    </div>

                    <button
                        onClick={handleCheckout}
                        disabled={loading}
                        className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#4a0e17] via-[#6b1422] to-[#4a0e17] text-[#f3cf65] text-xs font-bold uppercase tracking-wider border border-[#d4af37]/50 hover:border-[#d4af37] shadow-xl transition flex items-center space-x-2 shrink-0"
                    >
                        <span>{loading ? 'Processing...' : 'Proceed to Checkout Invoice'}</span>
                        <ExternalLink className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
