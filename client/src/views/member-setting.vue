<template>
  <div class="flex flex-col items-center justify-center upload rounded-md bg-white mx-auto my-12">
    <div class="p-4">
      <span class="text-purple-900 text-xl m-4"><i class="fa fa-cog mr-1 text-base"></i>Setting</span>
      <!-- <div>
          <img src="" alt="">
      </div> -->
      <div class="mt-4 flex items-center">
        <form>
         <input type="file" id="myFile" name="filename" class="mt-2 p-1 rounded-md focus:bg-purple-200">
         <input type="submit" value="Submit" class="ml-2 mb-1 rounded-md bg-purple-900 text-white p-2 text-sm relative hover:opacity-75 cursor-pointer focus:outline-none">
        </form>
      </div>
      <div class="mt-4">
      <form>
        <input type="text" placeholder="Name" class="border border-purple-800 border-solid border-opacity-25 outline-none rounded-md w-full text-base p-3 placeholder-purple-400 focus:bg-purple-200">
        <input type="text" placeholder="E-mail" class="border border-purple-800 border-solid border-opacity-25 outline-none rounded-md w-full mt-3 text-base p-3 placeholder-purple-400 focus:bg-purple-200">
         <div class="flex items-center border border-purple-800 border-solid border-opacity-25 mt-3 mb-3 bg-white rounded-md w-full">
          <input v-model="password" :type="fieldType" class="w-full border-opacity-75 outline-none p-3 text-base focus:bg-purple-100 rounded-md bg-transparent"
          placeholder="Password" name="password"/>
          <a class="toggle text-sm" @click="switchField()"><i class="fa fa-eye text-purple-900 mr-2"></i></a>
         </div>
         <hr class="mt-3">
         <div class="flex justify-end items-center">
         <button class="rounded-md mt-4 bg-purple-900 text-white p-3 relative hover:opacity-75 focus:outline-none">Save Changes</button>
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
export default defineComponent({
  data: () => ({
    fieldType: 'password',
    error: ''
  }),
  methods: {
    switchField () {
      this.fieldType = this.fieldType === 'password' ? 'text' : 'password'
    }
  }
})
</script>
