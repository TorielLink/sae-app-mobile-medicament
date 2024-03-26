import * as RNLocalize from 'react-native-localize';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const locales = RNLocalize.getLocales();
const defaultLanguage = locales[0].languageTag;

i18n.use(initReactI18next).init({
        resources: {
            en: { translation: require('../translations/en.json') },
            fr: { translation: require('../translations/fr.json') },
            de: { translation: require('../translations/de.json') },
            es: { translation: require('../translations/es.json') },
        },
        lng: defaultLanguage,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });