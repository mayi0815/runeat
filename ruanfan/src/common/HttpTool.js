
const delay = timeout => {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject('请求超时'), timeout * 1000)
    })
}

const formatUrl = ({url, params = {}}) => {
  const paramArr = []
    if (Object.keys(params).length !== 0) {
        for (const key in params) {
            paramArr.push(`${key}=${params[key]}`)
        }
    }
    return `${url}?${paramArr.join('&')}`
}

const get = ({url, params = {}, timeout}) => {
    const urlStr = formatUrl({url, params})

    if (timeout === undefined) {
        return fetch(urlStr)
    } else {
        return Promise.race([fetch(urlStr), delay(timeout)])
    }
}

export { formatUrl, get }