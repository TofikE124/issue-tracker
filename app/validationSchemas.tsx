import { z } from "zod";

export const issueSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title can't have more than 255 charachters"),
  description: z.string().min(1, "Description is required"),
});
