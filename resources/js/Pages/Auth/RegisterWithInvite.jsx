import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import AgeVerificationModal from '../../Components/AgeVerificationModal';
import { KeyRound, ShieldCheck, UserCheck, Check } from 'lucide-react';
import { ALLOWED_COUNTRIES } from '../../Constants/countries';

export default function RegisterWithInvite({ code }) {
    const { data, setData, post, processing, errors } = useForm({
        invite_code: code,
        name: '',
        surname: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone_number: '',
        date_of_birth: '',
        address_street: '',
        address_city: '',
        address_country: 'United Kingdom',
        address_postcode: '',
        agreed_to_terms: false,
        telegram_username: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('invite.register'));
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-slate-100 flex flex-col font-sans selection:bg-[#4a0e17] selection:text-white">
            <Head title="Claim Invitation — Bordeux AI Private Club" />
            <AgeVerificationModal />
            <Navbar />

            <div className="max-w-2xl mx-auto px-4 py-12 flex-1 w-full space-y-8">
                <div className="text-center space-y-3">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#4a0e17] text-[#f3cf65] text-xs font-bold uppercase tracking-widest border border-[#d4af37]/30">
                        <KeyRound className="w-4 h-4 text-[#d4af37]" />
                        <span>Verified Invitation Token</span>
                    </div>
                    <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white tracking-tight">
                        Claim Private Membership
                    </h1>
                    <p className="text-xs text-slate-400 font-mono">Invite Code: {code}</p>
                </div>

                <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-3xl border border-[#d4af37]/20 space-y-6 text-xs shadow-2xl">
                    {/* SECTION 1: Personal Credentials */}
                    <div className="space-y-4">
                        <h3 className="font-serif-luxury text-base font-bold text-[#f3cf65] uppercase tracking-wider border-b border-[#d4af37]/15 pb-2">
                            1. Personal Identification
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">First Name *</label>
                                <input
                                    type="text"
                                    required
                                    maxLength={200}
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="First Name"
                                    className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 rounded-xl p-3 text-white focus:outline-none focus:border-[#d4af37]"
                                />
                                {errors.name && <p className="text-rose-400 mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Surname *</label>
                                <input
                                    type="text"
                                    required
                                    maxLength={200}
                                    value={data.surname}
                                    onChange={(e) => setData('surname', e.target.value)}
                                    placeholder="Surname"
                                    className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 rounded-xl p-3 text-white focus:outline-none focus:border-[#d4af37]"
                                />
                                {errors.surname && <p className="text-rose-400 mt-1">{errors.surname}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Email Address *</label>
                                <input
                                    type="email"
                                    required
                                    maxLength={200}
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="concierge@domain.com"
                                    className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 rounded-xl p-3 text-white focus:outline-none focus:border-[#d4af37]"
                                />
                                {errors.email && <p className="text-rose-400 mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Phone Number *</label>
                                <input
                                    type="tel"
                                    required
                                    maxLength={50}
                                    value={data.phone_number}
                                    onChange={(e) => setData('phone_number', e.target.value)}
                                    placeholder="+44 7700 900000"
                                    className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 rounded-xl p-3 text-white focus:outline-none focus:border-[#d4af37]"
                                />
                                {errors.phone_number && <p className="text-rose-400 mt-1">{errors.phone_number}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Date of Birth *</label>
                                <input
                                    type="date"
                                    required
                                    value={data.date_of_birth}
                                    onChange={(e) => setData('date_of_birth', e.target.value)}
                                    className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 rounded-xl p-3 text-white focus:outline-none focus:border-[#d4af37]"
                                />
                                {errors.date_of_birth && <p className="text-rose-400 mt-1">{errors.date_of_birth}</p>}
                            </div>

                            <div>
                                <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Telegram Username (for voice bot sync)</label>
                                <input
                                    type="text"
                                    maxLength={200}
                                    value={data.telegram_username}
                                    onChange={(e) => setData('telegram_username', e.target.value)}
                                    placeholder="@username"
                                    className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 rounded-xl p-3 text-white focus:outline-none focus:border-[#d4af37]"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Password *</label>
                                <input
                                    type="password"
                                    required
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 rounded-xl p-3 text-white focus:outline-none focus:border-[#d4af37]"
                                />
                                {errors.password && <p className="text-rose-400 mt-1">{errors.password}</p>}
                            </div>

                            <div>
                                <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Confirm Password *</label>
                                <input
                                    type="password"
                                    required
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 rounded-xl p-3 text-white focus:outline-none focus:border-[#d4af37]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: Residence Address */}
                    <div className="space-y-4 pt-4 border-t border-[#d4af37]/15">
                        <h3 className="font-serif-luxury text-base font-bold text-[#f3cf65] uppercase tracking-wider border-b border-[#d4af37]/15 pb-2">
                            2. Residential Address
                        </h3>

                        <div>
                            <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Street, House Number, Apartment *</label>
                            <input
                                type="text"
                                required
                                maxLength={255}
                                value={data.address_street}
                                onChange={(e) => setData('address_street', e.target.value)}
                                placeholder="Dept 6193, 43 Owston Road, Apt 4B"
                                className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 rounded-xl p-3 text-white focus:outline-none focus:border-[#d4af37]"
                            />
                            {errors.address_street && <p className="text-rose-400 mt-1">{errors.address_street}</p>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">City *</label>
                                <input
                                    type="text"
                                    required
                                    maxLength={100}
                                    value={data.address_city}
                                    onChange={(e) => setData('address_city', e.target.value)}
                                    placeholder="London / Doncaster"
                                    className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 rounded-xl p-3 text-white focus:outline-none focus:border-[#d4af37]"
                                />
                                {errors.address_city && <p className="text-rose-400 mt-1">{errors.address_city}</p>}
                            </div>

                            <div>
                                <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Country *</label>
                                <select
                                    required
                                    value={data.address_country}
                                    onChange={(e) => setData('address_country', e.target.value)}
                                    className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 rounded-xl p-3 text-white focus:outline-none focus:border-[#d4af37]"
                                >
                                    {ALLOWED_COUNTRIES.map((c) => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                                {errors.address_country && <p className="text-rose-400 mt-1">{errors.address_country}</p>}
                            </div>

                            <div>
                                <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Post Code *</label>
                                <input
                                    type="text"
                                    required
                                    maxLength={50}
                                    value={data.address_postcode}
                                    onChange={(e) => setData('address_postcode', e.target.value)}
                                    placeholder="DN6 8DA"
                                    className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 rounded-xl p-3 text-white focus:outline-none focus:border-[#d4af37]"
                                />
                                {errors.address_postcode && <p className="text-rose-400 mt-1">{errors.address_postcode}</p>}
                            </div>
                        </div>
                    </div>

                    {/* SECTION 3: Legal Terms Checkbox */}
                    <div className="pt-4 border-t border-[#d4af37]/15 space-y-3">
                        <label className="flex items-start space-x-3 cursor-pointer">
                            <input
                                type="checkbox"
                                required
                                checked={data.agreed_to_terms}
                                onChange={(e) => setData('agreed_to_terms', e.target.checked)}
                                className="mt-0.5 rounded accent-[#d4af37] bg-[#0a0a0a] border-[#d4af37]/40 text-[#4a0e17] focus:ring-[#d4af37]"
                            />
                            <span className="text-xs text-slate-300 leading-normal">
                                I agree to the{' '}
                                <Link href={route('legal.terms')} target="_blank" className="text-[#f3cf65] underline hover:text-white font-semibold">
                                    Terms & Conditions
                                </Link>{' '}
                                and{' '}
                                <Link href={route('legal.privacy')} target="_blank" className="text-[#f3cf65] underline hover:text-white font-semibold">
                                    Privacy Policy
                                </Link>.
                            </span>
                        </label>
                        {errors.agreed_to_terms && <p className="text-rose-400 text-xs">{errors.agreed_to_terms}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing || !data.agreed_to_terms}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-[#4a0e17] via-[#6b1422] to-[#4a0e17] text-[#f3cf65] font-bold text-xs uppercase tracking-widest border border-[#d4af37]/50 hover:border-[#d4af37] shadow-xl transition flex items-center justify-center space-x-2"
                    >
                        <UserCheck className="w-4 h-4 text-[#d4af37]" />
                        <span>Activate Membership Account</span>
                    </button>
                </form>
            </div>
        </div>
    );
}
