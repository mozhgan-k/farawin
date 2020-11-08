<template>
    <div id="alert">
        <div id="myModal" class="modal" role="dialog">
          <div class="modal-dialog">
          <div class="modal-content">
        <div class="modal-body">
          <h5>Are you sure you want to delete this item?</h5>
        </div>
        <div class="modal-footer">
          <button class="btn1 border-rad" @click="remove()">Delete</button>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { removeUser } from '../models/auth'
export default defineComponent({
  name: 'alert',
  props: ['deletuser'],
  methods: {
    remove () {
      const user = this.$props.deletuser
      removeUser(user).then(() => {
        this.$emit('removemem', false)
      })
    }
  }
})
</script>
