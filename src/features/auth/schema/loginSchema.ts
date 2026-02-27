import { z } from "zod"
import passwordSchema from "./passwordSchema"

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: passwordSchema
})

export type LoginSchema = z.infer<typeof loginSchema>


