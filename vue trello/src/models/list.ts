import { readonly, ref } from 'vue'
import { post, get, remove, update } from '../utils/http'
const _board = ref()
const _err = ref('')
const _list = ref()

export async function findBoard (id: {}) {
  await get(`/list/${id}`).then(res => {
    if (res.success === false) {
      _err.value = res.error
    } else {
      _board.value = res.board
      _list.value = res.list
    }
  })
}

export async function insertList (list: any) {
  await post('/list', list).then(res => {
    _err.value = ''
    if (res.success === false) {
      _err.value = res.error
    } else {
      const boardId = list.boardId
      get(`/list/${boardId}`).then(res => {
        if (res.success === false) {
          _err.value = res.error
        } else {
          const newList = res.list.pop()
          _list.value.push(newList)
        }
      })
    }
  })
}

export async function updateList (oldList: {}, list: {}) {
  const editList = await update('/list', list)
  _err.value = ''
  if (editList.success === false) {
    _err.value = editList.error
  } else {
    const vir = _list.value.indexOf(oldList)
    _list.value[vir] = list
  }
}

export async function removeList (list: {}) {
  const hazfList = await remove('/list', list)
  _err.value = ''
  if (hazfList.success === false) {
    _err.value = hazfList.error
  } else {
    const flani = _list.value.indexOf(list)
    _list.value.splice(flani, 1)
  }
}
export const error = readonly(_err)
export const board = readonly(_board)
export const list = readonly(_list)
