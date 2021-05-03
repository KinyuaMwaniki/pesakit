<template>
  <div class="row">
    <div class="col-sm-6 offset-sm-3">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">My Details</h4>
          <table class="table">
            <tbody>
              <tr>
                <th scope="row">Name</th>
                <td>{{ userInfo.name}}</td>
              </tr>
              <tr>
                <th scope="row">Email Address</th>
                <td>{{ userInfo.email }}</td>
              </tr>
              <tr>
                <th scope="row">Phone Number</th>
                <td>{{ userInfo.phone }}</td>
              </tr>
              <tr>
                <th scope="row">User Type</th>
                <td>{{ userInfo.isAdmin === 0 ? 'Normal User' : 'Administrator'}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    console.log(11);
    this.loadUserDetails();
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    },
  },
  methods: {
    async loadUserDetails() {
      try {
        await this.$store
          .dispatch("getUserDetails")
          .catch((error) => {
            this.error = error;
          });
      } catch (error) {
        this.error = error.message || "Unable to Load User Details";
      }
    },
  },
};
</script>