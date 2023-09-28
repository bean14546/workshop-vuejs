<template>
  <div class="primary lighten-3 h-100vh">
    <v-container>
      <v-card class="rounded-tl-xl rounded-br-xl" elevation="15">
        <v-row no-gutters>
          <v-col cols="12" md="7">
            <v-card-title>
              <span>ตะกร้าสินค้า</span>
              <v-spacer />
              <span>{{ totalQty }} ชิ้น</span>
            </v-card-title>
            <v-divider />
            <v-list v-if="cart && cart.length > 0" three-line class="py-0">
              <template v-for="(item, index) in cart">
                <v-list-item :key="`list-cart-${index}`">
                  <v-list-item-avatar class="rounded-lg" tile size="80">
                    <v-img :src="item.image" />
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title> {{ item.product }} </v-list-item-title>
                    <v-list-item-subtitle>
                      <div class="d-flex rounded-xl py-0" style="height:32px;" :style="$vuetify.breakpoint.smAndUp ? 'width: 135px;' : 'width: 120px;'">
                        <v-btn
                          class="rounded-tl-lg rounded-bl-lg rounded-tr-0 rounded-br-0"
                          :width="$vuetify.breakpoint.smAndUp ? '45px' : '40px'"
                          elevation="0"
                          height="32px"
                          small
                          fab
                          :disabled="item.qty <= 1"
                          @click="reduceProductFromCart(item)"
                        >
                          <v-icon x-small> mdi-minus </v-icon>
                        </v-btn>
                        <input v-model="item.qty" type="number" class="text-center w-100" disabled>
                        <v-btn
                          class="rounded-tr-lg rounded-br-lg rounded-tl-0 rounded-bl-0"
                          :width="$vuetify.breakpoint.smAndUp ? '45px' : '40px'"
                          elevation="0"
                          height="32px"
                          small
                          fab
                          @click="addProductToCart(item)"
                        >
                          <v-icon x-small> mdi-plus </v-icon>
                        </v-btn>
                      </div>
                    </v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-content>
                    ฿ {{ item.total }}
                  </v-list-item-content>

                  <v-list-item-action class="align-self-center ma-3">
                    <v-btn icon @click="deleteProductFromCart(item)">
                      <v-icon color="grey lighten-1">mdi-close</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
                <v-divider :key="`divider-${index}`" />
              </template>
            </v-list>
            <v-card-text v-else class="text-center">
              <p class="text-h6 mt-4"> ไม่พบสินค้าในตะกร้า กรุณาเลือกซื้อสินค้าก่อน </p>
            </v-card-text>
          </v-col>

          <v-col class="primary lighten-1 rounded-tr-0 rounded-br-xl" cols="12" md="5">
            <v-card-title class="white--text">
              <span> ชำระเงิน </span>
              <v-spacer />
              <v-btn v-if="cart && cart.length > 0" color="primary" height="32" class="rounded-0 rounded-tl-xl rounded-br-xl px-6" @click="buyProduct(cart, totalQty, sumTotal(cart))">สั่งซื้อ</v-btn>
            </v-card-title>
            <v-divider class="white" />
            <v-card-text v-if="cart && cart.length > 0" class="white--text">
              <p class="text-h5">สรุปราการสินค้าที่สั่งซื้อ</p>
              <p v-for="(item, index) in cart" :key="`list-summary-${index}`" class="text-subtitle-1 mb-2">
                <span class="ml-4">- {{ item.product }}</span>
                <span class="ml-4">จำนวน {{ item.qty }} ชิ้น</span>
                <span class="ml-4">รวม {{ item.total }} บาท</span>
              </p>
              <p class="text-h5 mt-4">รวมเป็นเงินทั้งสิ้น : {{ sumTotal(cart) }} บาท</p>
            </v-card-text>
            <v-card-text v-else class="text-center">
              <p class="text-h6 white--text mt-4"> ไม่พบสินค้าในตะกร้า กรุณาเลือกซื้อสินค้าก่อน </p>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ordersApi from '@/api/ordersApi'
import Swal from 'sweetalert2'
export default {
  name: 'CartPage',
  data() {
    return {
      amount: 1
    }
  },
  computed: {
    ...mapState([ 'cart' ]),
    ...mapGetters([ 'totalQty' ]),
  },
  methods: {
    addProductToCart (item) {
      this.$store.commit('addProductToCart', item)
    },
    reduceProductFromCart (item) {
      this.$store.commit('reduceProductFromCart', item)
    },
    deleteProductFromCart (item) {
      this.$store.commit('deleteProductFromCart', item)
    },
    sumTotal (cart) {
      return cart.reduce((prev, curr) => prev + curr.total, 0)
    },
    buyProduct (items, sumTotal) {
      const userStorage = localStorage.getItem('admin')
      const userStorageJSON = JSON.parse(userStorage)
      const user_id = userStorageJSON.data._id
      const username = userStorageJSON.data.username
      const buyingObj = {
        user_id: user_id,
        username: username,
        items: items,
        total_price: sumTotal
      }
      ordersApi.create(buyingObj).then((response) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'success',
          title: 'สั่งซื้อสินค้าเรียบร้อย ขอบคุณที่ใช้บริการครับ'
        })
        console.log(response)
      })
    }
  },
}
</script>

<style lang="scss" scoped>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
      /* display: none; <- Crashes Chrome on hover */
      -webkit-appearance: none;
      margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  input[type=number] {
      -moz-appearance:textfield; /* Firefox */
  }
</style>