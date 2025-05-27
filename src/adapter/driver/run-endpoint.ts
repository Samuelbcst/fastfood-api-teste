import { Request, Response } from "express"

type ExectuableEndpoint = (params: Request["params"]) => unknown

export const runEndpoint = (
    fn: ExectuableEndpoint,
    expectedSuccessCode: 200 | 201
) => {
    return async (req: Request, res: Response) => {
        try {
            const result = await fn(req.params)
            res.status(expectedSuccessCode).json(result)
            return
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: "Internal server error" })
            return
        }
    }
}
