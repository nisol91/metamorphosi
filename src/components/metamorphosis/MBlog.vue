<template>
  <div class="mBlogBox">
    <div class="blogPosts" v-if="!loaded">
      <div class="blogPostSkel" v-for="(post, i) in 20" :key="i + `_blogPost`">
        <q-skeleton :animation="'pulse'" class="skel" />
        <q-skeleton :animation="'pulse'" class="skel" />
        <q-skeleton :animation="'pulse'" class="skel" />
      </div>
    </div>

    <div class="blogPosts" v-if="loaded">
      <div class="searchBarPosts">
        <div>Search post</div>
        <input
          type="text"
          v-model="searchValue"
          class="form-control"
          @keyup="searchEvent(searchValue)"
        />
      </div>

      <div
        class="blogPost"
        v-for="(post, i) in blogPostsFiltered"
        :key="i + `_blogPost`"
      >
        <div class="pSx">
          <div class="pCategory">
            <div
              class="pCat"
              v-for="(cat, i) in post.catNames"
              :key="i + `_tag`"
              @click="filterTax(cat.id, 'categories')"
            >
              {{ cat.name }}
              <div class="pLine"></div>
            </div>
          </div>
          <router-link
            class="pTitle"
            :to="{
              name: 'mBlogPost',
              params: { id: post.id, postFields: post },
            }"
            >{{ post.title.rendered }}</router-link
          >

          <div class="pSubTitle">
            {{ post.slug }}
          </div>
          <div class="pDate">
            {{ new Date(post.date) | moment("dddd, MMMM Do YYYY") }}
          </div>

          <div class="pTags">
            <div
              class="pTag"
              v-for="(tag, i) in post.tagNames"
              :key="i + `_tag`"
              @click="filterTax(tag.id, 'tags')"
            >
              {{ tag.name }}
              <div class="pLine"></div>
            </div>
          </div>
        </div>
        <div class="pDx">
          <v-img
            v-if="post.featured_media_url"
            :src="post.featured_media_url"
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
    <!-- <div class="blogFilters">dx</div> -->
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
      blogPosts: {},
      blogPostsFiltered: {},
      categories: [],
      tags: [],
      env: process.env.VUE_APP_DB_ENV,
      adminCode: null,
      loaded: false,
      searchValue: null,
    };
  },
  created() {
    this.getAdminCode();
  },
  methods: {
    searchEvent(val) {
      this.blogPostsFiltered = _.filter(this.blogPosts, function (o) {
        if (o.title.rendered) {
          return o.title.rendered.includes(val);
        }
      });
      // if (val == "") {
      //   this.getAdminCode();
      // }
      //    console.log(this.wineEventsFiltered);
    },
    async filterTax(tax, type) {
      this.loaded = false;
      try {
        this.blogPosts = (
          await axios.get(
            `https://endorphinoutdoor.com/wp-json/wp/v2/posts?${type}=${tax}`
          )
        ).data;
      } catch (error) {
        console.log(error);
      }
      this.blogPostsFiltered = this.blogPosts;
      await this.getOtherFields();

      this.loaded = true;
    },
    async getPosts() {
      try {
        this.blogPosts = (
          await axios.get(`https://endorphinoutdoor.com/wp-json/wp/v2/posts`)
        ).data;
        this.blogPostsFiltered = this.blogPosts;
        // console.log(this.coordinates);
      } catch (error) {
        console.log(error);
      }
    },
    async getOtherFields() {
      try {
        if (this.categories.length == 0 && this.tags.length == 0) {
          var categories = [];
          var tags = [];

          var categoriesRaw = (
            await axios.get(
              `https://endorphinoutdoor.com/wp-json/wp/v2/categories`
            )
          ).data;

          var tagsRaw = (
            await axios.get(`https://endorphinoutdoor.com/wp-json/wp/v2/tags`)
          ).data;

          // ----
          categoriesRaw.forEach((cat) => {
            var temp = new Object();
            temp["id"] = cat.id;
            temp["name"] = cat.name;
            temp["slug"] = cat.slug;
            categories.push(temp);
          });
          this.categories = categories;
          //
          tagsRaw.forEach((tag) => {
            var temp = new Object();
            temp["id"] = tag.id;
            temp["name"] = tag.name;
            temp["slug"] = tag.slug;
            tags.push(temp);
          });
          this.tags = tags;
        }

        // ----
        var posts = this.blogPosts;
        for (const post of posts) {
          post["catNames"] = [];
          post["tagNames"] = [];

          post["featured_media_url"] = (
            await axios.get(
              `https://endorphinoutdoor.com/wp-json/wp/v2/media/${post.featured_media}`
            )
          ).data.link;
          post.categories.forEach((postCat) => {
            this.categories.forEach((cat) => {
              if (postCat === cat.id) {
                post["catNames"].push({ name: cat.name, id: cat.id });
              }
            });
          });
          post.tags.forEach((postTag) => {
            this.tags.forEach((tag) => {
              if (postTag === tag.id) {
                post["tagNames"].push({ name: tag.name, id: tag.id });
              }
            });
          });
        }
        this.blogPosts = posts;

        // console.log(this.coordinates);
      } catch (error) {
        console.log(error);
      }
    },
    // getPosts() {
    //   console.log("ok");
    //   db.collection(`blogPosts${this.env}`)
    //     .get()
    //     .then((querySnapshot) => {
    //       console.log(querySnapshot);
    //       const posts = querySnapshot.docs.map((doc) => {
    //         console.log(doc);
    //         var res = new Object(doc.data());
    //         res["id"] = doc.id;
    //         console.log(res);
    //         return res;
    //       });
    //       this.blogPosts = posts;
    //     });
    // },
    async getAdminCode() {
      this.loaded = false;
      this.$store
        .dispatch("getEnvVariables")
        .then((env) => {
          this.adminCode = env[0].superAdmin;
        })
        .then(await this.getPosts())
        .then(await this.getOtherFields())
        .then((this.loaded = true));
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

.skel {
  width: 80% !important;
}
.searchBarPosts {
  width: 80%;
  margin: 20px;
}
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
  justify-content: flex-start;
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
  height: auto;
  background: white;
  border-radius: 3px;
  margin: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
}
.blogPostSkel {
  width: 80%;
  height: 200px;
  background: white;
  border-radius: 3px;
  margin: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  padding: 20px;
}
.pTitle {
  font-weight: bold;
  font-size: 30px;
  cursor: pointer;
  transition: 0.5s;
  padding: 5px;
  margin: 10px 0;

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
  padding: 0 5px;
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
  max-height: 100%;
  border-radius: 4px;
}
.pCategory {
  font-style: italic;
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.pCat {
  background: rgba(175, 175, 175, 0.678);
  margin-right: 5px;
  overflow: hidden;
  position: relative;
  padding: 5px;
  border-radius: 3px;

  .pLine {
    height: 2px;
    width: 100%;
    position: absolute;
    top: 19px;
    right: 105px;
    background: black;
    transition: 0.5s;
  }
  &:hover {
    transition: 0.5s;
    background: rgba(98, 98, 98, 0.74);
  }
}
.editPost {
  margin: 0 30px;
  cursor: pointer;
}
.pDate {
  font-weight: 700;
  font-size: 12px;
  margin: 5px 0;
}
.pTags {
  width: 80%;
  cursor: pointer;
  display: flex;
  margin: 5px 0;
  flex-direction: row;
  justify-content: flex-start;
  .pTag {
    margin-right: 5px;
    overflow: hidden;
    position: relative;
    padding: 5px;
    .pLine {
      height: 2px;
      width: 100%;
      position: absolute;
      top: 22px;
      right: 105px;
      background: black;
      transition: 0.5s;
    }
    &:hover {
      .pLine {
        right: 0px;
        transition: 0.5s;
      }
    }
  }
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