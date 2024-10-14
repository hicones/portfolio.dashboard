import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(3, "Nome é obrigatório"),
});

export type CategorySchema = z.infer<typeof categorySchema>;
