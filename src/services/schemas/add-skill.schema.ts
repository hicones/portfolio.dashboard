import { z } from "zod";

export const skillSchema = z.object({
  name: z.string().min(3, "Nome é obrigatório"),
  progress: z
    .number()
    .int()
    .min(0, "Progresso deve ser maior que 0")
    .max(100, "Progresso deve ser menor que 100"),
});

export type SkillSchema = z.infer<typeof skillSchema>;
