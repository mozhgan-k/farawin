<template>
  <div class="flex flex-col justify-center items-center">
    <div v-show="error" class="error flex items-center justify-center bg-red-700 rounded-md mt-8 mb-1">
      <p class="text-white" v-text="error"></p>
    </div>
    <div class="r-container bg-white mt-12 p-8 rounded-md">
      <div class="img flex flex-col justify-center items-center">
      <img src="../img/gummy-coding.svg" class="w-3/4">
      </div>
      <div class="title flex justify-center hidden">
      <h3 class="mb-3 text-purple-500 font-semibold">Welcome to Farawin</h3>
      </div>
      <div class="l-title flex justify-center hidden">
        <h4 class="m-0 text-purple-800 font-semibold">Create account</h4>
      </div>
      <div class="l-body">
        <form @submit.prevent="register()">
          <div class="content relative p-2">
              <input
                v-autofocus
                v-model="user"
                type="text"
                class="shadow-none outline-none text-sm text-gray-700 border-none border-b border-purple-800 border-solid text-base w-full mt-1"
                name="username"
                required/>
                <div class="under absolute left-0 outline-none bottom-0 h-1 w-full shadow-none bg-red-300"></div>
                <label class="border-none ml-1 mb-2 opacity-75 text-sm outline-none absolute left-0 text-purple-600 pointer-events-none transition-all duration-300 ease-in-out">Username</label>
            </div>
            <div class="content relative mt-3 p-2">
              <input
                v-model="email"
                type="text"
                class="shadow-none outline-none text-sm text-gray-700 border-none border-b border-purple-800 border-solid text-base w-full mt-3"
                name="email"
                required/>
                <div class="under absolute left-0 outline-none bottom-0 h-1 w-full shadow-none bg-red-300"></div>
                <label class="border-none ml-1 mb-2 opacity-75 text-sm outline-none absolute left-0 text-purple-600 pointer-events-none transition-all duration-300 ease-in-out">E-mail</label>
            </div>
            <div class="content relative mt-3 p-2">
              <input v-model="pass" :type="fieldType" class="toggle outline-none mt-3 text-gray-700 text-sm shadow-none border-none border-b border-purple-800 border-solid text-base w-full mt-1 bg-transparent"
                 name="password" required/>
            <div class="under absolute left-0 outline-none bottom-0 h-1 w-full shadow-none bg-red-300"></div>
            <label class="border-none mb-2 ml-1 opacity-75 text-sm outline-none absolute left-0 text-purple-600 pointer-events-none transition-all duration-300 ease-in-out">Password</label>
            </div>
            <div class="flex justify-center items-center m-3 bg-purple-100 p-2">
              <a class="toggle text-sm text-purple-800 ml-1" @click="switchField()"><i class="fa fa-eye text-purple-900 mr-1"></i>Show password</a>
            </div>
          <button :class="{'is-loading': loading}" :disabled="loading" class="rounded-md bg-purple-900 w-full text-white p-3 relative hover:opacity-75 focus:outline-none" type="submit">
              <fw-loading v-if="loading" class="loading"/> Sign Up
          </button>
          <hr/>
          <div class="flex justify-center text-base font-normal mt-3 hover:text-purple-900">
            <router-link to="/login">
              <small>Have an account? / Login</small>
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
    .r-container{
      width: 450px;
    }
      .is-loading {
     color:transparent;
  }
   .content label{
    bottom: 10px;
  }
  .content input:focus ~ label,
  .content input:valid ~ label{
    transform: translateY(-20px);
    font-size: 15px;
    color: #553c9a;
  }
  .content .under::before{
    position: absolute;
    content: "";
    height: 100%;
    width: 100%;
    background-color: #6b46c1;
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  .content input:focus ~ .under::before,
  .content input:valid ~ .under::before{
    transform: scaleX(1);
  }
  .loading{
    font-size: 8px;
    position: absolute;
    right: 50%;
    bottom: 50%;
    transform: translate(50%, 50%);
  }
  @media(max-width: 768px){
  .r-container{
  width: 300px;
  margin-top: 2rem;
  }
  .title{
    font-size: 16px;
    display: flex;
  }
  .l-title{
    display: flex;
  }
  .img{
    display: none;
  }
}
</style>
<script lang="ts">
import { defineComponent } from 'vue'
import loading from '../components/loading.vue'
import { insertUser, register, error } from '../models/auth'
export default defineComponent({
  name: 'register',
  components: {
    FwLoading: loading
  },
  data: () => ({
    user: '',
    email: '',
    pass: '',
    loading: false,
    fieldType: 'password',
    error: ''
  }),
  methods: {
    register () {
      this.loading = true
      insertUser({ username: this.user, email: this.email, pass: this.pass })
        .then(() => {
          if (error.value.length > 2) {
            this.error = error.value
          } else {
            this.$router.push('/login')
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
