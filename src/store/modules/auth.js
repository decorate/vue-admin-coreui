import axios from 'axios'
import Cookies from 'js-cookie'
import {action, getter} from '../types'
import User from '~/models/User'
import Admin from '~/models/Admin'


const TOKEN_NAME = 'admin_token'

// state
export const state = {
    user: new Admin(),
    token: Cookies.get(TOKEN_NAME),
}

// getters
export const getters = {
    [getter.ADMIN_USER]: state => state.user,
    [getter.ADMIN_TOKEN]: state => state.token,
    [getter.ADMIN_CHECK]: state => state.user.id !== 0,
}

// mutations
export const mutations = {
    [action.ADMIN_SAVE_TOKEN] (state, data) {
        state.token = data.token
        Cookies.set(TOKEN_NAME, data.token, { expires: 365 })
    },

    [action.FETCH_ADMIN_USER_SUCCESS] (state, { user }) {
        state.user = new Admin(user)
    },

    [action.FETCH_ADMIN_USER_FAILURE] (state) {
        state.token = null
        Cookies.remove(TOKEN_NAME)
    },

    [action.ADMIN_LOGOUT] (state) {
        state.user = new Admin()
        state.token = null

        Cookies.remove(TOKEN_NAME)
    },

    [action.ADMIN_UPDATE_USER] (state, { user }) {
        state.user = new Admin(user)
    },

}

// actions
export const actions = {
    [action.ADMIN_SAVE_TOKEN] ({ commit, dispatch }, payload) {
        commit(action.ADMIN_SAVE_TOKEN, payload)
    },

    async [action.FETCH_ADMIN_USER] ({ commit }) {
        const { data } = await axios.get('/admin/user')

        commit(action.FETCH_ADMIN_USER_SUCCESS, { user: data })
    },

    [action.ADMIN_UPDATE_USER] ({ commit }, payload) {
        commit(action.ADMIN_UPDATE_USER, payload)
    },

    async [action.ADMIN_LOGOUT] ({ commit }) {
        try {
            await axios.post('/admin/logout')
        } catch (e) { }

        commit(action.ADMIN_LOGOUT)
    },

}

export default {
    state,
    mutations,
    actions,
    getters
}
