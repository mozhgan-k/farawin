<template>
  <div id="edit-member">
        <div id="myModal" class="modal" role="dialog">
          <div class="modal-dialog">
          <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Edit Member</h4>
        </div>
        <div class="modal-body">
          <div class="form-control">
          <input type="username" class="modal-input border-rad" placeholder="Username" v-autofocus v-model="username">
          </div>
          <div class="form-control">
          <input type="email" class="modal-input border-rad" placeholder="Email" v-model="email">
          </div>
          <div class="form-control">
          <input type="text" class="modal-input border-rad" placeholder="Password" v-model="password">
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn1 border-rad" @click="editUser()">Save</button>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { updateuser } from '../models/auth'
export default defineComponent({
  name: 'editMember',
  props: ['olduser'],
  data: () => ({
    username: '',
    email: '',
    password: ''
  }),
  created () {
    const oldUser = this.$props.olduser
    this.username = oldUser.username
    this.password = oldUser.pass
    this.email = oldUser.email
  },
  methods: {
    editUser () {
      const oUser = this.$props.olduser
      const nUser = { _id: oUser._id, username: this.username, email: this.email, pass: this.password }
      updateuser(oUser, nUser).then(() => {
        this.$emit('editmember', false)
      })
    }
  }
})
</script>
