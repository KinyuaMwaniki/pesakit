<template>
  <nav id="nav">
    <ul>
      <router-link
        v-if="!isLoggedIn"
        to="/"
        tag="li"
        active-class="current"
        exact
        ><a>Login</a></router-link
      >
      <router-link
        v-if="isLoggedIn"
        to="/my-details"
        tag="li"
        active-class="current"
        exact
        ><a>My Details</a></router-link
      >
      <router-link
        v-if="isLoggedIn && userType === 1"
        to="/users"
        tag="li"
        active-class="current"
        exact
        ><a>All Users</a></router-link
      >
      <li>
        <router-link v-if="isLoggedIn" to="/logout" active-class="current" exact
          ><a>Logout</a></router-link
        >
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.loggedIn;
    },
    userType() {
      return this.$store.getters.userType;
    },
  },
};
</script>