import { AlertTriangle } from "lucide-react";

export function AiDisclaimer({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-start gap-2 rounded-lg border border-warning/30 bg-warning/10 px-3 py-2 text-xs text-foreground/80 ${className}`}
      style={{ borderColor: "color-mix(in oklab, var(--warning) 30%, transparent)", backgroundColor: "color-mix(in oklab, var(--warning) 10%, transparent)" }}
    >
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--warning)" }} />
      <p>
        <strong>Responsible AI:</strong> AI-generated content may contain inaccuracies. Verify important information before use. This tool assists decision-making and does not replace professional judgment.
      </p>
    </div>
  );
}