<template>
  <div>
    <v-app>
      <AppBar :name-page="namePage" :show="show" />
      <router-view />
    </v-app>
  </div>
</template>

<script>
import AppBar from '../components/appBar.vue'
export default {
  name: 'LayoutPage',
  components: {
    AppBar
  },
  computed: {
    namePage () {
      return this.$store.state.namePage
    },
    show () {
      return this.$store.state.show
    }
  }
}
</script>

<style lang="scss" scoped>
// ต้องมี comment เนื่องจากเชื่อมกับ scss
</style>