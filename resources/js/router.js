import UserAuth from "./components/auth/UserAuth.vue";

import UserDetails from "./components/auth/UserDetails.vue";
import UsersList from "./components/users/UsersList.vue";
import ShowUser from "./components/users/ShowUser.vue";

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
            requiresAdmin: true
        }
    },
    {
        path: "/users/show/:id",
        component: ShowUser,
        props: true,
        meta: {
            requiresAuth: true,
            requiresAdmin: true
        }
    },
    {
        path: "/logout",
        component: LogOut,
        meta: {
            requiresAuth: true
        }
    }
];

export default routes;
