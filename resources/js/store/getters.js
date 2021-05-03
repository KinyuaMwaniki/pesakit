export default {
    orders(state) {
        return state.orders;
    },
    all_orders(state) {
        return state.all_orders;
    },
    loggedIn(state) {
        // console.log("Geeter logged in", state.token)
        return state.token != null;
    },
    token(state) {
        return state.token;
    },
    products(state) {
        return state.products;
    },
    all_products(state) {
        return state.all_products;
    },
    suppliers(state) {
        return state.suppliers;
    },
    all_suppliers(state) {
        return state.all_suppliers;
    },
    ordersTotal(state) {
        return state.all_orders.length;
    },
    productsTotal(state) {
        return state.all_products.length;
    },
    suppliersTotal(state) {
        return state.all_suppliers.length;
    },
    userInfo(state) {
        return state.user;
    },
    userType(state) {
        return state.user.isAdmin;
    },
    users(state) {
        return state.users;
    },
    sampleGetter(state) {
        return 1;
    }

};
