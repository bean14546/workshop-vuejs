<template>
  <div>
    <v-card class="rounded-0 rounded-br-xl rounded-tl-xl" elevation="15">
      <v-img height="300" :src="item.image" />
      <v-card-title>{{ item.product }}</v-card-title>
      <v-card-text>
        <p class="lineClamp" :style="numberOfLines"> 
          <span class="font-weight-bold"> รายละเอียดสินค้า: </span>
          <span> {{ item.detail }} </span>
        </p>
        <v-btn class="primary--text pa-0" color="red" text @click="openDialog(item)"> รายละเอียดเพิ่มเติม </v-btn>
      </v-card-text>
      <v-divider />
      <v-card-actions class="px-4 py-6">
        <p class="text-subtitle-1 text-md-h6 mb-0"> ราคา: {{ item.price }} บาท </p>
        <v-spacer />
        <v-btn class="rounded-0 rounded-br-xl rounded-tl-xl px-5" color="primary" elevation="4" @click="addProductToCart(item)"> เพิ่มเข้าตะกร้า </v-btn>
      </v-card-actions>
    </v-card>
    <detailProduct ref="detailProduct" />
  </div>
</template>

<script>
import detailProduct from '@/components/dialog/detailProduct.vue'
export default {
  name: 'CardProduct',
  components: {
    detailProduct
  },
  props: {
    item: {
      default: null,
      type: Object
    },
    horizontal: {
      default: true,
      type: Boolean
    },
  },
  computed: {
    numberOfLines () {
      return '--line: 2'
    }
  },
  methods: {
    openDialog (item) {
      this.$refs.detailProduct.open(item)
    },
    addProductToCart (item) {
      const mapItem = {
        ...item,
        qty: 1,
        total: item.price
      }
      this.$store.commit('addProductToCart', mapItem)
    }
  },
}
</script>

<style lang="scss" scoped>
.lineClamp {
  @include lineClamp(var(--line), 1.2rem);
}
</style>