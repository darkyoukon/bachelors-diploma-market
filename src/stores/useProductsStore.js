import {defineStore} from 'pinia'

// add ts type checking
export const useProductsStore = defineStore('marketProducts', {
    state() {
        let names = ['Атлет', 'Кроха', "М'ячик", "Хамелеон", "Кіндер"]

        return {
            products: Array.from(
                {length: 10}, (v, i) => ({
                    path: 'toys/img_' + i + '.png',
                    name: names[Math.floor(Math.random() * (names.length - 1))],
                    price: Math.floor(Math.random() * (900 - 100) + 100)
                }))
        }
    },
    getters: {
        alternativeCurrencies: (state) => state.availableCurrencies.filter(cur => cur !== state.currentCurrency)
    },
    actions: {

    }
})