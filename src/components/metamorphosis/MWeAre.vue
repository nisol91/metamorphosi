<template>
  <div class="weAreBox">
    <div
      class="weAreContBkg fade-in-home"
      :style="{
        backgroundImage: `url(${bkgUrl})`,
      }"
    >
      <div class="weAreCont">
        <div class="weAreTitleText">we are</div>
        <div class="weAreText">we are content</div>
      </div>
      <div class="fotoOverlayWeAre"></div>
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
    this.$store.commit("selectEl", "mAbout");
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
        await axios.get(`https://endorphinoutdoor.com/wp-json/wp/v2/media/2882`)
      ).data.source_url;
      this.bkgUrl = bkg;
      console.log(bkg);
    },
  },
};
</script>
<style lang="scss">
@import "../../sass/_variables.scss";
.weAreContBkg {
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
  z-index: 9700;
}
.fotoOverlayWeAre {
  z-index: 9800;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(207, 207, 207, 0.233);
}
.weAreCont {
  width: 60%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 9900;
}
.weAreTitleText {
  font-size: 35px;
}
.weAreText {
  font-size: 15px;
}
.weAreBox {
  min-height: 100vh;
  width: 100%;
  background: $primary-background;
}
// ##
@media (max-width: 800px) {
  .weAreContBkg {
    font-size: 25px;
  }
}
// ##
@media (max-width: 600px) {
  .weAreContBkg {
    font-size: 15px;
  }
}
</style>