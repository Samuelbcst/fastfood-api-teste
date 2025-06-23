import { BaseEntity } from "../../../../domain/base-entity"
import { Client } from "../../../../domain/client/client"
import { CreateClientRepository } from "../../../port/client/create-client-repository"
import { UseCase } from "../../base-use-case"
import { CustomError } from "../../custom-error"

type CreateClientInput = Omit<Client, keyof BaseEntity>

export class CreateClientUseCase implements UseCase<CreateClientInput, Client> {
    constructor(private createClientRepository: CreateClientRepository) {}

    async execute(input: CreateClientInput) {
        try {
            const client = await this.createClientRepository.create(input)
            return {
                success: true,
                result: client,
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
