export default {
    retrieveToken(state, token) {
        state.token = token;
    },
    destroyToken(state) {
        state.token = null;
    },
    setProducts(state, payload) {
        state.products = payload;
    },
    setAllProducts(state, payload) {
        state.all_products = payload;
    },
    setSuppliers(state, payload) {
        state.suppliers = payload;
    },
    setAllSuppliers(state, payload) {
        state.all_suppliers = payload;
    },
    setOrders(state, payload) {
        state.orders = payload;
    },
    setAllOrders(state, payload) {
        state.all_orders = payload;
    },
    loadUserInfo(state, payload) {
        state.user = payload;
    },
    loadUsers(state, payload) {
        state.users = payload;
    }
};
