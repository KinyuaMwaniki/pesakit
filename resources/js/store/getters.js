export default {
 
    loggedIn(state) {
        return state.token != null;
    },
    token(state) {
        return state.token;
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
    selectedUser(state) {
        return state.selectedUser;
    }
    

};
