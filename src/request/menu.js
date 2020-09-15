import $axios from '../common/Http'  //导入封装好的axios

//添加菜单
export function menuAdd(data) {
    return $axios.post('/menuadd', data)
}
//获取菜单列表
export async function menuList() {
    let res = await $axios.get('/menulist?istree=1')
    if (res.code == 200 && res.list) {
        return res.list
    } else {
        return []
    }
}
// 修改菜单列表
export function menuEdit(data) {
    return $axios.post('/menuedit', data)
}
// 删除菜单
// @param {*} id需要删除的id
export function menuDel(id) {
    return $axios.post('/menudelete', { id })
}