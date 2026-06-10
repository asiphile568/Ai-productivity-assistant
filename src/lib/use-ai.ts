import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { runAi } from "./ai.functions";

export function useAi() {
  const fn = useServerFn(runAi);
  const [loading, setLoading] = useState(false);

  const run = async (system: string, prompt: string): Promise<string | null> => {
    setLoading(true);
    try {
      const result = await fn({ data: { system, prompt } });
      toast.success("Generated successfully");
      return result.text;
    } catch (e) {
      const msg = e instanceof Error ? e.message : "AI request failed";
      if (msg.includes("429")) toast.error("Rate limit reached. Try again in a moment.");
      else if (msg.includes("402")) toast.error("AI credits exhausted. Add credits to continue.");
      else toast.error(msg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { run, loading };
}