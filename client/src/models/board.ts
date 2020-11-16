import { readonly, ref } from 'vue'
import { post, get, remove, update } from '../utils/http'

const _board = ref()
const _err = ref('')
const _success = ref(false)

function check (board: any) {
  if (!board.name) {
    _err.value = 'Missing name'
  }
  if (board.name.length <= 3) {
    _err.value = 'Name must be more than 3 letters'
  }
  if (!board.desc || board.desc.length < 8) {
    _err.value = 'Description must be more than 8 letters'
  }
}

export async function findboard () {
  await get('/board').then(res => {
    if (res.success === false) {
      _err.value = res.error
    } else {
      _board.value = res.board
    }
  })
}

export async function insertboard (board: {}) {
  await post('/board', board).then(res => {
    _err.value = ''
    check(board)
    if (_err.value.length > 1) {
      return
    }
    if (res.success === false) {
      _err.value = res.error
    } else {
      get('/board').then(res => {
        if (res.success === false) {
          _err.value = res.error
        } else {
          const newboard = res.board.pop()
          _board.value.push(newboard)
        }
      })
    }
  })
}

export async function removeboard (board: {}) {
  const hazf = await remove('/board', board)
  _err.value = ''
  if (hazf.success === false) {
    _err.value = hazf.error
  } else {
    const flan = _board.value.indexOf(board)
    _board.value.splice(flan, 1)
  }
}

export async function updateboard (oldboard: {}, board: {}) {
  const edit = await update('/board', board)
  _err.value = ''
  check(board)
  if (_err.value.length > 1) {
    return
  }
  if (edit.success === false) {
    _err.value = edit.error
  } else {
    const vir = _board.value.indexOf(oldboard)
    _board.value[vir] = board
  }
}

export const error = readonly(_err)
export const board = readonly(_board)
export const success = readonly(_success)
