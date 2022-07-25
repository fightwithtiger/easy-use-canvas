import type { CanvasRenderingContext2DPlus, TextConfig, TextItem } from '../types'
import { beforeDrawText, drawTextItem } from '../share'

function drawText(this: CanvasRenderingContext2DPlus, text: TextItem | TextItem[], config?: TextConfig) {
  text = JSON.parse(JSON.stringify(text))

  beforeDrawText(this, config)

  if (Array.isArray(text)) {
    let prePoint = text[0].point ?? { x: 0, y: 0 }
    for (let i = 0; i < text.length; i++) {
      const item = text[i]
      item.point = prePoint
      prePoint = drawTextItem(this, item, (text as TextItem[])[0].point, config)
      // 设置了最大宽度和最大行数下，如果上一次绘制点超过了或等于最大宽度
      // 说明是到了最大行数了，此时停止绘制文本
      if (config?.maxWidth && prePoint.x >= config?.maxWidth)
        break
    }
  }
  else {
    drawTextItem(this, text, text.point, config)
  }
}

const textOps = {
  drawText,
}

export default textOps
