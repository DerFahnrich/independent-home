import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import enTranslation from "./locales/en/translation.json";
import seTranslation from "./locales/sv/translation.json";

const resources = {
  en: {
    translation: enTranslation,
  },
  de: {
    translation: seTranslation,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: false, // set to false on production
    ns: "translation",
    defaultNS: "translation",
    preload: false,
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
