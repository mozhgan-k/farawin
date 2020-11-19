import { readonly, ref } from 'vue'
import { post, get, update, remove } from '../utils/http'

const _user = ref()
const _err = ref('')
const _token = ref('')
const _users = ref()
const _register = ref(false)

function check (user: any) {
  if (!user.username) {
    _err.value = 'Missing username'
  }
  if (user.username.length < 3) {
    _err.value = 'Username must be more than 3 letters'
  }
  if (user.pass.length < 8) {
    _err.value = 'Password must be more than 8 letters'
  }
  if (!user.email) {
    _err.value = 'Invalid email'
  }
}

export async function finduser (user: any) {
  _err.value = ''
  if (!user.username) {
    _err.value = 'Missing username'
    return
  }
  if (user.username.length < 3) {
    _err.value = 'Username must be more than 3 letters'
    return
  }
  if (!user.pass || user.pass.length < 8) {
    _err.value = 'Password must be more than 8 letters'
    return
  }
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
  _err.value = ''
  check(users)
  if (_err.value.length > 1) {
    return
  }
  const edit = await update('/user', users)
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
  _err.value = ''
  check(user)
  if (_err.value.length > 1) {
    return
  }
  const addMember = await post('/register', user)
  if (addMember.success === false) {
    _err.value = addMember.error
  } else {
    _register.value = true
  }
}

export async function addUser (member: {}) {
  _err.value = ''
  check(member)
  if (_err.value.length > 1) {
    return
  }
  const add = await post('/register', member)
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

export async function checkUser () {
  const person = await get('/person')
  if (person.error) {
    _err.value = person.error
    return
  }
  _user.value = person
}

export const user = readonly(_user)
export const error = readonly(_err)
export const users = readonly(_users)
export const register = readonly(_register)
