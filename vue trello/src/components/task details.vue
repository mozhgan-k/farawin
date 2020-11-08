<template>
  <div class="modal-style">
    <div v-show="error" class="error" style="margin-bottom: 1rem; margin-top:0">
    <p style="color:#fff;" v-text="error"></p>
    </div>
        <div id="myModal" class="modal" role="dialog">
          <div class="modal-dialog">
          <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" v-if="!show">Task Details</h4>
            <h4 class="modal-title" v-if="show">Edit Task</h4>
        </div>
        <div class="modal-body">
          <div class="form-control" v-if="!show">
           <p v-text="editTask.desc"></p>
          </div>
          <div class="form-control" v-if="show">
           <textarea name="desc" class="modal-input border-rad" placeholder="Your Task" v-model="vDesc"></textarea>
          </div>
          <div class="form-control" v-if="show">
           <input name="name" class="modal-input border-rad" placeholder="Your Name" v-model="vName"/>
          </div>
          <div v-if="!show">
            <i class="fa fa-paperclip"></i><small v-text="editTask.user"></small>
          </div>
        </div>
        <div class="modal-footer">
         <div>
          <a @click="show=!show" v-if="!show"><i class="fas fa-pencil-alt" style="color:#40916c;margin-right:10px;"></i></a>
         </div>
         <div v-if="show">
           <button class="btn1 border-rad" @click="editTasks()">Save</button>
         </div>
         <div>
          <a v-if="!show" @click="delTask=true"><i class="fa fa-times" style="color:#d00000"></i></a>
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
<style scoped>
.modal-body small{
    font-size: 16px;
    color: var(--muted-color);
}
 .fa-paperclip{
     color: var(--muted-color);
     font-size: 13px;
     margin: 3px 3px 10px 3px;
 }
</style>
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
