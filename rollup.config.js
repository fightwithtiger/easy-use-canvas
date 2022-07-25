
import path from 'path'
// eslint-disable-next-line import/no-named-as-default
import nodeResolve from '@rollup/plugin-node-resolve'
import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import { uglify } from 'rollup-plugin-uglify'
import pkg from './package.json'

const extensions = ['.ts', 'js']

const resolve = (...args) => path.resolve(...args) // 适应不同环境，封装path.resolve，少写一点代码

const config = [
  {
    // 编译typescript, 生成 js 文件
    input: resolve('./src/index.ts'),
    output: [
      {
        file: resolve('./', pkg.module), // 读取 package.json 中的main作为入口。
        format: 'es',
        name: 'useCanvas',
      },
      {
        file: resolve('./', pkg.main), // 读取 package.json 中的main作为入口。
        format: 'cjs',
        name: 'useCanvas',
      },
    ],
    plugins: [
      nodeResolve({
        extensions,
      }),
      commonjs(),
      typescript(),
      babel({
        exclude: 'node_modules/**',
        extensions,
      }),
      uglify(),
    ],
  },
  {
    // 生成 .d.ts 类型声明文件
    input: resolve('./src/index.ts'),
    output: {
      file: resolve('./', pkg.types),
      format: 'es',
    },
    plugins: [dts()],
  },
]

export default config
