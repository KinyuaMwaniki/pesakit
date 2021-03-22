<template>
  <div class="row gtr-200">
    <div class="col-sm-8 offset-sm-2 col-12-narrower">
      <div class="card">
        <div class="card-body">
          <alert-component :error="error" v-if="!!error"></alert-component>
          <h4 class="card-title">New Order</h4>
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <!-- <label for="name">Name</label> -->
              <select class="form-control" v-model="selected_product_id">
                <option value="-1" disabled>
                  Select Product and Add to order
                </option>
                <option
                  :value="product.id"
                  v-for="product in products"
                  :key="product.id"
                >
                  {{ product.name }}
                </option>
              </select>
            </div>
            <button
              type="button"
              @click="addProduct"
              class="btn btn-primary btn-sm"
            >
              Add to order
            </button>
          </form>
          <hr />
          <h5>Selected Products</h5>
          <table class="table mt-4">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in form.order_products" :key="product.id">
                <td>{{ product.name }}</td>
                <td>{{ product.description }}</td>
                <td>
                  <button
                    @click="removeProduct(product.id)"
                    class="btn btn-sm btn-primary"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <button type="button" @click="submitForm" class="btn btn-primary">
            Submit Order
          </button>
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
      selected_product_id: -1,
      form: {
        order_products: [],
      },
    };
  },
  computed: {
    products() {
      return this.$store.getters.all_products;
    },
  },
  created() {
    this.loadAllProducts();
  },
  methods: {
    async loadAllProducts() {
      try {
        await this.$store.dispatch("loadAllProducts");
      } catch (error) {
        this.error = error.message || "Unable to Load Products";
      }
    },
    addProduct() {
      this.error = null;
      if (this.selected_product_id === -1) {
        this.error = "Please select a product to add";
        return;
      }
      var that = this;
      let selectedProduct = this.products.filter(function (product) {
        return product.id == that.selected_product_id;
      });

      // Check if added item is already added to order products
      let existing = this.form.order_products.filter(function (product) {
        return product.id == that.selected_product_id;
      });

      if (existing.length > 0) {
        this.error = "Item already added";
        this.selected_product_id = -1;
        return;
      }

      this.form.order_products.push(selectedProduct[0]);
      this.selected_product_id = -1;
    },
    removeProduct(product_id) {
      this.form.order_products = this.form.order_products.filter(
        (product) => product.id !== product_id
      );
    },
    async submitForm() {
      this.error = null;
      if (this.form.order_products.length === 0) {
        this.error = "Please select at least one product";
        return;
      }
      let products = [];

      for (const product of this.form.order_products) {
        if (!products.includes(product.id)) {
          products.push(product.id);
        }
      }

      await this.$store
        .dispatch("createOrder", {
          order_products: products,
        })
        .then((_) => {
          this.$router.replace("/orders");
        })
        .catch((error) => {
          this.error = error;
        });
    },

    validateForm() {
      if (
        this.form.name === null ||
        this.form.description === null ||
        this.form.quantity === null
      ) {
        return false;
      }
      return true;
    },
  },
};
</script>