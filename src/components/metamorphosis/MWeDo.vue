<template>
  <div class="mWorksBox">
    <div class="wFilters">
      <div class="wFi">PHOTO/VIDEO</div>
      <div class="wFi">DEV</div>
      <div class="wFi">GRAPHICS</div>
    </div>
    <div class="work" v-for="(work, i) in works" :key="i + `_work`">
      <v-img
        v-if="work.featured_media_url"
        :src="work.featured_media_url"
        class="grey lighten-2 workImage"
        :aspect-ratio="16 / 9"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </div>
  </div>
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
        var works = (
          await axios.get(
            `https://endorphinoutdoor.com/wp-json/wp/v2/posts?categories=46`
          )
        ).data;

        for (const work of works) {
          if (work.featured_media !== 0) {
            work["featured_media_url"] = (
              await axios.get(
                `https://endorphinoutdoor.com/wp-json/wp/v2/media/${work.featured_media}`
              )
            ).data.source_url;
          }
        }
        this.works = works;
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
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 100px 0;
}
.work {
  width: 100%;
  height: 300px;
}
.workImage {
  width: 100%;
  max-height: 100%;
}
.wFilters {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wFi {
  width: calc(100vw / 3);
  height: 100%;
  border: 1px solid rgba(223, 223, 223, 0.63);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 1s;

  &:hover {
    background: rgba(182, 182, 182, 0.521);
    transition: 1s;
  }
}
// ##
@media (max-width: 650px) {
  .work {
    height: 200px;
  }
  .wFilters {
    flex-direction: column;
    height: 150px;
  }
  .wFi {
    width: 100%;
    height: 50px;
  }
}
// ##
@media (max-width: 400px) {
  .work {
    height: 150px;
  }
}
</style>