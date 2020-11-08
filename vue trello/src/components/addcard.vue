<template>
<div class="modal-style">
  <div v-show="error" class="error" style="margin-bottom: 1rem; margin-top:0">
    <p style="color:#fff;" v-text="error"></p>
  </div>
  <div class="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add New Card</h4>
        </div>
        <form @submit.prevent="created()">
        <div class="modal-body">
          <div class="form-control">
          <textarea name="desc" class="modal-input border-rad" v-model="cDesc" placeholder="Your Task"></textarea>
          </div>
          <div class="form-control">
           <input name="name" class="modal-input border-rad" placeholder="Your Name" v-model="vName"/>
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
