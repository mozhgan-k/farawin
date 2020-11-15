<template>
  <div>
        <div class="modal h-full outline-none transition-all duration-700">
          <div class="flex justify-center relative w-auto m-2">
          <div class="relative flex flex-col w-4/5 bg-white border border-solid border-gray-300 rounded-md">
          <div class="flex items-center justify-center p-3 bg-purple-200 border-b border-solid border-purple-300">
            <h4 class="text-purple-900">Edit Member</h4>
        </div>
        <div class="relative p-4 bg-purple-100">
          <div class="input-content relative mt-4 p-2">
          <input type="username" class="shadow-none outline-none text-sm text-gray-700 border-none border-b border-purple-800 border-solid text-base w-full mt-1 bg-transparent" v-autofocus v-model="username" required>
          <div class="underline absolute left-0 outline-none bottom-0 h-1 w-full shadow-none bg-pink-200"></div>
          <label class="border-none ml-1 mb-2 opacity-75 text-sm outline-none absolute left-0 text-purple-600 pointer-events-none transition-all duration-300 ease-in-out">Username</label>
          </div>
          <div class="input-content relative mt-4 p-2">
          <input type="email" class="shadow-none outline-none text-sm text-gray-700 border-none border-b border-purple-800 border-solid text-base w-full bg-transparent mt-3" v-model="email" required>
          <div class="underline absolute left-0 outline-none bottom-0 h-1 w-full shadow-none bg-pink-200"></div>
          <label class="border-none ml-1 mb-2 opacity-75 text-sm outline-none absolute left-0 text-purple-600 pointer-events-none transition-all duration-300 ease-in-out">E-mail</label>
          </div>
          <div class="input-content relative mt-4 p-2">
          <input type="text" class="shadow-none outline-none text-sm text-gray-700 border-none border-b border-purple-800 border-solid text-base w-full bg-transparent mt-3" v-model="password" required>
          <div class="underline absolute left-0 outline-none bottom-0 h-1 w-full shadow-none bg-pink-200"></div>
          <label class="border-none ml-1 mb-2 opacity-75 text-sm outline-none absolute left-0 text-purple-600 pointer-events-none transition-all duration-300 ease-in-out">Password</label>
          </div>
        </div>
        <div class="flex items-center justify-center bg-purple-200 p-1 border-t border-solid border-purple-300">
          <button class="rounded-md bg-purple-900 w-full text-white p-2 hover:opacity-75 focus:outline-none" @click="editUser()">Save</button>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { updateuser } from '../models/auth'
export default defineComponent({
  name: 'editMember',
  props: ['olduser'],
  data: () => ({
    username: '',
    email: '',
    password: ''
  }),
  created () {
    const oldUser = this.$props.olduser
    this.username = oldUser.username
    this.password = oldUser.pass
    this.email = oldUser.email
  },
  methods: {
    editUser () {
      const oUser = this.$props.olduser
      const nUser = { _id: oUser._id, username: this.username, email: this.email, pass: this.password }
      updateuser(oUser, nUser).then(() => {
        this.$emit('editmember', false)
      })
    }
  }
})
</script>
