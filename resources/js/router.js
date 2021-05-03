import UserAuth from "./components/auth/UserAuth.vue";

import UserDetails from "./components/auth/UserDetails.vue";
import UsersList from "./components/users/UsersList.vue";

import OrdersList from "./components/orders/OrdersList.vue";
import CreateOrder from "./components/orders/CreateOrder.vue";
import EditOrder from './components/orders/EditOrder.vue';

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
        path: "/my-details",
        component: UserDetails,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/users",
        component: UsersList,
        meta: {
            requiresAuth: true,
            requiresAdmin: true,
        }
    },
    {
        path: "/orders/create",
        component: CreateOrder,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/orders",
        component: OrdersList,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/orders/edit/:id",
        component: EditOrder,
        props: true,
        meta: {
            requiresAuth: true
        }
    },
    { path: "/logout", component: LogOut }
];

export default routes;
