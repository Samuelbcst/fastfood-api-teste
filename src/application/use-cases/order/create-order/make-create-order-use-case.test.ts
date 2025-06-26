import { describe, it, expect } from "vitest"
import { makeCreateOrderUseCase } from "./make-create-order-use-case"
import { CreateOrderUseCase } from "./index"

describe("makeCreateOrderUseCase", () => {
    it("should return an instance of CreateOrderUseCase with the provided repository", () => {
        const repository = {
            create: async () => ({} as any),
            finish: async () => {},
        }
        const useCase = makeCreateOrderUseCase(repository)
        expect(useCase).toBeInstanceOf(CreateOrderUseCase)
        expect(typeof useCase.execute).toBe("function")
        expect(typeof useCase.onFinish).toBe("function")
    })
})
