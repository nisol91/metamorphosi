<template>
  <div class="editorBox" v-if="post">
    <div>{{ post.title.rendered }}</div>
    <div class="post" v-html="post.content.rendered"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      post: null,
      categories: [],
    };
  },
  created() {
    this.getPost();
    this.getCategories();
  },
  methods: {
    async getPost() {
      try {
        this.post = (
          await axios.get(
            `https://endorphinoutdoor.com/wp-json/wp/v2/posts/${this.$route.params.id}`
          )
        ).data;
        // console.log(this.coordinates);
      } catch (error) {
        console.log(error);
      }
    },
    async getCategories() {
      try {
        this.categories = (
          await axios.get(
            `https://endorphinoutdoor.com/wp-json/wp/v2/categories`
          )
        ).data.content.rendered;
        // console.log(this.coordinates);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss">
.has-text-align-right {
  text-align: right !important;
}
.has-text-align-left {
  text-align: left !important;
}
.has-text-align-center {
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
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  padding-top: 120px;
}
.post {
  width: 100%;
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
