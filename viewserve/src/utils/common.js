import { Notification } from 'element-ui'

export { debounce, throttle } from 'lodash-es'
/*在num的左边添加0,直到num的length等于n*/
export function pad(num, n = 2) {
  let len = num.toString().length
  while (len < n) {
    num = '0' + num
    len++
  }
  return num
}
/*
* 格式化日期
* */
export function formatDate(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
  date = date instanceof Date ? date : new Date(date)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      )
    }
  }
  return fmt
}
/*左边垫上00*/
function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
/*格式化时间*/
export function formatTime(interval) {
  interval = interval | 0
  const minute = pad((interval / 60) | 0)
  const second = pad(interval % 60)
  return `${minute}:${second}`
}
/*格式化数字,加上单位*/
export function formatNumber(number) {
  number = Number(number) || 0
  return number > 100000 ? `${Math.round(number / 10000)}万` : number
}
/*拼接图片链接*/
export function genImgUrl(url, w, h) {
  if (!h) {
    h = w
  }
  url += `?param=${w}y${h}`
  return url
}

/*是否是最后一个*/
export function isLast(index, arr) {
  return index === arr.length - 1
}
/*判断a和b元素的key对应的值是否相等*/
export function shallowEqual(a, b, compareKey) {
  if (a.length !== b.length) {
    return false
  }
  for (let i = 0; i < a.length; i++) {
    let compareA = a[i]
    let compareB = b[i]
    if (compareKey) {
      compareA = compareA[compareKey]
      compareB = compareB[compareKey]
    }
    if (!Object.is(a[i], b[i])) {
      return false
    }
  }
  return true
}

export function notify(message, type) {
  const params = {
    message,
    duration: 1500
  }
  const fn = type ? Notification[type] : Notification
  return fn(params)
}
['success', 'warning', 'info', 'error'].forEach(key => {
  notify[key] = (message) => {
    return notify(message, key)
  }
})

export function requestFullScreen(element) {
  const docElm = element;
  if (docElm.requestFullscreen) {
    docElm.requestFullscreen();
  } else if (docElm.msRequestFullscreen) {
    docElm.msRequestFullscreen();
  } else if (docElm.mozRequestFullScreen) {
    docElm.mozRequestFullScreen();
  } else if (docElm.webkitRequestFullScreen) {
    docElm.webkitRequestFullScreen();
  }
}
/*退出全屏*/
export function exitFullscreen() {
  const de = window.parent.document;

  if (de.exitFullscreen) {
    de.exitFullscreen();
  } else if (de.mozCancelFullScreen) {
    de.mozCancelFullScreen();
  } else if (de.webkitCancelFullScreen) {
    de.webkitCancelFullScreen();
  } else if (de.msExitFullscreen) {
    de.msExitFullscreen()
  }
}
/*是否全屏*/
export function isFullscreen() {
  return document.fullScreen ||
    document.mozFullScreen ||
    document.webkitIsFullScreen
}

export function isUndef(v) {
  return v === undefined || v === null
}

export function isDef(v) {
  return v !== undefined && v !== null
}

export function isTrue(v) {
  return v === true
}

export function isFalse(v) {
  return v === false
}

export function getPageOffset(page, limit) {
  return (page - 1) * limit
}