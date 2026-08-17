import React, { useState, useEffect } from 'react';
import { Wine, ShieldAlert, Check } from 'lucide-react';

export default function AgeVerificationModal() {
    const [verified, setVerified] = useState(true);

    useEffect(() => {
        const isVerified = localStorage.getItem('bordeux_age_verified');
        if (!isVerified) {
            setVerified(false);
        }
    }, []);

    const handleConfirm = () => {
        localStorage.setItem('bordeux_age_verified', 'true');
        setVerified(true);
    };

    const handleDecline = () => {
        window.location.href = 'https://www.google.com';
    };

    if (verified) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
            <div className="glass-panel-burgundy max-w-md w-full p-8 rounded-2xl border border-[#d4af37]/20 text-center shadow-2xl space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#4a0e17]/60 border border-[#d4af37]/30 text-[#d4af37]">
                    <Wine className="w-8 h-8" />
                </div>
                
                <div>
                    <h2 className="font-serif-luxury text-2xl text-white font-bold tracking-wide">
                        BORDEUX AI
                    </h2>
                    <p className="text-xs uppercase tracking-widest text-[#d4af37] mt-1 font-semibold">
                        Private Wine Concierge
                    </p>
                </div>

                <div className="text-sm text-slate-300 space-y-2">
                    <p className="font-medium text-white">Age Verification Required</p>
                    <p className="text-xs text-slate-400">
                        This private portal contains information regarding fine wines and spirits. You must be of legal drinking age in your country of residence to enter.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                    <button
                        onClick={handleDecline}
                        className="px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-slate-400 border border-slate-700 hover:border-slate-500 hover:text-white transition-all duration-200"
                    >
                        Under Legal Age
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#4a0e17] to-[#6b1422] text-[#f3cf65] border border-[#d4af37]/40 hover:border-[#d4af37] shadow-lg hover:shadow-[#4a0e17]/50 transition-all duration-200 flex items-center justify-center space-x-1"
                    >
                        <Check className="w-4 h-4 mr-1" />
                        I am 21+
                    </button>
                </div>

                <div className="pt-2 text-[10px] text-slate-500">
                    By entering, you agree to our Terms of Service & Privacy Policy. Enjoy responsibly.
                </div>
            </div>
        </div>
    );
}
