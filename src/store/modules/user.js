// eslint-disable-next-line
/* eslint-disable */
// import {getUser} from '@/api/user'
// import {getToken, setToken, removeToken} from '@/utils/auth'

const condition = {
  state: {
    right_show: false
  },

  mutations: {
    RIGHT_SHOW: (state, type) => {
      state.right_show = type
    }
  },

  actions: {
    // 获取用户列表
    rightShow({commit}, state) {
      return new Promise((resolve, reject) => {
        const data = state.right_show;
        commit('RIGHT_SHOW', data);
        resolve()
      })
    }
  }
}

export default condition
