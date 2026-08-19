import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import AgeVerificationModal from '../Components/AgeVerificationModal';
import { ShieldAlert, ArrowLeft, Wine, Clock, Lock, Server } from 'lucide-react';

export default function Error({ status }) {
    const title = {
        503: '503: Scheduled Cellar Care',
        500: '500: Temporary Cellar Rest',
        404: '404: Lost in the Wine Vault',
        403: '403: Restricted Member Vault',
    }[status] || 'Error';

    const description = {
        503: 'Bordeux AI concierge is performing routine cellar maintenance and algorithm optimization. Service will resume shortly.',
        500: 'Our private sommelier servers encountered an unexpected exception. Our technical team has been notified.',
        404: 'The vintage vintage or page you requested could not be located in our private cellar vault.',
        403: 'Access to this section requires elevated Grand Cru or Rare Vintage membership privileges.',
    }[status] || 'An unexpected system status occurred.';

    const getIcon = () => {
        switch (status) {
            case 404:
                return <Wine className="w-12 h-12 text-[#d4af37]" />;
            case 403:
                return <Lock className="w-12 h-12 text-[#d4af37]" />;
            case 503:
                return <Clock className="w-12 h-12 text-[#d4af37]" />;
            default:
                return <Server className="w-12 h-12 text-[#d4af37]" />;
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-slate-100 flex flex-col font-sans selection:bg-[#4a0e17] selection:text-white">
            <Head title={title} />
            <AgeVerificationModal />
            <Navbar />

            <div className="flex-1 flex items-center justify-center p-4 py-20">
                <div className="glass-panel-burgundy max-w-xl w-full p-8 sm:p-12 rounded-3xl border border-[#d4af37]/30 text-center space-y-6 shadow-2xl relative overflow-hidden">
                    <div className="w-20 h-20 rounded-3xl bg-[#4a0e17] border border-[#d4af37]/40 flex items-center justify-center mx-auto shadow-xl">
                        {getIcon()}
                    </div>

                    <div className="space-y-2">
                        <span className="text-xs uppercase font-bold tracking-widest text-[#f3cf65] px-3 py-1 rounded bg-[#4a0e17] border border-[#d4af37]/30 inline-block">
                            System Status Code: {status || 404}
                        </span>
                        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white tracking-tight">
                            {title.split(': ')[1]}
                        </h1>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light max-w-md mx-auto">
                        {description}
                    </p>

                    <div className="pt-4 flex justify-center">
                        <Link
                            href={route('home')}
                            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4a0e17] via-[#6b1422] to-[#4a0e17] text-[#f3cf65] text-xs font-bold uppercase tracking-wider border border-[#d4af37]/50 hover:border-[#d4af37] shadow-xl transition inline-flex items-center space-x-2"
                        >
                            <ArrowLeft className="w-4 h-4 text-[#d4af37]" />
                            <span>Return to Concierge Hub</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
