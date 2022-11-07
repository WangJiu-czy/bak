import storage from 'good-storage'
import {COOKIE_KEY, UID_KEY} from '@/utils'
import { notify, isDef } from '@/utils'
import {getUserDetail, getUserPlaylist, phoneLogin} from "@/api"

export default {
  async login({ commit }, uid) {
    const error = () => {
      notify.error('登录失败，请输入正确的uid。')
      return false
    }
    
    if (!isDef(uid)) {
      return error()
    }

    try {
      const user = await getUserDetail(uid)
      const { profile } = user
      commit('setUser', profile)
      storage.set(UID_KEY, profile.userId)
    } catch (e) {
      return error()
    }

    const { playlist } = await getUserPlaylist(uid)
    commit('setUserPlaylist', playlist)
    return true
  },
  async phoneLogin({ commit }, option) {
    const error = () => {
      notify.error('登录失败，请输入正确的uid。')
      return false
    }

    if (!isDef(option)) {
      return error()
    }

    try {
      const userData=await phoneLogin(option.phone,option.password)
      //TODO:json解析可能有点问题
      storage.set(COOKIE_KEY,userData.data.cookie)
      const uid=userData.data.userId
      const { profile } = userData.data
      commit('setUser', profile)
      storage.set(UID_KEY, profile.userId)

      const { playlist } = await getUserPlaylist(uid)
      commit('setUserPlaylist', playlist)
    } catch (e) {
      return error()
    }

    return true
  },
  logout({ commit }) {
    commit('setUser', {})
    commit('setUserPlaylist', [])
    storage.set(UID_KEY, null)
  }
}
