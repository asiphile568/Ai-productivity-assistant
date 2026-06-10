import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import { getGateway } from "./ai-gateway.server";

const MODEL = "google/gemini-3-flash-preview";

const Input = z.object({
  system: z.string().min(1),
  prompt: z.string().min(1),
});

export const runAi = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => Input.parse(d))
  .handler(async ({ data }) => {
    const gateway = getGateway();
    try {
      const { text } = await generateText({
        model: gateway(MODEL),
        system: data.system,
        prompt: data.prompt,
      });
      return { text };
    } catch (err) {
      const msg = err instanceof Error ? err.message : "AI request failed";
      throw new Error(msg);
    }
  });