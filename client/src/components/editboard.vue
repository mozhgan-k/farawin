<template>
  <div class="flex flex-col items-center">
    <div v-show="error" class="flex items-center justify-center bg-red-700 rounded-md mt-8 mb-1 error">
      <p class="text-white" v-text="error"></p>
    </div>
        <div class="modal h-full outline-none transition-all duration-700">
          <div class="flex justify-center relative w-auto m-2">
          <div class="relative flex flex-col w-4/5 bg-white border border-solid border-gray-300 rounded-md">
          <div class="flex items-center justify-center p-3 bg-purple-200 border-b border-solid border-purple-300">
            <h4 class="text-purple-900">Edit Board</h4>
        </div>
        <div class="relative p-4 bg-purple-100">
          <div class="input-content relative mt-4 p-2">
          <input type="text" class="shadow-none outline-none text-sm text-gray-700 border-none border-b border-purple-800 border-solid text-base w-full mt-1 bg-transparent" v-model='vName' v-autofocus required>
          <div class="underline absolute left-0 outline-none bottom-0 h-1 w-full shadow-none bg-pink-200"></div>
          <label class="border-none ml-1 mb-2 opacity-75 text-sm outline-none absolute left-0 text-purple-600 pointer-events-none transition-all duration-300 ease-in-out">Board Name</label>
          </div>
          <div>
          <textarea name="desc" class="outline-none rounded-md w-full text-gray-700 text-base p-3 mt-3 placeholder-purple-400 focus:bg-pink-200" placeholder="Description" v-model='vDesc'></textarea>
          </div>
        </div>
        <div class="flex items-center justify-center bg-purple-200 p-1 border-t border-solid border-purple-300">
          <button class="rounded-md bg-purple-900 w-full text-white p-2 hover:opacity-75 focus:outline-none" @click="edit()">Save</button>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { updateboard, error } from '../models/board'
export default defineComponent({
  name: 'editBoard',
  props: ['eboard'],
  created () {
    const oldboard = this.$props.eboard
    this.vName = oldboard.name
    this.vDesc = oldboard.desc
  },
  data: () => ({
    vName: '',
    vDesc: '',
    openC: false,
    error: ''
  }),
  methods: {
    edit () {
      const oboard = this.$props.eboard
      const nboard = { _id: oboard._id, name: this.vName, desc: this.vDesc }
      updateboard(oboard, nboard).then(() => {
        if (error.value.length > 2) {
          this.error = error.value
        } else {
          this.$emit('eclose', false)
        }
      })
    },
    aClose (close: boolean) {
      this.openC = close
    }
  }
})
</script>
