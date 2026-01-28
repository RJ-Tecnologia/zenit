import type { WebhookEvent } from '@clerk/nextjs/server'
import { headers } from 'next/headers'
import { Webhook } from 'svix'
import { env } from '@/lib/env'
import { prisma as db } from '@/lib/prisma'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = env.CLERK_WEBHOOK_SECRET

  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400
    })
  }

  const eventType = evt.type

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data

    if (!id || !email_addresses || !first_name || !last_name) {
      return new Response('Error occured -- missing data', {
        status: 400
      })
    }

    const email = email_addresses[0].email_address
    const name = `${first_name} ${last_name}`.trim()

    await db.user.create({
      data: {
        clerkUserId: id,
        email: email,
        name: name,
        avatarUrl: image_url
      }
    })
  }

  if (eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data

    if (!first_name || !last_name) {
      return new Response('Error occured -- missing data', {
        status: 400
      })
    }

    const email = email_addresses[0]?.email_address
    const name = `${first_name} ${last_name}`.trim()

    await db.user.update({
      where: { clerkUserId: id },
      data: {
        email: email,
        name: name,
        avatarUrl: image_url
      }
    })
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data

    await db.user.delete({
      where: { clerkUserId: id }
    })
  }

  return new Response('', { status: 200 })
}
