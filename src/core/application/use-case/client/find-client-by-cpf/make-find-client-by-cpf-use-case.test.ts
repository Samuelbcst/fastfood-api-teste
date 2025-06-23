import { describe, it, expect } from "vitest"
import { makeFindClientByCpfUseCase } from "./make-find-client-by-cpf-use-case"
import { FindClientByCpfUseCase } from "./index"

describe("makeFindClientByCpfUseCase", () => {
    it("should return an instance of FindClientByCpfUseCase with the provided repository", () => {
        const repository = {
            execute: async () => ({} as any),
            finish: async () => {},
        }
        const useCase = makeFindClientByCpfUseCase(repository)
        expect(useCase).toBeInstanceOf(FindClientByCpfUseCase)
        expect(typeof useCase.execute).toBe("function")
        expect(typeof useCase.onFinish).toBe("function")
    })
})
