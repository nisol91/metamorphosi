<template>
  <div class="contBox"></div>
</template>
<script>
export default {
  created() {
    this.$store.commit("selectEl", "mContacts");
    setTimeout(() => {
      this.$store.commit("toggleHomeMenuColor", true);
    }, 2000);
  },
};
</script>
<style lang="scss">
@import "../../sass/_variables.scss";

.contBox {
  min-height: 100vh;
  background: $primary-background;
}
</style>