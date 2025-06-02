import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "API Documentation",
        version: "1.0.0",
        description: "Automatically generated Swagger documentation",
    },
    servers: [
        {
            url: "http://localhost:3000/api/v1",
            description: "Development server",
        },
    ],
}

const options = {
    swaggerDefinition,
    apis: [
        "src/adapter/driver/http/express/category/index.ts",
        "dist/adapter/driver/http/express/category/index.js",
        "src/adapter/driver/http/express/product/index.ts",
        "dist/adapter/driver/http/express/product/index.js",
        "src/adapter/driver/http/express/client/index.ts",
        "dist/adapter/driver/http/express/client/index.js",
        "src/adapter/driver/http/express/order/index.ts",
        "dist/adapter/driver/http/express/order/index.js",
        "src/adapter/driver/http/express/order-item/index.ts",
        "dist/adapter/driver/http/express/order-item/index.js",
        "src/adapter/driver/http/express/payment/index.ts",
        "dist/adapter/driver/http/express/payment/index.js",
    ],
}

const swaggerSpec = swaggerJSDoc(options)

export { swaggerSpec, swaggerUi }

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         description:
 *           type: string
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         categoryId:
 *           type: integer
 *         active:
 *           type: boolean
 *     Client:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         cpf:
 *           type: string
 *         description:
 *           type: string
 *       required:
 *         - name
 *         - email
 *         - cpf
 */
