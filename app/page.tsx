import Link from "next/link";
import { Search, Bell, ArrowRight, Clock, BarChart3, FileText, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFFBF8]">
      {/* Shell: diagonal hatch strips sit immediately adjacent to central card */}
      <div className="mx-auto flex min-h-screen w-full max-w-[1476px] items-stretch">
        <div
          aria-hidden
          className="hidden w-[18px] shrink-0 sm:block"
          style={{
            backgroundColor: "#FFFBF8",
            backgroundImage: "repeating-linear-gradient(135deg, #FFD8B8 0 1px, transparent 1px 10px)",
            opacity: 0.38,
          }}
        />
        <div className="relative mx-auto flex min-h-screen w-full max-w-[1440px] flex-1 flex-col bg-[#FFFCFA] sm:border-x sm:border-[#F1E9E0]/70 sm:shadow-[0_0_0_1px_rgba(241,232,224,0.35)]">
          {/* Header – increased height/spacing on mobile */}
          <header className="flex h-[68px] shrink-0 items-center justify-between border-b border-[#F0E6DE] bg-[#FFFCFA] px-5 sm:h-[72px] sm:px-6 lg:px-8">
            <div className="flex items-center gap-6 sm:gap-8">
              <Link href="/" className="flex items-center gap-2.5">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M3 3L12 21L15 14L12 7L3 3Z" fill="#F97316" />
                  <path d="M12 7L15 14L21 3L12 7Z" fill="#FB923C" />
                </svg>
                <span className="font-sans text-[19px] font-semibold tracking-tight text-[#0F172A] sm:text-[20px]">Glint</span>
              </Link>
              <nav className="hidden items-center gap-7 font-sans text-[14px] font-medium sm:flex">
                <a href="#" className="text-[#0F172A]">
                  Courses
                </a>
                <a href="#" className="text-[#0F172A]">
                  My Learning
                </a>
              </nav>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <button
                aria-label="Notifications"
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#64748B] hover:bg-white hover:text-[#0F172A] sm:h-9 sm:w-9"
              >
                <Bell className="h-[22px] w-[22px]" strokeWidth={1.7} />
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://i.pravatar.cc/100?img=5"
                alt="User avatar"
                width={36}
                height={36}
                className="h-9 w-9 rounded-full object-cover ring-1 ring-[#F1E9E0] sm:h-9 sm:w-9"
              />
              <button className="text-[#64748B] sm:hidden" aria-label="Menu">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </header>

          {/* Hero – spacious vertical rhythm, scaled for mobile (reduced slightly for proportional mobile) */}
          <section className="bg-[#FFFCFA] px-5 pb-10 pt-12 text-center sm:px-6 sm:pb-14 sm:pt-[68px] lg:px-8 lg:pb-16 lg:pt-[76px]">
            <div className="inline-flex items-center rounded-[8px] border border-[#FFE4D1] bg-[#FFF1E6] px-3.5 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#E86A2E]">
              Intelligent Learning
            </div>

            <h1 className="font-display mx-auto mt-6 max-w-[720px] text-[36px] font-bold leading-[0.98] tracking-[-0.025em] text-[#0F172A] sm:text-[52px] sm:leading-[0.98] lg:text-[60px]">
              Search your learning
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>in plain English.
            </h1>

            <p className="mx-auto mt-4 max-w-[560px] font-sans text-[14px] leading-[24px] text-[#64748B] sm:mt-6 sm:text-[17px] sm:leading-7">
              Glint understands what you want to learn and
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>finds the exact lessons across all your courses.
            </p>

            <a
              href="#courses"
              className="mt-7 inline-flex h-[44px] items-center gap-2.5 rounded-[10px] bg-[#E86A2E] px-7 font-sans text-[15px] font-medium text-white shadow-[0_2px_8px_rgba(232,106,46,0.25)] transition-colors hover:bg-[#EA580C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FB923C] focus-visible:ring-offset-2 sm:mt-9 sm:h-[48px] sm:px-7 sm:text-[15px]"
            >
              Explore Courses
              <ArrowRight className="h-[18px] w-[18px]" />
            </a>

            {/* Search bar – width/height/radius/spacing scaled on mobile */}
            <div className="mx-auto mt-9 flex h-[56px] max-w-[720px] items-center gap-3 rounded-[14px] border border-[#F1E8E0] bg-white px-4 shadow-[0_2px_8px_rgba(15,23,42,0.06)] sm:mt-12 sm:h-[64px] sm:rounded-[14px] sm:px-5">
              <Search className="h-[22px] w-[22px] shrink-0 text-[#64748B]" strokeWidth={2} />
              <input
                aria-label="Search learning"
                placeholder="Ask anything about your learning..."
                className="h-full flex-1 bg-transparent font-sans text-[16px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none sm:text-[16px]"
              />
              <div className="hidden shrink-0 items-center gap-1.5 rounded-[8px] border border-[#E2E8F0] bg-[#F8FAFC] px-2.5 py-2 font-sans text-[13px] font-medium leading-none text-[#64748B] sm:inline-flex">
                <span className="text-[14px] leading-none">⌘</span>
                <span>K</span>
              </div>
            </div>
          </section>

          {/* All Courses – single column on narrow mobile, generous padding/typography/height */}
          <section id="courses" className="border-t border-[#F1E9E0]/60 bg-[#FFFCFA] px-5 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-[23px] font-bold tracking-tight text-[#0F172A] sm:text-[24px]">All Courses</h2>
              <a
                href="#"
                className="inline-flex items-center gap-1.5 font-sans text-[13.5px] font-medium text-[#E86A2E] hover:text-[#EA580C]"
              >
                View all courses
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3 lg:gap-6">
              {/* Card 1 – Next.js */}
              <article className="flex min-h-[272px] flex-col rounded-[16px] border border-[#F1E9E0] bg-white p-7 shadow-sm transition-shadow hover:shadow-md sm:min-h-[320px] sm:p-7">
                <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[12px] bg-[#0A0A0F]">
                  <span className="font-sans text-[28px] font-bold tracking-tighter text-white">N</span>
                </div>
                <h3 className="mt-5 font-display text-[18px] font-semibold leading-6 text-[#0F172A]">Next.js for Production</h3>
                <p className="mt-2 font-sans text-[13.5px] leading-6 text-[#64748B]">Build scalable, high-performance web applications with Next.js.</p>
                <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-[#F1F5F9] pt-5 text-[11.5px] font-sans text-[#64748B]">
                  <span className="inline-flex items-center gap-1.5">
                    <BarChart3 className="h-3.5 w-3.5" /> Intermediate
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> 18h 24m
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5" /> 12 modules
                  </span>
                </div>
              </article>

              {/* Card 2 – Docker */}
              <article className="flex min-h-[272px] flex-col rounded-[16px] border border-[#F1E9E0] bg-white p-7 shadow-sm transition-shadow hover:shadow-md sm:min-h-[320px] sm:p-7">
                <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[12px] bg-white">
                  <svg width="46" height="32" viewBox="0 0 48 32" fill="none" aria-hidden="true">
                    <path
                      d="M6 19C6 12 11 9 18 11L29 13.5C34 14.5 39 15.5 41 19C39 24.5 32 28.5 21 27C12 25.5 6 23 6 19Z"
                      fill="#0DB7ED"
                      stroke="#0DB7ED"
                      strokeWidth="0.8"
                    />
                    <rect x="10" y="7" width="7" height="6" rx="1" fill="#FFFFFF" stroke="#2496ED" strokeWidth="0.7" />
                    <rect x="18" y="7" width="7" height="6" rx="1" fill="#FFFFFF" stroke="#2496ED" strokeWidth="0.7" />
                    <rect x="26" y="7" width="7" height="6" rx="1" fill="#FFFFFF" stroke="#2496ED" strokeWidth="0.7" />
                    <rect x="14" y="2" width="7" height="6" rx="1" fill="#FFFFFF" stroke="#2496ED" strokeWidth="0.7" />
                    <rect x="22" y="2" width="7" height="6" rx="1" fill="#FFFFFF" stroke="#2496ED" strokeWidth="0.7" />
                    <rect x="14" y="1" width="1.2" height="1.2" rx="0.3" fill="#0DB7ED" />
                    <rect x="16.5" y="1" width="1.2" height="1.2" rx="0.3" fill="#0DB7ED" />
                    <circle cx="36" cy="18" r="1" fill="white" />
                  </svg>
                </div>
                <h3 className="mt-5 font-display text-[18px] font-semibold leading-6 text-[#0F172A]">Docker Essentials</h3>
                <p className="mt-2 font-sans text-[13.5px] leading-6 text-[#64748B]">Containerize applications and streamline your development workflow.</p>
                <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-[#F1F5F9] pt-5 text-[11.5px] font-sans text-[#64748B]">
                  <span className="inline-flex items-center gap-1.5">
                    <BarChart3 className="h-3.5 w-3.5" /> Beginner
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> 10h 12m
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5" /> 8 modules
                  </span>
                </div>
              </article>

              {/* Card 3 – TS */}
              <article className="flex min-h-[272px] flex-col rounded-[16px] border border-[#F1E9E0] bg-white p-7 shadow-sm transition-shadow hover:shadow-md sm:min-h-[320px] sm:p-7">
                <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[12px] bg-[#3178C6]">
                  <span className="font-sans text-[22px] font-bold tracking-tight text-white">TS</span>
                </div>
                <h3 className="mt-5 font-display text-[18px] font-semibold leading-6 text-[#0F172A]">TypeScript Deep Dive</h3>
                <p className="mt-2 font-sans text-[13.5px] leading-6 text-[#64748B]">Go beyond the basics and write safer, more expressive code.</p>
                <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-[#F1F5F9] pt-5 text-[11.5px] font-sans text-[#64748B]">
                  <span className="inline-flex items-center gap-1.5">
                    <BarChart3 className="h-3.5 w-3.5" /> Intermediate
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> 14h 36m
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5" /> 10 modules
                  </span>
                </div>
              </article>
            </div>

            {/* Tagline divider – directly above orange artwork */}
            <div className="mt-10 flex items-center gap-4 sm:mt-12">
              <div className="h-px flex-1 bg-[#F1E9E0]" />
              <div className="flex shrink-0 items-center gap-2">
                <Star className="h-4 w-4 text-[#E86A2E]" strokeWidth={1.8} />
                <span className="font-sans text-[13px] text-[#64748B] sm:text-[13.5px]">New courses and lessons added every week.</span>
              </div>
              <div className="h-px flex-1 bg-[#F1E9E0]" />
            </div>
          </section>

          {/* Bottom orange blurred vertical-bar artwork – pastel, soft, subtle */}
          <div aria-hidden className="relative h-[190px] overflow-hidden bg-[#FFFCFA] sm:h-[210px]">
            <div className="absolute inset-x-0 bottom-0 flex h-full items-end justify-center gap-2 px-2 sm:gap-2.5 sm:px-3">
              {/* Left cluster – 7 bars */}
              <div className="flex h-full flex-1 items-end justify-end gap-2 sm:gap-2.5">
                <div className="w-full max-w-[72px] rounded-t-[4px] sm:max-w-[80px]" style={{ height: "48%", background: "linear-gradient(to top, #FFB89A 0%, #FFD1B8 62%, #FFEEE2 100%)", opacity: 0.78, filter: "blur(1.8px)" }} />
                <div className="w-full max-w-[72px] rounded-t-[4px] sm:max-w-[80px]" style={{ height: "62%", background: "linear-gradient(to top, #FFA883 0%, #FFC8A8 60%, #FFEBDD 100%)", opacity: 0.82, filter: "blur(1.6px)" }} />
                <div className="w-full max-w-[72px] rounded-t-[4px] sm:max-w-[80px]" style={{ height: "76%", background: "linear-gradient(to top, #FFC2A8 0%, #FFD9C0 58%, #FFF2E8 100%)", opacity: 0.78, filter: "blur(1.8px)" }} />
                <div className="w-full max-w-[72px] rounded-t-[4px] sm:max-w-[80px]" style={{ height: "100%", background: "linear-gradient(to top, #FF9A6B 0%, #FFBFA0 58%, #FFE8D5 100%)", opacity: 0.88, filter: "blur(1.4px)" }} />
                <div className="w-full max-w-[72px] rounded-t-[4px] sm:max-w-[80px]" style={{ height: "84%", background: "linear-gradient(to top, #FFC9A8 0%, #FFD9C0 62%, #FFF5EC 100%)", opacity: 0.72, filter: "blur(2px)" }} />
                <div className="w-full max-w-[72px] rounded-t-[4px] sm:max-w-[80px]" style={{ height: "68%", background: "linear-gradient(to top, #FFB89A 0%, #FFD1B8 60%, #FFEEE2 100%)", opacity: 0.8, filter: "blur(1.6px)" }} />
                <div className="hidden h-full w-full max-w-[72px] rounded-t-[4px] sm:block sm:max-w-[80px]" style={{ height: "54%", background: "linear-gradient(to top, #FFC9A8 0%, #FFE0C8 62%, #FFF6EE 100%)", opacity: 0.7, filter: "blur(1.8px)" }} />
              </div>

              <div className="hidden w-6 shrink-0 sm:block sm:w-8" />
              <div className="flex w-4 shrink-0 justify-center sm:hidden">
                <div className="h-4 w-px bg-transparent" />
              </div>

              {/* Right cluster – 7 bars mirrored */}
              <div className="flex h-full flex-1 items-end justify-start gap-2 sm:gap-2.5">
                <div className="hidden h-full w-full max-w-[72px] rounded-t-[4px] sm:block sm:max-w-[80px]" style={{ height: "48%", background: "linear-gradient(to top, #FFC9A8 0%, #FFE0C8 62%, #FFF6EE 100%)", opacity: 0.7, filter: "blur(1.8px)" }} />
                <div className="w-full max-w-[72px] rounded-t-[4px] sm:max-w-[80px]" style={{ height: "72%", background: "linear-gradient(to top, #FFA883 0%, #FFC8A8 60%, #FFEBDD 100%)", opacity: 0.82, filter: "blur(1.6px)" }} />
                <div className="w-full max-w-[72px] rounded-t-[4px] sm:max-w-[80px]" style={{ height: "60%", background: "linear-gradient(to top, #FFC2A8 0%, #FFD9C0 58%, #FFF2E8 100%)", opacity: 0.78, filter: "blur(1.8px)" }} />
                <div className="w-full max-w-[72px] rounded-t-[4px] sm:max-w-[80px]" style={{ height: "100%", background: "linear-gradient(to top, #FF9A6B 0%, #FFBFA0 58%, #FFE8D5 100%)", opacity: 0.88, filter: "blur(1.4px)" }} />
                <div className="w-full max-w-[72px] rounded-t-[4px] sm:max-w-[80px]" style={{ height: "80%", background: "linear-gradient(to top, #FFB89A 0%, #FFD1B8 62%, #FFEEE2 100%)", opacity: 0.78, filter: "blur(1.8px)" }} />
                <div className="w-full max-w-[72px] rounded-t-[4px] sm:max-w-[80px]" style={{ height: "44%", background: "linear-gradient(to top, #FFC9A8 0%, #FFD9C0 62%, #FFF5EC 100%)", opacity: 0.72, filter: "blur(2px)" }} />
                <div className="w-full max-w-[72px] rounded-t-[4px] sm:max-w-[80px]" style={{ height: "66%", background: "linear-gradient(to top, #FFB89A 0%, #FFD1B8 60%, #FFEEE2 100%)", opacity: 0.8, filter: "blur(1.6px)" }} />
              </div>
            </div>
            {/* Stronger soft fade so bars are subtle */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#FFFCFA] via-[#FFFCFA]/75 to-transparent sm:h-20" aria-hidden />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[#FFFCFA]/40 to-transparent" aria-hidden />
          </div>
        </div>
        <div
          aria-hidden
          className="hidden w-[18px] shrink-0 sm:block"
          style={{
            backgroundColor: "#FFFBF8",
            backgroundImage: "repeating-linear-gradient(135deg, #FFD8B8 0 1px, transparent 1px 10px)",
            opacity: 0.38,
          }}
        />
      </div>
    </div>
  );
}
