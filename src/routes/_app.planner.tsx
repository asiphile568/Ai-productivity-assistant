import { createFileRoute } from "@tanstack/react-router";
import { ListChecks, Sparkles, Loader2, Plus, X } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/page-header";
import { AiOutput } from "@/components/ai-output";
import { useAi } from "@/lib/use-ai";

export const Route = createFileRoute("/_app/planner")({
  head: () => ({ meta: [{ title: "AI Task Planner" }] }),
  component: Page,
});

function Page() {
  const [tasks, setTasks] = useState<string[]>([""]);
  const [period, setPeriod] = useState("Daily");
  const [output, setOutput] = useState("");
  const { run, loading } = useAi();

  const updateTask = (i: number, v: string) =>
    setTasks((arr) => arr.map((t, idx) => (idx === i ? v : t)));
  const addTask = () => setTasks((arr) => [...arr, ""]);
  const removeTask = (i: number) =>
    setTasks((arr) => (arr.length > 1 ? arr.filter((_, idx) => idx !== i) : arr));

  const generate = async () => {
    const list = tasks.map((t) => t.trim()).filter(Boolean);
    if (list.length === 0) return;
    const system =
      "You are a productivity coach. Prioritize tasks according to urgency and importance. Create a structured schedule and provide productivity recommendations.";
    const prompt = `Planning period: ${period}\nTasks:\n${list.map((t, i) => `${i + 1}. ${t}`).join("\n")}\n\nReturn a markdown plan with these sections:\n## Urgent vs Important Matrix\n(Use a table: Quadrant | Tasks)\n## Suggested Schedule\n## Productivity Recommendations`;
    const text = await run(system, prompt);
    if (text) setOutput(text);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={ListChecks}
        title="AI Task Planner"
        description="Prioritize tasks with an urgent vs important matrix and a smart schedule."
      />

      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="grid gap-4 sm:grid-cols-[1fr_180px]">
            <div className="space-y-2">
              <Label>Tasks</Label>
              <div className="space-y-2">
                {tasks.map((t, i) => (
                  <div key={i} className="flex gap-2">
                    <Input
                      placeholder={`Task ${i + 1}`}
                      value={t}
                      onChange={(e) => updateTask(i, e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeTask(i)}
                      disabled={tasks.length === 1}
                      aria-label="Remove task"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button type="button" variant="outline" size="sm" onClick={addTask}>
                <Plus className="mr-1 h-4 w-4" /> Add task
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Plan type</Label>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Daily">Daily plan</SelectItem>
                  <SelectItem value="Weekly">Weekly plan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={generate} disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
            {loading ? "Planning..." : "Generate Plan"}
          </Button>
        </CardContent>
      </Card>

      {output && (
        <Card>
          <CardContent className="p-6">
            <AiOutput value={output} onChange={setOutput} exportName="task-plan" rows={22} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}