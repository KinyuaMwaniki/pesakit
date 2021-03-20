import UserAuth from "./components/auth/UserAuth.vue";
import OrdersList from "./components/orders/OrdersList.vue";
import LogOut from "./components/auth/Logout.vue";

const routes = [
    {
        path: "",
        component: UserAuth,
        meta: {
            requiresVisitor: true
        }
    },
    {
        path: "/orders",
        component: OrdersList,
        meta: {
            requiresAuth: true
        }
    },
    { path: "/logout", component: LogOut }
];

export default routes;
