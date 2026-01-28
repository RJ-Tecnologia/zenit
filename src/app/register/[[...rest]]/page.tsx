import { SignUp } from '@clerk/nextjs'

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <SignUp />
    </div>
  )
}
