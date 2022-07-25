
export function initCanvas() {
  const canvas = createCanvas()
  const context = getContext(canvas)

  return {
    canvas,
    context,
  }
}

function createCanvas() {
  const canvas = document.createElement('canvas')
  return canvas
}

function getContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const context = canvas.getContext('2d')!
  return context
}
