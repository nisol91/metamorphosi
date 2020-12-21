<template>
  <div class="mWorksBox"></div>
</template>
<script>
import { db, Timestamp, GeoPoint } from "../../main";
import firebase from "firebase";
import VueMoment from "vue-moment";
import { mapState, mapGetters } from "vuex";
import axios from "axios";
import _ from "lodash";

export default {
  data() {
    return {
      works: {},
      catSelected: "",
      env: process.env.VUE_APP_DB_ENV,
      adminCode: null,
      loaded: false,
    };
  },
  created() {
    this.getWorks();
    this.$store.commit("selectEl", "mContents");
    setTimeout(() => {
      this.$store.commit("toggleHomeMenuColor", true);
    }, 2000);
  },
  methods: {
    async getWorks() {
      this.loaded = false;
      try {
        this.works = (
          await axios.get(
            `https://endorphinoutdoor.com/wp-json/customendpoint/v1/latest-posts/stories`
          )
        ).data;
      } catch (error) {
        console.log(error);
      }

      this.loaded = true;
    },
    // async filterTax(tax, type) {
    //   this.loaded = false;
    //   try {
    //     this.blogPosts = (
    //       await axios.get(
    //         `https://endorphinoutdoor.com/wp-json/wp/v2/posts?${type}=${tax}`
    //       )
    //     ).data;
    //   } catch (error) {
    //     console.log(error);
    //   }
    //   this.blogPostsFiltered = this.blogPosts;
    //   await this.getOtherFields();

    //   this.loaded = true;
    // },
  },
  computed: {
    ...mapState({
      user: "user",
      userRole: "userRole",
      menuEl: "menuEl",
    }),
  },
};
</script>
<style lang="scss">
@import "../../sass/_variables.scss";

.mWorksBox {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
// ##
@media (max-width: 800px) {
}
</style>