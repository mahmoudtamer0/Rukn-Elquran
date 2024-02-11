import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationAR from "./local/ar.json"
import translationEN from "./local/eng.json"
import languageDetector from "i18next-browser-languagedetector"

const langvalue = JSON.parse(localStorage.getItem("langi18")) ? JSON.parse(localStorage.getItem("langi18")) : "ar"

const resources = {
    eng: {
        translation: translationEN
    },
    ar: {
        translation: translationAR
    }
};

i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        resources,
        lng: langvalue.language || "ar",
        interpolation: {
            escapeValue: false
        },
    });

export default i18n;