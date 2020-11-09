<template>
    <div>
     <div class="bg-gray-900 p-4 w-full sticky top-0">
      <ul class="flex text-white justify-around">
        <li><a class="font-semibold hover:text-purple-400" v-text="user.username"></a></li>
        <li><router-link to="/"><i class="fa fa-th text-lg hover:text-purple-400"></i></router-link></li>
        <router-link to="/login"><i class="fa fa-power-off text-lg hover:text-purple-400"></i></router-link>
      </ul>
     </div>
     <div class="flex flex-col items-center p-3">
      <div v-show="error" class="error flex items-center justify-center bg-red-700 rounded-md mt-8 mb-1">
        <p class="text-white" v-text="error"></p>
      </div>
       <form>
       <div class="form-inline flex flex-col justify-center items-center mt-8 mb-2">
         <div>
          <input type="username" placeholder="Username" class="border-none mb-2 rounded-md p-2 w-full focus:bg-purple-100 outline-none " v-model="username2">
         </div>
         <div>
          <input type="text" placeholder="Email" class="border-none mb-2 rounded-md p-2 w-full focus:bg-purple-100 outline-none" v-model="email2">
         </div>
         <div>
          <input type="text" placeholder="Password" class="border-none rounded-md p-2 w-full focus:bg-purple-100 outline-none" v-model="password2">
         </div>
        </div>
        <div>
          <button class="w-full mb-4 p-1 text-base border-none outline-none text-white rounded-md leading-loose bg-purple-900 cursor-pointer hover:opacity-75 focus:outline-none" type="button" @click="add()">Add</button>
         </div>
       </form>
       <div class="flex items-center justify-center">
        <table class="table-auto bg-white text-blue-900 mb-2 p-2 border-2 border-white border-solid">
            <thead class="bg-purple-800 text-white">
                <th class="px-4 py-2 border-t border-solid border-purple-300 align-top">Members</th>
                <th class="px-4 py-2 border-t border-solid border-purple-300 align-top">Email</th>
            </thead>
            <tbody class="border-2 border-solid border-white bg-purple-100">
              <tr class="px-4 py-2 border-t border-solid border-purple-300 align-top" v-for="user in users" v-bind:key="user._id">
                <td class="flex justify-between p-3 hover:bg-purple-200"><a v-text="user.username" ></a>
                  <div class="ml-2">
                  <a @click="editMember(user)"><i class="fas fa-pencil-alt text-sm mr-2 text-green-700"></i></a>
                  <a @click="remove(user)"><i class="fa fa-times text-sm text-red-700"></i></a>
                  </div>
                </td>
                <td class="px-4 py-2 hover:bg-purple-200"><a v-text="user.email"></a></td>
              </tr>
            </tbody>
        </table>
       </div>
     </div>
     <div class="overlay" v-if="editM" @click.self="editM=false">
       <edit-m v-if="editM" :olduser="olduser" @editmember= 'editmember'/>
     </div>
     <div class="overlay" v-if="deletMember" @click.self="deletMember=false">
       <remove v-if="deletMember" :deletuser= 'deletuser' @removemem= 'removemem'/>
     </div>
    </div>
</template>

<style scoped>
  .form-control {
    width: 200px;
  }
  .table {
  width: 100%;
  max-width: 400px;
}
@media(max-width:768px) {
   .form-inline{
    flex-direction: column;
    margin-bottom: 0.5rem;
  }
   .form-control {
    margin-right: 7px;
    margin-bottom: 7px;
    width: 100%;
  }
  .btn{
    width: 100%;
    margin-bottom: 1rem;
  }
}
</style>
<script lang="ts">
import { defineComponent } from 'vue'
import editM from '../components/editmember.vue'
import { users, user, addUser, register, error } from '../models/auth'
import remove from '../components/deletMember.vue'
export default defineComponent({
  name: 'members',
  components: {
    editM: editM,
    remove: remove
  },
  data: () => ({
    editM: false,
    deletMember: false,
    username2: '',
    users: {},
    olduser: {},
    deletuser: {},
    user: {},
    password2: '',
    email2: '',
    error: ''
  }),
  created () {
    this.users = users.value
    this.user = user.value
  },
  methods: {
    editMember (user: {}) {
      this.olduser = user
      this.editM = true
    },
    editmember (editmember: boolean) {
      this.editM = editmember
    },
    remove (user: {}) {
      this.deletuser = user
      this.deletMember = true
    },
    removemem (removemem: boolean) {
      this.deletMember = removemem
    },
    add () {
      addUser({ username: this.username2, email: this.email2, pass: this.password2 }).then(() => {
        if (register.value === true) {
          alert('Registered')
          this.username2 = ''
          this.email2 = ''
          this.password2 = ''
        } else if (error.value.length > 2) {
          this.error = error.value
        }
      })
    }
  }
})
</script>
