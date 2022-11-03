import { request } from '@/utils'
/**
 * 说明 : 调用此接口 , 可获取 banner( 轮播图 ) 数据
 * 可选参数 :
 * type:资源类型,对应以下类型,默认为 0 即 PC
 * 0: pc
 * 1: android
 * 2: iphone
 * 3: ipad
 * @returns {*}
 */
export const getBanner = () => request.get('/banner?type=0')

/**
 * TODO:使用推荐系统推荐
 * 说明 : 调用此接口 , 可获取推荐新音乐
 * 可选参数 : limit: 取出数量 , 默认为 10 (不支持 offset)
 * @returns {*}
 */
export const getNewSongs = () => request.get('/personalized/newsong')

/**
 * 说明 : 调用此接口 , 可获取推荐歌单
 * 可选参数 : limit: 取出数量 , 默认为 30 (不支持 offset)
 * 接口地址 : /personalized
 *
 * 说明 : 调用此接口 , 可获取推荐新音乐
 * 可选参数 : limit: 取出数量 , 默认为 10 (不支持 offset)
 * 接口地址 : /personalized/newsong
 *
 * 推荐电台
 * 说明 : 调用此接口 , 可获取推荐电台
 * 接口地址 : /personalized/djprogram
 *
 * 说明 : 调用此接口 , 可获取推荐节目
 * 接口地址 : /program/recommend
 *
 * 说明 : 调用此接口 , 可获取独家放送
 * 接口地址 : /personalized/privatecontent
 * @param params
 * @returns {*}
 */
export const getPersonalized = params =>
  request.get(`/personalized`, { params })

/**
 * 说明 : 调用此接口 , 可获取推荐 mv
 * 接口地址 : /personalized/mv
 * @returns {*}
 */
export const getPersonalizedMv = () => request.get(`/personalized/mv`)