import { Stubber } from "../src/typeStubber";

describe("when stubbing a type", () => {
    type TestType = {
        propertyA: string,
        propertyB: number
    }

    const defaultStub = {
        propertyA: "hello, world",
        propertyB: 15
    }

    it("should return a default stub", () => {
        const stub = new Stubber<TestType>(defaultStub).build()

        expect(stub).toMatchObject(defaultStub)
    })

    it("should override only the specified properties", () => {
        const newValue = "newValue"
        const stub = new Stubber<TestType>(defaultStub)
        .with({propertyA: newValue}).build()

        expect(stub.propertyA).toBe(newValue)
        expect(stub.propertyB).toBe(defaultStub.propertyB)
    })

    it("should set only the specified properties", () => {
        const newValue = 35
        const stub = new Stubber<TestType>(defaultStub)
        .set(x => x.propertyB = newValue).build()

        expect(stub.propertyA).toBe(defaultStub.propertyA)
        expect(stub.propertyB).toBe(newValue)
    })
});