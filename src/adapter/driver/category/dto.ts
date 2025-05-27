// src/adapter/driver/category/dto.ts

// DTO para receber dados do cliente na criação
export interface CreateCategoryRequestDTO {
    name: string;
    description?: string;
}

// DTO para enviar dados ao cliente na resposta
export interface CategoryResponseDTO {
    id: number;
    name: string;
    description?: string;
}
