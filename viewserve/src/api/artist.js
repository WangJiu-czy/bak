import { request } from '@/utils'
/**
 * 说明 : 调用此接口 , 传入歌手 id, 可获得歌手部分信息和热门歌曲
 * 必选参数 : id: 歌手 id, 可由搜索接口获得
 * @param id
 * @returns {*}
 */
export const getArtists = id => request.get(`/artists?id=${id}`)
