import { describe, it, expect } from "vitest"
import { makeUpdateClientUseCase } from "./make-update-client-use-case"
import { UpdateClientUseCase } from "./index"

describe("makeUpdateClientUseCase", () => {
    it("should return an instance of UpdateClientUseCase with the provided repository", () => {
        const repository = {
            execute: async () => ({} as any),
            finish: async () => {},
        }
        const useCase = makeUpdateClientUseCase(repository)
        expect(useCase).toBeInstanceOf(UpdateClientUseCase)
        expect(typeof useCase.execute).toBe("function")
        expect(typeof useCase.onFinish).toBe("function")
    })
})
