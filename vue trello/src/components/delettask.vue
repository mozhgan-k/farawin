<template>
  <div id="alert">
        <div id="myModal" class="modal" role="dialog">
          <div class="modal-dialog">
          <div class="modal-content">
        <div class="modal-body">
          <h5>Are you sure you want to delete this item?</h5>
        </div>
        <div class="modal-footer">
          <button class="btn1 border-rad" @click="deletTask()">Delete</button>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { removeTask } from '../models/task'
export default defineComponent({
  name: 'alert',
  props: ['dTask'],
  methods: {
    deletTask () {
      const task = this.$props.dTask
      removeTask(task).then(() => {
        this.$emit('deletclose', false)
      })
    }
  }
})
</script>
