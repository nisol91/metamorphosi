<template>
  <div class="basket">
    <div class="basketBox">
      <div class="bTitle">
        <router-link class="btn nav-button" :to="{ name: 'toccaVinoProducts' }">
          <i class="fas fa-arrow-left"></i>
        </router-link>
        <div><h1>basket</h1></div>
      </div>

      <div class="basketProd" v-for="(item, i) in basket" :key="i + 'item'">
        <div class="basketLeft">
          <div class="prodName">
            {{ item.name }}
          </div>
          <div class="prodDescription">
            {{ item.description }}
          </div>
          <v-img
            :src="item.media[0]"
            class="grey lighten-2 prodMedia imgBasket"
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
          <div class="actions">
            <v-tooltip bottom class="">
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-bind="attrs"
                  v-on="on"
                  class="actionIcon"
                  @click="addItem(item.id)"
                  >mdi-plus-box</v-icon
                >
              </template>
              <span>add one</span>
            </v-tooltip>
            <v-tooltip bottom class="">
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-bind="attrs"
                  v-on="on"
                  class="actionIcon"
                  @click="removeItem(item.id)"
                  >mdi-minus-box</v-icon
                >
              </template>
              <span>remove one</span>
            </v-tooltip>
            <v-tooltip bottom class="">
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-bind="attrs"
                  v-on="on"
                  class="actionIcon"
                  @click="removeFromBasket(item.id)"
                  >mdi-delete</v-icon
                >
              </template>
              <span>remove item</span>
            </v-tooltip>
          </div>
          <div>quantity: {{ item.itemsNumber }}</div>
        </div>

        <div class="prodPrice">{{ item.price }}€</div>
      </div>
    </div>
    <div class="checkoutBox">
      <v-btn color="primary" rounded dark depressed @click="clearBasket">
        clear basket
        <v-icon class="actionIcon">mdi-basket-remove</v-icon></v-btn
      >
      <div class="checkTop">
        <span class="prodName">Total items: </span>
        <span class="prodName">{{ totalItems }}</span>
      </div>
      <div class="checkTop">
        <span class="prodName">Total: </span>
        <span class="prodName">{{ totalPrice }} €</span>
      </div>

      <router-link class="btn nav-button" :to="{ name: 'toccaVinoPayment' }">
        <v-btn color="primary" rounded dark depressed> checkout </v-btn>
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      basket: [],
    };
  },
  created() {
    this.$store.commit("toggleHomePage", false);

    this.basket = this.$store.state.basket.items;
    // console.log(this.basket);
  },
  methods: {
    addItem(id) {
      this.$store.dispatch("addItemNumberToBasketItem", id);
      this.basket = this.$store.state.basket.items;
    },
    removeItem(id) {
      this.$store.dispatch("removeItemNumberFromBasketItem", id);
      this.basket = this.$store.state.basket.items;
    },
    removeFromBasket(id) {
      this.$store.dispatch("removeFromBasket", id);
      this.basket = this.$store.state.basket.items;
    },

    clearBasket() {
      this.$store.dispatch("clearBasket");
      this.basket = this.$store.state.basket.items;
    },
  },
  computed: {
    ...mapState({
      isLoggedIn: "isLoggedIn",
      userRole: "userRole",
      globalMessage: "globalMessage",
    }),
    totalPrice: function () {
      var totalPrice = 0;
      this.basket.forEach((el) => {
        totalPrice += el.price * el.itemsNumber;
      });
      return totalPrice;
    },
    totalItems: function () {
      var totalItems = 0;
      this.basket.forEach((el) => {
        totalItems += el.itemsNumber;
      });
      return totalItems;
    },
  },
};
</script>
<style lang="scss">
.basket {
  display: flex;
}
.bTitle {
  display: flex;
}
.basketBox {
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.basketProd {
  width: 90%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid grey;
  padding: 10px;
  margin-bottom: 10px;
}
.basketLeft {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.checkoutBox {
  position: fixed;
  top: 100px;
  right: 10px;
  width: 30%;
  margin: 10px;
  padding: 30px;
  background: rgb(184, 184, 184);
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  .checkTop {
    display: flex;
    justify-content: center;
  }
}
.imgBasket {
  width: 130px;
}
.actions {
  font-size: 20px;
  .actionIcon {
    margin: 0 10px;
  }
}
</style>