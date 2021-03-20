export default {
    orders(state) {
        return state.orders;
    },
    loggedIn(state) {
        return state.token != null;
    },
    token(state) {
        return state.token;
    }
}