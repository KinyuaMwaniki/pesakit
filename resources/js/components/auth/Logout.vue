<template></template>

<script>
export default {
  created() {
    console.log(1);
    this.$store.dispatch("destroyToken").then((response) => {
      console.log("Log out");
      this.$router.replace("/");
    });
  },
};
</script>