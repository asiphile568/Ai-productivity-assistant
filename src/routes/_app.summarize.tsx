import { createFileRoute } from "@tanstack/react-router";
import { FileText, Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/page-header";
import { AiOutput } from "@/components/ai-output";
import { useAi } from "@/lib/use-ai";

export const Route = createFileRoute("/_app/summarize")({
  head: () => ({ meta: [{ title: "Meeting Notes Summarizer" }] }),
  component: Page,
});

function Page() {
  const [notes, setNotes] = useState("");
  const [output, setOutput] = useState("");
  const { run, loading } = useAi();

  const generate = async () => {
    if (!notes.trim()) return;
    const system =
      "You are an expert meeting analyst. Summarize the notes and provide key decisions, action items, deadlines, and responsibilities.";
    const prompt = `Meeting notes:\n${notes}\n\nReturn a well-formatted markdown summary with these sections:\n## Summary\n## Key Decisions\n## Action Items\n## Deadlines\n## Responsible Persons`;
    const text = await run(system, prompt);
    if (text) setOutput(text);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={FileText}
        title="Meeting Notes Summarizer"
        description="Turn raw notes into structured summaries with action items."
      />

      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="space-y-2">
            <Label htmlFor="notes">Paste meeting notes</Label>
            <Textarea
              id="notes"
              rows={10}
              placeholder="Paste raw meeting notes, transcripts, or bullet points here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <Button onClick={generate} disabled={loading || !notes.trim()}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
            {loading ? "Summarizing..." : "Summarize Notes"}
          </Button>
        </CardContent>
      </Card>

      {output && (
        <Card>
          <CardContent className="p-6">
            <AiOutput value={output} onChange={setOutput} exportName="meeting-summary" rows={22} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}