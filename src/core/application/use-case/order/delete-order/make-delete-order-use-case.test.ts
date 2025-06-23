import { describe, it, expect } from "vitest"
import { makeDeleteOrderUseCase } from "./make-delete-order-use-case"
import { DeleteOrderUseCase } from "./index"

describe("makeDeleteOrderUseCase", () => {
    it("should return an instance of DeleteOrderUseCase with the provided repository", () => {
        const repository = {
            execute: async () => ({} as any),
            finish: async () => {},
        }
        const useCase = makeDeleteOrderUseCase(repository)
        expect(useCase).toBeInstanceOf(DeleteOrderUseCase)
        expect(typeof useCase.execute).toBe("function")
        expect(typeof useCase.onFinish).toBe("function")
    })
})
