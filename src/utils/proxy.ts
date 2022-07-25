export function proxy(target: any, key: string, collectionHandler: PropertyDescriptor) {
  Object.defineProperty(target, key, collectionHandler)
}
