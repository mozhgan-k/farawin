<template>
  <div id="edit-list" class="modal-style">
    <div v-show="error" class="error" style="margin-bottom: 1rem; margin-top:0">
    <p style="color:#fff;" v-text="error"></p>
    </div>
        <div id="myModal" class="modal" role="dialog">
          <div class="modal-dialog">
          <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Edit List</h4>
        </div>
        <div class="modal-body">
          <div class="form-control">
          <input type="text" class="modal-input border-rad" placeholder="List Name" v-model='vName' v-autofocus>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn1 border-rad" @click="edit()">Save</button>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { updateList, error } from '../models/list'
export default defineComponent({
  name: 'edit',
  props: ['eList'],
  data: () => ({
    vName: '',
    error: ''
  }),
  created () {
    const list = this.$props.eList
    this.vName = list.name
  },
  methods: {
    edit () {
      const oList = this.$props.eList
      const nList = { _id: oList._id, name: this.vName }
      updateList(oList, nList).then(() => {
        if (error.value.length > 2) {
          this.error = error.value
        } else {
          this.$emit('eclose', false)
        }
      })
    }
  }
})
</script>
