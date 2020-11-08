<template>
  <div id="register">
    <div v-show="error" class="error">
      <p style="color:#fff;" v-text="error"></p>
    </div>
    <div class="r-container">
      <div class="title" style="display:flex; justify-content: center">
      <h3 style="color:var(--muted-color);margin-bottom:12px">Welcome to Farawin</h3>
      </div>
      <div class="l-title" style="display:flex; justify-content: center">
        <h4 style="margin:0;font-size:20px">Create account</h4>
      </div>
      <div class="l-body">
        <form @submit.prevent="register()">
          <div class="form-group">
            <input type="text" class="form-control border-rad" placeholder="Username"
            name="username" v-model="user"
            v-autofocus/>
          </div>
          <div class="form-group">
            <input type="email" class="form-control border-rad" placeholder="Email"
            name="email" v-model="email"/>
          </div>
          <div class="toggle-c border-rad">
            <input :type="fieldType" placeholder="Password"
             name="password" v-model="pass" autocomplete="new-password"/>
             <a class="toggle" @click="switchField()"><i class="fa fa-eye"></i></a>
          </div>
          <button :class="{'is-loading': loading}" :disabled="loading" class="btn-block btn-primary border-rad" type="submit">
              <fw-loading v-if="loading" class="loading"/> Create account
          </button>
          <hr/>
          <div class="smalls">
            <router-link to="/login">
              <small>Have an account? / Login</small>
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
    #register{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      a{
       display: block;
       text-align: center;
    }
    .r-container{
      width: 450px;
      align-items: center;
      justify-content: center;
      background: #f4f4f4;
      margin-top: 1.5rem;
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
  }
  @media(max-width: 768px){
  .r-container{
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
