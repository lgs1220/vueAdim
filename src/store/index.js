import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import menu from './modules/menu'
import role from './modules/role'
import user from './modules/user'
let store = new Vuex.Store({
    state: {
        isCollapse: true  //是否折叠,默认不折叠
    },
    getters: {

    },
    mutations: {
        Toggle(state) {
            state.isCollapse = !state.isCollapse
        }
    },
    actions: {

    },
    modules: {
        menu,
        role,
        user
    }
})

export default store