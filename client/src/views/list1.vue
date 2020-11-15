<template>
<div>
 <div class="bg-gray-900 p-4 w-full sticky top-0">
     <ul class="flex text-white justify-around">
       <li><router-link to="/"><i class="fa fa-arrow-left text-lg hover:text-purple-400"></i></router-link></li>
       <li><a class="font-semibold hover:text-purple-400" v-text="user.username"></a>
        <div class="drop-down relative inline-block">
          <i class="fa fa-caret-down ml-1 text-white cursor-pointer hover:text-purple-400" @click="show = !show"></i>
          <div v-if="show" class="content absolute bg-gray-900 float-left rounded-md">
            <router-link to="/member-setting" class="block rounded-md ml-1 p-3 text-white hover:bg-purple-800 text-white"><i class="fa fa-cog mr-1 text-base"></i>Setting</router-link>
          </div>
        </div>
       </li>
       <li><a class="hover:text-purple-400" @click="openList=true"><i class="fa fa-plus text-lg"></i></a></li>
       <li><a @click="openM=true"><i class="fa fa-users text-lg hover:text-purple-400"></i></a></li>
     </ul>
 </div>
      <div class="m-container">
        <div v-for="lists in listsBoard" :key="lists._id">
          <ul class="todo bg-purple-200 m-6 text-purple-800 rounded-md h-auto">
            <li class="text-base m-1 p-1">
              <span v-text="lists.name" class="inline-block text-lg font-semibold p-2"></span>
              <div class="block float-right p-2">
              <a @click="virayesh(lists)"><i class="fas fa-pencil-alt text-base mr-2 text-green-700"></i></a>
              <a @click="pak(lists)"><i class="fas fa-trash-alt text-base text-red-700"></i></a>
              </div>
            </li>
            <div v-for="task in tasks" :key="task._id">
            <div v-if="task.listId == lists._id">
            <li class="bg-white text-blue-900 m-3 p-3 rounded cursor-pointer" @click="change(task)">
              <div v-text="task.desc"></div>
            </li>
            </div>
            </div>
            <li><a class="p-1 text-base ml-2 font-semibold text-pink-900 hover:text-purple-600" type="button" @click="addCard(lists)"> Add Card </a></li>
          </ul>
       </div>
      </div>
    <div class="overlay" v-if="openList" @click.self="openList=false">
       <add-list v-if="openList" @aclose = 'aclose'/>
     </div>
     <div class="overlay" v-if="openCard" @click.self="openCard=false">
       <add-card v-if="openCard" :listID= 'listID' @add= 'add'/>
     </div>
     <div class="overlay" v-if="openTask" @click.self="openTask=false">
       <task-details v-if="openTask" :editTask="editTask" @taskclose= "taskclose" @anqezi = 'anqezi'/>
     </div>
     <div class="overlay" v-if="openEdit" @click.self="openEdit=false">
       <edit-list v-if="openEdit" :eList="eList" @eclose = 'eclose'/>
     </div>
     <div class="overlay" v-if="openM" @click.self="openM=false">
       <members v-if="openM"/>
     </div>
     <div class="overlay" v-if="openD" @click.self="openD=false">
       <hazf v-if="openD" :dList = 'dList' @dclose = 'dclose'/>
     </div>
  </div>
</template>
<style scoped>
h1,h2,h3,h4,h5,h6{
    margin: 0;
}
@media(max-width:768px){
  .todo{
      width: 300px;
  }
}
</style>
<script lang="ts">
import { defineComponent } from 'vue'
import addlist from '../components/addlist.vue'
import addcard from '../components/addcard.vue'
import details from '../components/task details.vue'
import editlist from '../components/editlist.vue'
import members from '../components/boardmember.vue'
import alert from '../components/deletlist.vue'
import { board, list } from '../models/list'
import { getTask, insertTask, task } from '../models/task'
import { user } from '../models/auth'
export default defineComponent({
  name: 'navber',
  components: {
    addList: addlist,
    addCard: addcard,
    taskDetails: details,
    editList: editlist,
    members: members,
    hazf: alert
  },
  data: () => ({
    openList: false,
    openCard: false,
    openTask: false,
    openEdit: false,
    openM: false,
    openD: false,
    dList: {},
    eList: {},
    listsBoard: {},
    tasks: {},
    listID: {},
    editTask: {},
    user: {},
    show: false
  }),
  created () {
    this.listsBoard = list.value
    this.tasks = task
    this.user = user.value
  },
  methods: {
    pak (lists: {}) {
      this.dList = lists
      this.openD = true
    },
    virayesh (lists: {}) {
      this.eList = lists
      this.openEdit = true
    },
    eclose (eclose: boolean) {
      this.openEdit = eclose
    },
    dclose (dclose: boolean) {
      this.openD = dclose
    },
    aclose (aclose: boolean) {
      this.openList = aclose
    },
    addCard (acard: {}) {
      this.listID = acard
      this.openCard = true
    },
    add (close: boolean) {
      this.openCard = close
    },
    change (task: {}) {
      this.editTask = task
      this.openTask = true
    },
    taskclose (etask: boolean) {
      this.openTask = etask
    },
    anqezi (anqezi: boolean) {
      this.openTask = anqezi
    }
  }
})
</script>
