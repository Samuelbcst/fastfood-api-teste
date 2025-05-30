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
    ],
}

const swaggerSpec = swaggerJSDoc(options)

export { swaggerSpec, swaggerUi }
