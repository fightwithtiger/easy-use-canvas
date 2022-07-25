<template>
  <div id="container" class="container">
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useCanvas } from '../../../src/index'
// import { useCanvas } from '../../../dist/index'

const { canvas, ctx } = useCanvas()

onMounted(() => {
  canvas.width = 1000
  canvas.height = 900
  document.getElementById('container')?.appendChild(canvas)
  const p1 = {
    x: 10,
    y: 10,
  }
  const p2 = {
    x: 100,
    y: 200,
  }
  const p3 = {
    x: 500,
    y: 300,
  }
  // ctx.drawLine(p1, p3)
  // const a = ctx.drawLine(p2, 200, -95)
  const r = {
    x: 100,
    y: 100,
    width: 200,
    height: 160,
    radius: 2,
  }
  const r2 = {
    x: 200,
    y: 100,
    width: 400,
    height: 160,
  }

  // ctx.drawLines([p1, p2, p3])
  // ctx.drawFillRect(r, {
  //   fillStyle: '#c1c1c1',
  // })
  // ctx.drawStrokeRect(r2, {
  //   strokeStyle: '#555555',
  // })

  const t1 = {
    content: '你好，欢迎来到米奇妙妙屋',
    point: p2,
    options: {
      font: '24px serif',
      fillStyle: '#244477',
    },
  }

  const t2 = {
    content: '我叫米奇，很高兴认识你.',
    point: p3,
    options: {
      font: '14px serif',
      fillStyle: '#574277',
    },
  }

  const t3 = {
    content: '你愿意和我做朋友吗？',
    point: p1,
    options: {
      font: '24px serif',
      fillStyle: '#000000',
    },
  }

  // ctx.drawText(t3, {
  //   maxWidth: 140,
  //   lineHeight: 24,
  //   maxRows: 1,
  // })

  // ctx.drawText([t1, t2, t3], {
  //   maxWidth: 140,
  //   lineHeight: 24,
  //   maxRows: 3,
  // })

  // ctx.drawText([t2, t1, t1])
  // ctx.drawImg(p1, {
  //   url: 'https://mdn.mozillademos.org/files/5395/backdrop.png',
  // })

  // ctx.lineWidth = 5
  // ctx.strokeStyle = '#000'
  ctx.drawRoundRect(r, {
    lineWidth: 10,
    strokeStyle: '#d2d2d2',
    fillStyle: '#535353',
  }, {
    location: 'top-left',
    fill: true,
  })
})
</script>

<style>
.container {
  width: 100vw;
  height: 100vh;
  background-color: antiquewhite;
}
</style>
