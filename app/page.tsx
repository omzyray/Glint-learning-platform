import {
  Bell,
  Search,
  PlayCircle,
  FileText,
  Bookmark,
  BarChart3,
  Clock3,
  User,
  ChevronRight,
  Eye,
  LayoutGrid,
  Target,
  Accessibility,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { SearchInput, Select } from "./components/ui/input";
import { Progress } from "./components/ui/progress";
import { StatusRow } from "./components/ui/status";
import { CourseCard, LessonVideoCard, LessonCard, ResourceCard } from "./components/ui/card";
import { HeaderNav, Breadcrumbs, Pagination } from "./components/navigation";

function Section({
  number,
  title,
  children,
  className,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`bg-white rounded-[16px] border border-[#E2E8F0] shadow-sm p-5 sm:p-6 ${className ?? ""}`}>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[11px] font-semibold tracking-widest text-[#F97316] font-sans">{number}</span>
        <span className="text-[11px] font-semibold tracking-widest text-[#0F172A] uppercase font-sans">{title}</span>
      </div>
      {children}
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAFC] pb-10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        {/* Top row: Intro + Colors */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Section number="" title="" className="lg:col-span-4 !p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M3 3L12 21L15 14L12 7L3 3Z" fill="#F97316" />
                  <path d="M12 7L15 14L21 3L12 7Z" fill="#FB923C" />
                </svg>
                <span className="text-[18px] font-semibold tracking-tight font-sans">Glint</span>
              </div>
              <h1 className="font-display text-[40px] leading-[44px] font-bold tracking-tight text-[#0F172A]">
                Design System
              </h1>
              <p className="mt-3 text-[13px] leading-5 text-[#64748B] font-sans max-w-[280px]">
                A unified design language for Glint learning platform. Clean, modern and focused on clarity, consistency and
                intuitive learning experiences.
              </p>
            </div>
            <div className="mt-8 text-[10px] tracking-widest font-semibold text-[#64748B] uppercase font-sans">
              VERSION 1.0 &nbsp;·&nbsp; MAY 2025
            </div>
          </Section>

          <Section number="01" title="COLORS" className="lg:col-span-8">
            <div className="space-y-4">
              <div>
                <p className="text-[11px] font-semibold text-[#0F172A] mb-2 font-sans">Primary</p>
                <div className="grid grid-cols-5 gap-3">
                  {[
                    { name: "Primary 500", hex: "#F97316", bg: "bg-[#F97316]" },
                    { name: "Primary 400", hex: "#FB923C", bg: "bg-[#FB923C]" },
                    { name: "Primary 300", hex: "#FDBA74", bg: "bg-[#FDBA74]" },
                    { name: "Primary 200", hex: "#FED7AA", bg: "bg-[#FED7AA]" },
                    { name: "Primary 100", hex: "#FFEEE5", bg: "bg-[#FFEEE5]" },
                  ].map((c) => (
                    <div key={c.hex} className="space-y-1.5">
                      <div className={`h-12 rounded-[8px] border border-black/5 ${c.bg}`} />
                      <div className="text-[10px] leading-3 font-medium text-[#0F172A] font-sans">{c.name}</div>
                      <div className="text-[10px] leading-3 text-[#64748B] font-sans">{c.hex}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-[#0F172A] mb-2 font-sans">Neutral</p>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                  {[
                    { name: "Neutral 900", hex: "#0F172A", bg: "bg-[#0F172A]" },
                    { name: "Neutral 700", hex: "#334155", bg: "bg-[#334155]" },
                    { name: "Neutral 500", hex: "#64748B", bg: "bg-[#64748B]" },
                    { name: "Neutral 300", hex: "#CBD5E1", bg: "bg-[#CBD5E1]" },
                    { name: "Neutral 200", hex: "#E2E8F0", bg: "bg-[#E2E8F0]" },
                    { name: "Neutral 100", hex: "#F1F5F9", bg: "bg-[#F1F5F9]" },
                    { name: "Neutral 50", hex: "#FAFAFC", bg: "bg-[#FAFAFC] border border-[#E2E8F0]" },
                    { name: "White", hex: "#FFFFFF", bg: "bg-white border border-[#E2E8F0]" },
                  ].map((c) => (
                    <div key={c.hex} className="space-y-1.5">
                      <div className={`h-10 rounded-[8px] ${c.bg}`} />
                      <div className="text-[9px] leading-3 font-medium text-[#0F172A] font-sans">{c.name}</div>
                      <div className="text-[9px] leading-3 text-[#64748B] font-sans">{c.hex}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>
        </div>

        {/* Row 2: Typography + Type Scale */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Section number="02" title="TYPOGRAPHY" className="lg:col-span-5">
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="text-[56px] leading-none font-display font-light text-[#0F172A]">Ag</div>
                <div>
                  <div className="text-[15px] font-medium text-[#0F172A] font-display">Playfair Display</div>
                  <div className="text-[11px] text-[#64748B] font-sans tracking-wide">Elegant &nbsp;·&nbsp; Readable &nbsp;·&nbsp; Timeless</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-[56px] leading-none font-sans font-semibold text-[#0F172A]">Ag</div>
                <div>
                  <div className="text-[15px] font-medium text-[#0F172A] font-sans">Inter</div>
                  <div className="text-[11px] text-[#64748B] font-sans tracking-wide">Clean &nbsp;·&nbsp; Modern &nbsp;·&nbsp; Highly legible</div>
                </div>
              </div>
            </div>
          </Section>

          <Section number="03" title="TYPE SCALE" className="lg:col-span-7">
            <div className="overflow-x-auto -mx-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[10px] tracking-widest uppercase text-[#64748B] font-sans border-b border-[#F1F5F9]">
                    <th className="py-2 font-semibold pr-2">Style</th>
                    <th className="py-2 font-semibold pr-2">Font</th>
                    <th className="py-2 font-semibold pr-2">Size / Line Height</th>
                    <th className="py-2 font-semibold pr-2">Weight</th>
                    <th className="py-2 font-semibold">Use</th>
                  </tr>
                </thead>
                <tbody className="text-[12px] font-sans">
                  {[
                    ["Display 1", "Playfair Display", "48 / 56", "Bold", "Page titles"],
                    ["Display 2", "Playfair Display", "36 / 44", "Bold", "Section titles"],
                    ["Heading 1", "Inter", "28 / 36", "Semi Bold", "Card titles"],
                    ["Heading 2", "Inter", "22 / 30", "Semi Bold", "Sub section"],
                    ["Heading 3", "Inter", "18 / 26", "Medium", "Small titles"],
                    ["Body Large", "Inter", "16 / 24", "Regular", "Body copy"],
                    ["Body", "Inter", "14 / 20", "Regular", "Supporting text"],
                    ["Small", "Inter", "12 / 16", "Regular", "Captions, meta"],
                  ].map((r) => (
                    <tr key={r[0]} className="border-b border-[#F1F5F9] last:border-0">
                      <td className="py-1.5 font-medium text-[#0F172A] pr-2">{r[0]}</td>
                      <td className="py-1.5 text-[#64748B] pr-2">{r[1]}</td>
                      <td className="py-1.5 text-[#64748B] pr-2">{r[2]}</td>
                      <td className="py-1.5 text-[#64748B] pr-2">{r[3]}</td>
                      <td className="py-1.5 text-[#64748B]">{r[4]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        </div>

        {/* Row 3: Spacing + Radius */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Section number="04" title="SPACING SYSTEM" className="lg:col-span-6">
            <p className="text-[11px] font-medium text-[#0F172A] mb-4 font-sans">Base unit: 4px</p>
            <div className="flex items-end justify-between gap-2">
              {[
                { n: 4, h: "h-2 w-2", label: "4\n(0.25rem)" },
                { n: 8, h: "h-3 w-3", label: "8\n(0.5rem)" },
                { n: 12, h: "h-4 w-4", label: "12\n(0.75rem)" },
                { n: 16, h: "h-5 w-5", label: "16\n(1rem)" },
                { n: 24, h: "h-6 w-6", label: "24\n(1.5rem)" },
                { n: 32, h: "h-7 w-7", label: "32\n(2rem)" },
                { n: 40, h: "h-8 w-8", label: "40\n(2.5rem)" },
                { n: 48, h: "h-9 w-9", label: "48\n(3rem)" },
                { n: 64, h: "h-10 w-10", label: "64\n(4rem)" },
              ].map((s) => (
                <div key={s.n} className="flex flex-col items-center gap-2">
                  <div className={`${s.h} rounded-[4px] bg-[#FFEEE5] border border-[#FFEDD5]`} />
                  <div className="text-[10px] leading-3 text-center text-[#64748B] font-sans whitespace-pre text-center">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section number="05" title="RADIUS & SHADOWS" className="lg:col-span-6">
            <div className="space-y-5">
              <div>
                <p className="text-[11px] font-semibold text-[#0F172A] mb-3 font-sans">Radius</p>
                <div className="grid grid-cols-6 gap-3">
                  {[
                    { label: "4px\n(xs)", r: "rounded-[4px]" },
                    { label: "8px\n(sm)", r: "rounded-[8px]" },
                    { label: "12px\n(md)", r: "rounded-[12px]" },
                    { label: "16px\n(lg)", r: "rounded-[16px]" },
                    { label: "24px\n(xl)", r: "rounded-[24px]" },
                    { label: "Full\n(circle)", r: "rounded-full" },
                  ].map((c) => (
                    <div key={c.label} className="flex flex-col items-center gap-2">
                      <div className={`h-12 w-12 bg-white border border-[#E2E8F0] ${c.r}`} />
                      <div className="text-[10px] leading-3 text-center text-[#64748B] font-sans whitespace-pre">{c.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-[#0F172A] mb-3 font-sans">Shadows</p>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { name: "Sm", shadow: "shadow-sm", text: "0 1px 2px 0\nrgba(15, 23, 42, 0.05)" },
                    { name: "Md", shadow: "shadow-md", text: "0 4px 12px -2px\nrgba(15, 23, 42, 0.08)" },
                    { name: "Lg", shadow: "shadow-lg", text: "0 12px 24px -4px\nrgba(15, 23, 42, 0.10)" },
                    { name: "Xl", shadow: "shadow-xl", text: "0 20px 40px -8px\nrgba(15, 23, 42, 0.12)" },
                  ].map((s) => (
                    <div key={s.name} className={`rounded-[12px] bg-white border border-[#F1F5F9] p-3 ${s.shadow}`}>
                      <div className="text-[11px] font-semibold text-[#0F172A] font-sans">{s.name}</div>
                      <div className="text-[9px] leading-3 text-[#64748B] font-sans whitespace-pre mt-1">{s.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>
        </div>

        {/* Row 4: Icons + Buttons + Inputs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Section number="06" title="ICONS" className="lg:col-span-3">
            <div className="space-y-4">
              <div>
                <p className="text-[11px] font-medium text-[#0F172A] mb-2 font-sans">Outline Style</p>
                <div className="flex items-center gap-2 flex-wrap text-[#0F172A]">
                  <Bell className="h-4 w-4" strokeWidth={2} />
                  <Search className="h-4 w-4" strokeWidth={2} />
                  <PlayCircle className="h-4 w-4" strokeWidth={2} />
                  <FileText className="h-4 w-4" strokeWidth={2} />
                  <Bookmark className="h-4 w-4" strokeWidth={2} />
                  <BarChart3 className="h-4 w-4" strokeWidth={2} />
                  <Clock3 className="h-4 w-4" strokeWidth={2} />
                  <User className="h-4 w-4" strokeWidth={2} />
                  <ChevronRight className="h-4 w-4" strokeWidth={2} />
                </div>
              </div>
              <div>
                <p className="text-[11px] font-medium text-[#0F172A] mb-2 font-sans">Filled Style</p>
                <div className="flex items-center gap-2 flex-wrap text-[#0F172A]">
                  <Bell className="h-4 w-4 fill-[#0F172A]" />
                  <Search className="h-4 w-4 fill-[#0F172A]" />
                  <PlayCircle className="h-4 w-4 fill-[#0F172A]" />
                  <FileText className="h-4 w-4 fill-[#0F172A]" />
                  <Bookmark className="h-4 w-4 fill-[#0F172A]" />
                  <BarChart3 className="h-4 w-4 fill-[#0F172A]" />
                  <Clock3 className="h-4 w-4 fill-[#0F172A]" />
                  <User className="h-4 w-4 fill-[#0F172A]" />
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
              <div className="text-[11px] leading-4 text-[#64748B] font-sans space-y-1">
                <p className="font-semibold text-[#0F172A]">Icon Specs</p>
                <p>• 24×24px grid</p>
                <p>• 2px stroke width (outline)</p>
                <p>• Rounded line caps</p>
                <p>• Consistent optical balance</p>
              </div>
            </div>
          </Section>

          <Section number="07" title="BUTTONS" className="lg:col-span-6">
            <div className="overflow-x-auto -mx-1">
              <table className="w-full text-left border-collapse min-w-[420px]">
                <thead>
                  <tr className="text-[10px] tracking-widest uppercase text-[#64748B] font-sans">
                    <th className="py-1 pr-2"></th>
                    <th className="py-1 pr-2 font-semibold">Primary</th>
                    <th className="py-1 pr-2 font-semibold">Secondary</th>
                    <th className="py-1 pr-2 font-semibold">Tertiary</th>
                    <th className="py-1 font-semibold">Text</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 pr-2 text-[11px] font-medium text-[#0F172A] font-sans">Default</td>
                    <td className="py-2 pr-2">
                      <Button variant="primary" size="md">
                        Get Started
                      </Button>
                    </td>
                    <td className="py-2 pr-2">
                      <Button variant="secondary" size="md">
                        Explore Courses
                      </Button>
                    </td>
                    <td className="py-2 pr-2">
                      <Button variant="tertiary" size="md">
                        View Lesson
                      </Button>
                    </td>
                    <td className="py-2">
                      <Button variant="text" size="md">
                        Watch Video
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-2 text-[11px] font-medium text-[#0F172A] font-sans">Hover</td>
                    <td className="py-2 pr-2">
                      <Button variant="primary" size="md" className="bg-[#EA580C]">
                        Get Started
                      </Button>
                    </td>
                    <td className="py-2 pr-2">
                      <Button variant="secondary" size="md" className="bg-[#F1F5F9]">
                        Explore Courses
                      </Button>
                    </td>
                    <td className="py-2 pr-2">
                      <Button variant="tertiary" size="md" className="bg-[#F1F5F9]">
                        View Lesson
                      </Button>
                    </td>
                    <td className="py-2">
                      <Button variant="text" size="md" className="text-[#EA580C]">
                        Watch Video
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-2 text-[11px] font-medium text-[#0F172A] font-sans">Disabled</td>
                    <td className="py-2 pr-2">
                      <Button variant="primary" size="md" disabled>
                        Get Started
                      </Button>
                    </td>
                    <td className="py-2 pr-2">
                      <Button variant="secondary" size="md" disabled>
                        Explore Courses
                      </Button>
                    </td>
                    <td className="py-2 pr-2">
                      <Button variant="tertiary" size="md" disabled>
                        View Lesson
                      </Button>
                    </td>
                    <td className="py-2">
                      <Button variant="text" size="md" disabled>
                        Watch Video
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-[11px] leading-4 text-[#64748B] font-sans space-y-0.5 border-t border-[#F1F5F9] pt-3">
              <p className="font-semibold text-[#0F172A]">Button Specs</p>
              <p>• Height: 44px (default)</p>
              <p>• Padding: 0 16px (lg), 0 12px (md)</p>
              <p>• Radius: 12px</p>
              <p>• Font: Inter Medium (14–16px)</p>
            </div>
          </Section>

          <Section number="08" title="INPUTS" className="lg:col-span-3">
            <div className="space-y-4">
              <div>
                <p className="text-[11px] font-medium text-[#0F172A] mb-2 font-sans">Search / Text Input</p>
                <SearchInput placeholder="Search anything..." />
              </div>
              <div>
                <p className="text-[11px] font-medium text-[#0F172A] mb-2 font-sans">Select</p>
                <Select>Most Relevant</Select>
              </div>
              <div className="text-[11px] leading-4 text-[#64748B] font-sans space-y-0.5">
                <p className="font-semibold text-[#0F172A]">Field Specs</p>
                <p>• Height: 44px</p>
                <p>• Radius: 12px</p>
                <p>• Border: 1px solid #E2E8F0</p>
                <p>• Padding: 0 16px</p>
                <p>• Focus: Border color #FB923C</p>
              </div>
            </div>
          </Section>
        </div>

        {/* Row 5: Badges + Status + Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Section number="09" title="BADGES / TAGS" className="lg:col-span-4">
            <div className="grid grid-cols-3 gap-3 text-[11px] font-sans">
              <div>
                <p className="text-[#64748B] mb-2">Video</p>
                <Badge variant="video">VIDEO</Badge>
              </div>
              <div>
                <p className="text-[#64748B] mb-2">Lesson</p>
                <Badge variant="lesson">LESSON</Badge>
              </div>
              <div>
                <p className="text-[#64748B] mb-2">Popular</p>
                <Badge variant="popular">POPULAR</Badge>
              </div>
            </div>
          </Section>
          <Section number="10" title="STATUS / INDICATORS" className="lg:col-span-4">
            <StatusRow />
          </Section>
          <Section number="11" title="PROGRESS BAR" className="lg:col-span-4">
            <Progress value={35} />
          </Section>
        </div>

        {/* Row 6: Cards */}
        <Section number="12" title="CARDS" className="!p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-[11px] font-medium text-[#64748B] mb-2 font-sans">Course Card</p>
              <CourseCard />
            </div>
            <div>
              <p className="text-[11px] font-medium text-[#64748B] mb-2 font-sans">Lesson Card (Video)</p>
              <LessonVideoCard />
            </div>
            <div>
              <p className="text-[11px] font-medium text-[#64748B] mb-2 font-sans">Lesson Card (Lesson)</p>
              <LessonCard />
            </div>
            <div>
              <p className="text-[11px] font-medium text-[#64748B] mb-2 font-sans">Resource Card</p>
              <ResourceCard />
            </div>
          </div>
        </Section>

        {/* Row 7: Navigation */}
        <Section number="13" title="NAVIGATION" className="!p-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-[#F1F5F9]">
            <div className="pt-4 lg:pt-0 lg:px-4 first:pt-0 first:lg:px-0">
              <HeaderNav />
            </div>
            <div className="pt-4 lg:pt-0 lg:px-8 flex flex-col gap-2">
              <p className="text-[11px] font-semibold text-[#0F172A] font-sans">Breadcrumbs</p>
              <Breadcrumbs />
            </div>
            <div className="pt-4 lg:pt-0 lg:px-8 flex flex-col gap-2">
              <p className="text-[11px] font-semibold text-[#0F172A] font-sans">Pagination</p>
              <Pagination />
            </div>
          </div>
        </Section>

        {/* Row 8: Principles */}
        <Section number="14" title="PRINCIPLES" className="!p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Eye,
                title: "Clarity First",
                desc: "Every element should communicate clearly.",
              },
              {
                icon: LayoutGrid,
                title: "Consistency",
                desc: "Use components and patterns consistently across the platform.",
              },
              {
                icon: Target,
                title: "Focus & Calm",
                desc: "Remove noise and help learners focus on what matters.",
              },
              {
                icon: Accessibility,
                title: "Accessible",
                desc: "Design with accessibility and inclusivity in mind.",
              },
            ].map((p) => (
              <div key={p.title} className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center shrink-0">
                  <p.icon className="h-4 w-4 text-[#0F172A]" />
                </div>
                <div>
                  <div className="text-[12px] font-semibold text-[#0F172A] font-sans">{p.title}</div>
                  <div className="text-[11px] leading-4 text-[#64748B] font-sans">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <footer className="text-center text-[11px] text-[#64748B] font-sans py-4">
          Glint Design System · Built with Tailwind v4 · Inter + Playfair Display · Version 1.0 · May 2025
        </footer>
      </div>
    </main>
  );
}
