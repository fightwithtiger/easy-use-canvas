import type { ImageOptions, ImageSourceType } from '../types'

export function getTargetImg(options: ImageOptions): Promise<ImageSourceType | null> {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async(resolve, reject) => {
    if (options.url) {
      const url = typeof options.url === 'string' ? options.url : ''
      const img = await getImg(url).catch(e => console.error(e)) as ImageSourceType
      resolve(img)
    }
    else if (options.source) {
      resolve(options.source)
    }

    // eslint-disable-next-line prefer-promise-reject-errors
    reject('fail to load resource!')
  })
}

export function getImg(url: string): Promise<ImageSourceType | unknown> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = url

    img.onload = function() {
      resolve(img)
    }
    img.onerror = function() {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('fail to resolve image!')
    }
  })
}
