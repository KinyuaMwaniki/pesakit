<template>
  <div class="row gtr-200">
    <div class="col-sm-8 offset-sm-2 col-12-narrower">
      <div class="card">
        <div class="card-body">
          <alert-component :error="error" v-if="!!error"></alert-component>
          <h4 class="card-title">New Supplier</h4>
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
  data() {
    return {
      error: null,
      form: {
        name: null,
      },
    };
  },
  methods: {
    async submitForm() {
      this.error = null;

      if (!this.validateForm()) {
        this.error = "Please ensure all fields are filled";
        return;
      }
      this.$store
        .dispatch("addSupplier", this.form)
        .then((response) => {
          this.$router.replace("/suppliers");
        })
        .catch((error) => {
          this.error = error;
        });
    },

    validateForm() {
      if (
        this.form.name === null 
      ) {
        return false;
      }
      return true;
    },
  },
};
</script>