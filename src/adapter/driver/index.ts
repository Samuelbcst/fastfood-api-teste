import express from "express"
import { HOST_PORT } from "../../env-variables"
import routes from "./routes"

const app = express()

app.use(express.json())

app.use(routes)

app.listen(HOST_PORT, () =>
    console.log(`Server is running on port ${HOST_PORT}`)
)
