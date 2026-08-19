import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export const CURRENCIES = {
    EUR: { code: 'EUR', symbol: '€', rate: 1.0, flag: '🇪🇺' },
    USD: { code: 'USD', symbol: '$', rate: 1.08, flag: '🇺🇸' },
    GBP: { code: 'GBP', symbol: '£', rate: 0.85, flag: '🇬🇧' },
};

export function CurrencyProvider({ children }) {
    const [currency, setCurrency] = useState('EUR');

    useEffect(() => {
        const saved = localStorage.getItem('bordeux_currency');
        if (saved && CURRENCIES[saved]) {
            setCurrency(saved);
        }
    }, []);

    const changeCurrency = (code) => {
        if (CURRENCIES[code]) {
            setCurrency(code);
            localStorage.setItem('bordeux_currency', code);
        }
    };

    const formatPrice = (amountEur) => {
        const curr = CURRENCIES[currency] || CURRENCIES.EUR;
        const converted = Math.round(amountEur * curr.rate);
        return `${curr.symbol}${converted.toLocaleString()}`;
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency: changeCurrency, formatPrice, currentCurrency: CURRENCIES[currency] }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (!context) {
        // Fallback default
        return {
            currency: 'EUR',
            setCurrency: () => {},
            formatPrice: (amt) => `€${amt}`,
            currentCurrency: CURRENCIES.EUR,
        };
    }
    return context;
}
