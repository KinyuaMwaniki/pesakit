export default {
    retrieveToken(state, token) {
        state.token = token;
    },
    destroyToken(state) {
        state.token = null;
    },
    loadUserInfo(state, payload) {
        state.user = payload;
    },
    loadUsers(state, payload) {
        state.users = payload;
    },
    loadSelectedUser(state, payload) {
        state.selectedUser = payload;
    }
};
