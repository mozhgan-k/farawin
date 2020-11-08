<template>
  <div class="modal-style">
    <div v-show="error" class="error" style="margin-bottom: 1rem; margin-top:0">
      <p style="color:#fff;" v-text="error"></p>
    </div>
        <div id="myModal" class="modal" role="dialog">
          <div class="modal-dialog">
          <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Edit Board</h4>
        </div>
        <div class="modal-body">
          <div class="form-control">
          <input type="text" class="modal-input border-rad" placeholder="Board Name" v-model='vName' v-autofocus>
          </div>
          <div class="form-control">
          <textarea name="desc" class="modal-input border-rad" placeholder="Description" v-model='vDesc'></textarea>
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
import { updateboard, error } from '../models/board'
export default defineComponent({
  name: 'editBoard',
  props: ['eboard'],
  created () {
    const oldboard = this.$props.eboard
    this.vName = oldboard.name
    this.vDesc = oldboard.desc
  },
  data: () => ({
    vName: '',
    vDesc: '',
    openC: false,
    error: ''
  }),
  methods: {
    edit () {
      const oboard = this.$props.eboard
      const nboard = { _id: oboard._id, name: this.vName, desc: this.vDesc }
      updateboard(oboard, nboard).then(() => {
        if (error.value.length > 2) {
          this.error = error.value
        } else {
          this.$emit('eclose', false)
        }
      })
    },
    aClose (close: boolean) {
      this.openC = close
    }
  }
})
</script>
