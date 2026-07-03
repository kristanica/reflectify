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
    <div className="border bg-card p-5 rounded font-mono col-span-2">
      <h4 className="text-xs text-mocha-yellow uppercase font-bold tracking-wider mb-4">
        NEURAL ACTIVITY LOG for
      </h4>

      <div className="flex flex-wrap gap-1.5">
        {days.map((dayStr) => {
          const count = activityMap[dayStr] || 0;
          let colorClass = "bg-mocha-mantle border border-mocha-surface1"; // 0 runs
          if (count === 1)
            colorClass = "bg-mocha-green/40 border-mocha-green/50";
          if (count >= 2) colorClass = "bg-mocha-green border-mocha-green";

          return (
            <div
              key={dayStr}
              title={`${count} runs on ${dayStr}`}
              className={`w-4 h-4 rounded-sm transition-all duration-300 ${colorClass}`}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default HeatMap;
