<template>
  <div>contacts</div>
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