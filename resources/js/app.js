require("./bootstrap");

window.Vue = require("vue");

import vSelect from "vue-select";
Vue.component("v-select", vSelect);
import "vue-select/dist/vue-select.css";

import VueRouter from "vue-router";
Vue.use(VueRouter);

import App from "./App.vue";
import AlertComponent from "./components/ui/AlertComponent.vue";
import TheHeader from "./components/ui/TheHeader.vue";
import Loading from "./components/ui/Loading.vue";

import routes from "./router.js";
import { store } from "./store/index.js";

Vue.component("pagination", require("laravel-vue-pagination"));
Vue.component("alert-component", AlertComponent);
Vue.component("the-header", TheHeader);
Vue.component("loading", Loading);

const router = new VueRouter({
    mode: "history",
    routes
});

router.beforeEach((to, from, next) => {
    if (
        to.matched.some(record => record.meta.requiresAuth) &&
        to.matched.some(record => record.meta.requiresAdmin)
    ) {
        if (!store.getters.loggedIn || store.getters.userType === 0) {
            next({
                path: "my-details"
            });
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.requiresAuth)) {
        console.log("Requires only Auth");
        if (!store.getters.loggedIn) {
            next({
                path: "/"
            });
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.requiresVisitor)) {
        if (store.getters.loggedIn) {
            next({
                path: "/orders"
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

const app = new Vue({
    el: "#app",
    render: h => h(App),
    router,
    store
});
