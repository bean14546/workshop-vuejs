<template>
  <v-container fill-height>
    <v-card
      class="mx-auto"
      rounded="xl"
    >
      <v-row no-gutters>
        <v-col cols="12" sm="6">
          <v-img class="white--text align-end rounded-tl-xl" :class="$vuetify.breakpoint.smAndUp ? 'rounded-bl-xl' : 'rounded-tr-xl'" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" :height="$vuetify.breakpoint.smAndUp ? '100%' : ''" />
        </v-col>
        <v-col cols="12" sm="6" class="d-sm-flex align-sm-center">
          <div class="pa-2 w-100">
            <v-card-title class="primary--text">Login</v-card-title>
            <v-card-text class="text--primary">
              <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="login">
                <v-text-field v-model="account.username" label="Username" clearable :rules="accountRules.username" />
                <v-text-field v-model="account.password" label="Password" type="password" clearable :rules="accountRules.password" />
                <v-btn v-show="false" type="submit" />
              </v-form>
            </v-card-text>
            <v-card-actions class="pa-4 pt-0">
              <v-btn color="primary" elevation="1" @click="login"> Login </v-btn>
              <v-btn text @click="reset"> reset </v-btn>
            </v-card-actions>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import usersApi from '@/api/usersApi'
import Swal from 'sweetalert2'
export default {
  name: 'LoginPage',
  data () {
    return {
      valid: true,
      account: {
        username: '',
        password: ''
      },
      accountRules: {
        username: [v => !!v || 'Username is required'],
        password: [v => !!v || 'Password is required']
      }
    }
  },
  methods: {
    login () {
      if (this.$refs.form.validate()) {
        usersApi
          .login(this.account)
          .then((res) => {
            localStorage.setItem('admin', JSON.stringify(res))
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
              title: 'Signed in successfully...'
            }).then(() => {
              if (localStorage.getItem('admin')) {
                let adminStorage = localStorage.getItem('admin')
                let adminStorageJSON = JSON.parse(adminStorage)
                let token = adminStorageJSON['token']
                if (token) {
                  this.$router.push({ name: 'resume' })
                }
              }
            })
          })
          .catch((error) => {
            if (error.response.status) {
              if (error.response.status == 401) {
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
                  icon: 'error',
                  title: 'Invalid login information!!!'
                })
              }
              this.$refs.form.validate()
            }
          })
      }
    },
    reset () {
      this.$refs.form.reset()
    }
  }
}
</script>

<style lang="scss" scoped>
// ต้องมี comment เนื่องจากเชื่อมกับ scss
</style>