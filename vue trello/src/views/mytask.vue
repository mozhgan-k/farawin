<template>
  <div>
     <div id="navbar">
      <ul class="nav-list">
        <li><a style="font-weight:bold;color:#eddcd2" v-text="user.username"></a></li>
        <li><router-link to="/"><i class="fa fa-th"></i></router-link></li>
        <li><router-link to="/login" class="icon"><i class="fa fa-power-off"></i></router-link></li>
      </ul>
    </div>
    <div id="myTask">
        <table class="table">
            <thead class="h-table">
                <th>Tasks</th>
            </thead>
            <tbody class="t-body">
                <tr v-for='task in tasks' :key="task">
                    <td><a @click="openTask=true" v-text="task.desc"></a></td>
                </tr>
            </tbody>
        </table>
      </div>
      <div class="overlay" v-if="openTask" @click.self="openTask=false">
       <task v-if="openTask"/>
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
   position: relative;
 }
 .nav-list a:hover{
   color: #ddbea9;
 }
 .fa-th{
    color: #f4f4f4;
 }
 .fa-list-alt{
   color: #f4f4f4;
 }
 .fa-th:hover{
    color: #ddbea9;
 }
 .fa-list-alt:hover{
   color: #ddbea9;
 }
 .icon{
   color: #a5a58d;
 }
 #myTask{
  display: flex;
  justify-content: center;
  align-items: center;
  }
  .table {
  margin-top: 3rem;
  width: 450px;
  margin-bottom: 1rem;
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

.t-body{
    border: 2px solid #dee2e6;
    background-color: #f7e5ef;
}

.h-table{
    color: #f4f4f4;
    background-color: #735d78;
}

.t-body tr:hover{
    background-color: #b392ac;
}
@media(max-width:768px) {
 .table{
    width: 90%;
    overflow-x: auto;
 }
}
</style>
<script lang="ts">
import { defineComponent } from 'vue'
import details from '../components/task details.vue'
import { taskUser } from '../models/task'
import { user } from '../models/auth'
export default defineComponent({
  name: 'detail',
  components: {
    task: details
  },
  data: () => ({
    openTask: false,
    tasks: {},
    user: {}
  }),
  created () {
    this.tasks = taskUser.value
    this.user = user.value
  }
})
</script>
