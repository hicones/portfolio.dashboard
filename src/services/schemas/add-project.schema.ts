import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

export const projectSchema = z.object({
  name: z.string().min(3, "Nome é obrigatório"),
  categories: z.string().min(3, "Categorias são obrigatórias"),
  photo: z
    .instanceof(File)
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      "Tamanho máximo de arquivo é 5MB."
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Apenas .jpg, .jpeg, .png, .webp e .gif são suportados."
    ),
  link: z.string().url("URL inválida"),
  description: z.string().min(3, "Descrição é obrigatória"),
});

export type ProjectSchema = z.infer<typeof projectSchema>;
