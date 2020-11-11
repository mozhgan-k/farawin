<template>
  <div class="flex flex-col items-center">
    <div v-show="error" class="error flex items-center justify-center bg-red-700 rounded-md mt-8 mb-1">
    <p class="text-white" v-text="error"></p>
    </div>
        <div class="modal h-full outline-none transition-all duration-700">
          <div class="flex justify-center relative w-auto m-2">
          <div class="relative flex flex-col w-4/5 bg-white border border-solid border-gray-300 rounded-md">
          <div class="flex items-center justify-center p-3 bg-purple-200 border-b border-solid border-purple-300">
            <h4 class="text-purple-900" v-if="!show">Task Details</h4>
            <h4 class="text-purple-900" v-if="show">Edit Task</h4>
        </div>
        <div class="relative p-4 bg-purple-100">
          <div v-if="!show">
           <p v-text="editTask.desc"></p>
          </div>
          <div v-if="show">
           <textarea name="desc" class="outline-none rounded-md w-full text-base p-3 placeholder-purple-400 focus:bg-purple-200" placeholder="Your Task" v-model="vDesc"></textarea>
          </div>
          <div v-if="show">
           <input name="name" class="outline-none rounded-md w-full text-base p-3 placeholder-purple-400 focus:bg-purple-200" placeholder="Your Name" v-model="vName"/>
          </div>
          <div v-if="!show" class="mt-3">
            <i class="fa fa-paperclip m-1 text-purple-500"></i><small v-text="editTask.user" class="text-base text-purple-600"></small>
          </div>
        </div>
        <div class="flex items-center justify-around bg-purple-200 p-3 border-t border-solid border-purple-300">
         <div>
          <a @click="show=!show" v-if="!show"><i class="fas fa-pencil-alt mr-3 text-green-700"></i></a>
         </div>
         <div v-if="show">
           <button class="w-full rounded-md bg-purple-900 text-white p-3 hover:opacity-75 focus:outline-none" @click="editTasks()">Save</button>
         </div>
         <div>
          <a v-if="!show" @click="delTask=true"><i class="fa fa-times text-red-700"></i></a>
         </div>
        </div>
      </div>
    </div>
    </div>
    <div class="overlay" v-if="delTask" @click.self="delTask=false">
       <hazf v-if="delTask" :dTask = 'dTask' @deletclose = 'deletclose'/>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { updateTask, removeTask, error } from '../models/task'
import delet from './delettask.vue'
export default defineComponent({
  name: 'myModal',
  props: ['editTask'],
  components: {
    hazf: delet
  },
  data: () => ({
    show: false,
    dTask: {},
    vDesc: '',
    vName: '',
    delTask: false,
    error: ''
  }),
  created () {
    const task = this.$props.editTask
    this.dTask = this.$props.editTask
    this.vDesc = task.desc
    this.vName = task.user
  },
  methods: {
    editTasks () {
      const oldTask = this.$props.editTask
      const newTask = { _id: oldTask._id, user: this.vName, desc: this.vDesc, listId: oldTask.listId }
      updateTask(oldTask, newTask).then(() => {
        if (error.value.length > 2) {
          this.error = error.value
        } else {
          this.$emit('taskclose', false)
        }
      })
    },
    deletclose (deletclose: boolean) {
      this.delTask = deletclose
      this.$emit('anqezi', deletclose)
    }

  }
})
</script>
