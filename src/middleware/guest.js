import store from '../store'
import {getter} from '../store/types'

export default (to, from, next) => {
  if (store.getters[getter.ADMIN_TOKEN]) {
    next({ name: 'home' })
  } else {
    next()
  }
}
