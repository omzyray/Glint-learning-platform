import {createClient} from 'next-sanity'

import {apiVersion, dataset, projectId} from '../env'

/**
 * Base Sanity client — no token, safe to import in browser.
 * - useCdn: true for fast CDN reads
 * - perspective: published (no draft overlay)
 * - stega disabled by default; draft-mode routes enable it when needed
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
  stega: false,
})
