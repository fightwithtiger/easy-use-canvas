import type { CanvasRenderingContext2DPlus } from '../types'
import { proxy } from '../utils'
import patternOps from './pattern'
import textOps from './text'
import imageOps from './image'
import { createBaseHandler, createOpsHandler } from './handler'

export function enhance(ctx: CanvasRenderingContext2D): CanvasRenderingContext2DPlus {
  baseMixin(ctx)
  operationsMixin(ctx)
  return ctx as CanvasRenderingContext2DPlus
}

function baseMixin(ctx: CanvasRenderingContext2D) {
  const collectionHandler = createBaseHandler(new Map())
  proxy(ctx, '$texts', collectionHandler)
}

function operationsMixin(ctx: CanvasRenderingContext2D) {
  const operations = { ...patternOps, ...textOps, ...imageOps }
  for (const key in operations) {
    const fn = operations[key as keyof typeof operations]
    const collectionHandler = createOpsHandler(fn)
    proxy(ctx, key, collectionHandler)
  }
}
