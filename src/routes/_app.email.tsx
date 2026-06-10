import { createFileRoute } from "@tanstack/react-router";
import { Mail, Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/page-header";
import { AiOutput } from "@/components/ai-output";
import { useAi } from "@/lib/use-ai";

export const Route = createFileRoute("/_app/email")({
  head: () => ({ meta: [{ title: "Smart Email Generator" }] }),
  component: EmailPage,
});

function EmailPage() {
  const [purpose, setPurpose] = useState("");
  const [context, setContext] = useState("");
  const [audience, setAudience] = useState("Client");
  const [tone, setTone] = useState("Formal");
  const [output, setOutput] = useState("");
  const { run, loading } = useAi();

  const generate = async () => {
    if (!purpose.trim()) return;
    const system =
      "You are a professional workplace communication assistant. Create a professional email using the selected audience and tone. Include a suitable subject line, greeting, body, and closing.";
    const prompt = `Audience: ${audience}\nTone: ${tone}\nPurpose: ${purpose}\nAdditional context: ${context || "(none)"}\n\nReturn the email in this exact format:\nSubject: <subject line>\n\n<full email body with greeting and closing>`;
    const text = await run(system, prompt);
    if (text) setOutput(text);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Mail}
        title="Smart Email Generator"
        description="Draft professional emails with the right tone for any audience."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="space-y-4 p-6">
            <div className="space-y-2">
              <Label htmlFor="purpose">Email purpose</Label>
              <Input
                id="purpose"
                placeholder="e.g. Follow up on yesterday's proposal"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="context">Additional context (optional)</Label>
              <Textarea
                id="context"
                rows={4}
                placeholder="Key points to include, names, dates, attachments..."
                value={context}
                onChange={(e) => setContext(e.target.value)}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Audience</Label>
                <Select value={audience} onValueChange={setAudience}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Client">Client</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Team Member">Team Member</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Tone</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Formal">Formal</SelectItem>
                    <SelectItem value="Friendly">Friendly</SelectItem>
                    <SelectItem value="Persuasive">Persuasive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={generate} disabled={loading || !purpose.trim()} className="w-full">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              {loading ? "Generating..." : "Generate Email"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            {output ? (
              <AiOutput value={output} onChange={setOutput} exportName="email" rows={20} />
            ) : (
              <div className="flex h-full min-h-[400px] flex-col items-center justify-center text-center text-muted-foreground">
                <Mail className="mb-3 h-10 w-10 opacity-40" />
                <p className="text-sm">Your generated email will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}