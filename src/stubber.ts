export class Stubber<T extends object> {
  private stub: T
  private actions: Array<(stub: T) => void>

  public constructor(defaultStub: T) {
    this.stub = defaultStub
    this.actions = []
  }

  public set(action: (stub: T) => void): Stubber<T> {
    this.actions.push(action)
    return this
  }

  public with(stub: Partial<T>) {
    this.stub = {
      ...(this.stub as object),
      ...(stub as object),
    } as T

    return this
  }

  public build(): T {
    this.actions.forEach(action => {
      action(this.stub)
    })

    return this.stub as T
  }
}
