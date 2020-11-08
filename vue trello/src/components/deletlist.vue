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
import { removeList } from '../models/list'
export default defineComponent({
  name: 'alert',
  props: ['dList'],
  methods: {
    hazf () {
      const list = this.$props.dList
      removeList(list).then(() => {
        this.$emit('dclose', false)
      })
    }
  }
})
</script>
