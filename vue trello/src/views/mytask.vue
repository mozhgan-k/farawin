<template>
  <div>
     <div class="bg-gray-900 p-4 w-full sticky top-0">
      <ul class="flex text-white justify-around">
        <li><a class="font-semibold hover:text-purple-400" v-text="user.username"></a></li>
        <li><router-link to="/"><i class="fa fa-th text-lg hover:text-purple-400"></i></router-link></li>
        <li><router-link to="/login"><i class="fa fa-power-off text-lg hover:text-purple-400"></i></router-link></li>
      </ul>
    </div>
    <div class="flex justify-center items-center">
        <table class="table-auto mt-12 mb-4 bg-white text-blue-900 border-2 border-white border-solid">
            <thead class="bg-purple-800 text-white">
                <th class="px-4 py-2 border-t border-solid border-purple-300 align-top">My Tasks</th>
            </thead>
            <tbody class="border-2 border-solid border-white bg-purple-100">
                <tr class="px-4 py-2 border-t border-solid border-purple-300 align-top" v-for='task in tasks' :key="task">
                    <td class="p-3 hover:bg-purple-200"><a @click="openTask=true" v-text="task.desc"></a></td>
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
  .table {
  width: 450px;
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
