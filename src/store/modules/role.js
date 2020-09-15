import { roleList } from '../../request/role'

export default {
    namespaced: true,
    state: {
        roleList: []  //角色列表
    },
    getters: {
        roleList: state => state.roleList
    },
    mutations: {
        getRoleList(state, data) {
            state.roleList = data
        }
    },
    actions: {
        async get_role_list({ commit }) {
            let res = await roleList();
            commit('getRoleList', res)
        }
    }
}