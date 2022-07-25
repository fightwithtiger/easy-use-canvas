import { useState } from '../composable'
import type { CanvasRenderingContext2DPlus, Point, TextConfig, TextItem, TextMode } from '../types'
import { createHash } from '../utils'
import { mergeOptions } from './helper'

export function beforeDrawText(ctx: CanvasRenderingContext2DPlus, config?: TextConfig) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [rows, setRows] = useState<number>(1)
  const id = createHash()
  mergeOptions(config || {}, { id })

  ctx.$texts.set(id, { rows, setRows })
}

export function drawTextItem(ctx: CanvasRenderingContext2DPlus, text: TextItem, originalPoint: Point, config?: TextConfig): Point {
  const { content, point, options } = text
  let p = {
    x: 0,
    y: 0,
  }

  ctx.save()
  options && mergeOptions(ctx, options)
  if (!config?.maxWidth)
    p = drawLongText(ctx, String(content), point, config?.mode)
  else
    p = drawWords(ctx, String(content), point, originalPoint, config)
  ctx.restore()

  return p
}

export function drawLongText(ctx: CanvasRenderingContext2DPlus, content: string, p: Point, mode?: TextMode) {
  const metrics = ctx.measureText(content)
  if (mode === 'stroke')
    drawStrokeText(ctx, content, p)
  else
    drawFillText(ctx, content, p)
  return {
    x: p.x + metrics.width,
    y: p.y,
  }
}

export function drawFillText(ctx: CanvasRenderingContext2DPlus, content: string, p: Point) {
  ctx.fillText(content, p.x, p.y)
}

export function drawStrokeText(ctx: CanvasRenderingContext2DPlus, content: string, p: Point) {
  ctx.strokeText(content, p.x, p.y)
}

export function drawWords(ctx: CanvasRenderingContext2DPlus, words: string, p: Point, originalPoint: Point, config: TextConfig): Point {
  let left = p.x
  let top = p.y
  const originalX = originalPoint.x

  const maxWidth = config.maxWidth ?? Infinity
  const mode = config.mode ?? 'fill'

  for (let i = 0; i < words.length; i++) {
    const metrics = ctx.measureText(words[i])
    const fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent
    // 所有字在这个字体下的高度
    // const actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
    // 当前文本字符串在这个字体下用的实际高度

    const point = {
      x: left,
      y: top,
    }
    left += metrics.width

    const { rows, setRows } = ctx.$texts.get(config.id)
    if (config.maxRows === rows.value && left - originalX >= maxWidth) {
      // 达到设置的最大行数了，用省略号处理，后面的文本不再绘制
      drawWord(ctx, '...', point, mode)
      break
    }
    else {
      drawWord(ctx, words[i], point, mode)
      if (left - originalX >= maxWidth) {
        // 换行
        left = originalX
        top += config.lineHeight ?? fontHeight
        setRows(rows.value + 1)
      }
    }
  }
  return {
    x: left,
    y: top,
  }
}

export function drawWord(ctx: CanvasRenderingContext2DPlus, word: string, p: Point, mode?: TextMode) {
  if (mode === 'stroke')
    ctx.strokeText(word, p.x, p.y)
  else
    ctx.fillText(word, p.x, p.y)
}
