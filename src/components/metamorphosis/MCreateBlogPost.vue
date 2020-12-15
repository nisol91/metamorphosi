<template>
  <div class="editorBox"><span v-html="contentTest"></span></div>
</template>

<script>
export default {
  data() {
    return {
      contentTest: `
          <p>test</p><figure class="wp-block-image size-large"><img loading="lazy" width="1024" height="682" src="https://endorphinoutdoor.com/wp-content/uploads/2020/10/crinale_drone-1-1024x682.jpg" alt="" class="wp-image-3005" srcset="https://endorphinoutdoor.com/wp-content/uploads/2020/10/crinale_drone-1-1024x682.jpg 1024w, https://endorphinoutdoor.com/wp-content/uploads/2020/10/crinale_drone-1-300x200.jpg 300w, https://endorphinoutdoor.com/wp-content/uploads/2020/10/crinale_drone-1-768x512.jpg 768w, https://endorphinoutdoor.com/wp-content/uploads/2020/10/crinale_drone-1-1536x1023.jpg 1536w, https://endorphinoutdoor.com/wp-content/uploads/2020/10/crinale_drone-1-2048x1364.jpg 2048w, https://endorphinoutdoor.com/wp-content/uploads/2020/10/crinale_drone-1-219x146.jpg 219w, https://endorphinoutdoor.com/wp-content/uploads/2020/10/crinale_drone-1-50x33.jpg 50w, https://endorphinoutdoor.com/wp-content/uploads/2020/10/crinale_drone-1-113x75.jpg 113w, https://endorphinoutdoor.com/wp-content/uploads/2020/10/crinale_drone-1-600x400.jpg 600w" sizes="(max-width: 1024px) 100vw, 1024px" /></figure>
        `,
    };
  },
  methods: {
    savePost() {
      this.$store.dispatch("savePost", { html: this.html, json: this.json });
    },
    clearContent() {
      this.editor.clearContent(true);
      this.editor.focus();
    },
    setContent() {
      // you can pass a json document
      // this.editor.setContent(
      //   {
      //     type: "doc",
      //     content: [
      //       {
      //         type: "paragraph",
      //         content: [
      //           {
      //             type: "text",
      //             text: "This is some inserted text. 👋",
      //           },
      //         ],
      //       },
      //     ],
      //   },
      //   true
      // );

      // HTML string is also supported
      // this.editor.setContent('<p>This is some inserted text. 👋</p>')

      this.editor.focus();
    },
    showImagePrompt(command) {
      const src = prompt("Enter the url of your image here");
      if (src !== null) {
        command({ src });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
