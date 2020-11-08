<template>
<div class="flex flex-col items-center">
  <div v-show="error" class="error flex items-center justify-center bg-red-700 rounded-md mt-8 mb-1">
    <p class="text-white" v-text="error"></p>
  </div>
  <div class="modal h-full outline-none transition-all duration-700">
    <div class="justify-center relative w-auto m-2">
      <div class="relative flex flex-col w-4/5 bg-white border border-solid border-gray-300 rounded-md">
        <div class="flex items-center justify-center p-3 bg-purple-200 border-b border-solid border-purple-300">
          <h4 class="text-purple-900">Add New Card</h4>
        </div>
        <form @submit.prevent="created()">
        <div class="relative p-4 bg-purple-100">
          <div>
           <input name="name" class="outline-none rounded-md w-full text-base p-3 placeholder-purple-400 focus:bg-purple-200" placeholder="Your Name" v-model="vName"/>
          </div>
          <div>
          <textarea name="desc" class="outline-none rounded-md w-full text-base p-3 mt-3 placeholder-purple-400 focus:bg-purple-200" v-model="cDesc" placeholder="Your Task"></textarea>
          </div>
        </div>
        <div class="flex items-center justify-center bg-purple-200 p-3 border-t border-solid border-purple-300">
          <button class="rounded-md bg-purple-900 w-full text-white p-3 hover:opacity-75 focus:outline-none">Create</button>
        </div>
        </form>
      </div>
    </div>
   </div>
</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { insertTask, error } from '../models/task'
export default defineComponent({
  name: 'addCard',
  props: ['listID'],
  data: () => ({
    cDesc: '',
    vName: '',
    error: ''
  }),
  methods: {
    created () {
      const ids = this.$props.listID._id
      const boardId = this.$props.listID.boardId
      insertTask({ desc: this.cDesc, listId: ids, user: this.vName, boardId: boardId }).then(() => {
        if (error.value.length > 2) {
          this.error = error.value
        } else {
          this.$emit('add', false)
        }
      })
    }
  }
})
</script>
