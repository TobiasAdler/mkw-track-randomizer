import i18next from 'i18next'
import I18NextVue from 'i18next-vue'
import LanguageDetector from 'i18next-browser-languagedetector'

// i18next initialisieren
i18next
    .use(LanguageDetector)
    .init({
        debug: true,
        fallbackLng: 'en',
        detection: {
            order: ['querystring', 'localStorage', 'navigator'],
            lookupQuerystring: 'lng',
            lookupLocalStorage: 'i18nextLng',
            caches: ['localStorage'],
        },
        resources: {
            en: {
                translation: {
                    amounttracks: 'Amount of tracks',
                    track: 'Track',
                    of: 'of',
                    start: 'Start',
                    continue: 'Continue',
                    finish: 'Finish',
                }
            },
            de: {
                translation: {
                    amounttracks: 'Anzahl Strecken',
                    track: 'Strecke',
                    of: 'von',
                    start: 'Start',
                    continue: 'Weiter',
                    finish: 'Beenden',
                }
            }
        }
    });

export default function (app) {
    app.use(I18NextVue, { i18next })
    return app
}
