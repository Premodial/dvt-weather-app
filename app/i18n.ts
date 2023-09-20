import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import en from './languages/en.json'
import enZA from './languages/en-ZA.json'
import fr from './languages/fr.json'


i18n.translations = { en, fr, enZA };
i18n.locale = Localization.locale;
i18n.fallbacks = true;

export default i18n;
