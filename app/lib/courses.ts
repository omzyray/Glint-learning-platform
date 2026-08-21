// Server-side content path for course catalog.
// In production this module fetches from the private Sanity dataset via a server-only
// client (e.g. `next-sanity` with `SANITY_API_READ_TOKEN`). Displayed course and lesson
// details must come only from returned data — never invent records.

export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";
export type CourseIcon = "next" | "docker" | "typescript";

export type Course = {
  slug: string;
  title: string;
  summary: string;
  level: CourseLevel;
  duration: string;
  modulesCount: number;
  icon: CourseIcon;
};

// GROQ equivalent (for future Sanity wiring):
// *[_type == "course"]{ "slug": slug.current, title, summary, level, duration, modulesCount, icon } | order(title asc)

const STORED_COURSES: Course[] = [
  {
    slug: "nextjs-for-production",
    title: "Next.js for Production",
    summary: "Build scalable, high-performance web applications with Next.js.",
    level: "Intermediate",
    duration: "18h 24m",
    modulesCount: 12,
    icon: "next",
  },
  {
    slug: "docker-essentials",
    title: "Docker Essentials",
    summary: "Containerize applications and streamline your development workflow.",
    level: "Beginner",
    duration: "10h 12m",
    modulesCount: 8,
    icon: "docker",
  },
  {
    slug: "typescript-deep-dive",
    title: "TypeScript Deep Dive",
    summary: "Go beyond the basics and write safer, more expressive code.",
    level: "Intermediate",
    duration: "14h 36m",
    modulesCount: 10,
    icon: "typescript",
  },
];

function isAvailableCourse(c: Course): boolean {
  return Boolean(
    c.slug &&
      c.title &&
      c.summary &&
      c.level &&
      c.duration &&
      typeof c.modulesCount === "number" &&
      c.icon,
  );
}

/**
 * Fetch courses from the server-side content path.
 * - Typed fields only; no hardcoded fallbacks in the UI.
 * - Renders only records that exist; unavailable courses are omitted.
 * - In production replace STORED_COURSES with a Sanity fetch:
 *   `await sanityClient.fetch<Course[]>(COURSES_QUERY, {}, { token: process.env.SANITY_API_READ_TOKEN })`
 */
export async function getCourses(): Promise<Course[]> {
  // Placeholder for private-dataset fetch — currently returns typed stored records.
  // Filter ensures only available courses are returned.
  return STORED_COURSES.filter(isAvailableCourse);
}
