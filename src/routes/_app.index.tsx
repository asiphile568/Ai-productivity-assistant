import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Mail,
  FileText,
  ListChecks,
  Search,
  MessageSquare,
  Clock,
  TrendingUp,
  Zap,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


export const Route = createFileRoute("/_app/")({
  head: () => ({
    meta: [
      { title: "Dashboard – AsieCore" },
      { name: "description", content: "Automate workplace tasks with AI-powered productivity tools." },
    ],
  }),
  component: Dashboard,
});

const stats = [
  { label: "Tasks Automated", value: "247", change: "+12%", icon: Zap },
  { label: "Hours Saved", value: "38.5", change: "+8%", icon: Clock },
  { label: "Documents Created", value: "94", change: "+22%", icon: FileText },
  { label: "Productivity Score", value: "92%", change: "+5%", icon: TrendingUp },
];

const tools = [
  {
    title: "Smart Email Generator",
    description: "Draft professional emails tailored to audience and tone.",
    icon: Mail,
    url: "/email",
  },
  {
    title: "Meeting Notes Summarizer",
    description: "Extract decisions, action items, and deadlines instantly.",
    icon: FileText,
    url: "/summarize",
  },
  {
    title: "AI Task Planner",
    description: "Prioritize work with an urgent vs important matrix.",
    icon: ListChecks,
    url: "/planner",
  },
  {
    title: "Research Assistant",
    description: "Generate insights, opportunities, and recommendations.",
    icon: Search,
    url: "/research",
  },
  {
    title: "Workplace Chatbot",
    description: "Conversational AI for everyday workplace questions.",
    icon: MessageSquare,
    url: "/chat",
  },
] as const;

const activity = [
  { title: "Generated client follow-up email", time: "2 minutes ago", tool: "Email" },
  { title: "Summarized Q3 strategy meeting (24 notes)", time: "1 hour ago", tool: "Summarizer" },
  { title: "Prioritized 12 tasks for this week", time: "3 hours ago", tool: "Planner" },
  { title: "Research brief: Market trends 2026", time: "Yesterday", tool: "Research" },
];

function Dashboard() {
  return (
    <div className="space-y-8">
      <div
        className="relative overflow-hidden rounded-2xl p-6 sm:p-8"
        style={{ background: "var(--gradient-primary)" }}
      >
        <div className="relative z-10 max-w-2xl text-white">
          <p className="text-sm font-medium opacity-90">Welcome back, Jordan</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Let AI handle the busywork.
          </h1>
          <p className="mt-3 text-base opacity-95">
            Generate emails, summarize meetings, plan your week, and research topics — all in one workspace.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button asChild variant="secondary" size="lg">
              <Link to="/chat">
                <MessageSquare className="mr-2 h-4 w-4" /> Ask the assistant
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-white/15 text-white hover:bg-white/25 backdrop-blur">
              <Link to="/email">
                <Mail className="mr-2 h-4 w-4" /> Draft an email
              </Link>
            </Button>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-32 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="transition-shadow hover:shadow-md">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <s.icon className="h-5 w-5" />
                </div>
                <span
                  className="text-xs font-semibold"
                  style={{ color: "var(--success)" }}
                >
                  {s.change}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold tracking-tight">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="text-lg font-semibold tracking-tight">Quick access</h2>
        <p className="text-sm text-muted-foreground">Jump straight into any AI tool.</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <Link key={t.url} to={t.url} className="group">
              <Card className="h-full transition-all hover:-translate-y-0.5 hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-sm"
                      style={{ background: "var(--gradient-primary)" }}
                    >
                      <t.icon className="h-5 w-5" />
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </div>
                  <CardTitle className="mt-3 text-base">{t.title}</CardTitle>
                  <CardDescription>{t.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent activity</CardTitle>
          <CardDescription>Your latest AI-powered actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {activity.map((a, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-lg border bg-card p-3 transition-colors hover:bg-accent/50"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{a.title}</p>
                <p className="text-xs text-muted-foreground">{a.tool} · {a.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
