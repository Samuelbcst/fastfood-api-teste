import { describe, it, expect } from "vitest"
import { makeFindClientByIdUseCase } from "./make-find-client-by-id-use-case"
import { FindClientByIdUseCase } from "./index"

describe("makeFindClientByIdUseCase", () => {
    it("should return an instance of FindClientByIdUseCase with the provided repository", () => {
        const repository = {
            execute: async () => ({} as any),
            finish: async () => {},
        }
        const useCase = makeFindClientByIdUseCase(repository)
        expect(useCase).toBeInstanceOf(FindClientByIdUseCase)
        expect(typeof useCase.execute).toBe("function")
        expect(typeof useCase.onFinish).toBe("function")
    })
})
