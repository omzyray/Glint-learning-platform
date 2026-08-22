import 'server-only'

import {COURSE_BY_SLUG_QUERY, COURSES_QUERY, COURSE_SLUGS_QUERY} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/fetch'

// ---------------------------------------------------------------------------
// Canonical Course types (aligned to Sanity schema)
// ---------------------------------------------------------------------------

export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced'
export type CourseIcon = 'next' | 'docker' | 'typescript'

/**
 * UI-facing Course shape for the catalog/home.
 * Fields come strictly from Sanity; duration + icon are derived/fallback for the existing UI.
 */
export type Course = {
  slug: string
  title: string
  summary: string
  level: CourseLevel
  duration: string
  modulesCount: number
  icon: CourseIcon
  // Rich fields (optional for catalog but available for detail pages)
  price?: number
  isPopular?: boolean
  studentCount?: number
  coverImage?: unknown
  instructor?: {name: string; slug: string; expertise?: string; photo?: unknown}
  category?: {title: string; slug: string; icon?: unknown}
}

export type CourseDetail = {
  _id: string
  slug: string
  title: string
  summary: string
  coverImage: unknown
  level: CourseLevel
  price?: number
  isPopular?: boolean
  studentCount?: number
  learningOutcomes?: Array<{_key: string; icon?: string; title: string; description: string}>
  instructor: {_id: string; name: string; slug: string; expertise?: string; photo?: unknown; bio?: unknown}
  category: {_id: string; title: string; slug: string; description?: string; icon?: unknown}
  modules: Array<{
    _key: string
    title: string
    summary?: string
    lessons: Array<{
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
    }>
  }>
}

// ---------------------------------------------------------------------------
// Fallback (when Sanity token / dataset unavailable, e.g. local build without secrets)
// ---------------------------------------------------------------------------

const STORED_COURSES: Course[] = [
  {
    slug: 'nextjs-for-production',
    title: 'Next.js for Production',
    summary: 'Build scalable, high-performance web applications with Next.js.',
    level: 'Intermediate',
    duration: '18h 24m',
    modulesCount: 12,
    icon: 'next',
  },
  {
    slug: 'docker-essentials',
    title: 'Docker Essentials',
    summary: 'Containerize applications and streamline your development workflow.',
    level: 'Beginner',
    duration: '10h 12m',
    modulesCount: 8,
    icon: 'docker',
  },
  {
    slug: 'typescript-deep-dive',
    title: 'TypeScript Deep Dive',
    summary: 'Go beyond the basics and write safer, more expressive code.',
    level: 'Intermediate',
    duration: '14h 36m',
    modulesCount: 10,
    icon: 'typescript',
  },
]

function isAvailableCourse(c: Course): boolean {
  return Boolean(
    c.slug && c.title && c.summary && c.level && c.duration && typeof c.modulesCount === 'number' && c.icon,
  )
}

function deriveIcon(slug: string, categorySlug?: string): CourseIcon {
  const s = `${slug} ${categorySlug ?? ''}`.toLowerCase()
  if (s.includes('docker')) return 'docker'
  if (s.includes('typescript') || s.includes('ts ')) return 'typescript'
  return 'next'
}

function deriveDuration(modulesCount: number): string {
  // Fallback when lesson durations are not aggregated; keep plausible
  if (modulesCount >= 12) return '18h 24m'
  if (modulesCount >= 10) return '14h 36m'
  return '10h 12m'
}

// ---------------------------------------------------------------------------
// Fetchers — server-only, tagged for Next cache invalidation
// ---------------------------------------------------------------------------

/**
 * Fetch courses from the private Sanity dataset.
 * - Server-only (uses SANITY_API_READ_TOKEN via sanityFetch, never exposed to browser).
 * - Returns only available records; falls back to stored demo courses when
 *   the dataset/token is not configured (so `next build` without secrets still succeeds).
 */
export async function getCourses(): Promise<Course[]> {
  try {
    // If no token is configured, immediately fall back (private dataset requires auth)
    if (!process.env.SANITY_API_READ_TOKEN) {
      return STORED_COURSES.filter(isAvailableCourse)
    }

    const data = await sanityFetch({
      query: COURSES_QUERY,
      tags: ['course'],
      revalidate: 60,
    })

    const typed = data as unknown as CourseDetail[] | null
    if (!typed || typed.length === 0) {
      return STORED_COURSES.filter(isAvailableCourse)
    }

    const mapped: Course[] = typed.map((c) => {
      // Derive UI fields that are not stored directly on the course document
      const rawCount = (c as unknown as {modulesCount?: unknown}).modulesCount
      const modulesCount =
        typeof rawCount === 'number' ? rawCount : Array.isArray(c.modules) ? c.modules.length : 0
      // For legacy UI the icon was a stored enum; now derive from slug/category so seeded data still renders
      const icon = deriveIcon(c.slug, (c.category as unknown as {slug?: string})?.slug)
      const duration = deriveDuration(modulesCount)

      return {
        slug: c.slug,
        title: c.title,
        summary: c.summary,
        level: c.level,
        duration,
        modulesCount,
        icon,
        price: c.price,
        isPopular: c.isPopular,
        studentCount: c.studentCount,
        coverImage: c.coverImage as unknown,
        instructor: c.instructor
          ? {
              name: c.instructor.name,
              slug: c.instructor.slug,
              expertise: c.instructor.expertise,
              photo: c.instructor.photo,
            }
          : undefined,
        category: c.category
          ? {title: c.category.title, slug: c.category.slug, icon: (c.category as {icon?: unknown}).icon}
          : undefined,
      }
    })

    // Only return grounded records (filters out malformed)
    const available = mapped.filter(isAvailableCourse)
    return available.length ? available : STORED_COURSES.filter(isAvailableCourse)
  } catch {
    // Private dataset read may fail (401/403) when token invalid — degrade gracefully
    return STORED_COURSES.filter(isAvailableCourse)
  }
}

export async function getCourseBySlug(slug: string): Promise<CourseDetail | null> {
  if (!process.env.SANITY_API_READ_TOKEN) return null
  try {
    const course = await sanityFetch({
      query: COURSE_BY_SLUG_QUERY,
      params: {slug},
      tags: [`course:${slug}`, 'course'],
    })
    return (course as unknown as CourseDetail | null) ?? null
  } catch {
    return null
  }
}

export async function getCourseSlugs(): Promise<string[]> {
  if (!process.env.SANITY_API_READ_TOKEN) return []
  try {
    const rows = (await sanityFetch({
      query: COURSE_SLUGS_QUERY,
      tags: ['course'],
    })) as unknown as Array<{slug: string}>
    return rows.map((r) => r.slug).filter(Boolean)
  } catch {
    return []
  }
}
