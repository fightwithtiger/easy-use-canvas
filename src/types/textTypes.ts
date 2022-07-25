import type textOps from '../packages/text'
import type { Options } from './base'
import type { Point } from './patternTypes'

export type TextOps = typeof textOps

export type TextMode = 'fill' | 'stroke'

export interface TextConfig {
  mode?: TextMode
  maxWidth?: number
  lineHeight?: number
  maxRows?: number
  id?: string
}

export interface TextItem {
  content: string | number
  point: Point
  options?: Options
}
