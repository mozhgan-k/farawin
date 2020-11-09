<template>
  <div class="flex flex-col justify-center items-center">
    <div v-show="error" class="error flex items-center justify-center bg-red-700 rounded-md mt-8 mb-1">
      <p class="text-white" v-text="error"></p>
    </div>
    <div class="login-container bg-white mt-12 p-8">
      <div class="title flex justify-center">
      <h3 class="mb-3 text-purple-500 font-semibold">Welcome back to Farawin</h3>
      </div>
      <div class="l-title flex justify-center">
        <h4 class="m-0 text-purple-800 font-semibold">Login</h4>
      </div>
      <div class="l-body">
        <form v-if="mode = 'login'" @submit.prevent="login()">
          <div>
              <input
                v-autofocus
                v-model="username"
                type="text"
                class="border border-purple-800 border-solid rounded-md text-base w-full p-3 border-opacity-50 mt-1 focus:bg-purple-100 outline-none"
                placeholder="Username"
                name="username"
              />
          </div>
            <div class="flex items-center border border-purple-800 border-solid border-opacity-50 mt-3 mb-3 bg-white rounded-md w-full">
              <input v-model="password" :type="fieldType" class="w-full border-opacity-75 outline-none p-3 text-base focus:bg-purple-100 rounded-md bg-transparent"
                placeholder="Password" name="password"/>
                <a class="toggle text-sm" @click="switchField()"><i class="fa fa-eye text-purple-900 mr-2"></i></a>
            </div>
          <button :class="{'is-loading': loading}" :disabled="loading" class="rounded-md bg-purple-900 w-full text-white p-3 relative hover:opacity-75 focus:outline-none" type="submit">
            <fw-loading v-if="loading" class="loading" />Login</button>
          <hr>
          <div class="flex justify-center text-base font-normal mt-3 hover:text-purple-900">
            <router-link to="/register">
              <small>Create an account</small>
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
    .login-container{
      width: 450px;
      .is-loading {
     color:transparent;
  }
  .loading{
    font-size: 8px;
    position: absolute;
    right: 50%;
    bottom: 50%;
    transform: translate(50%, 50%);
  }
    }
  @media(max-width: 768px){
  .login-container{
  width: 300px;
  margin-top: 2rem;
  }
  .title{
    font-size: 16px;
  }
  }
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import loading from '../components/loading.vue'
import { post } from '../utils/http'
import { error, findAllUser, finduser, user } from '../models/auth'
export default defineComponent({
  name: 'Login',
  components: {
    FwLoading: loading
  },
  data: () => ({
    username: '',
    password: '',
    loading: false,
    fieldType: 'password',
    error: ''
  }),
  methods: {
    login () {
      this.loading = true
      finduser({ username: this.username, pass: this.password })
        .then(() => {
          if (error.value.length > 2) {
            this.error = error.value
          } else {
            findAllUser().then(() => {
              this.$router.push('/')
            })
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    switchField () {
      this.fieldType = this.fieldType === 'password' ? 'text' : 'password'
    }
  }
})
</script>
