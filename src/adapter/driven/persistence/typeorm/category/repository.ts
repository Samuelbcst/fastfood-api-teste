//src/adapter/driven/persistence/typeorm/category/repository.ts

import { Repository } from "typeorm";
import { CategoryModel } from "./model";
import { CategoryRepository } from "../../../../../core/application/ports/category/repository";
import { Category } from "../../../../../core/domain/category";

export class CategoryTypeORMRepository implements CategoryRepository {
    constructor(private readonly repository: Repository<CategoryModel>) {}

    private toDomain(model: CategoryModel): Category {
        return new Category(model.id, model.name, model.description);
    }

    private toModel(entity: Category): CategoryModel {
        const model = new CategoryModel();
        model.id = entity.id;
        model.name = entity.name;
        model.description = entity.description;
        return model;
    }

    async findById(id: Category["id"]): Promise<Category | null> {
        const model = await this.repository.findOneBy({ id });
        return model ? this.toDomain(model) : null;
    }

    async findFirst(props: Partial<Category>): Promise<Category | null> {
        const model = await this.repository.findOne({ where: props });
        return model ? this.toDomain(model) : null;
    }

    async findAll(props?: Partial<Category>): Promise<Category[]> {
        const models = await this.repository.find({ where: props });
        return models.map(this.toDomain);
    }

    async insertAndSave(entity: Category): Promise<Category> {
        const model = this.toModel(entity);
        const saved = await this.repository.save(model);
        return this.toDomain(saved);
    }

    async patch(entity: Category): Promise<Category> {
        const model = this.toModel(entity);
        const updated = await this.repository.save(model);
        return this.toDomain(updated);
    }

    async removeById(id: Category["id"]): Promise<void> {
        await this.repository.delete({ id });
    }
}
