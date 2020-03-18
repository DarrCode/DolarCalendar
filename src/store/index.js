import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading:{
      title: '',
      estado: false,
      color: 'primary'
    }
  },
  mutations: {
    showLoad(state, playload){
      state.loading.title = playload.title;
      state.loading.estado = true;
      state.loading.color = playload.color;
    },
    hideLoad(state){
      state.loading.estado = false;
    }
  },
  actions: {
  },
  modules: {
  }
})
