import {defineStore} from 'pinia'

// add ts type checking
export const useCurrencyStore = defineStore('currency', {
    state: () => ({
        assetsPath: 'currencies/',
        currentCurrency: 'uah',
        availableCurrencies: ['usd', 'eur', 'uah']
    }),
    getters: {
        alternativeCurrencies: (state) => state.availableCurrencies.filter(cur => cur !== state.currentCurrency)
    },
    actions: {

    }
})