import React, { useState } from 'react';
import { useCurrency, CURRENCIES } from './CurrencyContext';
import { ChevronDown, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CurrencySwitcher() {
    const { currency, setCurrency, currentCurrency } = useCurrency();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-40">
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="px-4 py-2.5 rounded-full glass-panel-burgundy border border-[#d4af37]/40 text-[#f3cf65] text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-2xl hover:border-[#d4af37] transition"
                >
                    <span className="text-base">{currentCurrency?.flag || '🇪🇺'}</span>
                    <span>{currency} ({currentCurrency?.symbol})</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-[#d4af37] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute bottom-12 right-0 mb-2 w-44 glass-panel p-2 rounded-2xl border border-[#d4af37]/30 shadow-2xl space-y-1"
                        >
                            <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider border-b border-[#d4af37]/15">
                                Select Currency
                            </div>

                            {Object.values(CURRENCIES).map((curr) => (
                                <button
                                    key={curr.code}
                                    onClick={() => {
                                        setCurrency(curr.code);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition ${
                                        currency === curr.code
                                            ? 'bg-[#4a0e17] text-[#f3cf65] border border-[#d4af37]/40'
                                            : 'text-slate-300 hover:bg-[#120d12] hover:text-white'
                                    }`}
                                >
                                    <div className="flex items-center space-x-2">
                                        <span className="text-base">{curr.flag}</span>
                                        <span>{curr.code}</span>
                                    </div>
                                    <span className="font-serif-luxury font-bold text-[#d4af37]">{curr.symbol}</span>
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
