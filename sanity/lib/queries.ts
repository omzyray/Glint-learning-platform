import {defineQuery} from 'next-sanity'

// ---------------------------------------------------------------------------
// Fragments
// ---------------------------------------------------------------------------

/** Reusable image fragment with hotspot/crop + lqip */
export const imageFragment = /* groq */ `
  asset->{
    _id,
    url,
    metadata { lqip, dimensions { width, height } }
  },
  alt,
  hotspot,
  crop
`

// ---------------------------------------------------------------------------
// Category
// ---------------------------------------------------------------------------

export const CATEGORIES_QUERY = defineQuery(/* groq */ `
  *[_type == "category" && defined(slug.current)] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    icon { ${imageFragment} }
  }
`)

export const CATEGORY_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "category" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    description,
    icon { ${imageFragment} }
  }
`)

// ---------------------------------------------------------------------------
// Instructor
// ---------------------------------------------------------------------------

export const INSTRUCTORS_QUERY = defineQuery(/* groq */ `
  *[_type == "instructor" && defined(slug.current)] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    expertise,
    photo { ${imageFragment} },
    bio
  }
`)

export const INSTRUCTOR_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "instructor" && slug.current == $slug][0]{
    _id,
    name,
    "slug": slug.current,
    expertise,
    photo { ${imageFragment} },
    bio
  }
`)

// ---------------------------------------------------------------------------
// Lesson
// ---------------------------------------------------------------------------

export const LESSONS_QUERY = defineQuery(/* groq */ `
  *[_type == "lesson" && defined(slug.current)] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    videoUrl,
    poster { ${imageFragment} },
    duration,
    isFreePreview,
    studentCount,
    keyPoints,
    proTip
  }
`)

export const LESSON_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "lesson" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    videoUrl,
    poster { ${imageFragment} },
    duration,
    isFreePreview,
    studentCount,
    notes,
    keyPoints,
    proTip,
    resources[]{
      _key,
      type,
      title,
      description,
      url
    },
    // Reverse reference: find the course(s) that include this lesson in any module
    "parentCourses": *[_type == "course" && references(^._id)]{
      _id,
      title,
      "slug": slug.current
    }
  }
`)

export const LESSON_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "lesson" && defined(slug.current)]{ "slug": slug.current }
`)

// ---------------------------------------------------------------------------
// Course
// ---------------------------------------------------------------------------

/**
 * Catalog query — lean projection for the home / catalog grid.
 * Includes nested instructor + category expansion and module count.
 */
export const COURSES_QUERY = defineQuery(/* groq */ `
  *[_type == "course" && defined(slug.current)] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    coverImage { ${imageFragment} },
    level,
    price,
    isPopular,
    studentCount,
    "modulesCount": count(modules),
    learningOutcomes[]{
      _key,
      icon,
      title,
      description
    },
    instructor->{
      _id,
      name,
      "slug": slug.current,
      expertise,
      photo { ${imageFragment} }
    },
    category->{
      _id,
      title,
      "slug": slug.current,
      icon { ${imageFragment} }
    }
  }
`)
export const COURSE_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "course" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    summary,
    coverImage { ${imageFragment} },
    level,
    price,
    isPopular,
    studentCount,
    learningOutcomes[]{
      _key,
      icon,
      title,
      description
    },
    instructor->{
      _id,
      name,
      "slug": slug.current,
      expertise,
      photo { ${imageFragment} },
      bio
    },
    category->{
      _id,
      title,
      "slug": slug.current,
      description,
      icon { ${imageFragment} }
    },
    modules[]{
      _key,
      title,
      summary,
      lessons[]->{
        _id,
        title,
        "slug": slug.current,
        videoUrl,
        poster { ${imageFragment} },
        duration,
        isFreePreview,
        studentCount,
        keyPoints,
        proTip
      }
    }
  }
`)

export const COURSE_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "course" && defined(slug.current)]{ "slug": slug.current }
`)

// ---------------------------------------------------------------------------
// Video (internal lookup, one per unique video URL)
// ---------------------------------------------------------------------------

export const VIDEO_BY_URL_QUERY = defineQuery(/* groq */ `
  *[_type == "video" && url == $url][0]{
    _id,
    url,
    chapters[]{
      _key,
      startSeconds,
      label
    },
    chunks[]{
      _key,
      startSeconds,
      text
    }
  }
`)

export const VIDEOS_QUERY = defineQuery(/* groq */ `
  *[_type == "video"] | order(url asc) {
    _id,
    url,
    "chaptersCount": count(chapters),
    "chunksCount": count(chunks)
  }
`)
