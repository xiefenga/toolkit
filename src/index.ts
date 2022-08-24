// [min, max)
export const random = (min: number, max: number): number => Math.floor(Math.random() * (max - min) + min)


// 获取 object 中的属性 obj.a.b.c.d.e
export const getProperty = <T>(obj: { [key: string]: any }, props: string) => {
  return props
    .replace(/\[(\d)\]/g, '.$1')
    .split('.')
    .reduce((obj, prop) => obj?.[prop], obj) as T
}

//节流
export const throttle = (callback: Function, delay: number) => {
  let lastTime = 0
  return function (this: object, ...args: any[]) {
    let nowTime = Date.now()
    if (nowTime - lastTime > delay) {
      callback.apply(this, args)
      lastTime = nowTime
    }
  }
}
