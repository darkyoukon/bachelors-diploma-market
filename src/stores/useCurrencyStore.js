import {defineStore} from 'pinia'

export const useCurrencyStore = defineStore('currency', {
    state: () => {
        return {
            currentCurrency: 'uah'
        }
    },
    getters: {

    },
    actions: {

    }
})