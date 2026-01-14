import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en/translation.json';
import hiTranslation from './locales/hi/translation.json';
import deTranslation from './locales/de/translation.json';
import frTranslation from './locales/fr/translation.json';
import esTranslation from './locales/es/translation.json';
import jaTranslation from './locales/ja/translation.json';
import zhTranslation from './locales/zh/translation.json';
import ptTranslation from './locales/pt/translation.json';
import ruTranslation from './locales/ru/translation.json';
import arTranslation from './locales/ar/translation.json';
import koTranslation from './locales/ko/translation.json';
import itTranslation from './locales/it/translation.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: enTranslation },
            hi: { translation: hiTranslation },
            de: { translation: deTranslation },
            fr: { translation: frTranslation },
            es: { translation: esTranslation },
            ja: { translation: jaTranslation },
            zh: { translation: zhTranslation },
            pt: { translation: ptTranslation },
            ru: { translation: ruTranslation },
            ar: { translation: arTranslation },
            ko: { translation: koTranslation },
            it: { translation: itTranslation },
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
