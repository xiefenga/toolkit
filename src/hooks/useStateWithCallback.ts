import type { SetStateAction } from 'react'
import { useState, useRef, useLayoutEffect, useCallback, useMemo } from 'react'

// 空函数
const NOOP = () => { }

export type StateCallback<T> = (value: T) => void

export type SetStateCallback<T> = (
  ns: SetStateAction<T>,
  cb: StateCallback<T>
) => void

// 具有 callback 的 useState
export function useStateWithCallback<T>(initState: T) {
  const cbRef = useRef<StateCallback<T>>(NOOP)

  const [state, setState] = useState(initState)

  useLayoutEffect(() => cbRef.current(state), [state])

  const setStateWithCB = useCallback<SetStateCallback<T>>(
    (ns: SetStateAction<T>, cb: StateCallback<T> = NOOP) => {
      cbRef.current = cb
      setState(ns)
    },
    []
  )

  return useMemo(() => [state, setStateWithCB], [state])
}

export default useStateWithCallback
