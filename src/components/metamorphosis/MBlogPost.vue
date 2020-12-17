<template>
  <div class="editorBox">
    <div class="load" v-if="!post">
      <q-linear-progress
        indeterminate
        rounded
        color="blue-grey-6"
        class="q-mt-sm"
      />
    </div>
    <div class="postBox" v-if="post">
      <div class="postTitle" v-if="post">{{ post.title.rendered }}</div>
      <div class="postDate" v-if="post">
        {{ new Date(post.date) | moment("dddd, MMMM Do YYYY") }}
      </div>

      <div class="postCategory" v-if="post">
        <div class="pCat" v-for="(cat, i) in post.catNames" :key="i + `_tag`">
          {{ cat.name }}
        </div>
      </div>
      <div class="post" v-if="post" v-html="post.content.rendered"></div>
      <div class="postFooter postShare">
        share:
        <ShareNetwork
          class="shareIcons"
          network="facebook"
          :url="url"
          title="fb"
        >
          <v-icon>mdi-facebook</v-icon>
        </ShareNetwork>
        <ShareNetwork
          class="shareIcons"
          network="twitter"
          :url="url"
          title="insta"
        >
          <v-icon>mdi-twitter</v-icon>
        </ShareNetwork>
      </div>
      <div class="postFooter relPosts">
        <q-circular-progress
          v-if="!relatedPosts"
          indeterminate
          size="75px"
          :thickness="0.6"
          color="blue-grey-7"
          center-color="grey-8"
          class="q-ma-md"
        />
        <div
          class="relPost"
          v-for="(post, i) in relatedPosts"
          :key="i + `_blogRelatedPost`"
        >
          <div class="relPostTitle" @click="pushPost(post.id)">
            {{ post.title.rendered }}
          </div>
          <v-img
            v-if="post.featured_media_url"
            :src="post.featured_media_url"
            class="grey lighten-2 relPostImg"
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
      <div class="postFooter">comments</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueMoment from "vue-moment";
import VueSocialSharing from "vue-social-sharing";

export default {
  data() {
    return {
      post: null,
      relatedPosts: null,
      categories: [],
      tags: [],
      url: "",
    };
  },
  async created() {
    await this.getPost();
    await this.getRelatedPost();
    this.url = process.env.VUE_APP_URL + this.$route.fullPath;
    console.log(process.env.VUE_APP_URL + this.$route.fullPath);
  },
  methods: {
    pushPost(id) {
      this.$router
        .push({
          name: "mBlogPost",
          params: { id: id },
        })
        .then(location.reload());
    },
    async getRelatedPost() {
      try {
        var relatedPosts = (
          await axios.get(
            `https://endorphinoutdoor.com/wp-json/wp/v2/posts?categories=${this.categories[0].id}`
          )
        ).data;

        console.log(relatedPosts);
      } catch (error) {
        console.log(error);
      }
      try {
        // ---- aggiungo i fields aggiuntivi ai post di wp
        for (const post of relatedPosts) {
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
        this.relatedPosts = relatedPosts;

        // console.log(this.coordinates);
      } catch (error) {
        console.log(error);
      }
    },
    async getPost() {
      try {
        var post = (
          await axios.get(
            `https://endorphinoutdoor.com/wp-json/wp/v2/posts/${this.$route.params.id}`
          )
        ).data;
        // console.log(this.coordinates);
      } catch (error) {
        console.log(error);
      }
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

          // ---- aggiungo i fields aggiuntivi ai post di wp
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
        this.post = post;

        // console.log(this.coordinates);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss">
.shareIcons {
  text-decoration: none !important;

  &:hover {
    text-decoration: none;
  }
}
.load {
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.postBox {
  width: 100%;
}
.postFooter {
  width: 100%;
  height: 100px;
  border-top: 2px solid grey;
}
.relPost {
  width: 200px;
  height: 80%;
  padding: 10px;
  margin: 10px;
  background: white;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .relPostImg {
    width: 70%;
    border-radius: 3px;
  }
  .relPostTitle {
    cursor: pointer;
    padding: 3px;
    transition: 1s;
    margin: 3px;
    padding: 3px;
    text-align: center;
    border-radius: 3px;
    &:hover {
      background: rgba(128, 128, 128, 0.589);
      transition: 1s;
    }
  }
}

.relPosts {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}
.postShare {
  height: 30px;
}
.wp-block-columns {
  display: flex;
  justify-content: center;
}
.wp-block-image {
  display: block;
  overflow: hidden;
}
.postCategory {
  font-style: italic;
  width: 100%;
  cursor: default;
  display: flex;
  justify-content: center;
  align-items: center;
}
.postTitle {
  font-size: 30px;
  font-weight: bold;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.postDate {
  font-size: 15px;
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.has-text-align-right,
.alignright {
  text-align: right !important;
}
.has-text-align-left,
.alignleft {
  text-align: left !important;
}
.has-text-align-center,
.aligncenter {
  text-align: center !important;
}
.postBox {
  width: 100%;
}
.actions {
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.is-active {
  background: rgb(71, 71, 71);
}

.editorBox {
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  padding-top: 120px;
}
.post {
  width: 100%;
  border-top: 2px solid rgba(128, 128, 128, 0.603);
  margin-top: 20px;
  padding-top: 20px;
}
.editor {
  height: 100%;
}
.menubar__button {
  width: 50px;
  height: 50px;
  margin: 10px;
  border: 1px solid black;
}
.actions {
  max-width: 30rem;
  margin: 0 auto 2rem auto;
}
.editor__content {
  background: white !important;
  padding: 50px;
}
.menubar {
  background: grey;
}
.export {
  max-width: 30rem;
  margin: 0 auto 2rem auto;

  pre {
    padding: 1rem;
    border-radius: 5px;
    font-size: 0.8rem;
    font-weight: bold;
    background: black;
    color: black;
  }

  code {
    display: block;
    white-space: pre-wrap;
  }
}
</style>
