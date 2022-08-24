
// 异步delay
export const delay = (n: number) => new Promise<number>(resolve => setTimeout(resolve, n, n))

// 同步 sleep
export const sleep = (() => {
  const buffer = new Int32Array(new SharedArrayBuffer(4))
  return (n: number) => (Atomics.wait(buffer, 0, 0, n), n)
})()

