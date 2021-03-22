<template>
  <div class="row gtr-200">
    <div class="col-sm-8 offset-sm-2 col-12-narrower">
      <div class="card">
        <div class="card-body">
          <alert-component :error="error" v-if="!!error"></alert-component>
          <h4 class="card-title">New Product</h4>
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="name">Name</label>
              <input
                type="text"
                class="form-control"
                id="name"
                aria-describedby="name"
                v-model="form.name"
              />
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <input
                type="text"
                class="form-control"
                id="description"
                v-model="form.description"
              />
            </div>
            <div class="form-group">
              <label for="quantity">Quantity</label>
              <input
                type="number"
                class="form-control"
                id="quantity"
                v-model="form.quantity"
              />
            </div>
            <div class="form-group">
              <label for="">Suppliers</label>
              <v-select
                v-model="form.supplier_ids"
                :reduce="(supplier) => supplier.id"
                label="name"
                :options="suppliers"
                multiple
              ></v-select>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
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
      form: {
        name: null,
        description: null,
        quantity: null,
        supplier_ids: [],
      },
    };
  },
  computed: {
    suppliers() {
      return this.$store.getters.all_suppliers;
    },
  },
  created() {
    this.loadAllSuppliers();
  },
  methods: {
    async loadAllSuppliers() {
      try {
        this.$store.dispatch("loadAllSuppliers").catch((error) => {
          this.error = error;
        });
      } catch (error) {
        this.error = error.message || "Unable to Load Suppliers";
      }
    },
    async submitForm() {
      this.error = null;

      if (!this.validateForm()) {
        this.error = "Please ensure all fields are filled";
        return;
      }
      this.$store
        .dispatch("addProduct", this.form)
        .then((response) => {
          this.$router.replace("/products");
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