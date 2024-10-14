import { z } from "zod";

export const articleSchema = z.object({
  title: z.string().min(2, "Nome deve ter pelo menos 3 caracteres"),
  description: z
    .string()
    .min(10, "Descrição deve ter pelo menos 10 caracteres"),
  link: z.string().url("Link inválido"),
});

export type ArticleProps = z.infer<typeof articleSchema>;
