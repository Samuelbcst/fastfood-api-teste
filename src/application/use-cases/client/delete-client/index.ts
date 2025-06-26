import { Client } from "../../../../domain/entities/client/client"
import { UseCase } from "../../base-use-case"
import { CustomError } from "../../custom-error"
import { DeleteClientRepository } from "../../../ports/client/delete-client-repository"

interface Input {
    id: number
}

export class DeleteClientUseCase implements UseCase<Input, Client | null> {
    constructor(private deleteClientRepository: DeleteClientRepository) {}

    async execute(input: Input) {
        try {
            const deleted = await this.deleteClientRepository.execute(input)
            if (!deleted) {
                return {
                    success: false,
                    result: null,
                    error: new CustomError(404, "Client not found."),
                }
            }
            return {
                success: true,
                result: deleted,
            }
        } catch (error) {
            return {
                success: false,
                result: null,
            }
        }
    }

    onFinish(): Promise<void> {
        return this.deleteClientRepository.finish()
    }
}
