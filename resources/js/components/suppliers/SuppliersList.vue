<template>
  <div class="row gtr-200">
    <div class="col-sm-8 offset-sm-2 col-12-narrower">
      <header class="major">
        <div class="row">
          <div class="col-sm-5">
            <h2>All Suppliers</h2>
          </div>
          <div class="col-sm-1">
            <loading v-if="isLoading"></loading>
          </div>
          <div class="col-sm-6 text-right">
            <router-link to="/suppliers/create"
              ><a class="btn btn-primary btn-sm">Create</a></router-link
            >
          </div>
        </div>
      </header>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="supplier in suppliers.data" :key="supplier.id">
            <td>{{ supplier.name }}</td>
            <td class="text-right">
              <div class="btn-group" role="group">
                <router-link :to="'/suppliers/edit/' + supplier.id"
                  ><a class="btn btn-primary btn-sm">Edit</a></router-link
                >
                <button
                  type="button"
                  @click="deleteSupplier(supplier.id)"
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
        :data="suppliers"
        @pagination-change-page="loadSuppliers"
      ></pagination>
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
    suppliers() {
      return this.$store.getters.suppliers;
    },
    productEditLink() {
      return "/products/edit/" + this.id;
    },
  },
  created() {
    this.loadSuppliers();
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
    async loadSuppliers(page = 1) {
      try {
        this.$store
          .dispatch("loadSuppliers", {
            page: page,
          })
          .catch((error) => {
            this.error = error;
          });
      } catch (error) {
        this.error = error.message || "Unable to Load Suppliers";
      }
    },
    async deleteSupplier(supplier_id) {
      var r = confirm("Confirm delete!");
      if (r == false) {
        return;
      }
      this.$store
        .dispatch("deleteSupplier", {
          id: supplier_id,
        })
        .then((_) => {
          this.loadSuppliers();
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