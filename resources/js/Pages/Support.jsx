import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import AgeVerificationModal from '../Components/AgeVerificationModal';
import { Mail, CreditCard, Bot, HelpCircle, ChevronDown, ChevronUp, ArrowRight, ShieldCheck, FileText, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Support({ companyName, companyAddress, companyEmail, companyPhone, companyTaxId, supportEmail }) {
    const [openFaq, setOpenFaq] = useState(0);

    const supportChannels = [
        {
            title: 'Executive Email Support',
            subtitle: '24-48-Hour SLA Direct Response',
            icon: Mail,
            actionText: `Email ${companyEmail || 'info@bordeux.co.uk'}`,
            actionUrl: `mailto:${companyEmail || 'info@bordeux.co.uk'}`,
            isExternal: true,
            desc: 'Direct line to our senior sommelier & technical support concierges.'
        },
        {
            title: 'B2B PDF Tax Invoices',
            subtitle: 'Billing & Wallet Receipts',
            icon: FileText,
            actionText: 'View Wallet & Invoices',
            actionUrl: route('wallet.index'),
            isExternal: false,
            desc: `Instant access to official UK VAT receipts issued by ${companyName || 'GREAT LEADERS LTD'}.`
        },
        {
            title: 'Telegram Bot Syncing',
            subtitle: 'Hands-Free 6-Digit Code Pairing',
            icon: Bot,
            actionText: 'Open @BordeuxSommelierBot',
            actionUrl: 'https://t.me/BordeuxSommelierBot',
            isExternal: true,
            desc: 'Link your Telegram profile using your private 6-digit member code.'
        }
    ];

    const faqs = [
        {
            q: 'How does the Telegram voice & photo sommelier consultation work?',
            a: 'Once your account is active, open @BordeuxSommelierBot in Telegram and type /sync followed by your 6-digit member code found in your Dashboard. You can then send voice notes or photos of wine lists to receive instant pairing recommendations in under 1.2 seconds.'
        },
        {
            q: 'What is the 14-day refund policy for unconsumed wallet credits?',
            a: 'In compliance with UK consumer protection laws and our Refund Policy, members have a 14-day statutory right from purchase to request a full refund for any unconsumed wallet credits. Contact executive support to process returns directly to your original payment method.'
        },
        {
            q: 'How are official B2B PDF tax invoices generated?',
            a: `For every wallet top-up or service deduction, an official PDF receipt is generated in-memory by our DomPDF engine. Invoices display complete merchant of record details (${companyName || 'GREAT LEADERS LTD'}, ${companyTaxId || 'Company No. 15954666'}), line item breakdowns, and 0% UK B2B Reverse Charge tax status. Invoices can be downloaded at any time from your Wallet & Invoices dashboard.`
        },
        {
            q: 'Can I set custom taste filters (e.g. excluding green tannins or oak)?',
            a: 'Yes. Navigate to the "Taste Profile" section in your member dashboard to adjust your budget tier ($500 to $50,000+ per bottle) and configure your blacklisted aroma notes. Our DeepSeek algorithm filters out any wines containing your blacklisted descriptors.'
        },
        {
            q: 'Are raw credit card details stored on Bordeux AI servers?',
            a: 'No. Payment settlement requests are handled directly by specialized S2S merchant gateways. Bordeux AI servers never store or record raw credit card numbers or banking CVVs on our databases.'
        }
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-slate-100 flex flex-col font-sans selection:bg-[#4a0e17] selection:text-white">
            <Head title="Support & Help Desk — Bordeux AI" />
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
                        <HelpCircle className="w-4 h-4 text-[#d4af37]" />
                        <span>Support & Member Help Desk</span>
                    </motion.div>

                    <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold tracking-tight text-white">
                        How Can We Assist You?
                    </h1>
                    <p className="text-slate-300 text-sm sm:text-base font-light max-w-xl mx-auto">
                        Explore our quick assistance channels, step-by-step Telegram integration guides, and frequently asked member questions.
                    </p>
                </div>

                {/* Support Channels Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {supportChannels.map((channel, idx) => {
                        const IconComp = channel.icon;
                        return (
                            <div
                                key={idx}
                                className="glass-panel p-8 rounded-3xl border border-[#d4af37]/20 flex flex-col justify-between space-y-6 hover:border-[#d4af37]/40 transition group"
                            >
                                <div className="space-y-4">
                                    <div className="p-3 rounded-2xl bg-[#4a0e17] border border-[#d4af37]/30 text-[#f3cf65] w-fit">
                                        <IconComp className="w-6 h-6" />
                                    </div>

                                    <div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37] block mb-1">
                                            {channel.subtitle}
                                        </span>
                                        <h3 className="font-serif-luxury text-xl font-bold text-white group-hover:text-[#f3cf65] transition">
                                            {channel.title}
                                        </h3>
                                    </div>

                                    <p className="text-xs text-slate-300 font-light leading-relaxed">
                                        {channel.desc}
                                    </p>
                                </div>

                                {channel.isExternal ? (
                                    <a
                                        href={channel.actionUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-full py-3.5 rounded-xl glass-panel text-[#f3cf65] hover:text-white border border-[#d4af37]/30 hover:border-[#d4af37] font-bold text-xs uppercase tracking-widest text-center transition flex items-center justify-center space-x-2"
                                    >
                                        <span>{channel.actionText}</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </a>
                                ) : (
                                    <Link
                                        href={channel.actionUrl}
                                        className="w-full py-3.5 rounded-xl glass-panel text-[#f3cf65] hover:text-white border border-[#d4af37]/30 hover:border-[#d4af37] font-bold text-xs uppercase tracking-widest text-center transition flex items-center justify-center space-x-2"
                                    >
                                        <span>{channel.actionText}</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* FAQ Accordion Section */}
                <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-[#d4af37]/25 space-y-8">
                    <div className="text-center max-w-2xl mx-auto space-y-2">
                        <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">Frequently Asked Questions</h2>
                        <p className="text-xs text-slate-400">Everything you need to know about Bordeux AI membership & billing</p>
                    </div>

                    <div className="space-y-4 max-w-4xl mx-auto">
                        {faqs.map((faq, idx) => {
                            const isOpen = openFaq === idx;
                            return (
                                <div
                                    key={idx}
                                    className={`rounded-2xl border transition-all overflow-hidden ${
                                        isOpen ? 'glass-panel-burgundy border-[#d4af37]' : 'bg-[#070707]/60 border-slate-800'
                                    }`}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                                        className="w-full p-5 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-white hover:text-[#f3cf65] transition"
                                    >
                                        <span>{faq.q}</span>
                                        {isOpen ? <ChevronUp className="w-4 h-4 text-[#d4af37] shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />}
                                    </button>

                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="px-5 pb-5 text-xs text-slate-300 font-light leading-relaxed border-t border-[#d4af37]/15 pt-3"
                                            >
                                                {faq.a}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Direct Contact Banner */}
                <div className="glass-panel-burgundy p-10 rounded-3xl border border-[#d4af37]/30 text-center space-y-6 shadow-2xl">
                    <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">Have a Specific Inquiry Not Covered Here?</h2>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto font-light">
                        Submit a dedicated ticket to our executive support team for personalized assistance.
                    </p>
                    <div className="pt-2">
                        <Link
                            href={route('contact')}
                            className="px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest bg-gradient-to-r from-[#4a0e17] via-[#6b1422] to-[#4a0e17] text-[#f3cf65] border border-[#d4af37]/50 hover:border-[#d4af37] shadow-xl transition inline-flex items-center space-x-2"
                        >
                            <span>Open Support Ticket Form</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="border-t border-[#d4af37]/10 bg-[#070707] py-8 text-center text-xs text-slate-500">
                <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p>© 2026 {companyName || 'GREAT LEADERS LTD'} ({companyTaxId || 'Company No. 15954666'}). All rights reserved.</p>
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
