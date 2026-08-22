import 'server-only'

import {INSTRUCTOR_BY_SLUG_QUERY, INSTRUCTORS_QUERY} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/fetch'

export type Instructor = {
  _id: string
  name: string
  slug: string
  expertise?: string
  photo?: unknown
  bio?: unknown
}

export async function getInstructors(): Promise<Instructor[]> {
  if (!process.env.SANITY_API_READ_TOKEN) return []
  try {
    const data = (await sanityFetch({
      query: INSTRUCTORS_QUERY,
      tags: ['instructor'],
    })) as unknown as Instructor[] | null
    return data ?? []
  } catch {
    return []
  }
}

export async function getInstructorBySlug(slug: string): Promise<Instructor | null> {
  if (!process.env.SANITY_API_READ_TOKEN) return null
  try {
    const data = (await sanityFetch({
      query: INSTRUCTOR_BY_SLUG_QUERY,
      params: {slug},
      tags: [`instructor:${slug}`, 'instructor'],
    })) as unknown as Instructor | null
    return data ?? null
  } catch {
    return null
  }
}
