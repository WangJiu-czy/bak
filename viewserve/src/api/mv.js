import { request } from '@/utils'

/**
 * 说明 : 调用此接口 , 传入 mvid ( 在搜索音乐的时候传 type=1004 获得 ) , 可获取对应 MV 数据 , 数据包含 mv 名字 , 歌手 , 发布时间 , mv 视频地址等数据 , 其中 mv 视频 网易做了防盗链处理 , 可能不能直接播放 , 需要播放的话需要调用 ' mv 地址' 接口
 * 必选参数 : mvid: mv 的 id
 * 接口地址 : /mv/detail
 * @param id
 * @returns {*}
 */
export const getMvDetail = id => request.get(`/mv/detail?mvid=${id}`)

/**
 * 说明 : 调用此接口 , 传入 mv id,可获取 mv 播放地址
 * 必选参数 : id: mv id
 * 可选参数 : r: 分辨率,默认 1080,可从 /mv/detail 接口获取分辨率列表
 * @param id
 * @returns {*}
 */
export const getMvUrl = id => request.get(`/mv/url?id=${id}`)

/**TODO:使用推荐系统推荐--->相似MV
 * 说明 : 调用此接口 , 传入 mvid 可获取相似 mv
 * 必选参数 : mvid: mv id
 * @param id
 * @returns {*}
 */
export const getSimiMv = id => request.get(`/simi/mv?mvid=${id}`)

/**
 * 说明 : 调用此接口 , 可获取全部 mv
 * 可选参数 :
 * area: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部 type: 类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部
 * order: 排序,可选值为上升最快,最热,最新,不填则为上升最快
 * limit: 取出数量 , 默认为 30
 * offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
 * 接口地址 : /mv/all
 * @param params
 * @returns {*}
 */
export const getAllMvs = (params) => request.get(`/mv/all`, {params}) 