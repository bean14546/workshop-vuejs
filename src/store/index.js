import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: []
  },
  mutations: {
    addProductToCart (state, payload) {
      const productInCart = state.cart.find((item) => item._id == payload._id);
      if (productInCart) {
        productInCart.qty = productInCart.qty + 1;
        productInCart.total = productInCart.qty * productInCart.price;
      } else {
        state.cart.push(payload);
      }
    },
    reduceProductFromCart (state, payload) {
      const productInCart = state.cart.find((item) => item._id == payload._id);
      if (productInCart) {
        if (productInCart.qty > 1) {
          productInCart.qty = productInCart.qty - 1;
        } else {
          productInCart.qty = 1
        }
        productInCart.total = productInCart.qty * productInCart.price;
      }
    },
    deleteProductFromCart (state, payload) {
      const indexProductInCart = state.cart.indexOf(payload);
      state.cart.splice(indexProductInCart, 1)
    }
  },
  actions: {
  },
  getters: {
    totalQty (state) {
      return state.cart.reduce((prev, curr) => prev + curr.qty, 0)
    },
  },
})
