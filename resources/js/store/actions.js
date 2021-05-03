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
                    context.commit('loadUserInfo', response.data);
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
                    context.commit('loadUsers', response.data);
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

 



































































































































    addProduct(context, payload) {
        axios.defaults.headers.common["Authorization"] =
            "Bearer " + context.getters.token;

        let submit_method = "POST";
        let uri = "/api/v1/products";
        return new Promise((resolve, reject) => {
            axios({ method: submit_method, url: uri, data: payload })
                .then(response => {
                    if (response.status == 200) {
                        resolve(response);
                    }
                    if (response.status == 400) {
                        reject(
                            "Please ensure all fields are of the correct format"
                        );
                    }
                })
                .catch(function(error) {
                    reject("Unable to Save. Please try again");
                });
        });
    },
    editProduct(context, payload) {
        axios.defaults.headers.common["Authorization"] =
            "Bearer " + context.getters.token;

        let submit_method = "PUT";
        let uri = "/api/v1/products/" + payload.id;
        return new Promise((resolve, reject) => {
            axios({ method: submit_method, url: uri, data: payload })
                .then(response => {
                    if (response.status == 200) {
                        resolve(response);
                    }
                    if (response.status == 400) {
                        reject("Not Found");
                    }
                })
                .catch(function(error) {
                    reject("Unable to Save. Please try again");
                });
        });
    },
    deleteProduct(context, payload) {
        axios.defaults.headers.common["Authorization"] =
            "Bearer " + context.getters.token;

        let submit_method = "DELETE";
        let uri = "/api/v1/products/" + payload.id;
        return new Promise((resolve, reject) => {
            axios({ method: submit_method, url: uri, data: payload })
                .then(response => {
                    if (response.status == 200) {
                        resolve(response);
                    }
                    if (response.status == 400) {
                        reject("Not Found");
                    }
                })
                .catch(function(error) {
                    reject("Unable to Delete. Please try again");
                });
        });
    },
    async loadSuppliers(context, payload) {
        let submit_method = "GET";
        let uri = "/api/v1/suppliers?page=" + payload.page;

        axios.defaults.headers.common["Authorization"] =
            "Bearer " + context.getters.token;

        axios({ method: submit_method, url: uri })
            .then(response => {
                if (response.status === 200) {
                    context.commit("setSuppliers", response.data.suppliers);
                }
            })
            .catch(function(err) {
                const error = new Error(err || "Failed to Fetch");
                throw error;
            });
    },
    async loadAllSuppliers(context) {
        let submit_method = "GET";
        let uri = "/api/v1/all-suppliers";

        axios.defaults.headers.common["Authorization"] =
            "Bearer " + context.getters.token;

        axios({ method: submit_method, url: uri })
            .then(response => {
                if (response.status === 200) {
                    context.commit("setAllSuppliers", response.data.suppliers);
                }
            })
            .catch(function(err) {
                const error = new Error(err || "Failed to Fetch");
                throw error;
            });
    },
    addSupplier(context, payload) {
        axios.defaults.headers.common["Authorization"] =
            "Bearer " + context.getters.token;

        let submit_method = "POST";
        let uri = "/api/v1/suppliers";
        return new Promise((resolve, reject) => {
            axios({ method: submit_method, url: uri, data: payload })
                .then(response => {
                    if (response.status == 200) {
                        resolve(response);
                    }
                    if (response.status == 400) {
                        reject(
                            "Please ensure all fields are of the correct format"
                        );
                    }
                })
                .catch(function(error) {
                    reject("Unable to Save. Please try again");
                });
        });
    },
    editSupplier(context, payload) {
        axios.defaults.headers.common["Authorization"] =
            "Bearer " + context.getters.token;

        let submit_method = "PUT";
        let uri = "/api/v1/suppliers/" + payload.id;
        return new Promise((resolve, reject) => {
            axios({ method: submit_method, url: uri, data: payload })
                .then(response => {
                    if (response.status == 200) {
                        resolve(response);
                    }
                    if (response.status == 400) {
                        reject("Not Found");
                    }
                })
                .catch(function(_) {
                    reject("Unable to Save. Please try again");
                });
        });
    },
    deleteSupplier(context, payload) {
        axios.defaults.headers.common["Authorization"] =
            "Bearer " + context.getters.token;

        let submit_method = "DELETE";
        let uri = "/api/v1/suppliers/" + payload.id;
        return new Promise((resolve, reject) => {
            axios({ method: submit_method, url: uri, data: payload })
                .then(response => {
                    if (response.status == 200) {
                        resolve(response);
                    }
                    if (response.status == 400) {
                        reject("Not Found");
                    }
                })
                .catch(function(error) {
                    reject("Unable to Delete. Please try again");
                });
        });
    },
    async loadOrders(context, payload) {
        let submit_method = "GET";
        let uri = "/api/v1/orders?page=" + payload.page;

        axios.defaults.headers.common["Authorization"] =
            "Bearer " + context.getters.token;

        axios({ method: submit_method, url: uri })
            .then(response => {
                if (response.status === 200) {
                    context.commit("setOrders", response.data.orders);
                }
            })
            .catch(function(err) {
                const error = new Error(err || "Failed to Fetch");
                throw error;
            });
    },
    async loadAllOrders(context) {
        let submit_method = "GET";
        let uri = "/api/v1/all-orders";

        axios.defaults.headers.common["Authorization"] =
            "Bearer " + context.getters.token;

        axios({ method: submit_method, url: uri })
            .then(response => {
                if (response.status === 200) {
                    context.commit("setAllOrders", response.data.orders);
                }
            })
            .catch(function(err) {
                const error = new Error(err || "Failed to Fetch");
                throw error;
            });
    },
    createOrder(context, payload) {
        axios.defaults.headers.common["Authorization"] =
            "Bearer " + context.getters.token;

        let submit_method = "POST";
        let uri = "/api/v1/orders";
        return new Promise((resolve, reject) => {
            axios({ method: submit_method, url: uri, data: payload })
                .then(response => {
                    if (response.status == 200) {
                        resolve(response);
                    }
                    if (response.status == 400) {
                        reject(
                            "Please ensure all fields are of the correct format"
                        );
                    }
                })
                .catch(function(error) {
                    reject("Unable to Save. Please try again");
                });
        });
    },
    editOrder(context, payload) {
        axios.defaults.headers.common["Authorization"] =
            "Bearer " + context.getters.token;

        let submit_method = "PUT";
        let uri = "/api/v1/orders/" + payload.id;
        return new Promise((resolve, reject) => {
            axios({ method: submit_method, url: uri, data: payload })
                .then(response => {
                    if (response.status == 200) {
                        resolve(response);
                    }
                    if (response.status == 400) {
                        reject(
                            "Please ensure all fields are of the correct format"
                        );
                    }
                })
                .catch(function(error) {
                    reject("Unable to Save. Please try again");
                });
        });
    },
    deleteOrder(context, payload) {
        axios.defaults.headers.common["Authorization"] =
            "Bearer " + context.getters.token;

        let submit_method = "DELETE";
        let uri = "/api/v1/orders/" + payload.id;
        return new Promise((resolve, reject) => {
            axios({ method: submit_method, url: uri, data: payload })
                .then(response => {
                    if (response.status == 200) {
                        resolve(response);
                    }
                    if (response.status == 400) {
                        reject("Not Found");
                    }
                })
                .catch(function(error) {
                    reject("Unable to Delete. Please try again");
                });
        });
    },
    getProdQty(context) {
        let submit_method = "GET";
        let uri = "/api/v1/products/quantities";

        axios.defaults.headers.common["Authorization"] =
            "Bearer " + context.getters.token;

        return new Promise((resolve, reject) => {
            axios({ method: submit_method, url: uri })
                .then(response => {
                    if (response.status == 200) {
                        resolve(response);
                    }
                    if (response.status == 400) {
                        reject("Not Found");
                    }
                })
                .catch(function(error) {
                    reject("Unable to Delete. Please try again");
                });
        });
    }
};
