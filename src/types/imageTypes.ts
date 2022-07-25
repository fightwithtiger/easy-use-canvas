import type imageOps from '../packages/image'

export type ImageSourceType = HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | ImageBitmap

export interface ImageOptions {
  url?: string
  source?: ImageSourceType
}

export type ImageOps = typeof imageOps
