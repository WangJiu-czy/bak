import { request } from '@/utils'
/**
 * 说明 : 调用此接口 , 传入专辑 id, 可获得专辑内容
 * 必选参数 : id: 专辑 id
 * @param id
 * @returns {*}
 */
export const getAlbum = id => request.get(`/album?id=${id}`)