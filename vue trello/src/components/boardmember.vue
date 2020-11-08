<template>
  <div>
    <div class="modal h-full outline-none transition-all duration-700">
      <div class="flex justify-center relative w-auto m-2">
        <div class="relative flex flex-col w-4/5 bg-white border border-solid border-gray-300 rounded-md">
          <div class="flex items-center justify-center p-3 bg-purple-200 border-b border-solid border-purple-300">
            <h4 class="text-purple-900">Board Members</h4>
          </div>
          <div class="relative p-4 bg-purple-100">
            <table class="table">
              <thead class="h-table">
                <th>Members</th>
              </thead>
              <tbody class="t-body">
                <tr v-for="task in tasks" v-bind:key="task._id">
                  <td class="edit">
                    <a v-text="task.user"></a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
h4{
    margin: 0;
}
  .table {
  width: 75%;
  margin-bottom: 1rem;
  color: #212529;
  background-color: #f4f4f4;
  th, td {
  padding: 10px;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}
  thead th {
  vertical-align: bottom;
  border: 2px solid #dee2e6;
  }
  .t-body {
  border: 2px solid #dee2e6;
  background-color: #f7e5ef;
  td:hover {
  background-color: #ffc6ff;
 }
 }
.h-table {
  color: #f4f4f4;
  background-color: #735d78;
  }
  }
@media (max-width: 768px) {
  .table {
    width: 95%;
  }
  .members{
    width: 90%;
  }
}
</style>
<script lang="ts">
import { defineComponent } from 'vue'
import { task } from '../models/task'
import { user } from '../models/auth'
import { board, list } from '../models/list'
export default defineComponent({
  name: 'members',
  data: () => ({
    listsBoard: {},
    tasks: {},
    user: {},
    users: {}
  }),
  created () {
    this.listsBoard = list.value
    this.tasks = task
  }
})
</script>
