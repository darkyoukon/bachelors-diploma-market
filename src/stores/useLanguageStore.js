import {defineStore} from 'pinia'

// add ts type checking
export const useLanguageStore = defineStore('language', {
    state: () => ({
        assetPath: 'translate.png',
        currentLanguage: 'Українська',
        availableCurrencies: ['English', 'Polski', 'Українська']
    }),
    getters: {
        alternativeLanguages: (state) => state.availableCurrencies.filter(lan => lan !== state.currentLanguage)
    },
    actions: {

    }
})