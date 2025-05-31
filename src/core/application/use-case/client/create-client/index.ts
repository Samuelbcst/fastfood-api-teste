import { BaseEntity } from "../../../../domain/base-entity"
import { Client } from "../../../../domain/client"
import { CreateClientRepository } from "../../../port/client/create-client-repository"
import { UseCase } from "../../base-use-case"
import { CustomError } from "../../custom-error"

type CreateClientInput = Omit<Client, keyof BaseEntity>

export class CreateClientUseCase implements UseCase<Client, void> {
    constructor(private createClientRepository: CreateClientRepository) {}

    async execute(input: CreateClientInput) {
        try {
            await this.createClientRepository.create(input)
            return {
                success: true,
                result: null,
            }
        } catch (error: unknown) {
            return {
                success: false,
                result: null,
                error: new CustomError(
                    400,
                    (error as Error | undefined)?.message ||
                        "Failed to create client"
                ),
            }
        }
    }

    onFinish(): Promise<void> {
        return this.createClientRepository.finish()
    }
}
