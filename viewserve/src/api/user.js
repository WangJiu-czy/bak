import {request, requestWithoutLoading} from '@/utils'

/**
 * 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户详情
 * 必选参数 : uid : 用户 id
 * 接口地址 : /user/detail
 * @param uid
 * @returns {*}
 */
export const getUserDetail = (uid) => requestWithoutLoading.get("/user/detail", {params: {uid}})


/**
 * TODO:为训练模型提供用户数据
 * 获取用户歌单
 * 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户歌单
 * 必选参数 : uid : 用户 id
 * 可选参数 :
 * limit : 返回数量 , 默认为 30
 * offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * @param uid
 * @returns {*}
 */
const PLAYLIST_LIMIT = 1000
export const getUserPlaylist = (uid) => requestWithoutLoading.get("/user/playlist", {
    params: {
        uid,
        limit: PLAYLIST_LIMIT
    }
})

export const getLoginImg = async () => {
    const keydata = await request.get("/login/qr/key", {params: {"timestamp": new Date().getTime()}})

    if (keydata.data.code == 200) {

        const key = keydata.data.unikey
        const imgurl = await request.get("/login/qr/create", {
            params: {
                key,
                "timestamp": new Date().getTime(),
                qrimg: true
            }
        })

        const url = imgurl.data.qrimg
        return {key, url}
    }

}
export const checkKey=(key)=>request.get("/login/qr/check",{params:{key,"timestamp": new Date().getTime()}})
export const phoneLogin = (phone, password) => request.get("/login/cellphone", {
    params: {
        phone,
        password,
        timestamp: new Date().getTime(),
    }
})

export const loginStatus=()=>request.get("/login/status")