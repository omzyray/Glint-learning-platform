import 'server-only'

import {createClient} from 'next-sanity'

import {apiVersion, dataset, projectId} from '../env'

const token = process.env.SANITY_API_READ_TOKEN

/**
 * Server-only Sanity client for the private dataset.
 * - Keeps SANITY_API_READ_TOKEN on the server (never imported in client components).
 * - useCdn: false guarantees fresh data after webhook revalidation; override per-query if desired.
 * - perspective: published — never expose drafts to learners.
 *
 * All web-app data fetching (catalog, course, lesson, instructor) must go through this client
 * or the sanityFetch helper that wraps it. The browser never holds a token.
 */
export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'published',
  token,
  stega: false,
})

/**
 * Helper to assert a read token is configured in server environments.
 * Returns false when missing so callers can gracefully fall back (e.g. build without secrets).
 */
export function hasServerReadToken(): boolean {
  return Boolean(token)
}
