<template>
  <div class="flex flex-col items-center">
    <div v-show="error" class="error flex items-center justify-center bg-red-700 rounded-md mt-8 mb-1">
    <p class="text-white" v-text="error"></p>
    </div>
        <div class="modal h-full outline-none transition-all duration-700">
          <div class="flex justify-center relative w-auto m-2">
          <div class="relative flex flex-col w-4/5 bg-white border border-solid border-gray-300 rounded-md">
          <div class="flex items-center justify-center p-3 bg-purple-200 border-b border-solid border-purple-300">
            <h4 class="text-purple-900">Edit List</h4>
        </div>
        <div class="relative p-4 bg-purple-100">
          <div>
          <input type="text" class="outline-none rounded-md w-full text-base p-3 placeholder-purple-400 focus:bg-purple-200" placeholder="List Name" v-model='vName' v-autofocus>
          </div>
        </div>
        <div class="flex items-center justify-center bg-purple-200 p-3 border-t border-solid border-purple-300">
          <button class="rounded-md bg-purple-900 w-full text-white p-3 hover:opacity-75 focus:outline-none" @click="edit()">Save</button>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { updateList, error } from '../models/list'
export default defineComponent({
  name: 'edit',
  props: ['eList'],
  data: () => ({
    vName: '',
    error: ''
  }),
  created () {
    const list = this.$props.eList
    this.vName = list.name
  },
  methods: {
    edit () {
      const oList = this.$props.eList
      const nList = { _id: oList._id, name: this.vName }
      updateList(oList, nList).then(() => {
        if (error.value.length > 2) {
          this.error = error.value
        } else {
          this.$emit('eclose', false)
        }
      })
    }
  }
})
</script>
