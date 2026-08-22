import 'server-only'

import {CATEGORIES_QUERY, CATEGORY_BY_SLUG_QUERY} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/fetch'
import {hasServerReadToken} from '@/sanity/lib/serverClient'
import type {CATEGORIES_QUERY_RESULT, CATEGORY_BY_SLUG_QUERY_RESULT} from '@/sanity.types'

export type Category = CATEGORIES_QUERY_RESULT[number]

export async function getCategories(): Promise<Category[]> {
  if (!hasServerReadToken()) return []
  try {
    const data = await sanityFetch<CATEGORIES_QUERY_RESULT>({
      query: CATEGORIES_QUERY,
      tags: ['category'],
    })
    return data ?? []
  } catch (err) {
    console.error('[getCategories] fetch failed', err)
    return []
  }
}

export async function getCategoryBySlug(slug: string): Promise<CATEGORY_BY_SLUG_QUERY_RESULT> {
  if (!hasServerReadToken()) return null
  try {
    const data = await sanityFetch<CATEGORY_BY_SLUG_QUERY_RESULT>({
      query: CATEGORY_BY_SLUG_QUERY,
      params: {slug},
      tags: [`category:${slug}`, 'category'],
    })
    return data ?? null
  } catch (err) {
    console.error('[getCategoryBySlug] fetch failed', err)
    return null
  }
}
