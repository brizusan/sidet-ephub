import z from "zod";

export const BaseAuhtSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z
    .string()
    .min(1, { error: "Campo email es obligatorio" })
    .email({ error: "Correo ingresado no valido" }),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  repeat_password: z
    .string()
    .min(1, { error: "La confirmación de contraseña es requerida" }),
});

export const RegisterSchema = BaseAuhtSchema.pick({
  name: true,
  email: true,
  password: true,
  repeat_password: true,
}).refine((data) => data.password === data.repeat_password, {
  error: "Las contraseñas no coinciden",
  path: ["repeat_password"],
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
