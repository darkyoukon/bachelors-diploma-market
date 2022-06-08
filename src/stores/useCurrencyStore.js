import {defineStore} from 'pinia'

// add ts type checking
export const useCurrencyStore = defineStore('currency', {

    // identified fields for global front part
    state: () => ({
        assetsPath: 'currencies/',
        currentCurrency: 'uah',
        availableCurrencies: ['usd', 'eur', 'uah']
    }),

    // computed analogue to determine available currencies except current one
    getters: {
        alternativeCurrencies: (state) => state.availableCurrencies.filter(cur => cur !== state.currentCurrency)
    },
    actions: {

    }
})