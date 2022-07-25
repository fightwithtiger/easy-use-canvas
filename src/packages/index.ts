import { initCanvas } from './init'
import { enhance } from './extend'

const { canvas, context } = initCanvas()
const ctx = enhance(context)

export {
  canvas,
  ctx,
}
