<template>
  <div class="modal-style">
    <div v-show="error" class="error" style="margin-bottom: 1rem; margin-top:0">
    <p style="color:#fff;" v-text="error"></p>
    </div>
    <div class="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add New List</h4>
        </div>
        <form @click.prevent="created()">
        <div class="modal-body">
          <div class="form-control">
          <input type="text" class="modal-input border-rad" placeholder="List Name" v-model="listName" v-autofocus>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn1 border-rad">Create</button>
        </div>
        </form>
      </div>
    </div>
   </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { insertList, board, error } from '../models/list'
export default defineComponent({
  name: 'myModal',
  data: () => ({
    show: false,
    listName: '',
    error: ''
  }),
  methods: {
    created () {
      const boardid = board.value
      insertList({ name: this.listName, boardId: boardid._id }).then(() => {
        if (error.value.length > 2) {
          this.error = error.value
        } else {
          this.$emit('aclose', false)
        }
      })
    }
  }
})
</script>
