import { userList } from '../../request/user'

export default {
    namespaced: true,
    state: {
        userList: [], //管理员列表
        page: 1,
        size: 10
    },
    getters: {
        userList: state => state.userList,
        page: state => state.page,
        size: state => state.size
    },
    mutations: {
        getUserList(state, data) {
            state.userList = data
        },
        setPage(state, data) {
            state.page = data
        },
        setSize(state, data) {
            state.size = data
        } 
    },
    actions: {
        async get_user_list({ commit, state }) {
            let res = await userList(state.sizes, state.page);
            commit('getUserList', res)
        },
        set_page() {

        },
        set_size() {

        }
    }
}