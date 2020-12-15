<template>
  <div class="editorBox">
    <div>{{ this.$route.params.id }}</div>
    <div class="" v-html="contentTest"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      contentTest: "",
      categories: [],
    };
  },
  created() {
    this.getPost();
  },
  methods: {
    async getPost() {
      try {
        this.contentTest = (
          await axios.get(
            `https://endorphinoutdoor.com/wp-json/wp/v2/posts/${this.$route.params.id}`
          )
        ).data.content.rendered;
        // console.log(this.coordinates);
      } catch (error) {
        console.log(error);
      }
    },
    async getCategories() {
      try {
        this.contentTest = (
          await axios.get(
            `https://endorphinoutdoor.com/wp-json/wp/v2/categories/${this.$route.params.id}`
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
  display: flex;
  align-items: center;
  padding: 20px;
  padding-top: 120px;
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
