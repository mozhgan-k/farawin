<template>
  <div id="alert">
        <div id="myModal" class="modal" role="dialog">
          <div class="modal-dialog">
          <div class="modal-content">
        <div class="modal-body">
          <h5>Are you sure you want to delete this item?</h5>
        </div>
        <div class="modal-footer">
          <button class="btn1 border-rad" @click="hazf()">Delete</button>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { removeboard } from '../models/board'
export default defineComponent({
  name: 'alert',
  props: ['dboard'],
  methods: {
    hazf () {
      const board = this.$props.dboard
      removeboard(board).then(() => {
        this.$emit('close', false)
      })
    }
  }
})
</script>
