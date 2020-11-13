<template>
  <div class="flex flex-col items-center justify-center upload rounded-md bg-white mx-auto my-12">
    <div v-show="error" class="error flex items-center bg-red-700 justify-center rounded-md mt-8 mb-1">
      <p class="text-white" v-text="error"></p>
    </div>
    <div v-if="success" class="error flex items-center bg-green-800 justify-center rounded-md mt-8 mb-1">
      <p class="text-white" v-text="success"></p>
    </div>
    <div class="p-4">
      <span class="text-purple-900 text-xl"><i class="fa fa-cog mr-1 text-base"></i>Setting</span>
      <div class="mt-3">
      <img class="w-20 h-20" src="https://img.icons8.com/fluent/96/000000/user-female-circle.png"/>
      </div>
      <div class="mt-4 flex flex-col justify-center">
        <span class="text-purple-800">Set Profile Photo</span>
        <form>
         <input type="file" id="myFile" name="filename" class="mt-2 p-1 rounded-md focus:bg-purple-200">
         <input type="submit" value="Submit" class="ml-2 mb-1 rounded-md bg-purple-900 text-white p-2 text-sm relative hover:opacity-75 cursor-pointer focus:outline-none">
        </form>
      </div>
      <div class="mt-4">
      <span class="text-purple-800 mb-3">Account</span>
      <form @submit.prevent="editUser()">
        <input type="text" placeholder="Name" v-model="username" class="mt-3 border border-purple-800 border-solid border-opacity-25 outline-none rounded-md w-full text-base p-3 placeholder-purple-400 focus:bg-purple-200">
        <input type="text" placeholder="E-mail" v-model="email" class="border border-purple-800 border-solid border-opacity-25 outline-none rounded-md w-full mt-3 text-base p-3 placeholder-purple-400 focus:bg-purple-200">
        <input type="text" v-model="password" placeholder="Old Password" class="border border-purple-800 border-solid border-opacity-25 outline-none rounded-md w-full mt-3 text-base p-3 placeholder-purple-400 focus:bg-purple-200">
         <div class="flex items-center border border-purple-800 border-solid border-opacity-25 mt-3 mb-3 bg-white rounded-md w-full">
          <input v-model="password2" :type="fieldType" class="w-full border-opacity-75 outline-none p-3 text-base focus:bg-purple-100 rounded-md bg-transparent"
          placeholder="Password" name="password"/>
          <a class="toggle text-sm" @click="switchField()"><i class="fa fa-eye text-purple-900 mr-2"></i></a>
         </div>
         <hr class="mt-3">
         <div class="flex justify-end items-center">
         <button class="rounded-md mt-4 bg-purple-900 text-white p-3 relative hover:opacity-75 focus:outline-none">Save Changes</button>
         </div>
         <hr>
         <div class="mt-4 flex justify-start">
         <a class="text-red-600 bg-gray-200 p-2 font-medium rounded-md">Delete account</a>
         </div>
      </form>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .upload{
      width: 500px;
      height: fit-content;
  }
</style>
<script lang="ts">
import { defineComponent } from 'vue'
import { updateuser, user, error } from '../models/auth'
export default defineComponent({
  data: () => ({
    fieldType: 'password',
    error: '',
    username: '',
    email: '',
    password: '',
    password2: '',
    success: ''
  }),
  mounted () {
    const oldUser = user.value
    this.username = oldUser.username
    this.email = oldUser.email
  },
  methods: {
    switchField () {
      this.fieldType = this.fieldType === 'password' ? 'text' : 'password'
    },
    editUser () {
      const oUser = user.value
      if (oUser.pass === this.password) {
        const nUser = { _id: oUser._id, username: this.username, email: this.email, pass: this.password2 }
        updateuser(oUser, nUser).then(() => {
          if (error.value.length > 2) {
            this.error = error.value
          } else {
            this.success = 'User updated!'
          }
        })
      } else {
        this.error = 'Old password was wrong!'
      }
    }
  }
})
</script>
