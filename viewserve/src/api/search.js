import { request } from "@/utils";

/**
 * TODO:调用后,后端将数据存放到redis缓存,使用线程池+定时任务,刷新缓存
 * 说明 : 调用此接口,可获取热门搜索列表
 * 接口地址 : /search/hot
 * @returns {*}
 */
export const getSearchHot = () => request.get('/search/hot')

/**
 * TODO:尝试使用TF-IDF生成关键词推荐
 * 说明 : 调用此接口 , 传入搜索关键词可获得搜索建议 , 搜索结果同时包含单曲 , 歌手 , 歌单信息
 * 必选参数 : keywords : 关键词
 * 可选参数 : type : 如果传 'mobile' 则返回移动端数据
 * 接口地址 : /search/suggest
 * @param keywords
 * @returns {*}
 */
export const getSearchSuggest = (keywords) => request.get('/search/suggest', { params: { keywords } })

/**
 * 必选参数 : keywords : 关键词
 * 可选参数 : limit : 返回数量 , 默认为 30 offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样)
 * 接口地址 : /search 或者 /cloudsearch(更全)
 * 调用例子 : /search?keywords=海阔天空 /cloudsearch?keywords=海阔天空
 * @param params
 * @returns {*}
 */
export const getSearch = (params) => request.get(`/search`, { params })