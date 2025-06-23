import { describe, it, expect } from "vitest"
import { makeUpdateOrderUseCase } from "./make-update-order-use-case"
import { UpdateOrderUseCase } from "./index"

describe("makeUpdateOrderUseCase", () => {
    it("should return an instance of UpdateOrderUseCase with the provided repository", () => {
        const repository = {
            execute: async () => ({} as any),
            finish: async () => {},
        }
        const useCase = makeUpdateOrderUseCase(repository)
        expect(useCase).toBeInstanceOf(UpdateOrderUseCase)
        expect(typeof useCase.execute).toBe("function")
        expect(typeof useCase.onFinish).toBe("function")
    })
})
