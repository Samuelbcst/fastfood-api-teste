import { describe, it, expect, vi, beforeEach } from "vitest"
import { FindClientAllUseCase } from "."
import type { FindClientAllRepository } from "../../../port/client/find-client-all-repository"

describe("FindClientAllUseCase", () => {
    let repository: FindClientAllRepository
    let useCase: FindClientAllUseCase
    const clients = [
        { id: 1, name: "Test1", email: "test1@example.com", cpf: "12345678900", createdAt: new Date(), updatedAt: new Date() },
        { id: 2, name: "Test2", email: "test2@example.com", cpf: "12345678901", createdAt: new Date(), updatedAt: new Date() },
    ]

    beforeEach(() => {
        repository = {
            execute: vi.fn().mockResolvedValue(clients),
            finish: vi.fn().mockResolvedValue(undefined),
        }
        useCase = new FindClientAllUseCase(repository)
    })

    it("should return success true and all clients", async () => {
        const result = await useCase.execute()
        expect(result.success).toBe(true)
        expect(result.result).toEqual(clients)
        expect(repository.execute).toHaveBeenCalled()
    })

    it("should return success false and empty array on repository error", async () => {
        repository.execute = vi.fn().mockRejectedValue(new Error("fail"))
        useCase = new FindClientAllUseCase(repository)
        const result = await useCase.execute()
        expect(result.success).toBe(false)
        expect(result.result).toEqual([])
    })

    it("should call finish on repository when onFinish is called", async () => {
        await useCase.onFinish()
        expect(repository.finish).toHaveBeenCalled()
    })
})
