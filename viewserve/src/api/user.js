import { requestWithoutLoading } from '@/utils'

/**
 * 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户详情
 * 必选参数 : uid : 用户 id
 * 接口地址 : /user/detail
 * @param uid
 * @returns {*}
 */
export const getUserDetail = (uid) => requestWithoutLoading.get("/user/detail", { params: { uid } })


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
export const getUserPlaylist = (uid) => requestWithoutLoading.get("/user/playlist", { params: { uid, limit: PLAYLIST_LIMIT } })