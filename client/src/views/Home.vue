<template>
  <div>
    <div class="bg-gray-900 p-4 w-full sticky top-0">
     <ul class="flex text-white justify-around">
       <li><a class="font-semibold hover:text-purple-400" v-text="user.username"></a>
        <div class="drop-down relative inline-block">
          <i class="fa fa-caret-down ml-1 text-white cursor-pointer hover:text-purple-400" @click="show = !show"></i>
          <div v-if="show" class="content absolute bg-gray-900 float-left rounded-md">
            <router-link to="/member-setting" class="block ml-1 rounded-md p-3 text-white hover:bg-purple-800 text-white"><i class="fa fa-cog mr-1 text-base"></i>Setting</router-link>
          </div>
        </div>
       </li>
       <li><a @click="myTask()" class="hover:text-purple-400"><i class="fa fa-list-alt text-xl"></i></a></li>
       <li><a @click="openC=true" type="button" class="hover:text-purple-400"><i class="fa fa-plus text-xl"></i></a></li>
       <router-link v-if="user.role == 'admin'" to="/members"><i class="fa fa-users text-xl hover:text-purple-400"></i></router-link>
       <router-link to="/login" @click="LogOut()"><i class="fa fa-power-off text-xl hover:text-purple-400"></i></router-link>
     </ul>
    </div>
  <section>
        <div class="m-container">
          <div v-show="error" class="flex items-center justify-center bg-red-700 rounded-md mt-8 mb-1 error">
          <p class="text-white" v-text="error"></p>
          </div>
          <div class="card font-semibold bg-pink-200 h-auto m-12 p-2 rounded-md" v-for="board in boards" :key="board._id">
            <a @click="list(board)">
              <h4 class="inline-block text-purple-900 text-lg" v-text="board.name"></h4>
            </a>
           <div class="float-right">
              <a @click="virayesh(board)"><i class="fas fa-pencil-alt text-base mr-2 text-green-700"></i></a>
              <a @click="pak(board)"><i class="fas fa-trash-alt text-base text-red-700"></i></a>
           </div>
            <div>
              <p class="flex flex-col mt-2 mb-2 bg-white text-blue-900 text-base p-2 rounded" v-text="board.desc"></p>
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
.card{
  width: 250px;
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
import { checkUser, user } from '../models/auth'
export default defineComponent({
  name: 'home',
  components: {
    create: addboard,
    edit: editboard,
    hazf: deItem
  },
  data: () => ({
    show: false,
    user: {},
    openD: false,
    openC: false,
    openE: false,
    boards: {},
    dboard: {},
    eboard: {},
    error: ''
  }),
  created () {
    checkUser().then(() => {
      this.user = user.value
    })
    findboard()
      .then(() => {
        if (error.value.length > 2) {
          this.error = error.value
        } else {
          this.boards = board.value
        }
      })
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
