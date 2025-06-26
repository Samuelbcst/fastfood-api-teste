import { describe, it, expect, vi, beforeEach } from "vitest"
import { CreateProductUseCase } from "./index"
// import type { CreateProductRepository } from "../../../port/product/create-product-repository" // Uncomment if you have a type
// import { CustomError } from "../../custom-error" // Uncomment if you use a custom error

const input = { name: "prod", price: 1, categoryId: 1 }
const product = { id: 1, ...input, createdAt: new Date(), updatedAt: new Date() }

let repository: any // Use the correct type if available
let useCase: CreateProductUseCase

beforeEach(() => {
    repository = {
        create: vi.fn().mockResolvedValue(product),
        finish: vi.fn().mockResolvedValue(undefined),
    }
    useCase = new CreateProductUseCase(repository)
})

describe("CreateProductUseCase", () => {
    it("should return success true when product is created", async () => {
        const result = await useCase.execute(input)
        expect(result.success).toBe(true)
        expect(result.result).toEqual(product)
        expect(repository.create).toHaveBeenCalledWith(input)
    })

    it("should return success false and error on failure", async () => {
        const errorMsg = "fail"
        repository.create = vi.fn().mockRejectedValue(new Error(errorMsg))
        useCase = new CreateProductUseCase(repository)
        const result = await useCase.execute(input)
        expect(result.success).toBe(false)
        expect(result.result).toBeNull()
        expect(result.error).toBeDefined()
        // Optionally check error message:
        // expect(result.error?.message).toBe(errorMsg)
    })

    it("should call finish on repository when onFinish is called", async () => {
        await useCase.onFinish()
        expect(repository.finish).toHaveBeenCalled()
    })
})
