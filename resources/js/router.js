import UserAuth from './components/auth/UserAuth.vue';
import OrdersList from './components/orders/OrdersList.vue';

const routes = [
        { path: '', component: UserAuth },
        { path: '/orders', component: OrdersList }
    ];

export default routes;

