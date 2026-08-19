import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@inertiajs/react';

export default function CookieConsent() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('bordeux_cookie_consent');
        if (!consent) {
            const timer = setTimeout(() => setVisible(true), 1200);
            return () => clearTimeout(timer);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('bordeux_cookie_consent', 'accepted');
        setVisible(false);
    };

    const declineCookies = () => {
        localStorage.setItem('bordeux_cookie_consent', 'essential_only');
        setVisible(false);
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed bottom-6 left-6 z-50 max-w-md w-full"
                >
                    <div className="glass-panel-burgundy p-6 rounded-3xl border border-[#d4af37]/40 shadow-2xl space-y-4 relative">
                        <button
                            onClick={declineCookies}
                            className="absolute top-4 right-4 text-slate-400 hover:text-white text-xs"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="flex items-center space-x-3">
                            <div className="p-2.5 rounded-2xl bg-[#4a0e17] border border-[#d4af37]/40 text-[#f3cf65]">
                                <Cookie className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-serif-luxury text-base font-bold text-white">Private Concierge Cookies</h4>
                                <p className="text-[11px] text-slate-300">AES-256 encrypted session privacy</p>
                            </div>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed font-light">
                            We use essential encryption cookies to secure your Telegram AI sommelier session and preserve your private cellar portfolio settings. Zero advertising trackers.
                        </p>

                        <div className="flex items-center justify-between pt-2 border-t border-[#d4af37]/15">
                            <Link href={route('legal.privacy')} className="text-[11px] text-[#d4af37] underline hover:text-white">
                                Privacy Policy
                            </Link>

                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={declineCookies}
                                    className="px-3.5 py-2 rounded-xl border border-slate-700 text-slate-400 text-xs hover:text-white transition"
                                >
                                    Essential Only
                                </button>

                                <button
                                    onClick={acceptCookies}
                                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#4a0e17] to-[#6b1422] text-[#f3cf65] text-xs font-bold uppercase tracking-wider border border-[#d4af37]/40 hover:border-[#d4af37] shadow-lg transition flex items-center space-x-1"
                                >
                                    <Check className="w-3.5 h-3.5" />
                                    <span>Accept Vault</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
