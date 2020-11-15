import { readonly, ref } from 'vue'
import { post, get, remove, update } from '../utils/http'
import { user } from './auth'

const _task = ref()
const _err = ref('')
const _taskUser = ref()

function check (task: any) {
  if (!task.desc) {
    _err.value = 'Missing description'
  }
  if (task.desc.length <= 6) {
        _err.value = 'Description must be more tham 6 letters'
  }
}

export async function getTask (boardId: any) {
  const taskval = await get(`/task/${boardId}`)
  _task.value = taskval
}

export async function usersTask () {
  const member = user.value
  const tasks = await get(`/tasks/${member.username}`)
  _taskUser.value = tasks
}

export async function insertTask (task: any) {
  const taskcont = await post('/task', task)
  _err.value = ''
  check(task)
  if (_err.value.length > 1) {
    return
  }
  if (taskcont.success === false) {
    _err.value = taskcont.error
  } else {
    const boardId = task.boardId
    const newTasks = await get(`/task/${boardId}`)
    if (newTasks.success === false) {
      _err.value = newTasks.error
    } else {
      const newTask = newTasks.pop()
      _task.value.push(newTask)
    }
  }
}
export async function updateTask (oldTask: {}, task: {}) {
  const editTask = await update('/task', task)
  _err.value = ''
  check(task)
  if (_err.value.length > 1) {
    return
  }
  if (editTask.success === false) {
    _err.value = editTask.error
  } else {
    const virayesh = _task.value.indexOf(oldTask)
    _task.value[virayesh] = task
  }
}
export async function removeTask (task: {}) {
  const hazfTask = await remove('/task', task)
  _err.value = ''
  if (hazfTask.success === false) {
    _err.value = hazfTask.error
  } else {
    const tasks = _task.value.indexOf(task)
    _task.value.splice(tasks, 1)
  }
}

export const task = readonly(_task)
export const error = readonly(_err)
export const taskUser = readonly(_taskUser)
