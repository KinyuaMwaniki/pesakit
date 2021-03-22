export default {
    orders(state) {
        return state.orders;
    },
    loggedIn(state) {
        return state.token != null;
    },
    token(state) {
        return state.token;
    },
    products(state) {
        return state.products
    },
    suppliers(state) {
        return state.suppliers
    }
}