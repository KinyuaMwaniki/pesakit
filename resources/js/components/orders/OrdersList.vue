<template>
  <div class="row gtr-200">
    <div class="col-sm-8 offset-sm-2 col-12-narrower">
      <header class="major">
        <div class="row">
          <div class="col-sm-5">
            <h2>All Orders</h2>
          </div>
          <div class="col-sm-1">
            <loading v-if="isLoading"></loading>
          </div>
          <div class="col-sm-6 text-right">
            <router-link to="/orders/create"
              ><a class="btn btn-primary btn-sm">Create</a></router-link
            >
          </div>
        </div>
      </header>
      <table class="table">
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Products</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders.data" :key="order.name">
            <td>{{ order.order_number }}</td>
            <td>
              <ul class="list-unstyled">
                <li v-for="product in order.products" :key="product.id">
                  {{ product.name }}
                </li>
              </ul>
            </td>
            <td>
              <div class="btn-group" role="group">
                <router-link :to="'/orders/edit/' + order.id"
                  ><a class="btn btn-primary btn-sm">Edit</a></router-link
                >
                <button
                  type="button"
                  @click="deleteOrder(order.id)"
                  class="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <pagination
        :data="orders"
        @pagination-change-page="getResults"
      ></pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: null,
    };
  },
  created() {
    this.loadOrders();
    this.loadAllOrders();
  },
  computed: {
    orders() {
      return this.$store.getters.orders;
    },
  },
  methods: {
    async loadOrders(page = 1) {
      try {
        await this.$store.dispatch("loadOrders", {
          page: page
        }).catch((error) => {
          this.error = error;
        });
      } catch (error) {
        this.error = error.message || "Unable to Load Suppliers";
      }
    },
    async loadAllOrders() {
      try {
        await this.$store.dispatch("loadAllOrders").catch((error) => {
          this.error = error;
        });
      } catch (error) {
        this.error = error.message || "Unable to Load Suppliers";
      }
    },
    async getResults(page = 1) {
      try {
        await this.$store
          .dispatch("loadOrders", {
            page: page,
          })
          .catch((error) => {
            this.error = error;
          });
      } catch (error) {
        this.error = error.message || "Unable to Load Suppliers";
      }
    },
    async deleteOrder(order_id) {
      var r = confirm("Confirm delete!");
      if (r == false) {
        return;
      }
      this.$store
        .dispatch("deleteOrder", {
          id: order_id,
        })
        .then((_) => {
          this.loadOrders();
        })
        .catch((error) => {
          this.error = error;
        });
    },
  },
};
</script>

<style scoped>
</style>