<template>
  <div class="row gtr-200">
    <div class="col-sm-8 offset-sm-2 col-12-narrower">
      <div class="card">
        <div class="card-body">
          <alert-component :error="error" v-if="!!error"></alert-component>
          <bar-chart
            v-if="
              chartdata.labels.length > 0 &&
              chartdata.datasets.length > 0 &&
              !isLoading
            "
            :chartdata="chartdata"
            :options="options"
          ></bar-chart>
          <table class="table mt-5">
            <tbody>
              <tr>
                <td>Total Orders</td>
                <td>{{ orders_total }}</td>
              </tr>
              <tr>
                <td>Total Products</td>
                <td>{{ products_total }}</td>
              </tr>
              <tr>
                <td>Total Suppliers</td>
                <td>{{ suppliers_total }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from "./Graphs/BarChart.vue";

export default {
  components: {
    BarChart,
  },
  data() {
    return {
      isLoading: true,
      error: null,
      chartdata: {
        labels: [],
        datasets: [],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  computed: {
    orders_total() {
      return this.$store.getters.ordersTotal;
    },
    products_total() {
      return this.$store.getters.productsTotal;
    },
    suppliers_total() {
      return this.$store.getters.suppliersTotal;
    },
  },
  created() {
    this.loadProdQty();
    this.loadAllOrders();
    this.loadAllProducts();
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
    async loadAllProducts() {
      try {
        await this.$store.dispatch("loadAllProducts");
      } catch (error) {
        this.error = error.message || "Unable to Load Products";
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
    async loadProdQty() {
      this.isLoading = true;
      var that = this;
      var dataset = {};
      var data_array = [];
      try {
        await this.$store
          .dispatch("getProdQty")
          .then((response) => {
            for (const product of response.data.products) {
              that.chartdata.labels.push(product.name);
              data_array.push(product.quantity);
            }
            dataset.label = "Products with quantitites";
            dataset.backgroundColor = "#f87979";
            dataset.data = data_array;
            that.chartdata.datasets.push(dataset);
            this.isLoading = false;
          })
          .catch((error) => {
            this.error = error;
          });
      } catch (error) {
        this.error = error.message || "Unable to Load Products Quantities";
      }
    },
  },
};
</script>