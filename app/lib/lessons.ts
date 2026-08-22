import 'server-only'

import {LESSON_BY_SLUG_QUERY, LESSON_SLUGS_QUERY, LESSONS_QUERY} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/fetch'
import {hasServerReadToken} from '@/sanity/lib/serverClient'
import type {
  LESSON_BY_SLUG_QUERY_RESULT,
  LESSON_SLUGS_QUERY_RESULT,
  LESSONS_QUERY_RESULT,
} from '@/sanity.types'

export type LessonListItem = LESSONS_QUERY_RESULT[number]
export type LessonDetail = NonNullable<LESSON_BY_SLUG_QUERY_RESULT>

export async function getLessons(): Promise<LessonListItem[]> {
  if (!hasServerReadToken()) return []
  try {
    const data = await sanityFetch<LESSONS_QUERY_RESULT>({
      query: LESSONS_QUERY,
      tags: ['lesson'],
    })
    return data ?? []
  } catch (err) {
    console.error('[getLessons] fetch failed', err)
    return []
  }
}

export async function getLessonBySlug(slug: string): Promise<LessonDetail | null> {
  if (!hasServerReadToken()) return null
  try {
    const data = await sanityFetch<LESSON_BY_SLUG_QUERY_RESULT>({
      query: LESSON_BY_SLUG_QUERY,
      params: {slug},
      tags: [`lesson:${slug}`, 'lesson'],
    })
    return data ?? null
  } catch (err) {
    console.error('[getLessonBySlug] fetch failed', err)
    return null
  }
}

export async function getLessonSlugs(): Promise<string[]> {
  if (!hasServerReadToken()) return []
  try {
    const rows = await sanityFetch<LESSON_SLUGS_QUERY_RESULT>({
      query: LESSON_SLUGS_QUERY,
      tags: ['lesson'],
    })
    return rows.map((r) => r.slug).filter(Boolean)
  } catch (err) {
    console.error('[getLessonSlugs] fetch failed', err)
    return []
  }
}
