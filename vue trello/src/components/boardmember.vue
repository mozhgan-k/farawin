<template>
  <div id="board-members">
    <div class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Board Members</h4>
          </div>
          <div class="modal-body">
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
    .modal-header{
      display: flex;
      align-items: center;
      justify-content: center;
      padding-bottom: .5rem;
      background-color: #f0eae8;
       .modal-title {
        color: var(--dark-color);
        padding: 6px;
      }
    }
    .modal-body {
    position: relative;
    padding: 1rem;
    display: flex;
    justify-content: center;
    }
    .modal-footer{
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #f0eae8;
    padding-top: .5rem;
    border-top: 1px solid #dee2e6;
    }
    .add-btn {
    padding: 0.3rem 0.75rem;
    font-size: 1rem;
    line-height: 2;
    margin-left: 10px;
    border: none;
    outline: none;
    cursor: pointer;
    background-color: #735d78;
    color: #f4f4f4;
    &:focus {
     outline: 0;
    }
   &:hover {
    opacity: .8;
  }
 }
  .form-inline {
  display: flex;
  align-items: center;
  .form-group {
  display: flex;
  align-items: center;
    }
 .form-control {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 9px;
  border: none;
   }
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
  .modal-dialog{
    width: fit-content;
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
