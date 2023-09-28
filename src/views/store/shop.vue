<template>
  <div class="primary lighten-4">
    <v-container fill-height>
      <v-row>
        <v-col v-for="(item, index) in items" :key="`${item._id}-${index}`" cols="12" sm="6" md="4">
          <cardProductComponent :item="item" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import productsApi from '@/api/productsApi'
import cardProductComponent from '@/components/cardProduct.vue'
export default {
  name: 'ShopPage',
  components: {
    cardProductComponent
  },
  data() {
    return {
      items: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData () {
      productsApi.getAll().then((response) => {
        this.items = response.data
      })
    }
  },
}
</script>

<style lang="scss" scoped>
  // 
</style>