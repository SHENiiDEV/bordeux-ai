import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Wine, Sliders, CreditCard, Sparkles, LogOut, Shield, Menu, X, Wallet, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const { auth } = usePage().props;
    const user = auth?.user;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="border-b border-[#d4af37]/15 bg-[#0a0a0a]/85 backdrop-blur-md sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Brand Header */}
                    <Link href={user ? route('dashboard') : route('home')} className="flex items-center space-x-3 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4a0e17] to-[#160609] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] group-hover:border-[#d4af37] transition-all">
                            <Wine className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="font-serif-luxury text-xl font-bold tracking-wider text-white">
                                BORDEUX <span className="text-[#d4af37]">AI</span>
                            </span>
                            <span className="block text-[9px] uppercase tracking-widest text-slate-400 font-medium">
                                Private Sommelier Concierge
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation Links */}
                    {user ? (
                        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
                            <Link 
                                href={route('dashboard')}
                                className={`flex items-center space-x-2 text-slate-300 hover:text-[#d4af37] transition ${route().current('dashboard') ? 'text-[#d4af37] font-semibold' : ''}`}
                            >
                                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                                <span>Sommelier</span>
                            </Link>

                            <Link 
                                href={route('cellar.index')}
                                className={`flex items-center space-x-2 text-slate-300 hover:text-[#d4af37] transition ${route().current('cellar.*') ? 'text-[#d4af37] font-semibold' : ''}`}
                            >
                                <Wine className="w-4 h-4" />
                                <span>My Cellar</span>
                            </Link>

                            <Link 
                                href={route('taste-profile.show')}
                                className={`flex items-center space-x-2 text-slate-300 hover:text-[#d4af37] transition ${route().current('taste-profile.*') ? 'text-[#d4af37] font-semibold' : ''}`}
                            >
                                <Sliders className="w-4 h-4" />
                                <span>Taste Profile</span>
                            </Link>

                            <Link 
                                href={route('billing.index')}
                                className={`flex items-center space-x-2 text-slate-300 hover:text-[#d4af37] transition ${route().current('billing.*') ? 'text-[#d4af37] font-semibold' : ''}`}
                            >
                                <CreditCard className="w-4 h-4" />
                                <span>Membership</span>
                            </Link>

                            <Link 
                                href={route('wallet.index')}
                                className={`flex items-center space-x-2 text-slate-300 hover:text-[#d4af37] transition ${route().current('wallet.*') ? 'text-[#d4af37] font-semibold' : ''}`}
                            >
                                <Wallet className="w-4 h-4 text-[#d4af37]" />
                                <span>Wallet & Invoices</span>
                            </Link>
                        </div>
                    ) : null}

                    {/* Right Controls (Desktop User Info & Mobile Hamburger) */}
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <div className="hidden md:flex items-center space-x-3">
                                <div className="text-right">
                                    <p className="text-xs font-semibold text-white">{user.name}</p>
                                    <span className="inline-block text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-[#4a0e17] text-[#f3cf65] border border-[#d4af37]/30">
                                        {user.membership_status || 'Member'}
                                    </span>
                                </div>
                                <Link
                                    method="post"
                                    href={route('logout')}
                                    as="button"
                                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                                    title="Logout"
                                >
                                    <LogOut className="w-4 h-4" />
                                </Link>
                            </div>
                        ) : (
                            <Link
                                href={route('membership.apply')}
                                className="hidden md:inline-flex px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#4a0e17] to-[#6b1422] text-[#f3cf65] border border-[#d4af37]/40 hover:border-[#d4af37] shadow-lg transition duration-200"
                            >
                                Apply For Access
                            </Link>
                        )}

                        {/* Hamburger Button (Mobile Only) */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2.5 rounded-xl glass-panel text-slate-300 hover:text-[#f3cf65] border border-[#d4af37]/30 transition focus:outline-none"
                            aria-label="Toggle Mobile Menu"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6 text-[#f3cf65]" /> : <Menu className="w-6 h-6 text-[#d4af37]" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Drawer (Slides from Right) */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 md:hidden"
                        />

                        {/* Slide-out Drawer Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] glass-panel-burgundy border-l border-[#d4af37]/40 z-50 md:hidden flex flex-col justify-between p-6 shadow-2xl overflow-y-auto"
                        >
                            {/* Drawer Top Header */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-9 h-9 rounded-xl bg-[#4a0e17] border border-[#d4af37] flex items-center justify-center text-[#f3cf65]">
                                            <Wine className="w-4 h-4" />
                                        </div>
                                        <span className="font-serif-luxury font-bold text-white text-base">BORDEUX AI</span>
                                    </div>

                                    <button
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="p-2 rounded-lg text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800"
                                    >
                                        <X className="w-5 h-5 text-[#f3cf65]" />
                                    </button>
                                </div>

                                {user && (
                                    <div className="p-4 rounded-2xl bg-[#070707]/80 border border-[#d4af37]/20 space-y-1">
                                        <p className="text-xs font-bold text-white">{user.name}</p>
                                        <p className="text-[11px] text-slate-400">{user.email}</p>
                                        <span className="inline-block mt-2 text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded bg-[#4a0e17] text-[#f3cf65] border border-[#d4af37]/30">
                                            Status: {user.membership_status || 'Member'}
                                        </span>
                                    </div>
                                )}

                                {/* Drawer Menu Links */}
                                <div className="space-y-2 text-xs font-medium">
                                    {user ? (
                                        <>
                                            <Link
                                                href={route('dashboard')}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className={`flex items-center justify-between p-3.5 rounded-xl border transition ${
                                                    route().current('dashboard')
                                                        ? 'bg-[#4a0e17] text-[#f3cf65] border-[#d4af37]'
                                                        : 'bg-[#070707]/50 border-slate-800 text-slate-300 hover:border-[#d4af37]/30'
                                                }`}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <Sparkles className="w-4 h-4 text-[#d4af37]" />
                                                    <span>AI Sommelier Hub</span>
                                                </div>
                                                <ChevronRight className="w-4 h-4 text-slate-500" />
                                            </Link>

                                            <Link
                                                href={route('cellar.index')}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className={`flex items-center justify-between p-3.5 rounded-xl border transition ${
                                                    route().current('cellar.*')
                                                        ? 'bg-[#4a0e17] text-[#f3cf65] border-[#d4af37]'
                                                        : 'bg-[#070707]/50 border-slate-800 text-slate-300 hover:border-[#d4af37]/30'
                                                }`}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <Wine className="w-4 h-4 text-[#d4af37]" />
                                                    <span>My Cellar Vault</span>
                                                </div>
                                                <ChevronRight className="w-4 h-4 text-slate-500" />
                                            </Link>

                                            <Link
                                                href={route('taste-profile.show')}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className={`flex items-center justify-between p-3.5 rounded-xl border transition ${
                                                    route().current('taste-profile.*')
                                                        ? 'bg-[#4a0e17] text-[#f3cf65] border-[#d4af37]'
                                                        : 'bg-[#070707]/50 border-slate-800 text-slate-300 hover:border-[#d4af37]/30'
                                                }`}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <Sliders className="w-4 h-4 text-[#d4af37]" />
                                                    <span>Taste Algorithm</span>
                                                </div>
                                                <ChevronRight className="w-4 h-4 text-slate-500" />
                                            </Link>

                                            <Link
                                                href={route('billing.index')}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className={`flex items-center justify-between p-3.5 rounded-xl border transition ${
                                                    route().current('billing.*')
                                                        ? 'bg-[#4a0e17] text-[#f3cf65] border-[#d4af37]'
                                                        : 'bg-[#070707]/50 border-slate-800 text-slate-300 hover:border-[#d4af37]/30'
                                                }`}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <CreditCard className="w-4 h-4 text-[#d4af37]" />
                                                    <span>Membership Tier</span>
                                                </div>
                                                <ChevronRight className="w-4 h-4 text-slate-500" />
                                            </Link>

                                            <Link
                                                href={route('wallet.index')}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className={`flex items-center justify-between p-3.5 rounded-xl border transition ${
                                                    route().current('wallet.*')
                                                        ? 'bg-[#4a0e17] text-[#f3cf65] border-[#d4af37]'
                                                        : 'bg-[#070707]/50 border-slate-800 text-slate-300 hover:border-[#d4af37]/30'
                                                }`}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <Wallet className="w-4 h-4 text-[#d4af37]" />
                                                    <span>Wallet & Invoices</span>
                                                </div>
                                                <ChevronRight className="w-4 h-4 text-slate-500" />
                                            </Link>
                                            <Link
                                                href={route('how-it-works')}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="flex items-center justify-between p-3 rounded-xl bg-[#070707]/50 border border-slate-800 text-slate-300"
                                            >
                                                <span>How It Works</span>
                                                <ChevronRight className="w-4 h-4 text-slate-500" />
                                            </Link>

                                            <Link
                                                href={route('about')}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="flex items-center justify-between p-3 rounded-xl bg-[#070707]/50 border border-slate-800 text-slate-300"
                                            >
                                                <span>About Us</span>
                                                <ChevronRight className="w-4 h-4 text-slate-500" />
                                            </Link>

                                            <Link
                                                href={route('support')}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="flex items-center justify-between p-3 rounded-xl bg-[#070707]/50 border border-slate-800 text-slate-300"
                                            >
                                                <span>Support & Help Desk</span>
                                                <ChevronRight className="w-4 h-4 text-slate-500" />
                                            </Link>

                                            <Link
                                                href={route('contact')}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="flex items-center justify-between p-3 rounded-xl bg-[#070707]/50 border border-slate-800 text-slate-300"
                                            >
                                                <span>Contact Support</span>
                                                <ChevronRight className="w-4 h-4 text-slate-500" />
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                href={route('home')}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="flex items-center justify-between p-3 rounded-xl bg-[#070707]/50 border border-slate-800 text-slate-300"
                                            >
                                                <span>Private Club Home</span>
                                                <ChevronRight className="w-4 h-4 text-slate-500" />
                                            </Link>

                                            <Link
                                                href={route('how-it-works')}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="flex items-center justify-between p-3 rounded-xl bg-[#070707]/50 border border-slate-800 text-slate-300"
                                            >
                                                <span>How It Works</span>
                                                <ChevronRight className="w-4 h-4 text-slate-500" />
                                            </Link>

                                            <Link
                                                href={route('about')}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="flex items-center justify-between p-3 rounded-xl bg-[#070707]/50 border border-slate-800 text-slate-300"
                                            >
                                                <span>About Us</span>
                                                <ChevronRight className="w-4 h-4 text-slate-500" />
                                            </Link>

                                            <Link
                                                href={route('support')}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="flex items-center justify-between p-3 rounded-xl bg-[#070707]/50 border border-slate-800 text-slate-300"
                                            >
                                                <span>Support & Help Desk</span>
                                                <ChevronRight className="w-4 h-4 text-slate-500" />
                                            </Link>

                                            <Link
                                                href={route('contact')}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="flex items-center justify-between p-3 rounded-xl bg-[#070707]/50 border border-slate-800 text-slate-300"
                                            >
                                                <span>Contact Support</span>
                                                <ChevronRight className="w-4 h-4 text-slate-500" />
                                            </Link>

                                            <Link
                                                href={route('login')}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="flex items-center justify-between p-3 rounded-xl bg-[#070707]/50 border border-slate-800 text-slate-300"
                                            >
                                                <span>Member Sign In</span>
                                                <ChevronRight className="w-4 h-4 text-slate-500" />
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Drawer Bottom Actions */}
                            <div className="pt-4 border-t border-[#d4af37]/20 space-y-3">
                                {user ? (
                                    <Link
                                        method="post"
                                        href={route('logout')}
                                        as="button"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="w-full py-3.5 rounded-xl bg-[#120d12] border border-rose-900/50 text-rose-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>Sign Out of Account</span>
                                    </Link>
                                ) : (
                                    <Link
                                        href={route('membership.apply')}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#4a0e17] to-[#6b1422] text-[#f3cf65] font-bold text-xs uppercase tracking-widest text-center border border-[#d4af37]/40 block"
                                    >
                                        Apply For Access
                                    </Link>
                                )}

                                <p className="text-[10px] text-slate-500 text-center font-mono">
                                    INCHWARD LIMITED • UK Co. No. 16021412
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
}
