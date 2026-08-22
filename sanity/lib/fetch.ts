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
export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  revalidate = 60,
  tags = [],
}: {
  query: QueryString
  params?: QueryParams
  revalidate?: number | false
  tags?: string[]
}) {
  return serverClient.fetch(query, params, {
    // When tags are present, Next recommends `revalidate: false` and rely on tag invalidation.
    next: {
      revalidate: tags.length ? false : revalidate,
      tags,
    },
  })
}
