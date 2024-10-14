import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const profileSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  dateOfBirth: z.string().refine(
    (date) => {
      return (
        new Date(date) <= new Date() && new Date(date) > new Date("1900-01-01")
      );
    },
    {
      message: "Data de nascimento inválida",
    }
  ),
  address: z.string(),
  languages: z.array(z.string()).min(1, "Selecione pelo menos um idioma"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  jobTitle: z.string().min(2, "Cargo deve ter pelo menos 2 caracteres"),
  resume: z
    .custom<FileList>()
    .refine((files) => files?.length === 1, "Currículo é obrigatório")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Tamanho máximo de arquivo é 5MB.`
    )
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      "Apenas .pdf, .doc e .docx são suportados."
    )
    .transform((files) => files[0]),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
