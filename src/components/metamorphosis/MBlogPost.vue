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
        <ShareNetwork
          network="facebook"
          url="https://news.vuejs.org/issues/180"
          title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
          description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
          quote="The hot reload is so fast it\'s near instant. - Evan You"
          hashtags="vuejs,vite"
        >
          Share on Facebook
        </ShareNetwork>
      </div>
      <div class="postFooter">related posts</div>
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
      categories: [],
      tags: [],
    };
  },
  created() {
    this.getPost();
  },
  methods: {
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
