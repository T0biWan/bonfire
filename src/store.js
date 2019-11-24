import Vue from 'vue'
import Vuex from 'vuex'

import souls from '@/api/souls'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    souls: souls.module
  }
})
