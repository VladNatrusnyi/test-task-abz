import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    currentUsers: [],
    preloader: false,
    positionPreloader: false,
    allUsers: [],
    hideShowBtn: false,
    positions: [],
    currentToken: '',
    isUserRegistered: false,
    checkNumberAndEmail: false
  },
  mutations: {
    GET_USERS_FROM_API: (state, users) => {
      state.currentUsers = users
      state.allUsers.push(...state.currentUsers.users)
      if (state.currentUsers.total_users === state.allUsers.length) {
        state.hideShowBtn = true
      }
    },
    GET_POSITIONS_FROM_API: (state, positions) => {
      state.positions = positions
    },
    GET_NEW_TOKEN: (state, token) => {
      state.currentToken = token
    }
  },
  actions: {
    GET_USERS_FROM_API ({ commit, state }, payload) {
      state.preloader = true
      return axios(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${payload.page}&count=${payload.count}`, {
        method: 'GET'
      })
        .then((users) => {
          commit('GET_USERS_FROM_API', users.data)
          state.preloader = false
          return users
        })
        .catch((error) => {
          console.log(error)
          return error
        })
    },
    GET_POSITIONS_FROM_API ({ commit, state }) {
      state.positionPreloader = true
      return axios(' https://frontend-test-assignment-api.abz.agency/api/v1/positions', {
        method: 'GET'
      })
        .then((positions) => {
          commit('GET_POSITIONS_FROM_API', positions.data)
          if (positions.data.success) {
            state.positionPreloader = false
          }
          return positions
        })
        .catch((error) => {
          console.log(error)
          return error
        })
    },
    POST_NEW_USER ({ commit, state, dispatch }, userInfo) {
      const headers = {
        Token: state.currentToken.token,
        'Content-Type': 'multipart/form-data'
      }
      if (state.currentToken.success) {
        axios.post('https://frontend-test-assignment-api.abz.agency/api/v1/users', userInfo, {
          headers
        })
          .then(function (response) {
            console.log(response)
            if (response.data.success) {
              state.isUserRegistered = true
            }
            state.allUsers = []
            dispatch('GET_USERS_FROM_API', { page: 1, count: 6 })
            state.currentToken = ''
          })
          .catch(function (error) {
            console.log(error)
            if (error.response.status === 409) {
              state.checkNumberAndEmail = true
            }
          })
      }
    },
    GET_NEW_TOKEN ({ commit, state }) {
      return axios('https://frontend-test-assignment-api.abz.agency/api/v1/token', {
        method: 'GET'
      })
        .then((token) => {
          commit('GET_NEW_TOKEN', token.data)
          return token
        })
        .catch((error) => {
          console.log(error)
          return error
        })
    }
  },
  getters: {
    USERS (state) {
      return state.allUsers
    },
    PRELOADER (state) {
      return state.preloader
    },
    HIDE_SHOW_BTN (state) {
      return state.hideShowBtn
    },
    POSITIONS (state) {
      return state.positions
    },
    POSITION_PRELOADER (state) {
      return state.positionPreloader
    },
    IS_USER_REGISTERED (state) {
      return state.isUserRegistered
    },
    CHECK_NUMBER_AND_EMAIL (state) {
      return state.checkNumberAndEmail
    }
  }
})
