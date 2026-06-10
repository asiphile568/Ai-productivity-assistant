import { createFileRoute } from "@tanstack/react-router";
import { Search, Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/page-header";
import { AiOutput } from "@/components/ai-output";
import { useAi } from "@/lib/use-ai";

export const Route = createFileRoute("/_app/research")({
  head: () => ({ meta: [{ title: "AI Research Assistant" }] }),
  component: Page,
});

function Page() {
  const [topic, setTopic] = useState("");
  const [output, setOutput] = useState("");
  const { run, loading } = useAi();

  const generate = async () => {
    if (!topic.trim()) return;
    const system =
      "You are a professional research analyst. Summarize the topic and provide actionable insights and recommendations.";
    const prompt = `Research topic: ${topic}\n\nReturn a markdown brief with these sections:\n## Executive Summary\n## Key Insights\n## Opportunities\n## Risks\n## Recommendations`;
    const text = await run(system, prompt);
    if (text) setOutput(text);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Search}
        title="AI Research Assistant"
        description="Generate executive summaries, insights, and recommendations on any topic."
      />

      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="space-y-2">
            <Label htmlFor="topic">Research topic</Label>
            <Input
              id="topic"
              placeholder="e.g. Generative AI adoption in financial services"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generate()}
            />
          </div>
          <Button onClick={generate} disabled={loading || !topic.trim()}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
            {loading ? "Researching..." : "Generate Brief"}
          </Button>
        </CardContent>
      </Card>

      {output && (
        <Card>
          <CardContent className="p-6">
            <AiOutput value={output} onChange={setOutput} exportName="research-brief" rows={24} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}