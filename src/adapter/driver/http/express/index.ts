import express from "express"
import { HOST_PORT } from "../../../../env-variables"
import routes from "./routes"
import { swaggerSpec, swaggerUi } from "./swagger"

const app = express()

app.use(express.json())

app.use("/api", routes)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(HOST_PORT, () =>
    console.log(`Server is running on port ${HOST_PORT}`)
)
