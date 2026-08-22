import 'server-only'

import {INSTRUCTOR_BY_SLUG_QUERY, INSTRUCTORS_QUERY} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/fetch'
import {hasServerReadToken} from '@/sanity/lib/serverClient'
import type {INSTRUCTOR_BY_SLUG_QUERY_RESULT, INSTRUCTORS_QUERY_RESULT} from '@/sanity.types'

export type Instructor = INSTRUCTORS_QUERY_RESULT[number]

export async function getInstructors(): Promise<Instructor[]> {
  if (!hasServerReadToken()) return []
  try {
    const data = await sanityFetch<INSTRUCTORS_QUERY_RESULT>({
      query: INSTRUCTORS_QUERY,
      tags: ['instructor'],
    })
    return data ?? []
  } catch (err) {
    console.error('[getInstructors] fetch failed', err)
    return []
  }
}

export async function getInstructorBySlug(slug: string): Promise<INSTRUCTOR_BY_SLUG_QUERY_RESULT> {
  if (!hasServerReadToken()) return null
  try {
    const data = await sanityFetch<INSTRUCTOR_BY_SLUG_QUERY_RESULT>({
      query: INSTRUCTOR_BY_SLUG_QUERY,
      params: {slug},
      tags: [`instructor:${slug}`, 'instructor'],
    })
    return data ?? null
  } catch (err) {
    console.error('[getInstructorBySlug] fetch failed', err)
    return null
  }
}
