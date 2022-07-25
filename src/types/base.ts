import type { PatternOps } from './patternTypes'
import type { TextOps } from './textTypes'
import type { ImageOps } from './imageTypes'

export interface BaseInfo {
  $texts: Map<any, any>
}

export type CanvasRenderingContext2DPlus = CanvasRenderingContext2D & {
  [key in keyof PatternOps]: PatternOps[key]
} & {
  [key in keyof TextOps]: TextOps[key]
} & {
  [key in keyof ImageOps]: ImageOps[key]
} & BaseInfo

export interface BaseOptions extends CanvasFillStrokeStyles, CanvasPathDrawingStyles, CanvasShadowStyles, CanvasTextDrawingStyles {

}

export type Options = Partial<BaseOptions>
