import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
  CLERK_SECRET_KEY: z.string(),
  CLERK_WEBHOOK_SECRET: z.string(),
  DATABASE_URL: z.string().startsWith('postgresql')
})

const result = envSchema.safeParse(process.env)

if (!result.success) {
  console.error('Invalid Environment Variables:', result.error.message)
  throw new Error('Invalid Enviroment Variables')
}

export const env = result.data
