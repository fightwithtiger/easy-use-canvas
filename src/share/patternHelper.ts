import { LOCATION_MAP } from '../const'
import type { CanvasRenderingContext2DPlus, Point, RectConfig } from '../types'
import { isArray } from '../utils'

export function connectPoints(ctx: CanvasRenderingContext2DPlus, points: Point[]) {
  for (let i = 0; i < points.length - 1; i++)
    connect(ctx, points[i], points[i + 1])
}

export function connect(ctx: CanvasRenderingContext2DPlus, p1: Point, p2: Point) {
  ctx.beginPath()
  ctx.moveTo(p1.x, p1.y)
  ctx.lineTo(p2.x, p2.y)
  ctx.stroke()
  ctx.closePath()
}

export function calculatePoint(point: Point, width: number, angle: number): Point {
  const radian = (Math.PI / 180) * angle
  const x = point.x + Math.cos(radian) * width
  const y = point.y - Math.sin(radian) * width

  return {
    x,
    y,
  }
}

export function handleRoundLocation(config: RectConfig, loc: number[]) {
  const location = isArray(config.location) ? config.location : [config.location as string]
  for (let i = 0; i < 4; i++) {
    const mapping = LOCATION_MAP[i]
    const flag = mapping.some(i => location?.includes(i))
    if (!flag)
      loc[i] = 0
  }
}
