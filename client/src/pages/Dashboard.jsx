

export const Dashboard = () => {
  return (
    <div className="min-h-[calc(100vh-3.75rem)] bg-[#F7F3FF] px-4 py-8 sm:px-6 lg:h-[calc(100vh-3.75rem)] lg:px-8 lg:py-10">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-center rounded-3xl bg-white shadow-sm">
        <div className="fixed inset-0 z-10 bg-slate-950/30 backdrop-blur-[2px]" />
        <div className="relative z-20 w-full max-w-md rounded-3xl border border-primary/10 bg-white px-6 py-6 text-center shadow-2xl shadow-primary/20 sm:px-8 sm:py-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F4ECFF] text-xl font-bold text-primary">
            !
          </div>
          <div className="mt-4 text-2xl font-semibold text-slate-900">
            Dashboard
          </div>
          <div className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
            Content will be available soon.
          </div>
        </div>
      </div>
    </div>
  )
}
