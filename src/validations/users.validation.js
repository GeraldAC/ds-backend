import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  is_producer: z.boolean().optional(),
  avatar_url: z.string().url("URL de avatar inválida").optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
