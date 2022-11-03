import { request, requestWithoutLoading } from '@/utils'



/**
 * 说明 : 调用此接口 , 可获取网友精选碟歌单
 * 可选参数 : order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
 * cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
 * limit: 取出歌单数量 , 默认为 50
 * offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
 * 接口地址 : /top/playlist
 * @param params
 * @returns {*}
 */
export const getPlaylists = (params) => request.get('/top/playlist', { params })

/**
 * 说明 : 调用此接口 , 可获取精品歌单
 * 可选参数 : cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从精品歌单标签列表接口获取(/playlist/highquality/tags)
 * limit: 取出歌单数量 , 默认为 50
 * before: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
 * 接口地址 : /top/playlist/highquality
 * @param params
 * @returns {*}
 */
export const getTopPlaylists = (params) => request.get('/top/playlist/highquality', { params })

/**
 * TODO:使用推荐系统推荐--->相似歌单
 * 获取相似歌单
 * 说明 : 调用此接口 , 传入歌曲 id, 可获得相似歌单
 * 必选参数 : id: 歌曲 id
 * 接口地址 : /simi/playlist
 * @param id
 * @param option
 * @returns {*}
 */
export const getSimiPlaylists = (id, option) => requestWithoutLoading.get(`/simi/playlist?id=${id}`, option)