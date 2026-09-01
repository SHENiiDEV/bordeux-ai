import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wine } from 'lucide-react';

const SOMMELIER_QUOTES = [
    'Decanting vintage intelligence...',
    'Calibrating palate neural network...',
    'Synchronizing private cellar vault...',
    'Analyzing terroir & vintage weather metrics...',
    'Curating Grand Cru pairing recommendations...',
    'Authenticating private club credentials...'
];

export default function PageLoader() {
    const [initialLoading, setInitialLoading] = useState(true);
    const [navigating, setNavigating] = useState(false);
    const [quoteIndex, setQuoteIndex] = useState(0);
    const [progress, setProgress] = useState(15);

    // Initial load animation
    useEffect(() => {
        const quoteInterval = setInterval(() => {
            setQuoteIndex((prev) => (prev + 1) % SOMMELIER_QUOTES.length);
        }, 900);

        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 95) {
                    clearInterval(progressInterval);
                    return 95;
                }
                return prev + Math.floor(Math.random() * 18) + 8;
            });
        }, 120);

        const timer = setTimeout(() => {
            setProgress(100);
            setTimeout(() => {
                setInitialLoading(false);
            }, 350);
        }, 1100);

        return () => {
            clearInterval(quoteInterval);
            clearInterval(progressInterval);
            clearTimeout(timer);
        };
    }, []);

    // Inertia page transition listener
    useEffect(() => {
        const removeStartListener = router.on('start', () => {
            setNavigating(true);
        });

        const removeFinishListener = router.on('finish', () => {
            setNavigating(false);
        });

        return () => {
            removeStartListener();
            removeFinishListener();
        };
    }, []);

    const showLoader = initialLoading;

    return (
        <>
            {/* Top Minimal Golden Shimmer Line during Inertia Navigation */}
            <AnimatePresence>
                {navigating && (
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#f3cf65] to-[#d4af37] z-[9999] origin-left shadow-[0_0_12px_rgba(212,175,55,0.8)]"
                    />
                )}
            </AnimatePresence>

            {/* Full Luxury Preloader Overlay on Initial Load */}
            <AnimatePresence>
                {showLoader && (
                    <motion.div
                        key="bordeux-luxury-loader"
                        initial={{ opacity: 1 }}
                        exit={{
                            opacity: 0,
                            scale: 1.03,
                            filter: 'blur(8px)',
                            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
                        }}
                        className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#070305] overflow-hidden select-none"
                    >
                        {/* Luxury Ambient Glows */}
                        <div className="absolute w-[600px] h-[600px] rounded-full bg-[#4a0e17]/25 blur-[120px] pointer-events-none -top-20 -left-20 animate-pulse" />
                        <div className="absolute w-[500px] h-[500px] rounded-full bg-[#d4af37]/10 blur-[140px] pointer-events-none -bottom-20 -right-20 animate-pulse" style={{ animationDelay: '1s' }} />
                        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#070305]/60 to-[#070305] pointer-events-none" />

                        {/* Outer Decorative Rotating Rings */}
                        <div className="relative flex items-center justify-center mb-8">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                                className="absolute w-44 h-44 rounded-full border border-dashed border-[#d4af37]/20"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                                className="absolute w-36 h-36 rounded-full border border-[#f3cf65]/15"
                            />

                            {/* Glowing Emblem Box */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.7, ease: 'easeOut' }}
                                className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl p-1 bg-gradient-to-br from-[#4a0e17] via-[#20060b] to-[#120306] border border-[#d4af37]/60 shadow-[0_0_35px_rgba(212,175,55,0.35)] flex items-center justify-center overflow-hidden group"
                            >
                                <img
                                    src="/favicon.png"
                                    alt="Bordeux AI Crest"
                                    className="w-full h-full object-cover rounded-2xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] transform transition-transform duration-700 hover:scale-105"
                                />

                                {/* Shimmer Light Sweep */}
                                <motion.div
                                    animate={{
                                        x: ['-100%', '200%'],
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 2.2,
                                        ease: 'easeInOut',
                                        repeatDelay: 0.5,
                                    }}
                                    className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
                                />
                            </motion.div>
                        </div>

                        {/* Brand Title & Subtitle */}
                        <div className="text-center space-y-2 z-10 px-4">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                            >
                                <span className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-[0.25em] text-white">
                                    BORDEUX <span className="gold-gradient-text">AI</span>
                                </span>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0, tracking: '0.15em' }}
                                animate={{ opacity: 1, tracking: '0.3em' }}
                                transition={{ delay: 0.35, duration: 0.8 }}
                                className="text-[10px] sm:text-[11px] uppercase text-[#d4af37]/90 font-semibold tracking-[0.3em]"
                            >
                                Private Sommelier Concierge
                            </motion.p>
                        </div>

                        {/* Progress Bar Container */}
                        <div className="w-56 sm:w-64 mt-8 space-y-3 z-10">
                            <div className="h-[3px] w-full bg-slate-900/90 rounded-full overflow-hidden border border-[#d4af37]/20 relative shadow-inner">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-[#4a0e17] via-[#d4af37] to-[#f3cf65] rounded-full relative"
                                    style={{ width: `${progress}%` }}
                                    transition={{ ease: 'easeOut', duration: 0.2 }}
                                >
                                    {/* Leading Glow Head */}
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#fff5cc] shadow-[0_0_8px_#f3cf65]" />
                                </motion.div>
                            </div>

                            {/* Cycling Status Quotes */}
                            <div className="h-5 flex items-center justify-center">
                                <AnimatePresence mode="wait">
                                    <motion.p
                                        key={quoteIndex}
                                        initial={{ opacity: 0, y: 4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -4 }}
                                        transition={{ duration: 0.35 }}
                                        className="text-[10px] text-slate-400 font-light text-center tracking-wider italic flex items-center justify-center space-x-1.5"
                                    >
                                        <Sparkles className="w-3 h-3 text-[#d4af37] inline shrink-0" />
                                        <span>{SOMMELIER_QUOTES[quoteIndex]}</span>
                                    </motion.p>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Discreet Bottom Security Badge */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="absolute bottom-8 text-[10px] text-slate-500 font-mono tracking-widest uppercase"
                        >
                            GREAT LEADERS LTD • 256-BIT ENCRYPTION
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
