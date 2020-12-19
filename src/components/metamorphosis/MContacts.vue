<template>
  <div class="contBox">
    <div
      class="mContBkg fade-in-home"
      :style="{
        backgroundImage: `url(${bkgUrl})`,
      }"
    >
      metamorphosistudio@gmail.com
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      bkgUrl: "",
    };
  },
  created() {
    this.$store.commit("selectEl", "mContacts");
    setTimeout(() => {
      this.$store.commit("toggleHomeMenuColor", true);
    }, 2000);
    this.getBkg();
    // test of custom endpoint wp api
    // this.getTest();
  },
  methods: {
    async getTest() {
      // test of custom endpoint wp api
      var res = (
        await axios.get(
          `https://endorphinoutdoor.com/wp-json/customendpoint/v1/latest-posts/3`
        )
      ).data;
      console.log(res);
    },
    async getBkg() {
      var bkg = (
        await axios.get(`https://endorphinoutdoor.com/wp-json/wp/v2/media/2883`)
      ).data.source_url;
      this.bkgUrl = bkg;
      console.log(bkg);
    },
  },
};
</script>
<style lang="scss">
@import "../../sass/_variables.scss";
.mContBkg {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  z-index: 8000;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  font-size: 50px;
  // filter: brightness(100%);
  opacity: 0.9 !important;
}
.contBox {
  min-height: 100vh;
  width: 100%;
  background: $primary-background;
}
// ##
@media (max-width: 800px) {
  .mContBkg {
    font-size: 25px;
  }
}
// ##
@media (max-width: 600px) {
  .mContBkg {
    font-size: 15px;
  }
}
</style>