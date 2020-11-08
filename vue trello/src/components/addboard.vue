<template>
<div class="modal-style">
  <div v-show="error" class="error" style="margin-bottom: 1rem; margin-top:0">
    <p style="color:#fff;" v-text="error"></p>
  </div>
 <transition name="modal">
    <div>
      <div class="modal">
        <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add New Board</h4>
        </div>
        <form @submit.prevent="created()">
        <div class="modal-body">
          <div class="form-control">
          <input type="text" class="modal-input border-rad"
          v-model="boardName" placeholder="Board Name" v-autofocus>
          </div>
          <div class="form-control">
          <textarea name="desc" class="modal-input border-rad"
          v-model="boardDesc" placeholder="Description"></textarea>
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
  </transition>
</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { insertboard, success, error } from '../models/board'
export default defineComponent({
  name: 'addBoard',
  data: () => ({
    boardName: '',
    boardDesc: '',
    error: ''
  }),
  methods: {
    created () {
      insertboard({ name: this.boardName, desc: this.boardDesc }).then(() => {
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
