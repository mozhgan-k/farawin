<template>
<div>
 <div id="navbar">
     <ul class="nav-list">
       <li><router-link to="/" class="hover"><i class="fa fa-arrow-left"></i>
       <span class="back">Back</span></router-link></li>
       <li><a style="font-weight:bold;color:#eddcd2" v-text="user.username"></a></li>
       <li><a class="creat" @click="openList=true"><i class="fa fa-plus"></i></a></li>
       <li><a @click="openM=true"><i class="fa fa-users"></i></a></li>
     </ul>
 </div>
      <div class="m-container">
        <div v-for="lists in listsBoard" :key="lists._id">
          <ul class="todo">
            <li style="font-size:18px;margin:4px;padding:4px;">
              <span v-text="lists.name" style="display:inline-block"></span>
              <div style="display: block; float: right">
              <a @click="virayesh(lists)"><i class="fas fa-pencil-alt" style="color:#40916c;margin-right:10px;"></i></a>
              <a @click="pak(lists)"><i class="fas fa-trash-alt" style="color:#d00000"></i></a>
              </div>
            </li>
            <div v-for="task in tasks" :key="task._id">
            <div v-if="task.listId == lists._id">
            <li class="todo-item1" @click="change(task)">
              <div v-text="task.desc"></div>
            </li>
            </div>
            </div>
            <li><a class="btn-add" type="button" @click="addCard(lists)"> Add Card </a></li>
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
  .fa-arrow-left{
    font-size: 16px;
    color:#f4f4f4;
}
.fa-arrow-left:hover{
    color:#ddbea9 ;
}
.back{
    color:#f4f4f4;
    margin:4px;
    font-weight: bold;
}
.back:hover{
    color:#ddbea9 ;
}
.edit{
    font-size: 14px;
}
.todo{
    background-color: #eee4e1;
    margin: 30px;
    color: #997b66;
    padding: 5px;
    border-radius: 5px;
    height: fit-content;
}
    .todo-item1{
        background-color: #ffffff;
        color: #303952;
        margin:10px;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
    }
    .todo-item2{
        background-color: #ffffff;
        color: #303952;
        margin-left:10px;
        margin-right:10px;
        margin-bottom: 10px;
        padding: 10px;
        border-radius: 5px;
    }
    .btn-add{
        padding: 3px;
        font-size: 15px;
        margin-left: 8px;
        font-weight: bold;
    }
    .m-container a:hover{
        color:#3c096c;
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
    user: {}
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
