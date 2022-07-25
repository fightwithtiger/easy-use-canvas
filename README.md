# easy-use-canvas

对原生canvas和ctx进行再封装，旨在提供一些api，用来简化绘制图案的步骤。

# 安装与使用

安装：npm i easy-use-canvas

在需要使用canvas的文件中导入

```javascript
import { useCanvas } from 'easy-use-canvas'

const { canvas, ctx } = useCanvas()
```

通过useCanvas可以获得创建的canvas对象以及它的上下文ctx，这里的ctx其实就是在原有的canvas.getContext()对象上包装了一下，可以使用一些通过useCanvas添加上去的api。

接下来将canvas添加到dom中就可以开始绘制图案了，**这里需要注意是请确保dom已经挂载上去了**，比如如果使用vue，建议在mounted里去执行插入，react则在useEffect中插入。

```javascript
canvas.width = 1000

canvas.height = 900

document.getElementById('container')?.appendChild(canvas)
```



## 举例

### 线条

通过**ctx.drawLine**可以绘制一条线段，其中p1, p2为绘制线段的两个端点坐标，options则为ctx上的一些样式设置属性，具体属性可以参考canvas mdn文档，下面例子设置font, fillStyle。

```javascript
  const p1 = {
    x: 10,
    y: 10,
  }
  const p2 = {
    x: 100,
    y: 200,
  }
  options: {
      font: '24px serif',
      fillStyle: '#244477',
  }
  ctx.drawLine(p1, p2, options)

  // 也可以传入三个参数：起点，长度，以水平参考逆时针角度，
  // 返回值为终点对象
  const nextPoint = ctx.drawLine(p2, 200, -95)
```

通过**ctx.drawLines**可以绘制多条连接的折线，第一个参数传入一个由点组成的数组，第二个参数为options同上。

```javascript
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
  
  ctx.drawLines([p1, p2, p3, p1])
```

### 矩形

通过**ctx.drawFillRect**和**ctx.drawStrokeRect**可以绘制填充矩形和线框矩形，第一个参数是一个由x, y, width, height组成的对象，分别代表了矩形的左上角点以及长宽，第二个参数为options，含义同上。

```javascript
  const r = {
    x: 100,
    y: 200,
    width: 200,
    height: 160,
  }
  const r2 = {
    x: 200,
    y: 100,
    width: 400,
    height: 160,
  }
  
  ctx.drawFillRect(r, {
    fillStyle: '#c1c1c1',
  })
  ctx.drawStrokeRect(r2, {
    strokeStyle: '#555555',
  })
```

利用**drawRoundRect**函数实现绘制圆角矩形，在矩形对象中增加radius属性表示圆角得半径，drawRoundRect接受的前两个参数和前面两个绘制矩形函数一致，第三个参数是一个RectConfig类型，可以不传，默认就会绘制一个线框的圆角矩形。可以通过第三个参数的location控制圆角的位置，例如'top-left'表示左上角的位置绘制圆角，其余仍然是直角。location参数还可以传递一个数组，用于控制多个位置绘制圆角。其中可选值有`'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'`
fill则表示是否填充该矩形，请和fillStyle配合使用。
```javascript
  const r = {
    x: 100,
    y: 100,
    width: 200,
    height: 160,
    radius: 2,
  }
  ctx.drawRoundRect(r, {
    lineWidth: 10,
    strokeStyle: '#d2d2d2',
    fillStyle: '#535353',
  }, {
    location: 'top-left',
    fill: true,
  })
```

### 文字

**ctx.drawText**可以绘制文本，第一个参数可以是一个TextItem格式的对象（由content, point, options）组成，分别表示文本内容，绘制起点，以及当前文本样式options（同上）。第一个参数也可以是一个TextItem的数组，表示绘制的多文本。第二个参数是一个对象，接收两个属性：maxWidth, lineHeight。maxWidth表示当前绘制文本的最大宽度，超出后会自动换行，**注意的是在绘制多文本时，如果设置了maxWidth，那么绘制的起点只会以数组中第一个TextItem设置的point，其它的自动省略**。lineHeight表示绘制文本的行高，**注意该属性只有在设置maxHeight属性后才会生效**。maxRows表示限制行数，超出部分将以省略号代替，该属性也只有在设置了maxHeight后才能生效。

```javascript
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

  ctx.drawText(t3)

  ctx.drawText([t1, t2, t3], {
    maxWidth: 140,
    lineHeight: 24,
    maxRows: 3,
  })
```

### 图片

绘制图片只需要传入绘制起点和绘制图片url或者source（表示Image，或者video对象）。

这里有两点需要注意：

1. **如果同时设置了url和source，source优先；**
2. **如果使用source，则要确保资源已经加载完毕，比如如果时img，则可以在img.onload方法内去绘制。**

```javascript
ctx.drawImg(p1, {
    url: 'https://mdn.mozillademos.org/files/5395/backdrop.png',
  })

tx.drawImg(p1, {
    source: img
  })
```



# 源码

仓库地址：https://gitee.com/deng_tuo/easy-canvas.git



## 项目启动

npm i pnpm -g

pnpm i

pnpm run play

# 文件
src目录下是useCanvas 的核心代码

playground目录下则是运行demo的项目文件，测试api都在playground/components/SharePost.vue
