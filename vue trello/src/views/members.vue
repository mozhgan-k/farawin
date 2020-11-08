<template>
    <div id="members">
     <div id="navbar">
      <ul class="nav-list">
        <li><a style="font-weight:bold;color:#eddcd2" v-text="user.username"></a></li>
        <li><router-link to="/"><i class="fa fa-th"></i></router-link></li>
        <router-link to="/login" class="icon"><i class="fa fa-power-off"></i></router-link>
      </ul>
     </div>
     <div id="list-member">
      <div v-show="error" class="error">
        <p style="color:#fff;" v-text="error"></p>
      </div>
       <form>
       <div class="form-inline">
         <div class="form-group">
          <input type="username" placeholder="Username" class="form-control border-rad" v-model="username2">
         </div>
         <div class="form-group">
          <input type="text" placeholder="Email" class="form-control border-rad" v-model="email2">
         </div>
         <div class="form-group">
          <input type="text" placeholder="Password" class="form-control border-rad" v-model="password2">
         </div>
         <div>
          <button class="add-btn border-rad" type="button" @click="add()">Add</button>
         </div>
        </div>
       </form>
       <div class="flex">
        <table class="table">
            <thead class="h-table">
                <th>Members</th>
                <th>Email</th>
            </thead>
            <tbody class="t-body">
              <tr v-for="user in users" v-bind:key="user._id">
                <td class="edit"><a v-text="user.username" ></a>
                  <div>
                  <a @click="editMember(user)"><i class="fas fa-pencil-alt" style="color:#40916c;margin-right:10px;"></i></a>
                  <a @click="remove(user)"><i class="fa fa-times" style="color:#d00000"></i></a>
                  </div>
                </td>
                <td><a v-text="user.email"></a></td>
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

#navbar{
    background-color:var(--dark-color);
    padding:3px;
    width: 100%;
    position: sticky;
    top: 0;
    }
 .nav-list{
   display: flex;
   color: #f4f4f4;
   justify-content: space-around;
 }
 .nav-list a:hover{
   color: #ddbea9;
 }
 .fa{
    color: #f4f4f4;
 }
 .fa:hover{
    color: #ddbea9;
 }
 .icon{
   color: #a5a58d;
 }
 .edit{
    display:flex;
    justify-content: space-between;
  }
  .fa-pencil-alt,.fa-times{
    font-size: 16px;
  }
  #list-member{
    display:flex;
    flex-direction:column;
    align-items:center
  }
  .add-btn{
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 2;
    border: none;
    outline: none;
    cursor: pointer;
    background-color:#735d78;
    color: #f4f4f4;
  }
   .add-btn:focus{
     outline: 0;
   }
   .add-btn:hover{
     opacity: .8;
   }
  .form-inline{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  .form-inline .form-control {
    width: 200px;
    border: none;
    margin-right: 7px;
  }
  .form-control:focus{
    border: 1px solid var(--primary-color);
    border-radius: 5px;
  }
  .table {
  width: 100%;
  max-width: 400px;
  margin-bottom: 0.5rem;
  color: #212529;
  background-color: #f4f4f4;
}

.table th,
.table td {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}

.table thead th {
  vertical-align: bottom;
  border: 2px solid #dee2e6;
}

thead{
  position: sticky;
  top: 0;
}
.t-body{
    border: 2px solid #dee2e6;
    background-color: #f7e5ef;
}

.h-table{
    color: #f4f4f4;
    background-color: #735d78;
}

.t-body td:hover{
    background-color: #ffc6ff;
}
.scroll{
  height: 400px;
  overflow-y: scroll;
}
.flex{
  display: flex;
  align-items: center;
  justify-content: center;
}
#list-member{
  padding: 8px;
}
@media(max-width:768px) {
   .form-inline{
    flex-direction: column;
    margin-bottom: 0.5rem;
  }
   .form-control {
    margin-right: 7px;
    margin-bottom: 7px;
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
