require("./bootstrap");

window.Vue = require("vue");

import VueRouter from "vue-router";
Vue.use(VueRouter);

import App from "./App.vue";
import AlertComponent from "./components/ui/AlertComponent.vue";
import TheHeader from "./components/ui/TheHeader.vue";

import routes from "./router.js";
import { store } from "./store/index.js";

Vue.component("alert-component", AlertComponent);
Vue.component("the-header", TheHeader);

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
            console.log("Next in only Auth");
            next();
        }
    } else if (to.matched.some(record => record.meta.requiresVisitor)) {
        console.log("Requires visitor");
        if (store.getters.loggedIn) {
            next({
                path: "my-details"
            });
        } else {
            next();
        }
    } else {
        console.log("Required nothing");
        next();
    }
});

const app = new Vue({
    el: "#app",
    render: h => h(App),
    router,
    store
});
