import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n.use(Backend)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        backend: {
            loadPath: 'locales/{{lng}}/{{ns}}.json',
        },
        ns: ['translations'],
        defaultNS: 'translations',
        debug: false,
        react: {
            useSuspense: false
        }
    }).then();
export default i18n;