import store from '~/store'
import {getter, action} from '../store/types'

export default async (to, from, next) => {
  if (!store.getters[getter.ADMIN_CHECK] && store.getters[getter.ADMIN_TOKEN]) {
    try {
      await store.dispatch(action.FETCH_ADMIN_USER)
    } catch (e) {
        store.dispatch(action.ADMIN_LOGOUT)
    }
  }

  next()
}
