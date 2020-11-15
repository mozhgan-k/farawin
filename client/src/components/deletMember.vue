<template>
    <div>
        <div class="modal h-full outline-none transition-all duration-700">
          <div class="flex justify-center relative w-auto m-2">
          <div class="relative flex flex-col w-4/5 bg-white border border-solid border-gray-300 rounded-md">
        <div class="relative p-4 bg-purple-100">
          <h5>Are you sure you want to delete this item?</h5>
        </div>
        <div class="flex items-center justify-center bg-purple-200 p-1 border-t border-solid border-purple-300">
          <button class="rounded-md bg-purple-900 w-full text-white p-2 hover:opacity-75 focus:outline-none" @click="remove()">Delete</button>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { removeUser } from '../models/auth'
export default defineComponent({
  name: 'alert',
  props: ['deletuser'],
  methods: {
    remove () {
      const user = this.$props.deletuser
      removeUser(user).then(() => {
        this.$emit('removemem', false)
      })
    }
  }
})
</script>
