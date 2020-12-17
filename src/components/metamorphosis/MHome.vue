<template>
  <div
    class="mHomeBox"
    :style="{
      background: `${splash ? 'rgb(80, 80, 80)' : ''}`,
      backgroundImage: `url(${
        !splash
          ? 'https://firebasestorage.googleapis.com/v0/b/metamorphosi-7b2e1.appspot.com/o/home_1.jpg?alt=media&token=de609d6c-46a8-4f5f-8c0c-348f7c4996e7'
          : ''
      })`,
    }"
  >
    <!-- splash -->
    <div v-if="splash" class="splash pulsate-fwd">METAMORPHOSI</div>

    <!-- desktop tripartition -->
    <div v-if="!splash" class="mHome">
      <div class="mImgBackgroundOverlay"></div>
      <div v-if="menu" class="mBackgroundOverlay fade-in fade-out"></div>

      <div class="mTripartition">
        <div
          class="mTrip m1 mTripSx"
          :class="[
            {
              mTripSxHover: mTripSxHover,
              mTripHidden: mTripDxHover,
              mShort: mTripDxHover,
              hide: pushedAbout,
              pushingBlogOthers: pushedBlog,
            },
          ]"
          :style="{
            backgroundImage: `url(${mTripSxHover ? img : ''})`,
            backgroundSize: `cover`,
          }"
        >
          <div
            class="mTripText mTripTextSx"
            @mouseenter="mTripSxHover = true"
            @mouseleave="mTripSxHover = false"
          >
            <div class="mLine mLineSx"></div>
            CONTENTS
          </div>
        </div>
        <div
          class="mTrip mTripCenter m2"
          :class="[
            {
              mTripCenterHover: mTripCenterHover,
              mTripCenterHidden: mTripDxHover,
              mTripCenterHidden_2: mTripSxHover,
              pushingAbout: pushedAbout,
              pushingBlogOthers: pushedBlog,
            },
          ]"
        >
          <div
            class="mTripText mTripTextCenter"
            @mouseenter="mTripCenterHover = true"
            @mouseleave="mTripCenterHover = false"
            @click="pushAbout"
          >
            ABOUT
          </div>
          <div class="mLineBottom"></div>
        </div>

        <div
          class="mTrip m3 mTripDx"
          :class="[
            {
              mTripDxHover: mTripDxHover,
              mTripHidden: mTripSxHover,
              mShort: mTripSxHover,
              hide: pushedAbout,
              pushingBlog: pushedBlog,
            },
          ]"
          :style="{
            backgroundImage: `url(${mTripDxHover ? img : ''})`,
            backgroundSize: `cover`,
          }"
        >
          <div
            class="mTripText mTripTextDx"
            @mouseenter="mTripDxHover = true"
            @mouseleave="mTripDxHover = false"
            @click="pushBlog"
          >
            BLOG
            <div class="mLine mLineDx"></div>
          </div>
        </div>
      </div>

      <!-- mobile tripartition -->

      <div class="mTripartitionMobile">
        <div class="mTripMobile">ABOUT</div>
        <div class="mTripMobile">CONTENTS</div>
        <div class="mTripMobile" @click="pushBlog">BLOG</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      splash: true,
      mTripCenterHover: false,
      mTripDxHover: false,
      mTripSxHover: false,
      pushedAbout: false,
      pushedBlog: false,

      backgrounds: [
        "https://firebasestorage.googleapis.com/v0/b/metamorphosi-7b2e1.appspot.com/o/t4.jpg?alt=media&token=65c4464d-b30d-4dd7-a30c-7c5506cd5350",
        "https://firebasestorage.googleapis.com/v0/b/metamorphosi-7b2e1.appspot.com/o/t3.jpg?alt=media&token=fe69ab91-af45-4a09-9adc-047ad3c76994",
        "https://firebasestorage.googleapis.com/v0/b/metamorphosi-7b2e1.appspot.com/o/home_2.jpg?alt=media&token=67c1662f-daf8-4521-80f2-caeecae6f923",
      ],
      img: null,
    };
  },
  created() {
    this.$store.commit("isMetamorphosis", true);
    this.setSplash();
    this.backImgs();
  },
  methods: {
    pushAbout() {
      this.pushedAbout = true;
      setTimeout(() => {
        this.$router.push({
          name: "mAbout",
          // params: { eventName: this.event.name },
        });
      }, 2000);
    },
    pushBlog() {
      this.pushedBlog = true;
      setTimeout(() => {
        this.$router.push({
          name: "mBlog",
          // params: { eventName: this.event.name },
        });
      }, 2000);
    },
    setSplash() {
      setTimeout(() => {
        this.splash = false;
      }, 2000);
    },
    backImgs() {
      setInterval(() => {
        this.img = this.backgrounds[
          Math.floor(Math.random() * this.backgrounds.length)
        ];
      }, 1000);
    },
  },
  computed: {
    ...mapState({
      isLoggedIn: "isLoggedIn",
      userRole: "userRole",
      globalMessage: "globalMessage",
      isMetamorphosis: "isMetamorphosis",
      menu: "menu",
    }),
  },
};
</script>
<style lang="scss">
.mHomeBox {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  z-index: 8000;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}

.mImgBackgroundOverlay {
  position: absolute;
  top: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 8100;
  background: rgba(155, 155, 155, 0.589);
}
.mBackgroundOverlay {
  position: absolute;
  top: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 9997;
  background: rgba(22, 22, 22, 0.589);
}
.menuEl {
  transition: 2s;
  margin: 0 10px;
  position: relative;

  &:hover {
    text-decoration: none;
    transition: 2s;
    .menuLine {
      opacity: 1;
      transition: 0.5s;
    }
  }

  .menuLine {
    position: absolute;
    top: 10px;
    opacity: 0;
    transition: 0.5s;
    width: 100%;
    height: 1px;
    background: white;
  }
  .menuLineShow {
    opacity: 1;
    transition: 0.5s;
  }
}
.mTripartition {
  position: absolute;
  top: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 9996;
  display: flex;
  justify-content: center;
  align-items: center;
  .mTrip {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 100px;
  }
  .mTripCenter {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-bottom: 0px;
    flex-direction: column;
    transition: 1s;
  }
  .mTripSx {
    transition: 1s;
  }
  .mTripDx {
    transition: 1s;
  }
  .mTripCenterHover {
    background: white;
    transition: 1s;
    width: 60vw !important;
  }
  .pushingAbout {
    width: 100vw !important;
    transition: 1s;
    background: white;
    color: black;
    .mTripTextCenter {
      color: black;
    }
  }

  .mTripCenterHidden,
  .mTripCenterHidden_2 {
    background: rgba(61, 61, 61, 0.897);
  }
  .mTripHidden {
    background: rgba(0, 0, 0, 0.89);
  }
  .mTripDxHover,
  .mTripSxHover {
    background: rgba(128, 128, 128, 0.404);
    transition: 1s;
    width: 55vw !important;
  }
  .pushingBlog {
    width: 100vw !important;
    transition: 1s;
  }
  .pushingBlogOthers {
    opacity: 0;
    width: 10px !important;
    transition: 1s;
  }
  .mTripText {
    color: white;
    font-weight: bold;
    font-size: 45px;
    cursor: pointer;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 9995;
  }
  .mLineSx {
    margin-right: 30px;
    transition: 1s;
  }
  .mLineDx {
    margin-left: 30px;
    transition: 1s;
  }
  .mTripTextSx {
    justify-content: flex-start;
    transition: 2s;
    &:hover {
      .mLineSx {
        width: 300px;
        transition: 2s;
      }
    }
  }
  .mTripTextDx {
    justify-content: flex-end;
    transition: 2s;

    &:hover {
      .mLineDx {
        width: 300px;
        transition: 2s;
      }
    }
  }

  .mTripTextCenter {
    padding-bottom: 60px;
    transition: 2s;
    &:hover {
      color: black;
      transition: 2s;
    }
  }
  .mLineBottom {
    width: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    border-left: 0.5px solid white;
    border-right: 0.5px solid white;
  }
  .m1 {
    width: 33%;
    height: 100%;
    border-right: 0.3px solid rgba(255, 255, 255, 0.507);
  }

  .m2 {
    width: 33%;
    height: 100%;
    border-right: 0.3px solid rgba(255, 255, 255, 0.507);
  }

  .m3 {
    width: 33%;
    height: 100%;
  }
  .mShort {
    width: 28%;
  }
}
.mHome {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  z-index: 9996;
}

.mLine {
  width: 50px;
  height: 1px;
  border-bottom: 2px solid white;
}

.splash {
  color: white;
  font-weight: bold;
  font-size: 30px;
}
.pulsate-fwd {
  -webkit-animation: pulsate-fwd 1.5s ease-in-out infinite both;
  animation: pulsate-fwd 1.5s ease-in-out infinite both;
}

.mTripartitionMobile {
  display: none;
  position: absolute;
  top: 100px;
  width: 100vw;
  height: calc(100vh - 100px);
  z-index: 9996;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}
.hide {
  display: none !important;
}
.fade-out {
  -webkit-animation: fade-out 1s ease-out both;
  animation: fade-out 1s ease-out both;
}
.fade-in {
  -webkit-animation: fade-in 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: fade-in 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

// ##
@media (max-width: 1300px) {
  .mTripartition {
    .mTripText {
      font-size: 40px;
    }
    .mLineSx {
      margin-right: 10px;
    }
    .mLineDx {
      margin-left: 10px;
    }
  }
}
// ##
@media (max-width: 1050px) {
  .mTripartition {
    display: none;
  }
  .mTripartitionMobile {
    display: flex;
  }
  .mTripMobile {
    color: white;
    font-weight: bold;
    font-size: 45px;
    cursor: pointer;
    border-bottom: 0.5px solid white;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 33%;
  }
}
</style>