import $axios from '../common/Http'  //导入封装好的axios

//添加角色
export function roleAdd(data) {
    return $axios.post('/roleadd', data)
}
//获取角色列表
export async function roleList() {
    let res = await $axios.get('/rolelist')
    if (res.code == 200 && res.list) {
        return res.list   
    } else {
        return []
    }
}
// 修改角色列表
export function roleEdit(data) {
    return $axios.post('/roleedit', data)
}
// 删除角色
// @param {*} id需要删除的id
export function roleDel(id) {
    return $axios.post('/roledelete', { id })
}