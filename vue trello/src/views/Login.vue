<template>
  <div id="login">
    <div v-show="error" class="error">
      <p style="color:#fff;" v-text="error"></p>
    </div>
    <div class="login-container">
      <div class="title" style="display:flex; justify-content: center">
      <h3 style="color:var(--muted-color);margin-bottom:12px">Welcome back to Farawin</h3>
      </div>
      <div class="l-title" style="display:flex; justify-content: center">
        <h4 style="margin:0;font-size:20px">Login</h4>
      </div>
      <div class="l-body">
        <form v-if="mode = 'login'" @submit.prevent="login()">
          <div class="form-group">
              <input
                v-autofocus
                v-model="username"
                type="text"
                class="form-control border-rad"
                placeholder="Username"
                name="username"
              />
          </div>
            <div class="toggle-c border-rad">
              <input v-model="password" :type="fieldType" class="border-rad"
                placeholder="Password" name="password"/>
                <a class="toggle" @click="switchField()"><i class="fa fa-eye"></i></a>
            </div>
          <button :class="{'is-loading': loading}" :disabled="loading" class="btn-block btn-primary border-rad" type="submit">
            <fw-loading v-if="loading" class="loading" />Login</button>
          <hr>
          <div class="smalls">
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
    #login{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      a{
      display: block;
      text-align: center;
    }
    .login-container{
      width: 450px;
      background: #f4f4f4;
      margin-top: 3rem;
      padding: 2rem;
      .form-control{
        border: 1px solid #adb5bd;
      }
      .toggle-c{
        display: flex;
        align-items: center;
        border: 1px solid #adb5bd;
        margin-top: 0.75rem;
        margin-bottom: 0.75rem;
        background-color: #ffffff;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        input{
          width: 98%;
          outline: 0;
          border: 0;
          padding: .7rem;
           &:focus{
          background-color: #fcf9f9;
          border-radius: 5px;
          outline: 0;
       }
        }
        i{
          color: var(--muted-color);
          font-size: 16px;
          margin: 0 10px;
        }
      }
      .smalls{
        font-size: 90%;
        font-weight: 400;
        margin-top: 0.8rem;
        a:hover{
        color: var(--primary-color);
      }
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
  .toggle-c{
    width: 100%;
  }
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
