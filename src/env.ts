import { z } from 'zod'

const envSchema = z.object({
  VITE_BASE_URL: z.string(),
  VITE_API_URL: z.string()
})

const result = envSchema.safeParse(import.meta.env)

if (!result.data) {
  console.error('Invalid environment variables:', result.error.message)
  throw new Error('Invalid environment variables')
}

export const env = result.data
