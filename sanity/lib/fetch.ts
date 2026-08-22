import 'server-only'

import {serverClient} from './serverClient'

import type {QueryParams} from 'next-sanity'

/**
 * Server-only typed fetch helper for the private Sanity dataset.
 * - Keeps the read token on the server (via serverClient).
 * - Uses Next.js cache tags for on-demand revalidation (e.g. `revalidateTag('course')`).
 * - No token ever reaches the browser.
 *
 * Drop-in replacement for the scaffolded live content API for now
 * (live helper is deferred per AGENTS.md private-dataset rule).
 */
export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 60,
  tags = [],
}: {
  query: string
  params?: QueryParams
  revalidate?: number | false
  tags?: string[]
}): Promise<T> {
  return serverClient.fetch(query, params, {
    next: {
      revalidate,
      tags,
    },
  }) as Promise<T>
}
