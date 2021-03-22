<template>
  <div class="row gtr-200">
    <div class="col-sm-8 offset-sm-2 col-12-narrower">
      <div class="card">
        <div class="card-body">
          <alert-component :error="error" v-if="!!error"></alert-component>
          <h4 class="card-title">Edit Supplier</h4>
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
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      error: null,
      form: {
        id: null,
        name: null,
      },
    };
  },
  created() {
    this.setUpForm();
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
    setUpForm() {
      var that = this;
      let selectedSupplier = this.$store.getters.all_suppliers.filter(function (
        supplier
      ) {
        return supplier.id == that.id;
      });

      this.form.name = selectedSupplier[0].name;
    },
    async submitForm() {
      this.error = null;

      if (!this.validateForm()) {
        this.error = "Please ensure all fields are filled";
        return;
      }

      this.form.id = this.id;

      this.$store
        .dispatch("editSupplier", this.form)
        .then((_) => {
          this.$router.replace("/suppliers");
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