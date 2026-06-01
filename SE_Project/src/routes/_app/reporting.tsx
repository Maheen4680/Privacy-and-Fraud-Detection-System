import { createFileRoute } from "@tanstack/react-router";
import PageHeader from "@/components/fraud/PageHeader";
import ReportDashboard from "@/components/fraud/ReportDashboard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export const Route = createFileRoute("/_app/reporting")({
  component: Reporting,
});

const VOLUME = [
  { day: "Mon", scans: 240, threats: 18 },
  { day: "Tue", scans: 312, threats: 26 },
  { day: "Wed", scans: 290, threats: 22 },
  { day: "Thu", scans: 410, threats: 41 },
  { day: "Fri", scans: 502, threats: 55 },
  { day: "Sat", scans: 380, threats: 33 },
  { day: "Sun", scans: 268, threats: 19 },
];

const TYPES = [
  { name: "Phishing", value: 142 },
  { name: "Malware", value: 86 },
  { name: "Scam", value: 64 },
  { name: "Trojan", value: 38 },
  { name: "Other", value: 22 },
];

const COLORS = [
  "oklch(0.82 0.16 210)",
  "oklch(0.74 0.18 300)",
  "oklch(0.68 0.24 18)",
  "oklch(0.82 0.17 80)",
  "oklch(0.78 0.18 165)",
];

function Reporting() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <PageHeader
        title={<>Threat <em>analytics</em>, end-to-end.</>}
        description="Volume, trend, and classification across the protected perimeter."
      />

      <ReportDashboard totalScans={2402} threatsBlocked={214} />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl bg-card/80 backdrop-blur p-6 border border-border shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                Time series
              </p>
              <h2 className="font-display text-2xl text-foreground mt-1">
                Transaction <em>Threat</em> Volume
              </h2>
            </div>
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em]">
              <span className="flex items-center gap-1.5 text-primary">
                <span className="h-2 w-2 rounded-full bg-primary" /> Scans
              </span>
              <span className="flex items-center gap-1.5 text-destructive">
                <span className="h-2 w-2 rounded-full bg-destructive" /> Threats
              </span>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={VOLUME}>
                <CartesianGrid stroke="oklch(0.28 0.018 260 / 0.4)" strokeDasharray="3 6" />
                <XAxis dataKey="day" stroke="oklch(0.68 0.02 250)" tick={{ fontSize: 11 }} />
                <YAxis stroke="oklch(0.68 0.02 250)" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.17 0.014 260)",
                    border: "1px solid oklch(0.28 0.018 260)",
                    borderRadius: 12,
                    fontFamily: "JetBrains Mono",
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="scans"
                  stroke="oklch(0.82 0.16 210)"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="threats"
                  stroke="oklch(0.68 0.24 18)"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl bg-card/80 backdrop-blur p-6 border border-border shadow-[var(--shadow-card)]">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
            Distribution
          </p>
          <h2 className="font-display text-2xl text-foreground mt-1 mb-3">
            By <em>Type</em>
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={TYPES}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={86}
                  paddingAngle={3}
                  stroke="oklch(0.17 0.014 260)"
                  strokeWidth={2}
                >
                  {TYPES.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.17 0.014 260)",
                    border: "1px solid oklch(0.28 0.018 260)",
                    borderRadius: 12,
                    fontFamily: "JetBrains Mono",
                    fontSize: 12,
                  }}
                />
                <Legend
                  iconType="circle"
                  wrapperStyle={{ fontFamily: "JetBrains Mono", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}