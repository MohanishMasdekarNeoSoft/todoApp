import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks:[],
    token:localStorage.getItem('token') || '',
    user:localStorage.getItem('user')
  },
  mutations: {
    createTask(state,task){
      state.tasks.push(task);
    },
    assignToken(state,token){
      state.token = token;
    },
    assignUser(state,type){
      state.user = type;
    }
  },
  actions: {
    createTask({ commit, state }, task){
      commit('createTask',task)
    },
    assignToken({ commit, state }, token){
      commit('assignToken',token)
    },
    assignUser({ commit, state }, type){
      commit('assignUser',type)
    }
  },
  modules: {
  }
})
