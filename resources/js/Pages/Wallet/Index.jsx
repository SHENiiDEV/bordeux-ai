import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import AgeVerificationModal from '../../Components/AgeVerificationModal';
import { Wallet, Plus, FileText, Download, ArrowUpRight, ArrowDownLeft, ShieldCheck, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WalletIndex({ balance, payments }) {
    const [selectedAmount, setSelectedAmount] = useState(499);
    const [serviceName, setServiceName] = useState('Voltoria AI Pro Institutional Memorandum');

    const { data, setData, post, processing, errors } = useForm({
        amount: 499,
        service_name: 'Voltoria AI Pro Institutional Memorandum',
    });

    const presetPackages = [
        { name: 'Starter Analysis Credit', amount: 149, desc: 'Single business brief & financial model' },
        { name: 'Voltoria AI Pro Institutional Memorandum', amount: 499, desc: 'Full 6-page memo, 3-year P&L, Unit Economics' },
        { name: 'Institutional Venture Vault', amount: 1499, desc: 'Unlimited briefs, white-glove concierge audit' },
    ];

    const handleTopUp = (pkg) => {
        setData({
            amount: pkg.amount,
            service_name: pkg.name,
        });
        setSelectedAmount(pkg.amount);
        setServiceName(pkg.name);
    };

    const submitTopUp = (e) => {
        e.preventDefault();
        post(route('wallet.topup'));
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-slate-100 flex flex-col font-sans selection:bg-[#4a0e17] selection:text-white">
            <Head title="Wallet & PDF Invoices — Voltoria AI" />
            <AgeVerificationModal />
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4a0e17] to-[#160609] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shadow-xl">
                            <Wallet className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="font-serif-luxury text-3xl font-bold text-white tracking-tight">Account Wallet & Tax Invoices</h1>
                            <p className="text-xs text-slate-400">Merchant of Record: INCHWARD LIMITED (UK Co. No. 16021412)</p>
                        </div>
                    </div>
                </div>

                {/* Balance Summary Banner */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-panel-burgundy p-6 sm:p-8 rounded-3xl border border-[#d4af37]/30 flex items-center justify-between shadow-2xl col-span-2">
                        <div className="space-y-2">
                            <span className="text-xs uppercase font-bold tracking-widest text-[#f3cf65] px-3 py-1 rounded bg-[#4a0e17] border border-[#d4af37]/30">
                                Available Balance
                            </span>
                            <h2 className="font-serif-luxury text-4xl sm:text-5xl font-bold text-white">
                                €{balance ? balance.toFixed(2) : '0.00'}{' '}
                                <span className="text-sm font-sans font-normal text-slate-300">EUR</span>
                            </h2>
                            <p className="text-xs text-slate-300 font-light">
                                Funds are immediately consumable for AI business plan generation and institutional report exports.
                            </p>
                        </div>

                        <div className="hidden sm:flex p-4 rounded-2xl bg-[#4a0e17]/60 border border-[#d4af37]/40 text-[#f3cf65]">
                            <ShieldCheck className="w-10 h-10" />
                        </div>
                    </div>

                    <div className="glass-panel p-6 rounded-3xl border border-[#d4af37]/20 flex flex-col justify-between">
                        <div className="space-y-1">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Total Transactions</span>
                            <p className="font-serif-luxury text-3xl font-bold text-white">{payments?.length || 0}</p>
                        </div>
                        <div className="text-xs text-slate-400">
                            Automatic B2B PDF Tax Invoices generated for every topup and service deduction.
                        </div>
                    </div>
                </div>

                {/* TopUp Packages */}
                <div className="glass-panel p-8 rounded-3xl border border-[#d4af37]/20 space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-serif-luxury text-xl font-bold text-white">Top-Up Wallet Credit</h3>
                            <p className="text-xs text-slate-400">Select a credit package for instant wallet allocation</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {presetPackages.map((pkg, idx) => (
                            <div
                                key={idx}
                                onClick={() => handleTopUp(pkg)}
                                className={`p-6 rounded-2xl border transition cursor-pointer flex flex-col justify-between space-y-4 ${
                                    data.amount === pkg.amount
                                        ? 'glass-panel-burgundy border-[#d4af37] shadow-xl scale-[1.02]'
                                        : 'bg-[#120d12]/80 border-slate-800 hover:border-[#d4af37]/40'
                                }`}
                            >
                                <div className="space-y-2">
                                    <h4 className="font-serif-luxury text-base font-bold text-white">{pkg.name}</h4>
                                    <p className="text-xs text-slate-400">{pkg.desc}</p>
                                </div>

                                <div className="flex items-baseline justify-between pt-3 border-t border-[#d4af37]/15">
                                    <span className="font-serif-luxury text-2xl font-bold text-[#f3cf65]">€{pkg.amount}</span>
                                    {data.amount === pkg.amount && <CheckCircle className="w-5 h-5 text-[#d4af37]" />}
                                </div>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={submitTopUp} className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#d4af37]/15">
                        <div className="text-xs text-slate-400">
                            Selected: <strong className="text-white">{data.service_name} (€{data.amount})</strong>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#4a0e17] via-[#6b1422] to-[#4a0e17] text-[#f3cf65] font-bold text-xs uppercase tracking-widest border border-[#d4af37]/50 hover:border-[#d4af37] shadow-xl transition flex items-center justify-center space-x-2"
                        >
                            <Plus className="w-4 h-4" />
                            <span>{processing ? 'Processing Refill...' : `Top-Up €${data.amount} EUR`}</span>
                        </button>
                    </form>
                </div>

                {/* Activity & Invoices Table */}
                <div className="glass-panel p-8 rounded-3xl border border-[#d4af37]/20 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="font-serif-luxury text-xl font-bold text-white">Payment & Invoice History</h3>
                        <span className="text-xs text-slate-400">Official B2B Tax Receipts</span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead>
                                <tr className="border-b border-[#d4af37]/20 text-[#f3cf65] font-bold uppercase tracking-wider">
                                    <th className="pb-3">Date</th>
                                    <th className="pb-3">Type</th>
                                    <th className="pb-3">Service Description</th>
                                    <th className="pb-3">Reference No</th>
                                    <th className="pb-3 text-right">Amount</th>
                                    <th className="pb-3 text-right">Official Tax Invoice</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {payments && payments.length > 0 ? (
                                    payments.map((tx) => (
                                        <tr key={tx.id} className="hover:bg-[#120d12]/50 transition">
                                            <td className="py-4 text-slate-300">
                                                {tx.created_at ? new Date(tx.created_at).toLocaleDateString() : 'Today'}
                                            </td>
                                            <td className="py-4">
                                                {tx.type === 'topup' ? (
                                                    <span className="inline-flex items-center space-x-1 text-emerald-400 font-bold px-2.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-800">
                                                        <ArrowDownLeft className="w-3 h-3" />
                                                        <span>Topup</span>
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center space-x-1 text-rose-400 font-bold px-2.5 py-0.5 rounded bg-rose-950/60 border border-rose-900">
                                                        <ArrowUpRight className="w-3 h-3" />
                                                        <span>Deduction</span>
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-4 font-semibold text-white">
                                                {tx.service_name || 'Voltoria AI Service'}
                                            </td>
                                            <td className="py-4 font-mono text-slate-400">
                                                {tx.gateway_reference}
                                            </td>
                                            <td className="py-4 text-right font-bold text-white">
                                                {tx.type === 'topup' ? `+€${tx.amount.toFixed(2)}` : `-€${tx.amount.toFixed(2)}`}
                                            </td>
                                            <td className="py-4 text-right">
                                                <a
                                                    href={route('wallet.invoice', tx.id)}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#4a0e17] text-[#f3cf65] hover:text-white border border-[#d4af37]/40 hover:border-[#d4af37] font-bold text-[11px] transition shadow"
                                                >
                                                    <FileText className="w-3.5 h-3.5" />
                                                    <span>Invoice (PDF)</span>
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="py-8 text-center text-slate-500">
                                            No transaction activity recorded yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
