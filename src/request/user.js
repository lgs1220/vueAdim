import $axios from '../common/Http'  //导入封装好的axios


//获取管理员列表
export async function userList(size = 10, page = 1) {
    let res = await $axios.get('/userlist', {
        params: {
            size,
            page
        }
    })
    if (res.code == 200 && res.list) {
        return res.list
    } else {
        return []
    }
}
// 修改管理员列表
export function userEdit(data) {
    return $axios.post('/useredit', data)
}
//添加管理员
export function userAdd(data) {
    return $axios.post('/useradd', data)
}
// 删除管理员
// @param {*} id需要删除的id
export function userDel(uid) {
    return $axios.post('/userdelete', { uid })
}