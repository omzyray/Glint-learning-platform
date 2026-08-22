import 'server-only'

import {CATEGORIES_QUERY, CATEGORY_BY_SLUG_QUERY} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/fetch'

export type Category = {
  _id: string
  title: string
  slug: string
  description?: string
  icon?: unknown
}

export async function getCategories(): Promise<Category[]> {
  if (!process.env.SANITY_API_READ_TOKEN) return []
  try {
    const data = (await sanityFetch({
      query: CATEGORIES_QUERY,
      tags: ['category'],
    })) as unknown as Category[] | null
    return data ?? []
  } catch {
    return []
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (!process.env.SANITY_API_READ_TOKEN) return null
  try {
    const data = (await sanityFetch({
      query: CATEGORY_BY_SLUG_QUERY,
      params: {slug},
      tags: [`category:${slug}`, 'category'],
    })) as unknown as Category | null
    return data ?? null
  } catch {
    return null
  }
}
