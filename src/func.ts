// 函数组合
export function compose(...funcs: Function[]): Function {
  if (funcs.some(func => typeof func !== 'function')) {
    throw new TypeError('arguments must only be function')
  } else if (funcs.length === 0) {
    funcs = [(args: any) => args]
  }
  return funcs.length === 1
    ? funcs[0]
    : funcs.reduce(
      (a, b) => (...args: any[]) => a(b(...args))
    )
}

type Func = (arg: any) => any

// 函数管道
export const funcPipe = (...funcs: Func[]) => {
  return (arg: any) => funcs.reduce((result, func) => func(result), arg)
}
