import { describe, it, expect, vi, beforeEach } from "vitest"
import { CreateClientUseCase } from "."
import type { CreateClientRepository } from "../../../port/client/create-client-repository"
import { CustomError } from "../../custom-error"

describe("CreateClientUseCase", () => {
    let repository: CreateClientRepository
    let useCase: CreateClientUseCase
    const input = { name: "Test", email: "test@example.com", cpf: "12345678900" }
    const client = { id: 1, ...input, createdAt: new Date(), updatedAt: new Date() }

    beforeEach(() => {
        repository = {
            create: vi.fn().mockResolvedValue(client),
            finish: vi.fn().mockResolvedValue(undefined),
        }
        useCase = new CreateClientUseCase(repository)
    })

    it("should return success true when client is created", async () => {
        const result = await useCase.execute(input)
        expect(result.success).toBe(true)
        expect(result.result).toEqual(client)
        expect(repository.create).toHaveBeenCalledWith(input)
    })

    it("should return success false and CustomError on failure", async () => {
        const errorMsg = "fail"
        repository.create = vi.fn().mockRejectedValue(new Error(errorMsg))
        useCase = new CreateClientUseCase(repository)
        const result = await useCase.execute(input)
        expect(result.success).toBe(false)
        expect(result.error).toBeInstanceOf(CustomError)
        expect(result.error?.message).toBe(errorMsg)
    })

    it("should call finish on repository when onFinish is called", async () => {
        await useCase.onFinish()
        expect(repository.finish).toHaveBeenCalled()
    })
})
