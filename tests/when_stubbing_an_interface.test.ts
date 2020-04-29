import { Stubber } from '../src/stubber'

describe('when stubbing an interface', () => {
  const defaultFunctionResponse = 'this function can still execute'

  interface TestInterface {
    propertyA: string
    propertyB: number
    functionA: () => string
  }

  const defaultStub = {
    propertyA: 'hello, world',
    propertyB: 15,
    functionA: () => defaultFunctionResponse,
  }

  it('should return a default stub', () => {
    const stub = new Stubber<TestInterface>(defaultStub).build()

    expect(stub).toMatchObject(defaultStub)
  })

  it('should override only the specified properties', () => {
    const newValue = 'newValue'
    const stub = new Stubber<TestInterface>(defaultStub)
      .with({ propertyA: newValue })
      .build()

    expect(stub.propertyA).toBe(newValue)
    expect(stub.propertyB).toBe(defaultStub.propertyB)
  })

  it('should set only the specified properties', () => {
    const newValue = 35
    const stub = new Stubber<TestInterface>(defaultStub)
      .set(x => (x.propertyB = newValue))
      .build()

    expect(stub.propertyA).toBe(defaultStub.propertyA)
    expect(stub.propertyB).toBe(newValue)
  })

  it("should not remove the functions when using 'with'", () => {
    const newValue = 35
    const stub = new Stubber<TestInterface>(defaultStub)
      .with({ propertyB: newValue })
      .build()

    expect(stub.propertyA).toBe(defaultStub.propertyA)
    expect(stub.propertyB).toBe(newValue)

    expect(stub.functionA()).toBe(defaultFunctionResponse)
  })
})
