export function createBaseHandler(value: any) {
  return {
    get() {
      return value
    },
    set() {
      throw new Error('readonly')
    },
  }
}

export function createOpsHandler(value: any) {
  return {
    get() {
      return value
    },
    set() {
      throw new Error('not configurable')
    },
  }
}
