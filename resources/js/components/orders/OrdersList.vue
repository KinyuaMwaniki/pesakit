<template>
  <div class="row gtr-200">
    <div class="col-sm-8 offset-sm-2 col-12-narrower">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">First</th>
            <th scope="col">Last</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.name">
            <td>{{ order.name }}</td>
            <td>{{ order.age }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
    computed: {
        orders() {
            return this.$store.getters.orders
        }
    }
}
</script>

<style scoped>

</style>