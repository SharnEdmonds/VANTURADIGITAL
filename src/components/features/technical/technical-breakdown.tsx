// ═══════════════════════════════════════════════════════════════
// TechnicalBreakdown — 2D Monochromatic Charts
// ═══════════════════════════════════════════════════════════════
// Pure SVG. No 3D, no gradients. Functional and logical.
// Displays SEO and Ad performance data in flat, Swiss-style charts.

// ─── Chart Data Types ────────────────────────────────────────

interface BarDatum {
  label: string;
  value: number;
  highlight?: boolean;
}

interface LineDatum {
  month: string;
  organic: number;
  paid: number;
}

// ─── SEO Performance Bar Chart ───────────────────────────────

const seoData: BarDatum[] = [
  { label: "Technical Score", value: 96, highlight: true },
  { label: "Content Score", value: 82 },
  { label: "Backlink Auth.", value: 74 },
  { label: "Core Vitals", value: 98, highlight: true },
  { label: "Indexability", value: 91 },
  { label: "Schema Coverage", value: 88 },
];

function SEOBarChart() {
  const maxValue = 100;
  const barHeight = 28;
  const barGap = 12;
  const labelWidth = 120;
  const chartWidth = 480;
  const chartHeight = seoData.length * (barHeight + barGap) - barGap;

  return (
    <svg
      viewBox={`0 0 ${labelWidth + chartWidth + 50} ${chartHeight + 20}`}
      className="w-full"
      role="img"
      aria-label="SEO performance metrics bar chart"
    >
      {seoData.map((d, i) => {
        const y = i * (barHeight + barGap);
        const barWidth = (d.value / maxValue) * chartWidth;

        return (
          <g key={d.label}>
            {/* Label */}
            <text
              x={labelWidth - 8}
              y={y + barHeight / 2 + 4}
              textAnchor="end"
              className="fill-gallery/60"
              fontSize="11"
              fontFamily="Inter, sans-serif"
            >
              {d.label}
            </text>

            {/* Background track */}
            <rect
              x={labelWidth}
              y={y}
              width={chartWidth}
              height={barHeight}
              fill="#EEEEEE"
              fillOpacity="0.05"
            />

            {/* Value bar */}
            <rect
              x={labelWidth}
              y={y}
              width={barWidth}
              height={barHeight}
              fill={d.highlight ? "#FF4F00" : "#EEEEEE"}
              fillOpacity={d.highlight ? 1 : 0.2}
            />

            {/* Value label */}
            <text
              x={labelWidth + barWidth + 8}
              y={y + barHeight / 2 + 4}
              className={d.highlight ? "fill-signal" : "fill-gallery/40"}
              fontSize="11"
              fontFamily="'JetBrains Mono', monospace"
              fontWeight={d.highlight ? "bold" : "normal"}
            >
              {d.value}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Ad Performance Line Chart ───────────────────────────────

const adData: LineDatum[] = [
  { month: "Jan", organic: 2400, paid: 1800 },
  { month: "Feb", organic: 2800, paid: 2100 },
  { month: "Mar", organic: 3200, paid: 1900 },
  { month: "Apr", organic: 3600, paid: 2400 },
  { month: "May", organic: 4100, paid: 2800 },
  { month: "Jun", organic: 4800, paid: 3200 },
  { month: "Jul", organic: 5200, paid: 3600 },
  { month: "Aug", organic: 5800, paid: 3100 },
  { month: "Sep", organic: 6400, paid: 3800 },
  { month: "Oct", organic: 7200, paid: 4200 },
  { month: "Nov", organic: 7800, paid: 4600 },
  { month: "Dec", organic: 8400, paid: 5100 },
];

function AdLineChart() {
  const chartWidth = 600;
  const chartHeight = 240;
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  const maxVal = Math.max(
    ...adData.map((d) => Math.max(d.organic, d.paid)),
  );

  const xScale = (i: number) =>
    padding.left + (i / (adData.length - 1)) * innerWidth;
  const yScale = (v: number) =>
    padding.top + innerHeight - (v / maxVal) * innerHeight;

  const organicPath = adData
    .map((d, i) => `${i === 0 ? "M" : "L"}${xScale(i)},${yScale(d.organic)}`)
    .join(" ");
  const paidPath = adData
    .map((d, i) => `${i === 0 ? "M" : "L"}${xScale(i)},${yScale(d.paid)}`)
    .join(" ");

  // Y-axis gridlines
  const yTicks = [0, 2000, 4000, 6000, 8000];

  return (
    <svg
      viewBox={`0 0 ${chartWidth} ${chartHeight}`}
      className="h-auto w-full block"
      role="img"
      aria-label="Organic vs paid traffic performance line chart"
    >
      {/* Gridlines */}
      {yTicks.map((tick) => (
        <g key={tick}>
          <line
            x1={padding.left}
            y1={yScale(tick)}
            x2={chartWidth - padding.right}
            y2={yScale(tick)}
            stroke="#EEEEEE"
            strokeOpacity="0.06"
          />
          <text
            x={padding.left - 8}
            y={yScale(tick) + 4}
            textAnchor="end"
            fill="#EEEEEE"
            fillOpacity="0.3"
            fontSize="10"
            fontFamily="'JetBrains Mono', monospace"
          >
            {(tick / 1000).toFixed(0)}k
          </text>
        </g>
      ))}

      {/* X-axis labels */}
      {adData.map((d, i) => (
        <text
          key={d.month}
          x={xScale(i)}
          y={chartHeight - 10}
          textAnchor="middle"
          fill="#EEEEEE"
          fillOpacity="0.3"
          fontSize="10"
          fontFamily="Inter, sans-serif"
        >
          {d.month}
        </text>
      ))}

      {/* Organic line — Signal Orange */}
      <path
        d={organicPath}
        fill="none"
        stroke="#FF4F00"
        strokeWidth="2"
      />

      {/* Paid line — Gallery Grey */}
      <path
        d={paidPath}
        fill="none"
        stroke="#EEEEEE"
        strokeOpacity="0.3"
        strokeWidth="2"
        strokeDasharray="4 4"
      />

      {/* Data points — Organic */}
      {adData.map((d, i) => (
        <circle
          key={`org-${d.month}`}
          cx={xScale(i)}
          cy={yScale(d.organic)}
          r="3"
          fill="#FF4F00"
        />
      ))}

      {/* End point labels */}
      <text
        x={xScale(adData.length - 1) + 8}
        y={yScale(adData[adData.length - 1].organic) + 4}
        fill="#FF4F00"
        fontSize="11"
        fontFamily="'JetBrains Mono', monospace"
        fontWeight="bold"
      >
        {(adData[adData.length - 1].organic / 1000).toFixed(1)}k
      </text>
      <text
        x={xScale(adData.length - 1) + 8}
        y={yScale(adData[adData.length - 1].paid) + 4}
        fill="#EEEEEE"
        fillOpacity="0.4"
        fontSize="11"
        fontFamily="'JetBrains Mono', monospace"
      >
        {(adData[adData.length - 1].paid / 1000).toFixed(1)}k
      </text>
    </svg>
  );
}

// ─── Metric Card (KPI) ──────────────────────────────────────

interface MetricProps {
  value: string;
  label: string;
  delta?: string;
}

function MetricCard({ value, label, delta }: MetricProps) {
  return (
    <div className="border border-gallery/10 bg-carbon p-grid-4">
      <p className="font-mono text-3xl font-bold text-gallery">{value}</p>
      <p className="mt-grid-1 text-sm text-text-secondary">{label}</p>
      {delta && (
        <p className="mt-grid-1 font-mono text-xs text-signal">{delta}</p>
      )}
    </div>
  );
}

// ─── Main Section ────────────────────────────────────────────

export function TechnicalBreakdown() {
  return (
    <section className="mx-auto w-full max-w-7xl px-grid-3 py-grid-15 lg:px-grid-6">
      {/* Section header */}
      <div className="mb-grid-10 max-w-3xl">
        <p className="mb-grid-2 font-mono text-xs uppercase tracking-widest text-signal">
          Technical Breakdown
        </p>
        <h2 className="mb-grid-3 font-heading text-4xl font-bold leading-tight tracking-tight text-gallery md:text-5xl">
          Data, Not Opinions.
        </h2>
        <p className="text-lg leading-relaxed text-text-secondary">
          Every metric tracked. Every decision backed by evidence.
          Monochromatic clarity over decorative noise.
        </p>
      </div>

      {/* KPI Row */}
      <div className="mb-grid-8 grid gap-[1px] border border-gallery/10 bg-gallery/5 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard value="96" label="Average Lighthouse Score" delta="+12 pts from baseline" />
        <MetricCard value="3.2x" label="Organic Traffic Growth" delta="+220% YoY" />
        <MetricCard value="0.8s" label="Time to Interactive" delta="-2.1s reduction" />
        <MetricCard value="4.6x" label="ROAS on Paid Campaigns" delta="+180% vs. industry avg" />
      </div>

      {/* Chart Grid */}
      <div className="grid gap-[1px] border border-gallery/10 bg-gallery/5 lg:grid-cols-2">
        {/* SEO Chart */}
        <div className="border border-gallery/10 bg-carbon p-4 sm:p-grid-6">
          <div className="mb-grid-4 flex items-baseline justify-between">
            <h3 className="font-heading text-lg font-bold text-gallery">
              SEO Performance Audit
            </h3>
            <span className="font-mono text-xs text-text-muted">Score / 100</span>
          </div>
          <SEOBarChart />
        </div>

        {/* Ad Chart */}
        <div className="border border-gallery/10 bg-carbon p-4 sm:p-grid-6">
          <div className="mb-grid-4 flex items-baseline justify-between">
            <h3 className="font-heading text-lg font-bold text-gallery">
              Traffic Acquisition
            </h3>
            <div className="flex items-center gap-grid-3">
              <span className="flex items-center gap-grid-1 font-mono text-xs">
                <span className="inline-block h-[2px] w-grid-2 bg-signal" />
                <span className="text-gallery/60">Organic</span>
              </span>
              <span className="flex items-center gap-grid-1 font-mono text-xs">
                <span className="inline-block h-[2px] w-grid-2 border-t border-dashed border-gallery/30" />
                <span className="text-gallery/60">Paid</span>
              </span>
            </div>
          </div>
          <AdLineChart />
        </div>
      </div>
    </section>
  );
}
