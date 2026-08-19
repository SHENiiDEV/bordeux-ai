import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OfflineBanner() {
    const [isOffline, setIsOffline] = useState(false);
    const [showRestored, setShowRestored] = useState(false);

    useEffect(() => {
        const handleOffline = () => {
            setIsOffline(true);
            setShowRestored(false);
        };

        const handleOnline = () => {
            setIsOffline(false);
            setShowRestored(true);
            const timer = setTimeout(() => setShowRestored(false), 3500);
            return () => clearTimeout(timer);
        };

        window.addEventListener('offline', handleOffline);
        window.addEventListener('online', handleOnline);

        if (!navigator.onLine) {
            setIsOffline(true);
        }

        return () => {
            window.removeEventListener('offline', handleOffline);
            window.removeEventListener('online', handleOnline);
        };
    }, []);

    return (
        <AnimatePresence>
            {isOffline && (
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-lg w-full px-4"
                >
                    <div className="p-4 rounded-2xl bg-rose-950/90 backdrop-blur-xl border border-rose-600/50 text-rose-200 text-xs font-semibold flex items-center justify-between shadow-2xl">
                        <div className="flex items-center space-x-3">
                            <WifiOff className="w-5 h-5 text-rose-400 animate-pulse" />
                            <div>
                                <p className="font-bold text-white">Concierge Connection Lost</p>
                                <p className="text-[11px] text-rose-300 font-light">Telegram AI voice queries paused until network reconnects.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {!isOffline && showRestored && (
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-lg w-full px-4"
                >
                    <div className="p-4 rounded-2xl bg-emerald-950/90 backdrop-blur-xl border border-emerald-500/50 text-emerald-200 text-xs font-semibold flex items-center justify-between shadow-2xl">
                        <div className="flex items-center space-x-3">
                            <Wifi className="w-5 h-5 text-emerald-400" />
                            <div>
                                <p className="font-bold text-white">Concierge Connection Restored</p>
                                <p className="text-[11px] text-emerald-300 font-light">DeepSeek AI sommelier online.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
