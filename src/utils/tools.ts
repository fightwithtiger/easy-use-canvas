export function isArray(obj: any) {
  return Object.prototype.toString.call(obj) === '[object Array]'
}
