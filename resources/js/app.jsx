import '../css/app.css';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { route } from 'ziggy-js';
import { CurrencyProvider } from './Components/CurrencyContext';
import CurrencySwitcher from './Components/CurrencySwitcher';
import CookieConsent from './Components/CookieConsent';
import OfflineBanner from './Components/OfflineBanner';

const appName = import.meta.env.VITE_APP_NAME || 'Bordeux AI';
if (typeof window !== 'undefined' && !window.route) {
    window.route = route;
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <CurrencyProvider>
                <OfflineBanner />
                <App {...props} />
                <CookieConsent />
                <CurrencySwitcher />
            </CurrencyProvider>
        );
    },
    progress: {
        color: '#d4af37',
    },
});
