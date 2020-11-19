<template>
<div>
<div class="bg-gray-900 p-4 w-full sticky top-0">
     <ul class="flex text-white justify-evenly">
       <li><router-link to="/"><i class="fa fa-home text-xl hover:text-purple-400"></i></router-link></li>
       <router-link to="/login" @click="LogOut()"><i class="fa fa-power-off text-xl hover:text-purple-400"></i></router-link>
     </ul>
    </div>
  <div class="flex flex-col items-center justify-center upload rounded-md bg-white mx-auto my-12">
    <div v-show="error" class="error flex items-center bg-red-700 justify-center rounded-md mt-8 mb-1">
      <p class="text-white" v-text="error"></p>
    </div>
    <div v-if="success" class="error flex items-center bg-green-800 justify-center rounded-md mt-8 mb-1">
      <p class="text-white" v-text="success"></p>
    </div>
    <div class="resp p-4">
      <span class="text-purple-900 text-2xl font-semibold"><i class="fa fa-cog mr-1 text-xl"></i>Setting</span>
      <!-- <div class="mt-3">
      <img class="w-20 h-20" src=""/>
      </div> -->
      <!-- <div class="resp mt-4">
        <span class="text-purple-800 text-lg font-semibold">Set Profile Photo</span>
        <form action="../../server/public/upload" method="POST" enctype="multipart/form-data">
         <input type="file" id="myFile" name="myImg" class="mt-2 p-1 rounded-md photo focus:bg-purple-200">
         <input type="submit" value="Submit" class="ml-2 mb-1 rounded-md bg-purple-900 text-white p-2 text-sm relative hover:opacity-75 cursor-pointer focus:outline-none">
         <small class="block text-xs text-red-700 my-1">The file size should not exceed 3MB</small>
        </form>
      </div> -->
      <div class="mt-4 flex flex-col items-center justify-center w-full">
      <form @submit.prevent="editUser()" class="resp w-full">
        <input type="text" placeholder="Name" v-model="username" class="res mt-3 border border-purple-800 border-solid border-opacity-25 outline-none rounded-md w-full text-base p-3 placeholder-purple-400 focus:bg-purple-200">
        <input type="text" placeholder="E-mail" v-model="email" class="res border border-purple-800 border-solid border-opacity-25 outline-none rounded-md w-full mt-3 text-base p-3 placeholder-purple-400 focus:bg-purple-200">
        <input type="text" v-model="password" placeholder="Old Password" class="res border border-purple-800 border-solid border-opacity-25 outline-none rounded-md w-full mt-3 text-base p-3 placeholder-purple-400 focus:bg-purple-200">
         <div class="toggle res flex items-center border border-purple-800 border-solid border-opacity-25 mt-3 mb-3 bg-white rounded-md w-full">
          <input v-model="password2" :type="fieldType" class="w-full res border-opacity-75 outline-none p-3 text-base focus:bg-purple-100 rounded-md bg-transparent"
          placeholder="Password" name="password"/>
          <a class="toggle text-sm" @click="switchField()"><i class="fa fa-eye text-purple-900 mr-2"></i></a>
         </div>
         <div class="resp">
         <button class="rounded-md mt-4 bg-purple-900 text-white p-3 relative hover:opacity-75 focus:outline-none">Save Changes</button>
         </div>
         <hr>
         <div class="resp mt-4">
         <a class="text-red-600 bg-gray-200 p-2 font-medium rounded-md hover:opacity-75" @click="remove()">Delete account</a>
         </div>
      </form>
      </div>
    </div>
    <div class="overlay" v-if="openDelete" @click.self="openDelete=false">
       <delete-account v-if="openDelete" :deletUs= 'deletUs'/>
     </div>
  </div>
  </div>
</template>
<style scoped>
  .upload{
      max-width: 450px;
      height: fit-content;
  }
  @media (min-width: 360px) {
    .upload{
      width: 300px;
      padding: 1rem;
    }
    .resp{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  @media (min-width: 620px) {
    .upload{
      width: 450px;
    }
  }
</style>
<script lang="ts">
import { defineComponent } from 'vue'
import deleteAccount from '../components/delete-account.vue'
import { updateuser, user, error } from '../models/auth'
export default defineComponent({
  components: {
    deleteAccount: deleteAccount
  },
  data: () => ({
    fieldType: 'password',
    error: '',
    username: '',
    email: '',
    password: '',
    password2: '',
    success: '',
    openDelete: false,
    deletUs: {}
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
    },
    remove () {
      this.deletUs = user.value
      this.openDelete = true
    },
    LogOut () {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    }
  }
})
</script>
