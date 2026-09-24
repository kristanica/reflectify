const formatDate = (date: Date) => date.toISOString().split("T")[0];
const HeatMap = ({ sessions }: { sessions: { startedAt: Date }[] }) => {
  const activityMap: Record<string, number> = {};

  sessions.forEach((s) => {
    const dateStr = formatDate(new Date(s.startedAt));
    activityMap[dateStr] = (activityMap[dateStr] || 0) + 1;
  });

  const days = Array.from({ length: 30 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return formatDate(d);
  });

  return (
    <section
      className="border border-mocha-surface1 bg-mocha-base/70 p-5 lg:col-span-12"
      aria-labelledby="activity-heading"
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Last 30 days
          </p>
          <h2 id="activity-heading" className="mt-1 text-base font-semibold">
            Run activity
          </h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Brighter marks represent repeat expeditions.
        </p>
      </div>

      <div className="mt-5 grid grid-cols-10 gap-1.5 sm:grid-cols-[repeat(15,minmax(0,1fr))] md:grid-cols-[repeat(30,minmax(0,1fr))]">
        {days.map((dayStr) => {
          const count = activityMap[dayStr] || 0;
          let colorClass = "border-border bg-muted";
          if (count === 1)
            colorClass = "border-mocha-green/40 bg-mocha-green/35";
          if (count >= 2) colorClass = "border-mocha-green bg-mocha-green";

          return (
            <div
              key={dayStr}
              title={`${count} runs on ${dayStr}`}
              aria-label={`${count} runs on ${dayStr}`}
              className={`aspect-square min-w-0 border transition-colors duration-200 motion-reduce:transition-none ${colorClass}`}
            />
          );
        })}
      </div>
    </section>
  );
};

export default HeatMap;
