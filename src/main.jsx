<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

  {view === "home" && (
    <HomePage onApplyClick={() => setView("jobs")} />
  )}

  {view === "auth" && (
    <VolunteerAuth
      onSuccess={handleAuthSuccess}
      onCancel={() => setView("home")}
    />
  )}

  {view === "postForm" && (
    <JobPostForm
      onJobPosted={() => {
        setView("jobs");
      }}
      onCancel={() => setView("home")}
    />
  )}

  {view === "jobs" && (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
      <aside className="sticky top-24 self-start">
        <Filterbar filters={filters} setFilters={setFilters} />
      </aside>

      <section className="space-y-6">
        {/* Search */}
        {/* Job Cards */}
        {/* Pagination */}
      </section>
    </div>
  )}

</main>
