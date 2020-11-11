import { readonly, ref } from 'vue'
import { post, get, update, remove } from '../utils/http'

const _user = ref()
const _err = ref('')
const _token = ref('')
const _users = ref()
const _register = ref(false)

export async function finduser (user: {}) {
  _err.value = ''
  await post('/login', user).then(res => {
    if (res.success === false) {
      _err.value = res.error
    } else {
      _user.value = res.member
      localStorage.setItem('accessToken', JSON.stringify(res.access_token))
      localStorage.setItem('refreshToken', JSON.stringify(res.refresh_token))
    }
  })
}

export async function findAllUser () {
  await get('/user').then(res => {
    _err.value = ''
    if (res.success === false) {
      _err.value = res.error
    } else {
      _users.value = res
    }
  })
}

export async function updateuser (oldUser: {}, users: {}) {
  const edit = await update('/user', users)
  _err.value = ''
  if (edit.success === false) {
    _err.value = edit.error
  } else {
    const vir = _users.value.indexOf(oldUser)
    _users.value[vir] = users
  }
}

export async function removeUser (user: {}) {
  const hazf = await remove('/user', user)
  if (hazf.success === false) {
    _err.value = hazf.error
  } else {
    const flan = _users.value.indexOf(user)
    _users.value.splice(flan, 1)
  }
}

export async function insertUser (user: {}) {
  const addMember = await post('/register', user)
  _err.value = ''
  if (addMember.success === false) {
    _err.value = addMember.error
  } else {
    _register.value = true
  }
}

export async function addUser (member: {}) {
  const add = await post('/register', member)
  _err.value = ''
  if (add.success === false) {
    _err.value = add.error
  } else {
    _register.value = true
    get('/user').then(res => {
      if (res.success === false) {
        _err.value = res.error
      } else {
        const newUser = res.pop()
        _users.value.push(newUser)
      }
    })
  }
}

export const user = readonly(_user)
export const error = readonly(_err)
export const users = readonly(_users)
export const register = readonly(_register)
