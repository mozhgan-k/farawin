export function request (method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, data?: any) {
  return new Promise<any>((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.setRequestHeader('content-type', 'application/json')
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken != null) {
      xhr.setRequestHeader('access_token', accessToken)
    }
    xhr.onload = async () => {
      try {
        const resp = xhr.responseText
        if (xhr.status === 403) {
          const result = await request('POST', '/refresh-token', localStorage.getItem('refreshToken'))
          localStorage.setItem('accessToken', JSON.stringify(result.access_token))
          localStorage.setItem('refreshToken', JSON.stringify(result.refresh_token))
          return request(method, url, data)
        }
        resolve(JSON.parse(resp))
      } catch (err) {
        reject(err)
      }
    }
    xhr.onerror = reject
    xhr.send(JSON.stringify(data))
  })
}

export function post (url: string, data: any) {
  return request('POST', url, data)
}
export function get (url: string) {
  return request('GET', url)
}
export function update (url: string, data: any) {
  return request('PUT', url, data)
}
export function remove (url: string, data: any) {
  return request('DELETE', url, data)
}
