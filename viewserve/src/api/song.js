import { request, requestWithoutLoading } from '@/utils'

/**
 * 获取音乐url,可能会有403问题
 * 必选参数 : id : 音乐 id
 * 可选参数 : br: 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
 * 接口地址 : /song/url
 * @param id
 * @returns {*}
 */
export const getSongUrl = id => request.get(`/song/url?id=${id}`)

/**
 * 说明 : 调用此接口 , 传入音乐 id(支持多个 id, 用 , 隔开), 可获得歌曲详情(dt为歌曲时长)
 * 必选参数 : ids: 音乐 id, 如 ids=347230
 * 接口地址 : /song/detail
 * @param ids
 * @returns {*}
 */
export const getSongDetail = ids => request.get(`/song/detail?ids=${ids}`)

/**
 * 新歌速递
 * type: 地区类型 id,对应以下:
 * 全部:0
 * 华语:7
 * 欧美:96
 * 日本:8
 * 韩国:16
 * @param type
 * @returns {*}
 */
export const getTopSongs = type => request.get(`/top/song?type=${type}`)

/**
 * TODO:使用推荐系统推荐--->相似歌曲
 * 说明 : 调用此接口 , 传入歌曲 id, 可获得相似歌曲
 * 必选参数 : id: 歌曲 id
 * @param id
 * @param option
 * @returns {*}
 */
export const getSimiSongs = (id, option) =>
  requestWithoutLoading.get(`/simi/song?id=${id}`, option)

/**
 * 说明 : 调用此接口 , 传入音乐 id 可获得对应音乐的歌词 ( 不需要登录 )
 * 必选参数 : id: 音乐 id
 * 接口地址 : /lyric
 * @param id
 * @returns {*}
 */
export const getLyric = id => request.get(`/lyric?id=${id}`)
