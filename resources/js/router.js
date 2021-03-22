import UserAuth from "./components/auth/UserAuth.vue";

import OrdersList from "./components/orders/OrdersList.vue";
import CreateOrder from "./components/orders/CreateOrder.vue";
import EditOrder from './components/orders/EditOrder.vue';

import ProductsList from "./components/products/ProductsList.vue";
import CreateProduct from "./components/products/CreateProduct.vue";
import EditProduct from "./components/products/EditProduct.vue";

import SuppliersList from "./components/suppliers/SuppliersList.vue";
import CreateSupplier from "./components/suppliers/CreateSupplier.vue";
import EditSupplier from "./components/suppliers/EditSupplier.vue";

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
    {
        path: "/products",
        component: ProductsList,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/products/create",
        component: CreateProduct,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/products/edit/:id",
        component: EditProduct,
        props: true,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/suppliers",
        component: SuppliersList,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/suppliers/create",
        component: CreateSupplier,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/suppliers/edit/:id",
        component: EditSupplier,
        props: true,
        meta: {
            requiresAuth: true
        }
    },
    { path: "/logout", component: LogOut }
];

export default routes;
