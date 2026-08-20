import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Wine, Sliders, CreditCard, Sparkles, LogOut, Shield } from 'lucide-react';

export default function Navbar() {
    const { auth } = usePage().props;
    const user = auth?.user;

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

                    {/* Navigation Links */}
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
                                <CreditCard className="w-4 h-4 text-[#d4af37]" />
                                <span>Wallet & Invoices</span>
                            </Link>
                        </div>
                    ) : null}

                    {/* Right User State or Apply Button */}
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <div className="flex items-center space-x-3">
                                <div className="text-right hidden sm:block">
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
                                className="px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#4a0e17] to-[#6b1422] text-[#f3cf65] border border-[#d4af37]/40 hover:border-[#d4af37] shadow-lg transition duration-200"
                            >
                                Apply For Access
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
