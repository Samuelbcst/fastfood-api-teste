// src/core/domain/category.ts
import { BaseEntity } from "./base-entity"

export class Category implements BaseEntity {
    constructor(
        public id: number,
        public name: string,
        public description?: string,
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date(),
    ) {}

    // Adicione métodos de domínio se precisar!
    // ex: isActive(), changeName(), etc.
}
