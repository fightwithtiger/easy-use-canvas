import type {
  CanvasRenderingContext2DPlus,
  Options,
  Point,
  RectConfig,
  Rectangle,
} from '../types'
import { calculatePoint, connect, connectPoints, handleRoundLocation, mergeOptions } from '../share'

function drawLine(
  this: CanvasRenderingContext2DPlus,
  p1: Point,
  next1: number,
  next2: number,
  options?: Options
): Point
function drawLine(
  this: CanvasRenderingContext2DPlus,
  p1: Point,
  next1: Point,
  next2?: Options
): Point
function drawLine(
  this: CanvasRenderingContext2DPlus,
  p1: any,
  next1: any,
  next2?: any,
  options?: any,
): Point {
  let p2 = next1

  if (typeof next1 !== 'number') {
    // 传入的参数是两个点
    options = next2
  }
  else {
    // 传入的参数是一个点，长度和角度
    const width = next1
    const angle = next2
    p2 = calculatePoint(p1, width, angle)
  }

  this.save()
  options && mergeOptions(this, options)

  connect(this, p1, p2)
  this.restore()

  return p2
}

function drawLines(
  this: CanvasRenderingContext2DPlus,
  points: Point[],
  options?: Options,
) {
  this.save()
  options && mergeOptions(this, options)

  connectPoints(this, points)
  this.restore()
}

function drawFillRect(
  this: CanvasRenderingContext2DPlus,
  rect: Rectangle,
  options?: Options,
) {
  const { x, y, width, height } = rect
  this.save()
  options && mergeOptions(this, options)
  this.fillRect(x, y, width, height)
  this.restore()
}

function drawStrokeRect(
  this: CanvasRenderingContext2DPlus,
  rect: Rectangle,
  options?: Options,
) {
  const { x, y, width, height } = rect
  this.save()
  options && mergeOptions(this, options)
  this.strokeRect(x, y, width, height)
  this.restore()
}

function drawRoundRect(
  this: CanvasRenderingContext2DPlus,
  rect: Rectangle,
  options?: Options,
  config?: RectConfig,
) {
  const { x, y, width, height, radius } = rect

  let realRadius = radius ?? 0
  if (width < 2 * realRadius) realRadius = width / 2
  if (height < 2 * realRadius) realRadius = height / 2

  this.save()
  options && mergeOptions(this, options)

  this.beginPath()
  this.moveTo(x + realRadius, y)

  const loc = new Array(4).fill(realRadius)

  if (config?.location)
    handleRoundLocation(config, loc)

  this.arcTo(x + width, y, x + width, y + height, loc[0])
  this.arcTo(x + width, y + height, x, y + height, loc[1])
  this.arcTo(x, y + height, x, y, loc[2])
  this.arcTo(x, y, x + width, y, loc[3])
  this.closePath()
  this.stroke()

  if (config?.fill)
    this.fill()
  this.restore()
}

const patternOps = {
  drawLine,
  drawLines,
  drawFillRect,
  drawStrokeRect,
  drawRoundRect,
}

export default patternOps
