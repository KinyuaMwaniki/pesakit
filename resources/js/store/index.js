import Vue from 'vue';
import Vuex from 'vuex';

import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state() {
        return {
            token: localStorage.getItem('access_token') || null,
            orders: [
                {
                    name: "One",
                    age: 30
                },
                {
                    name: "Two",
                    age: 31
                },
                {
                    name: "Three",
                    age: 32
                },
                {
                    name: "Four",
                    age: 33
                },
                {
                    name: "Five",
                    age: 34
                },
            ]
        }
    },
    mutations,
    actions,
    getters
});
