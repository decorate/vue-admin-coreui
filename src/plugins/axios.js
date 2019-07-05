import axios from 'axios'
import store from '../store'
import { getter, action } from '../store/types'

//apiトークンの設定
axios.interceptors.request.use(request => {

    if (store.getters[getter.ADMIN_TOKEN]) {
        const token = store.getters[getter.ADMIN_TOKEN]
        request.headers.common['Authorization'] = `Bearer ${token}`
    }

    return request
})

axios.interceptors.response.use(undefined, err => {
    let res = err.response;
    if (res.status === 401) {
        store.dispatch(action.AUTH_CLEAR)
        location.reload()
    }
    return Promise.reject(err)
})
