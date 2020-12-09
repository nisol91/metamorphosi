<template>
  <div class="mBlogBox">
    <div class="blogPosts">
      <div
        class="blogPost"
        v-for="(post, i) in blogPosts"
        :key="i + `_blogPost`"
      >
        {{ post.title }}
      </div>
    </div>
    <div class="blogFilters">dx</div>
  </div>
</template>
<script>
import { db, Timestamp, GeoPoint } from "../../main";
import firebase from "firebase";

export default {
  data() {
    return {
      blogPosts: {},
      env: process.env.VUE_APP_DB_ENV,
    };
  },
  created() {
    this.getPosts();
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
  height: 100vh;
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
  justify-content: center;
  align-items: center;
}
</style>