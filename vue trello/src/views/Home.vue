<template>
  <div class="home">
    <div id="navbar">
     <ul class="nav-list">
       <li><a style="font-weight:bold;color:#eddcd2" v-text="user.username"></a></li>
       <li><a @click="myTask()"><i class="fa fa-list-alt"></i></a></li>
       <li><a @click="openC=true" type="button"><i class="fa fa-plus"></i></a></li>
       <router-link v-if="user.role == 'admin'" to="/members"><i class="fa fa-users"></i></router-link>
       <router-link to="/login" class="icon" @click="LogOut()"><i class="fa fa-power-off"></i></router-link>
     </ul>
    </div>
  <section>
      <div id="d-flex">
        <div class="m-container">
          <div class="card" v-for="board in boards" :key="board._id">
            <a @click="list(board)">
              <h4 style="color:#240046; margin-top:2px;" v-text="board.name"></h4>
            </a>
           <div class="edit">
              <a @click="virayesh(board)"><i class="fas fa-pencil-alt" style="color:#40916c;margin-right:10px;"></i></a>
              <a @click="pak(board)"><i class="fas fa-trash-alt" style="color:#d00000"></i></a>
           </div>
            <div>
              <p class="tasks" style="display:flex;flex-direction:column;" v-text="board.desc"></p>
            </div>
          </div>
       </div>
      </div>
     </section>
     <div class="overlay" v-if="openC" @click.self="openC=false">
       <create v-if="openC" @aclose = 'aClose'/>
     </div>
     <div class="overlay" v-if="openE" @click.self="openE=false">
       <edit v-if="openE" :eboard = 'eboard' @eclose = 'eClose'/>
     </div>
     <div class="overlay" v-if="openD" @click.self="openD=false">
       <hazf v-if="openD" :dboard = 'dboard' @close = 'closeAlert'/>
     </div>
  </div>
</template>
<style scoped>
h1, h2, h3, h4, h5, h6{
  margin: 0;
}
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
  .card{
    background: #ffddd2 ;
    width: 250px;
    height: fit-content;
    margin: 3rem;
    padding: 0.5rem;
    border-radius: 5px;
    box-shadow: 0 12px 8px -4px var(--dark-color);
  }
  .card h4{
    display: inline-block;
  }
  .tasks{
    margin-top:3px;
    margin-bottom:5px;
    background-color: #f4f4f4;
    color:#3c096c;
    font-size:14px;
    padding: 5px;
  }
  .edit{
    float: right;
  }
</style>
<script lang="ts">
import { defineComponent } from 'vue'
import addboard from '../components/addboard.vue'
import editboard from '../components/editboard.vue'
import deItem from '../components/alert.vue'
import { findboard, board, error } from '../models/board'
import { findBoard } from '../models/list'
import { getTask, usersTask } from '../models/task'
import { user } from '../models/auth'
export default defineComponent({
  name: 'home',
  components: {
    create: addboard,
    edit: editboard,
    hazf: deItem
  },
  data: () => ({
    user: {},
    openD: false,
    openC: false,
    openE: false,
    boards: {},
    dboard: {},
    eboard: {}
  }),
  created () {
    findboard()
      .then(() => {
        if (error.value) {
          console.log(error.value)
          alert('board not found')
        } else {
          this.boards = board.value
        }
      })
    this.user = user.value
  },
  methods: {
    pak (board: {}) {
      this.dboard = board
      this.openD = true
    },
    closeAlert (close: boolean) {
      this.openD = close
    },
    virayesh (board: {}) {
      this.eboard = board
      this.openE = true
    },
    eClose (close: boolean) {
      this.openE = close
    },
    aClose (close: boolean) {
      this.openC = close
    },
    list (board: any) {
      findBoard(board._id).then(() => {
        getTask(board._id).then(() => {
          this.$router.push('/' + board.name)
        })
      })
    },
    myTask () {
      usersTask().then(() => {
        this.$router.push('/myTask')
      })
    },
    LogOut () {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    }
  }
})
</script>
