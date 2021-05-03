<template>
  <div class="row gtr-200">
    <div class="col-sm-8 offset-sm-2 col-12-narrower">
      <header class="major">
        <div class="row">
          <div class="col-sm-5">
            <h2>All Users</h2>
          </div>
        </div>
      </header>
      <table class="table">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>User Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users.data" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.isAdmin === 1 ? 'Administrator' : 'Normal User' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.loadAllUsers();
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
  },
  methods: {
    async loadAllUsers() {
      try {
        await this.$store.dispatch("loadAllUsers").catch((error) => {
          this.error = error;
        });
      } catch (error) {
        this.error = error.message || "Unable to Load Users";
      }
    },
    // async deleteOrder(order_id) {
    //   var r = confirm("Confirm delete!");
    //   if (r == false) {
    //     return;
    //   }
    //   this.$store
    //     .dispatch("deleteOrder", {
    //       id: order_id,
    //     })
    //     .then((_) => {
    //       this.loadOrders();
    //     })
    //     .catch((error) => {
    //       this.error = error;
    //     });
    // },
  },
};
</script>