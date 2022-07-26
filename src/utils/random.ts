export function createHash(hashLength?: number | string): string {
  // 默认长度 24
  return Array.from(Array(Number(hashLength) || 24), () =>
    Math.floor(Math.random() * 36).toString(36),
  ).join('')
}
