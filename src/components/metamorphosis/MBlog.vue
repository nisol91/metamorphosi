<template>
  <div class="mBlogBox">
    <div class="blogPosts">
      <div
        class="blogPost"
        v-for="(post, i) in blogPosts"
        :key="i + `_blogPost`"
      >
        <div class="pSx">
          <div class="pCategory">
            {{ post.category }}
            <v-icon v-if="userRole && userRole == adminCode" class="editPost"
              >mdi-playlist-edit</v-icon
            >
          </div>
          <div class="pTitle">
            {{ post.title }}
          </div>
          <div class="pSubTitle">
            {{ post.subtitle }}
          </div>
          <div class="pDate">
            {{
              new Date(post.createdTimestamp.seconds * 1000)
                | moment("dddd, MMMM Do YYYY")
            }}
          </div>
          <div class="pTags">
            <div class="pTag" v-for="(tag, i) in post.tags" :key="i + `_tag`">
              {{ tag }}
            </div>
          </div>
        </div>
        <div class="pDx">
          <v-img
            v-if="post.media"
            :src="post.media[0]"
            class="grey lighten-2 pMedia"
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
    </div>
    <div class="blogFilters">dx</div>
  </div>
</template>
<script>
import { db, Timestamp, GeoPoint } from "../../main";
import firebase from "firebase";
import VueMoment from "vue-moment";
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      blogPosts: {},
      env: process.env.VUE_APP_DB_ENV,
      adminCode: null,
    };
  },
  created() {
    this.getAdminCode();
  },
  methods: {
    getPosts() {
      console.log("ok");
      db.collection(`blogPosts${this.env}`)
        .get()
        .then((querySnapshot) => {
          console.log(querySnapshot);
          const posts = querySnapshot.docs.map((doc) => {
            console.log(doc);
            var res = new Object(doc.data());
            res["id"] = doc.id;
            console.log(res);
            return res;
          });
          this.blogPosts = posts;
        });
    },
    getAdminCode() {
      this.$store.dispatch("getEnvVariables").then((env) => {
        this.adminCode = env[0].superAdmin;
        this.getPosts();
      });
    },
  },
  computed: {
    ...mapState({
      user: "user",
      userRole: "userRole",
    }),
  },
};
</script>
<style lang="scss">
@import "../../sass/_variables.scss";

.mBlogBox {
  width: 100%;
  min-height: 100vh;
  padding-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: $primaryBkg;
}
.blogPosts {
  width: 80%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-right: 0.5px solid rgb(197, 197, 197);
}
.blogFilters {
  width: 20%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.blogPost {
  width: 80%;
  height: 300px;
  background: white;
  border-radius: 3px;
  margin: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
}
.pTitle {
  font-weight: bold;
  font-size: 30px;
  cursor: pointer;
  transition: 0.5s;
  padding: 5px;

  &:hover {
    background: rgb(194, 194, 194);
    transition: 0.5s;
    border-radius: 3px;
  }
}
.pSx {
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-direction: column;
}
.pDx {
  width: 70%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pSubtitle {
  font-size: 25px;
}
.pMedia {
  width: 100%;
  border-radius: 4px;
}
.pCategory {
  font-style: italic;
  width: 100%;
}
.editPost {
  margin: 0 30px;
  cursor: pointer;
}
.pDate {
  font-weight: 700;
  font-size: 12px;
}
.pTags {
  width: 80%;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
// ##
@media (max-width: 800px) {
  .blogPost {
    flex-direction: row;
    flex-wrap: wrap;
    height: auto;
  }
  .pSx,
  .pDx {
    width: 100%;
  }
}
</style>