import { Link } from "react-router-dom";
import { BookOpenText, UserRoundKey,CircleDashed,Smartphone } from 'lucide-react';

const highlights = [
  {

    title: "Structured learning",
    description:
      "Organize courses, lessons, and progress in one clean dashboard.",
      icon: <BookOpenText className="h-6 w-6 text-primary" />
  },
  {
    title: "Role-based access",
    description:
      "Students, instructors, and admins each see the tools they need.",
      icon: <UserRoundKey className="h-6 w-6 text-primary" />
  },
  {
    title: "Progress Tracking",
    description: "Track learning milestones and course completion.",
    icon: <CircleDashed className="h-6 w-6 text-primary" />
  },
  {
    title: "Responsive Design",
    description: "Seamless experience across all devices.",
    icon: <Smartphone className="h-6 w-6 text-primary" />
  },
];

const stats = [
  { value: "120+", label: "Courses" },
  { value: "3 roles", label: "Student, instructor, admin" },
  { value: "24/7", label: "Learning access" },
];

function Home() {
  return (
    <div className="bg-[#F7F3FF] text-slate-900 z-0 lg:h-screen lg:overflow-hidden">
      <main className="lg:h-full">
        <section className="relative lg:flex lg:h-full lg:items-center">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(107,46,147,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.06),transparent_30%)]" />

          <div className="m-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-14 lg:grid-cols-2 lg:items-center lg:gap-10 lg:px-8 lg:py-10 xl:py-16">
            <div className="max-w-2xl pt-6 lg:pt-0 lg:pr-4">
              <span className="inline-flex items-center rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-medium text-primary shadow-sm sm:px-4 sm:text-sm">
                EduCore Learning Platform
              </span>

              <h1 className="mt-5 text-3xl font-bold leading-tight sm:mt-6 sm:text-5xl lg:text-5xl xl:text-6xl">
                Learn with structure.
                <span className="block text-primary">
                  Teach with control.
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:mt-6 sm:text-lg sm:leading-7 lg:text-base lg:leading-6 xl:text-lg xl:leading-7">
                EduCore gives students a clear learning path, instructors a
                simple course workflow, and admins the controls they need to
                manage the platform securely.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4 lg:mt-7">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center rounded-xl bg-primary  px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:bg-primary-hover sm:px-6 sm:py-3 sm:text-base"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-primary hover:text-primary sm:px-6 sm:py-3 sm:text-base"
                >
                  Sign In
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4 lg:mt-8">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/70 bg-white/80 p-3 shadow-sm backdrop-blur sm:p-4"
                  >
                    <div className="text-xl font-bold text-primary sm:text-2xl">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-xs text-slate-600 sm:text-sm">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative lg:pl-2">
              <div className="absolute -left-8 top-10 h-28 w-28 rounded-full bg-primary/15 blur-3xl lg:-left-6 lg:h-24 lg:w-24 xl:-left-8 xl:h-28 xl:w-28" />
              <div className="absolute -right-6 bottom-6 h-24 w-24 rounded-full bg-cyan-200/60 blur-3xl lg:-right-4 lg:h-20 lg:w-20 xl:-right-6 xl:h-24 xl:w-24" />

              <div className="rounded-4xl border border-white/70 bg-white p-4 shadow-[0_30px_80px_rgba(107,46,147,0.16)] sm:p-6 lg:p-6 xl:p-8">
                <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                  {highlights.map((item, index) => (
                    <div
                      key={item.title}
                      className={`rounded-2xl p-4 sm:p-5 lg:p-4 xl:p-5 ${index === 0 ? "bg-[#F4ECFF]" : index === 1 ? "bg-[#EEF8F7]" : "bg-[#FFF5E8]"}`}
                    >
                      <div className="h-9 w-9 rounded-xl bg-white p-2 shadow-sm sm:h-10 sm:w-10">
                        {item.icon}
                      </div>
                      <h2 className="text-base font-semibold text-slate-900 sm:text-lg lg:text-base xl:text-lg">
                        {item.title}
                      </h2>
                      <p className="mt-2 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6 lg:mt-1 lg:text-xs lg:leading-5 xl:mt-2 xl:text-sm xl:leading-6">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl bg-slate-950 p-4 text-white sm:mt-6 sm:p-6 lg:mt-4 lg:p-5 xl:mt-6 xl:p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/60 sm:text-sm">
                    Platform focus
                  </p>
                  <p className="mt-2 text-lg font-semibold sm:mt-3 sm:text-2xl lg:mt-2 lg:text-xl xl:mt-3 xl:text-2xl">
                    Everything needed to launch a clean education workflow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>


  );
}

export default Home;