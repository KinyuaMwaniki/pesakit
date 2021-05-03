export default {
    login(context, payload) {
        let submit_method = "POST";
        let uri = "/api/login";
        let submit_data = payload;

        return new Promise((resolve, reject) => {
            axios({ method: submit_method, url: uri, data: submit_data })
                .then(response => {
                    localStorage.setItem(
                        "access_token",
                        response.data.access_token
                    );
                    context.commit("retrieveToken", response.data.access_token);
                    // context.dispatch('getUserDetails');
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error.response.data.error);
                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log("Error", error.message);
                    }
                    console.log(error.config);
                });
        });
    },
    destroyToken(context) {
        if (!context.getters.loggedIn) {
            return;
        }

        console.log(1);

        axios.defaults.headers.common["Authorization"] =
            "Bearer " + context.getters.token;

        let submit_method = "POST";
        let uri = "/api/logout";

        return new Promise((resolve, reject) => {
            axios({ method: submit_method, url: uri })
                .then(response => {
                    localStorage.removeItem("access_token");
                    context.commit("destroyToken");
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error.response.data.error);
                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log("Error", error.message);
                    }
                    console.log(error.config);
                    localStorage.removeItem("access_token");
                    context.commit("destroyToken");
                });
        });
    },
    signup(context, payload) {
        let submit_method = "POST";
        let uri = "/api/register";
        let submit_data = payload;

        return new Promise((resolve, reject) => {
            axios({ method: submit_method, url: uri, data: submit_data })
                .then(response => {
                    // context.dispatch('getUserDetails');
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log("Error", error.message);
                    }
                    console.log(error.config);
                });
        });
    },

    getUserDetails(context) {
        let submit_method = "GET";
        let uri = "/api/user-details";

        axios.defaults.headers.common["Authorization"] =
            "Bearer " + context.getters.token;

        console.log(1);

        return new Promise((resolve, reject) => {
            axios({ method: submit_method, url: uri })
                .then(response => {
                    console.log(2);
                    context.commit("loadUserInfo", response.data);
                    resolve(response);
                })
                .catch(function(error) {
                    if (error.response.data.errors) {
                        let validation_errors = [];
                        let validation_messages = [];
                        for (const key in error.response.data.errors) {
                            validation_errors.push(
                                error.response.data.errors[key]
                            );
                        }
                        validation_errors.forEach(error =>
                            error.forEach(single =>
                                validation_messages.push(single)
                            )
                        );
                        reject(validation_messages);
                    }
                    reject(error);
                });
        });
    },

    loadAllUsers(context) {
        let submit_method = "GET";
        let uri = "/api/v1/users";

        axios.defaults.headers.common["Authorization"] =
            "Bearer " + context.getters.token;

        return new Promise((resolve, reject) => {
            axios({ method: submit_method, url: uri })
                .then(response => {
                    console.log(response.data);
                    context.commit("loadUsers", response.data);
                    resolve(response);
                })
                .catch(function(error) {
                    if (error.response.data.errors) {
                        let validation_errors = [];
                        let validation_messages = [];
                        for (const key in error.response.data.errors) {
                            validation_errors.push(
                                error.response.data.errors[key]
                            );
                        }
                        validation_errors.forEach(error =>
                            error.forEach(single =>
                                validation_messages.push(single)
                            )
                        );
                        reject(validation_messages);
                    }
                    reject(error);
                });
        });
    },
    showUserDetails(context, payload) {
        let submit_method = "GET";
        let uri = `/api/v1/users/${payload.id}`;

        axios.defaults.headers.common["Authorization"] =
            "Bearer " + context.getters.token;

        return new Promise((resolve, reject) => {
            axios({ method: submit_method, url: uri })
                .then(response => {
                    context.commit("loadSelectedUser", response.data);
                    resolve(response);
                })
                .catch(function(error) {
                    if (error.response.data.errors) {
                        let validation_errors = [];
                        let validation_messages = [];
                        for (const key in error.response.data.errors) {
                            validation_errors.push(
                                error.response.data.errors[key]
                            );
                        }
                        validation_errors.forEach(error =>
                            error.forEach(single =>
                                validation_messages.push(single)
                            )
                        );
                        reject(validation_messages);
                    }
                    reject(error);
                });
        });
    }
};
