<template>
  <div class="row">
    <div class="col-sm-6 offset-sm-3">
      <div class="card">
        <div class="card-body">
          <alert-component :error="error" v-if="!!error"></alert-component>
          <h4 class="card-title">Login</h4>
          <form @submit.prevent="submitForm">
            <div class="mb-3" v-show="mode === 'signup'">
              <label for="name" class="form-label">Your Name</label>
              <input
                type="text"
                class="form-control"
                id="name"
                aria-describedby="emailHelp"
                v-model="name"
              />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email address</label>
              <input
                type="email"
                class="form-control"
                id="email"
                aria-describedby="emailHelp"
                v-model="email"
              />
            </div>
            <div class="mb-3" v-show="mode === 'signup'">
              <label for="phone" class="form-label">Phone</label>
              <input
                type="text"
                class="form-control"
                id="phone"
                aria-describedby="PhoneNumber"
                v-model="phone"
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="password"
              />
            </div>
            <div>
              <button type="submit" class="btn btn-primary">
                {{ submitButtonCaption }}
              </button>
              <a class="ml-5 link-btn" @click="changeMode">{{
                switchModeButtonCaption
              }}</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: null,
      mode: "login",
      email: null,
      password: null,
      phone: null,
      name: null,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === "login") {
        return "Login";
      }
      return "Sign Up";
    },
    switchModeButtonCaption() {
      if (this.mode === "login") {
        return "New? Sign Up";
      }
      return "Login Instead";
    },
  },
  methods: {
    changeMode() {
      if (this.mode === "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },
    async submitForm() {
      console.log("Login");
      this.error = null;
      if (
        this.email === null ||
        !this.email.includes("@") ||
        this.password === null ||
        (this.mode === "signup" && (this.name === null || this.phone === null))
      ) {
        this.error =
          "Please enter valid email and ensure all fields are filled";
        return;
      }
      try {
        if (this.mode === "login") {
          await this.$store
            .dispatch("login", {
              username: this.email,
              password: this.password,
            })
            .then((response) => {
              this.$router.replace("/my-details");
            });
        } else {
          await this.$store
            .dispatch("signup", {
              name: this.name,
              email: this.email,
              password: this.password,
              phone: this.phone,
            })
            .then((response) => {
              console.log("Created");
              this.mode = "login";
            });
        }
      } catch (err) {
        console.log("error");
        console.log(err);
        this.error =
          err.message || "Failed to authenticate, Please check credentials";
      }
    },
  },
};
</script>

<style scoped>
.link-btn {
  cursor: pointer;
}
</style>