export interface CancelSource {
  token: CancelToken
  cancel: () => void
}

export class CancelToken {

  public static source(): CancelSource {
    let cancel: () => void
    const token = new CancelToken((cancelFn) => (cancel = cancelFn))
    cancel = cancel!
    return {
      token,
      cancel,
    }
  }

  #promise: Promise<void>

  public constructor(cancel: (fn: () => void) => void) {
    this.#promise = new Promise<void>((resolve) => {
      cancel(() => {
        resolve()
      })
    })
  }

  public onCancelFn(cancelFn: () => void): void {
    this.#promise.then(cancelFn)
  }
}