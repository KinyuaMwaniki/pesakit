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

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.getters.token;

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
    signup(_, payload) {

        let submit_method = "POST";
        let uri = "/api/register";
        let submit_data = payload;

        return new Promise((resolve, reject) => {
            axios({ method: submit_method, url: uri, data: submit_data })
                .then(response => {
                    console.log(response);
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
};
