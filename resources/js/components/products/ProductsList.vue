<template>
  <div class="row gtr-200">
    <div class="col-sm-8 offset-sm-2 col-12-narrower">
      <header class="major">
        <div class="row">
          <div class="col-sm-5">
            <h2>All Products</h2>
          </div>
          <div class="col-sm-1">
            <loading v-if="isLoading"></loading>
          </div>
          <div class="col-sm-6 text-right">
            <router-link to="/products/create"
              ><a class="btn btn-primary btn-sm">Create</a></router-link
            >
          </div>
        </div>
      </header>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.name }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.quantity }}</td>
            <td class="text-right">
              <div class="btn-group" role="group">
                <router-link :to="'/products/edit/' + product.id"
                  ><a class="btn btn-primary btn-sm">Edit</a></router-link
                >
                <button
                  type="button"
                  @click="deleteProduct(product.id)"
                  class="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: 4,
      error: null,
      isLoading: false,
    };
  },
  computed: {
    products() {
      return this.$store.getters.products;
    },
    productEditLink() {
      return "/products/edit/" + this.id;
    },
  },
  created() {
    this.loadProducts();
  },
  methods: {
    async loadProducts() {
      try {
        await this.$store.dispatch("loadProducts");
      } catch (error) {
        this.error = error.message || "Unable to Load Products";
      }
    },
    async deleteProduct(product_id) {
      var r = confirm("Confirm delete!");
      if (r == false) {
        return;
      }
        this.$store
        .dispatch("deleteProduct", {
          id: product_id
        })
        .then((_) => {
          this.loadProducts();
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