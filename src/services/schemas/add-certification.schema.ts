import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const certificationSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "Tamanho máximo de arquivo é 5MB.",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Apenas .jpg, .jpeg, .png e .webp são suportados.",
    })
    .optional(),
  link: z.string().optional(),
  title: z.string().min(2, "Título deve ter pelo menos 2 caracteres"),
  institution: z
    .string()
    .min(2, "Nome da instituição deve ter pelo menos 2 caracteres"),
  year: z.number().int().min(1900).max(new Date().getFullYear()),
});

export type CertificationProps = z.infer<typeof certificationSchema>;
