<template>
  <div>
        <div class="modal h-full outline-none transition-all duration-700">
          <div class="flex justify-center relative w-auto m-2">
          <div class="relative flex flex-col w-4/5 bg-white border border-solid border-gray-300 rounded-md">
          <div class="flex items-center justify-center p-3 bg-purple-200 border-b border-solid border-purple-300">
            <h4 class="text-purple-900">Edit Member</h4>
        </div>
        <div class="relative p-4 bg-purple-100">
          <div>
          <input type="username" class="outline-none rounded-md w-full text-base p-3 placeholder-purple-400 focus:bg-purple-200" placeholder="Username" v-autofocus v-model="username">
          </div>
          <div>
          <input type="email" class="outline-none rounded-md w-full text-base p-3 placeholder-purple-400 focus:bg-purple-200" placeholder="Email" v-model="email">
          </div>
          <div>
          <input type="text" class="outline-none rounded-md w-full text-base p-3 placeholder-purple-400 focus:bg-purple-200" placeholder="Password" v-model="password">
          </div>
        </div>
        <div class="flex items-center justify-center bg-purple-200 p-3 border-t border-solid border-purple-300">
          <button class="rounded-md bg-purple-900 w-full text-white p-3 hover:opacity-75 focus:outline-none" @click="editUser()">Save</button>
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
