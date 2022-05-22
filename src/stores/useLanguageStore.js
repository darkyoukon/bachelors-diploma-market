import {defineStore} from 'pinia'

// add ts type checking
export const useLanguageStore = defineStore('language', {
    state: () => ({
        assetsPath: 'currencies/',
        currentLanguage: 'Українська',
        availableCurrencies: ['English', 'Polski']
    }),
    getters: {
        alternativeLanguages: (state) => state.availableCurrencies.filter(lan => lan !== state.currentLanguage)
    },
    actions: {

    }
})