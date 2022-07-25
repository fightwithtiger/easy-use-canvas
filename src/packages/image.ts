import type { CanvasRenderingContext2DPlus, ImageOptions, Point } from '../types'
import { getTargetImg } from '../share'

function drawImg(this: CanvasRenderingContext2DPlus, p: Point, options: ImageOptions) {
  getTargetImg(options).then((target) => {
    target && this.drawImage(target, p.x, p.y)
  }).catch((e) => {
    console.error(e)
  })
}

const imageOps = {
  drawImg,
}

export default imageOps
