import { menuList } from '../../request/menu'

export default {
    namespaced: true,
    state: {
        menuList: []  //菜单列表
    },
    getters: {
        menuList: state => state.menuList
    },
    mutations: {
        getMenuList(state, data) {
            state.menuList = data
        }
    },
    actions: {
        async get_menu_list({ commit }) {
            let res = await menuList();
            commit('getMenuList', res)
        }
    }
}