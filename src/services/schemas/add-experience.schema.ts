import { z } from "zod";

export const experienceSchema = z.object({
  startDate: z.string().nonempty("Data inicial é obrigatória"),
  endDate: z.string().optional(),
  currentJob: z.boolean().default(false),
  description: z
    .string()
    .min(10, "A descrição deve ter pelo menos 10 caracteres"),
  jobTitle: z.string().min(2, "Cargo deve ter pelo menos 2 caracteres"),
  company: z
    .string()
    .min(2, "Nome da empresa deve ter pelo menos 2 caracteres"),
});

export type ExperienceProps = z.infer<typeof experienceSchema>;
