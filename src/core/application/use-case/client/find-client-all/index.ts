import { FindClientAllRepository } from "../../../port/client/find-client-all-repository"
import { Client } from "../../../../domain/client"
import { UseCase } from "../../base-use-case"

export class FindClientAllUseCase implements UseCase<void, Client[]> {
    constructor(private findClientAllRepository: FindClientAllRepository) {}

    async execute() {
        try {
            const clients = await this.findClientAllRepository.execute()
            return {
                success: true,
                result: clients,
            }
        } catch (error) {
            return {
                success: false,
                result: [],
            }
        }
    }

    onFinish(): Promise<void> {
        return this.findClientAllRepository.finish()
    }
}
