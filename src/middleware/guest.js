import store from '../store'
import {getter} from '../store/types'

export default (to, from, next) => {
    console.log(store.getters[getter.ADMIN_USER])
  if (store.getters[getter.ADMIN_CHECK]) {
    next({ name: 'home' })
  } else {
    next()
  }
}
