<template>
  <!-- nell index è comodo mettere la navigazione dell'app -->
  <div>
    <v-app>
      
      <div class="mainBox" v-scroll="onScroll">
        <!--  -->
        <transition name="fade">
          <router-view v-if="loaded"></router-view>
        </transition>

        <!--  -->
        <global-message
          v-if="globalMessage"
          :globalMex="globalMessage"
          :error="false"
        ></global-message>

        <!--  -->
        <!-- <div v-if="!loaded" class="splash-box">
          <v-progress-circular
            :size="70"
            color="primary"
            indeterminate
            class="splash-box-progress"
          ></v-progress-circular>
        </div> -->
        <!-- <div
          id="footer"
          class="d-flex justify-content-center align-items-center flex-column"
          v-if="!isMetamorphosis"
        >
          <select-locale class="langVSelect"></select-locale>
          <select-locale class="langVSelectMobile"></select-locale>
          <div class="footer">
            Metamorphosis 2020
            
          </div>
        </div> -->
      </div>
    </v-app>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import * as easings from "vuetify/es5/services/goto/easing-patterns";
import axios from "axios";
import firebase from "firebase";
import store from "./store";

export default {
  // this can be used alternatively to the meta in the head of welcome.blade.php page, for seo purpose
  metaInfo: {
    title: "Metamorphosi",
    titleTemplate: "%s - Digital Agency",
    htmlAttrs: {
      lang: "en",
      amp: true,
    },
  },
  data() {
    return {
      // lastSearch: this.$store.state.lastSearch,
      menuOpen: false,
      loaded: false,
      offsetTop: 0,
      selectedEl: "",
      scrollOptions: {
        duration: 800,
        offset: 90,
        easing: "easeInOutCubic",
      },
    };
  },
  async created() {
    this.loaded = false;
    // console.log(process.env.VUE_APP_TITLE);
    console.log(process.env.NODE_ENV);
    console.log(process.env.VUE_APP_DB_ENV);

    // carico l utente firebase dopo il refresh
    this.$store.dispatch("loadFirebaseUserAfterRefresh");
    this.$store.commit("getUserOnRefresh");

    // carico il carrello al refresh
    this.$store.dispatch("loadBasketOnRefresh");

    // prendo l userRole nello storage
    this.$store.commit("getUserRole");

    // console.log("====");
    // console.log(this.lastSearch);
    // console.log(this.lastSearchComputed);
    // console.log(this.itemsInBasket);

    // console.log("ruolo index " + this.userRole);
    setTimeout(() => {
      this.loaded = true;
    }, 1000);
  },
  computed: {
    ...mapState({
      isLoggedIn: "isLoggedIn",
      userRole: "userRole",
      globalMessage: "globalMessage",
      isMetamorphosis: "isMetamorphosis",
    }),

    ...mapGetters({ itemsInBasket: "itemsInBasket" }),

    // globalMessage: {
    //   get() {
    //     return this.globalMessage;
    //   },
    //   set(globalMessage) {
    //     this.globalMessage = globalMessage;
    //   },
    // },

    isUserAdmin() {
      if (this.userRole === "developer" || this.userRole === "admin") {
        return true;
      } else {
        return false;
      }
    },
    // scroll
    options() {
      return {
        duration: this.scrollOptions.duration,
        offset: this.scrollOptions.offset,
        easing: this.scrollOptions.easing,
      };
    },

    getOffsetNav() {
      if (this.offsetTop > 80) {
        return true;
      }
      return false;
    },
  },

  methods: {
    onClickOutside() {
      if (this.menuOpen == true) {
        this.menuOpen = false;
      }
    },
    toggleMenuMobile() {
      this.menuOpen = !this.menuOpen;
      // console.log(this.menuOpen);
    },
    onScroll(e) {
      this.offsetTop = e.target.scrollingElement.scrollTop;
      //   console.log("====================================");
      //   console.log(e.target.scrollingElement.scrollTop);
      //   console.log("====================================");
    },
    async logout() {
      this.$store.dispatch("signOut");
    },
  },
};
</script>
<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
#footer {
  width: 100%;
  border-bottom: 1px solid grey;
  padding: 20px 35px;
  background: rgb(107, 109, 114);
}
.footerFirebaseImg {
  width: 30px;
}
.loginName {
  width: 100px;
  margin: 0 10px;
}
.userIndexIcon {
  &:hover {
    text-decoration: none !important;
    border: 2px !important;
    color: rgb(85, 89, 109) !important;
  }
}
.indexSnack {
  margin-top: 100px !important;
}
</style>
