import 'server-only'

import {LESSON_BY_SLUG_QUERY, LESSON_SLUGS_QUERY, LESSONS_QUERY} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/fetch'

export type LessonListItem = {
  _id: string
  title: string
  slug: string
  videoUrl: string
  poster?: unknown
  duration: string
  isFreePreview?: boolean
  studentCount?: number
  keyPoints?: string[]
  proTip?: string
}

export type LessonDetail = LessonListItem & {
  notes?: unknown
  resources?: Array<{_key: string; type: string; title: string; description?: string; url: string}>
  parentCourses?: Array<{_id: string; title: string; slug: string}>
}

export async function getLessons(): Promise<LessonListItem[]> {
  if (!process.env.SANITY_API_READ_TOKEN) return []
  try {
    const data = (await sanityFetch({
      query: LESSONS_QUERY,
      tags: ['lesson'],
    })) as unknown as LessonListItem[] | null
    return data ?? []
  } catch {
    return []
  }
}

export async function getLessonBySlug(slug: string): Promise<LessonDetail | null> {
  if (!process.env.SANITY_API_READ_TOKEN) return null
  try {
    const data = (await sanityFetch({
      query: LESSON_BY_SLUG_QUERY,
      params: {slug},
      tags: [`lesson:${slug}`, 'lesson'],
    })) as unknown as LessonDetail | null
    return data ?? null
  } catch {
    return null
  }
}

export async function getLessonSlugs(): Promise<string[]> {
  if (!process.env.SANITY_API_READ_TOKEN) return []
  try {
    const rows = (await sanityFetch({
      query: LESSON_SLUGS_QUERY,
      tags: ['lesson'],
    })) as unknown as Array<{slug: string}>
    return rows.map((r) => r.slug).filter(Boolean)
  } catch {
    return []
  }
}
