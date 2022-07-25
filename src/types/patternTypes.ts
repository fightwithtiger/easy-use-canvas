import type patternOps from '../packages/pattern'

export interface Point {
  x: number
  y: number
}

export interface Rectangle {
  x: number
  y: number
  width: number
  height: number
  radius?: number
}

export type RoundLocation = 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
export interface RectConfig {
  location?: RoundLocation | RoundLocation[]
  fill?: boolean
}

export type PatternOps = typeof patternOps
