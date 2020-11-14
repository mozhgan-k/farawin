<template>
  <div class="flex flex-col items-center">
    <div v-show="error" class="error flex items-center bg-red-700 justify-center rounded-md mt-2 mb-1">
      <p class="text-white" v-text="error"></p>
    </div>
    <div class="modal h-full outline-none transition-all duration-700">
      <div class="flex justify-center relative w-auto m-2">
        <div class="relative flex flex-col w-4/5 bg-white border border-solid border-gray-300 rounded-md">
        <div class="flex items-center justify-center p-3 bg-purple-200 border-b border-solid border-purple-300">
          <h4 class="text-purple-900">Delete account</h4>
        </div>
         <div class="relative p-4 bg-purple-100">
          <div v-if="!show">
          <h5 class="text-purple-900">Are you sure you want to delete your account?</h5>
          </div>
          <div v-if="show">
            <span class="text-purple-900"> Please enter your password:</span>
          <div class="flex items-center border border-purple-800 border-solid border-opacity-25 mt-3 mb-3 bg-white rounded-md w-full">
          <input v-model="password" :type="fieldType" class="w-full border-opacity-75 outline-none p-3 text-base focus:bg-purple-100 rounded-md bg-transparent"
          placeholder="Password" name="password"/>
          <a class="toggle text-sm" @click="switchField()"><i class="fa fa-eye text-purple-900 mr-2"></i></a>
         </div>
          </div>
         </div>
        <div class="flex items-center justify-around bg-purple-200 p-1 border-t border-solid border-purple-300">
          <button class="rounded-md bg-purple-700 text-white p-2 hover:opacity-75 focus:outline-none" v-if="!show" @click="show=!show">Yes</button>
          <button class="rounded-md bg-purple-900 text-white p-2 hover:opacity-75 focus:outline-none" v-if="!show">No!!</button>
          <button class="rounded-md bg-red-700 text-white w-full p-2 hover:opacity-75 focus:outline-none" @click="remove()" v-if="show">Delete my account</button>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { removeUser, user, error } from '../models/auth'
export default defineComponent({
  props: ['deletUs'],
  data: () => ({
    fieldType: 'password',
    show: false,
    error: '',
    password: ''
  }),
  methods: {
    switchField () {
      this.fieldType = this.fieldType === 'password' ? 'text' : 'password'
    },
    remove () {
      const user = this.$props.deletUs
      if (user.pass === this.password) {
        removeUser(user).then(() => {
          if (error.value.length > 2) {
            this.error = error.value
          } else {
            this.$router.push('/register')
          }
        })
      } else {
        this.error = 'Password was wrong!'
      }
    }
  }
})
</script>
