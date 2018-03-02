import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/login'
import permission from './modules/permission'

import condition from './modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    condition
  },
  getters
})

export default store
