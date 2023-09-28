<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
    v-if="detail"
  >
    <v-card>
      <v-toolbar color="white" elevation="0">
        <span class="text-h6">{{ detail.product }}</span>
        <v-spacer />
        <v-btn icon @click="close">
          <v-icon> mdi-close </v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider />
      <v-card-text class="px-6 py-4">
        <v-img height="350" :src="detail.image" />
      </v-card-text>
      <v-card-text class="px-6">
        <p class="font-weight-bold text-sm-h6 mb-2"> รายละเอียดสินค้า </p>
        <p class="mb-0">  {{ detail.detail }} </p>
      </v-card-text>
      <v-divider />
      <v-card-actions class="px-6 py-4">
        <p class="text-subtitle-1 text-sm-h6 mb-0"> ราคา: {{ detail.price }} บาท </p>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DetailProduct',
  data() {
    return {
      dialog: false,
      detail: null
    }
  },
  methods: {
    open (data) {
      this.dialog = true
      this.detail = data
    },
    close () {
      this.dialog = false
    }
  },
}
</script>

<style lang="scss" scoped>
  // 
</style>