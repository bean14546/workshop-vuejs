<template>
  <v-app-bar class="px-0 px-sm-10" color="primary" elevation="0" dark app>
    <v-toolbar-title>
      <v-img :width="$vuetify.breakpoint.xs ? '50px' : '70px'" :src="require('@/style/assets/images/logo.png')" />
    </v-toolbar-title>
    <p class="text-caption text-sm-h6 text-truncate mb-0">Beef Shop</p>
    <v-spacer />
    <v-btn class="mr-4 mb-0" text @click="$router.push({ name: 'home' })">Home</v-btn>
    <v-btn class="mr-4 mb-0" text @click="$router.push({ name: 'shop' })">Shop</v-btn>
    <v-btn outlined rounded @click="$router.push({ name: 'cart' })">
      <v-badge
        v-if="totalQty > 0"
        color="red"
        :content="totalQty"
      >
        <v-icon> mdi-cart-outline </v-icon>
      </v-badge>
      <v-icon v-else> mdi-cart-outline </v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AppBar',
  computed: {
    ...mapGetters(['totalQty'])
  }
}
</script>

<style lang="scss" scoped>
// ต้องมี comment เนื่องจากเชื่อมกับ scss
</style>