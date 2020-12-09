<template>
  <!-- nell index è comodo mettere la navigazione dell'app -->
  <div>
    <v-app>
      <div class="mainBox">
        <!-- header menu -->
        <div class="mTop" v-if="loaded">
          <div class="mTopEl mCont">
            <div class="mLine"></div>
            <div class="mContText">CONTACTS</div>
          </div>
          <div class="mTopEl mLogo">中文</div>
          <div class="mTopEl mMenu">
            <div class="menuOpen" :class="[{ showMenu: menu }]">
              <router-link
                :to="{ name: 'mHome' }"
                class="menuEl"
                style="color: white"
              >
                <div
                  class="menuLine"
                  :class="[{ menuLineShow: menuEl.home.val }]"
                ></div>
                <div style="color: white" @click="selectEl('home')">HOME</div>
              </router-link>
              <div class="menuElDivider">/</div>
              <router-link
                :to="{ name: 'mAbout' }"
                class="menuEl"
                style="color: white"
              >
                <div
                  class="menuLine"
                  :class="[{ menuLineShow: menuEl.about.val }]"
                ></div>
                <div style="color: white" @click="selectEl('about')">ABOUT</div>
              </router-link>
              <div class="menuElDivider">/</div>
              <router-link
                :to="{ name: 'mContents' }"
                class="menuEl"
                style="color: white"
              >
                <div
                  class="menuLine"
                  :class="[{ menuLineShow: menuEl.contents.val }]"
                ></div>
                <div style="color: white" @click="selectEl('contents')">
                  CONTENTS
                </div>
              </router-link>
              <div class="menuElDivider">/</div>
              <router-link
                :to="{ name: 'mBlog' }"
                class="menuEl"
                style="color: white"
              >
                <div
                  class="menuLine"
                  :class="[{ menuLineShow: menuEl.blog.val }]"
                ></div>
                <div style="color: white" @click="selectEl('blog')">BLOG</div>
              </router-link>
              <div class="menuElDivider">/</div>
              <router-link
                :to="{ name: 'mShop' }"
                class="menuEl"
                style="color: white"
              >
                <div
                  class="menuLine"
                  :class="[{ menuLineShow: menuEl.shop.val }]"
                ></div>
                <div style="color: white" @click="selectEl('shop')">SHOP</div>
              </router-link>
              <div class="menuElDivider">/</div>
              <router-link
                :to="{ name: 'mContacts' }"
                class="menuEl"
                style="color: white"
              >
                <div
                  class="menuLine"
                  :class="[{ menuLineShow: menuEl.contacts.val }]"
                ></div>
                <div style="color: white" @click="selectEl('contacts')">
                  CONTACTS
                </div>
              </router-link>
            </div>
            <div
              class="mMenuText fade-in fade-out"
              :class="[{ hideMenu: menu }]"
            >
              MENU
            </div>

            <div
              v-if="!menu"
              class="mLineMenu fade-in fade-out"
              @click="toggleMenu"
            >
              <div class="mLineMenuCenterLine"></div>
            </div>
            <v-icon
              v-if="menu"
              @click="toggleMenu"
              class="menuCross fade-in fade-out"
              >mdi-close</v-icon
            >
          </div>
        </div>
        <!--  -->
        <transition name="fade">
          <router-view></router-view>
        </transition>

        <!-- for some type of notification -->
        <global-message
          v-if="globalMessage"
          :globalMex="globalMessage"
          :error="false"
        ></global-message>
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
      menuEl: {
        home: {
          val: true,
          slug: "home",
        },
        about: {
          val: false,
          slug: "about",
        },
        contents: {
          val: false,
          slug: "contents",
        },
        blog: {
          val: false,
          slug: "blog",
        },
        shop: {
          val: false,
          slug: "shop",
        },
        contacts: {
          val: false,
          slug: "contacts",
        },
      },
      // lastSearch: this.$store.state.lastSearch,
      menuOpen: false,
      loaded: false,
    };
  },
  async created() {
    this.loaded = false;
    console.log(process.env.NODE_ENV);
    console.log(process.env.VUE_APP_DB_ENV);

    // carico l utente firebase dopo il refresh
    this.$store.dispatch("loadFirebaseUserAfterRefresh");
    this.$store.commit("getUserOnRefresh");

    // carico il carrello al refresh
    this.$store.dispatch("loadBasketOnRefresh");

    // prendo l userRole nello storage
    this.$store.commit("getUserRole");

    setTimeout(() => {
      this.loaded = true;
    }, 2000);
  },
  methods: {
    // menu
    selectEl(value) {
      console.log("select el");
      var menu = this.menuEl;
      for (const el in menu) {
        if (menu[el].slug != value) {
          menu[el].val = false;
        } else {
          menu[el].val = true;
        }
      }
      this.toggleMenu();
    },
    toggleMenu() {
      this.$store.commit("toggleMenu");
    },

    async logout() {
      this.$store.dispatch("signOut");
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
    ...mapGetters({ itemsInBasket: "itemsInBasket" }),
  },
};
</script>
<style lang="scss">
.mTop {
  width: 100vw;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  top: 0px;
  z-index: 9800;
  .mTopEl {
    width: 33%;
    display: flex;
    align-items: center;
  }
  .mLogo {
    justify-content: center;
    color: red;
    font-weight: bold;
    font-size: 30px;
    cursor: pointer;
    z-index: 9994;
  }
  .mCont {
    justify-content: flex-start;
    cursor: pointer;
    font-weight: bold;
    color: white;
    z-index: 9999;
    .mContText {
      margin-left: 10px;
    }
  }
  .mMenu {
    justify-content: flex-end;
    z-index: 9999;
    color: white;
    font-weight: bold;
    cursor: pointer;

    .mMenuText {
      margin-right: 10px;
    }
    .hideMenu {
      display: none;
    }
  }
}

.menuOpen {
  position: fixed;
  top: 40px;
  right: -300px;
  transition: 0.5s;
  display: flex;
  justify-content: space-between;
  width: 300px;
}
.showMenu {
  transition: 0.5s;
  right: 220px;
}
.menuCross {
  margin-right: 10px;
  font-size: 40px !important;
  color: white !important;
}
.mLineMenu {
  width: 50px;
  height: 20px;
  border-top: 2px solid white;
  border-bottom: 2px solid white;
  position: relative;
  .mLineMenuCenterLine {
    position: absolute;
    height: 1px;
    width: 100%;
    top: 7px;
    border-bottom: 2px solid white;
  }
}
// ##
@media (max-width: 1050px) {
  .mTop {
    background: rgba(255, 255, 255, 0.329);
  }
}
// ##
@media (max-width: 800px) {
  .menuOpen {
    width: 300px;
    top: 80px;
  }

  .showMenu {
    transition: 0.5s;
    right: 20px;
  }
  .menuEl {
    font-size: 10px;
    margin: 0 3px;
    .menuLine {
      top: -3px;
    }
  }
  .menuElDivider {
    display: none;
  }
}
</style>
