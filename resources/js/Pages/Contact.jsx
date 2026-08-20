import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import AgeVerificationModal from '../Components/AgeVerificationModal';
import { Mail, Building2, MapPin, Send, CheckCircle2, ShieldCheck, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact({ companyName, companyNumber, companyAddress, supportEmail }) {
    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
        name: '',
        email: '',
        subject: 'Private Member Concierge Inquiry',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('contact.submit'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-slate-100 flex flex-col font-sans selection:bg-[#4a0e17] selection:text-white">
            <Head title="Contact Executive Support — Bordeux AI" />
            <AgeVerificationModal />
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full space-y-12">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass-panel-burgundy border border-[#d4af37]/40 text-[#f3cf65] text-xs font-bold uppercase tracking-widest shadow-xl"
                    >
                        <Mail className="w-4 h-4 text-[#d4af37]" />
                        <span>Executive Support & Concierge Desk</span>
                    </motion.div>

                    <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold tracking-tight text-white">
                        Contact Executive Concierge
                    </h1>
                    <p className="text-slate-300 text-sm sm:text-base font-light max-w-xl mx-auto">
                        Have inquiries regarding bespoke sommelier consultation, corporate B2B invoicing, or high-ticket vault management? Our team responds within 24-48 hours.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Corporate Entity Info Cards */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="glass-panel p-8 rounded-3xl border border-[#d4af37]/20 space-y-6">
                            <h3 className="font-serif-luxury text-xl font-bold text-white border-b border-[#d4af37]/15 pb-4">
                                Corporate Details
                            </h3>

                            <div className="space-y-4 text-xs">
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 rounded-2xl bg-[#4a0e17] border border-[#d4af37]/30 text-[#f3cf65] shrink-0">
                                        <Building2 className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Operating Corporate Entity</span>
                                        <span className="font-bold text-white text-sm">{companyName || 'GREAT LEADERS LTD'}</span>
                                        <p className="text-[#d4af37] text-[11px] font-semibold mt-0.5">Company Reg No: {companyNumber || '15954666'}</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="p-3 rounded-2xl bg-[#4a0e17] border border-[#d4af37]/30 text-[#f3cf65] shrink-0">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Registered Office Address</span>
                                        <p className="font-medium text-slate-200 leading-relaxed mt-0.5">
                                            {companyAddress || 'Dept 6193 43 Owston Road, Carcroft, Doncaster, DN6 8DA'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="p-3 rounded-2xl bg-[#4a0e17] border border-[#d4af37]/30 text-[#f3cf65] shrink-0">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Direct Concierge Email</span>
                                        <a href={`mailto:${supportEmail}`} className="font-bold text-[#f3cf65] text-sm hover:underline">
                                            {supportEmail || 'support@fitninja.co.uk'}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-panel-burgundy p-6 rounded-3xl border border-[#d4af37]/30 text-xs space-y-2">
                            <div className="flex items-center space-x-2 text-[#f3cf65] font-bold">
                                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                                <span>24-48-Hour SLA Support Guarantee</span>
                            </div>
                            <p className="text-slate-300 font-light leading-relaxed">
                                All member inquiries submitted through this form are assigned a unique support ticket reference and processed under AES-256 privacy protection.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Support Ticket Form */}
                    <div className="lg:col-span-7">
                        <form onSubmit={handleSubmit} className="glass-panel p-8 sm:p-10 rounded-3xl border border-[#d4af37]/25 space-y-6 text-xs shadow-2xl">
                            <h3 className="font-serif-luxury text-xl font-bold text-white border-b border-[#d4af37]/15 pb-4">
                                Submit Executive Support Ticket
                            </h3>

                            {recentlySuccessful && (
                                <motion.div 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-semibold flex items-center space-x-3 shadow-xl"
                                >
                                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                                    <div>
                                        <p className="font-bold text-white">Support Ticket Submitted</p>
                                        <p className="text-[11px] text-emerald-300 font-light">Your inquiry has been dispatched to {supportEmail}. Our concierge will respond shortly.</p>
                                    </div>
                                </motion.div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Your Full Name *</label>
                                    <input
                                        type="text"
                                        required
                                        maxLength={200}
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Lord / Lady / Full Name"
                                        className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 rounded-xl p-3.5 text-white focus:outline-none focus:border-[#d4af37]"
                                    />
                                    {errors.name && <p className="text-rose-400 mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Your Email Address *</label>
                                    <input
                                        type="email"
                                        required
                                        maxLength={200}
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="concierge@domain.com"
                                        className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 rounded-xl p-3.5 text-white focus:outline-none focus:border-[#d4af37]"
                                    />
                                    {errors.email && <p className="text-rose-400 mt-1">{errors.email}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Subject *</label>
                                <input
                                    type="text"
                                    required
                                    maxLength={250}
                                    value={data.subject}
                                    onChange={(e) => setData('subject', e.target.value)}
                                    placeholder="e.g. B2B Invoice Request / Telegram Bot Pairing Assistance"
                                    className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 rounded-xl p-3.5 text-white focus:outline-none focus:border-[#d4af37]"
                                />
                                {errors.subject && <p className="text-rose-400 mt-1">{errors.subject}</p>}
                            </div>

                            <div>
                                <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Message Content *</label>
                                <textarea
                                    rows={5}
                                    required
                                    maxLength={5000}
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    placeholder="Describe your inquiry in detail..."
                                    className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 rounded-xl p-3.5 text-white focus:outline-none focus:border-[#d4af37]"
                                />
                                {errors.message && <p className="text-rose-400 mt-1">{errors.message}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#4a0e17] via-[#6b1422] to-[#4a0e17] text-[#f3cf65] font-bold text-xs uppercase tracking-widest border border-[#d4af37]/50 hover:border-[#d4af37] shadow-xl transition flex items-center justify-center space-x-2"
                            >
                                <Send className="w-4 h-4 text-[#d4af37]" />
                                <span>{processing ? 'Dispatching Ticket...' : 'Dispatch Support Ticket'}</span>
                            </button>
                        </form>
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
