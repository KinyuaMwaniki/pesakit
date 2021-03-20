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
        to="/orders"
        tag="li"
        active-class="current"
        exact
        ><a>Orders</a></router-link
      >
      <router-link
        v-if="isLoggedIn"
        to="/logout"
        tag="li"
        active-class="current"
        exact
        ><a>Logout</a></router-link
      >
    </ul>
  </nav>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.loggedIn;
    },
  },
};
</script>