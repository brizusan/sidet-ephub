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
  newPassword: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
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

export const LoginSchema = BaseAuhtSchema.pick({
  email: true,
  password: true,
});

export const ForgotSchema = BaseAuhtSchema.pick({
  email: true,
});

export const ResetPasswordSchema = BaseAuhtSchema.pick({
  newPassword: true,
})
  .extend({
    repeat_password: z.string().min(1, "Campo obligatorio"),
  })
  .refine((data) => data.newPassword === data.repeat_password, {
    error: "Las contraseñas no coinciden",
    path: ["repeat_password"],
  });

export const CheckPasswordSchema = z.object({
  password: z.string().min(1, { error: "El campos password es obligatorio" }),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type ForgotInput = z.infer<typeof ForgotSchema>;
export type ResePasswordInput = z.infer<typeof ResetPasswordSchema>;
export type CheckPasswordInput = z.infer<typeof CheckPasswordSchema>;
