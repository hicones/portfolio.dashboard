import { z } from "zod";

export const courceSchema = z.object({
  startDate: z.string().nonempty("Data inicial é obrigatória"),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z
    .string()
    .min(10, "A descrição deve ter pelo menos 10 caracteres"),
  title: z.string().min(2, "Cargo deve ter pelo menos 2 caracteres"),
  institution: z
    .string()
    .min(2, "Nome da empresa deve ter pelo menos 2 caracteres"),
});

export type CourceProps = z.infer<typeof courceSchema>;
