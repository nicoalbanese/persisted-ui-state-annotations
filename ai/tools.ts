import { CoreTool, tool } from "ai";
import { z } from "zod";

const weatherTool = tool({
  description: "Use to get the weather",
  parameters: z.object({ city: z.string() }),
  execute: async ({ city }) => {
    return { city, weather: "sunny" };
  },
});

export const tools = { weatherTool };
