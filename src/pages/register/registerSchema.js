import { z } from "zod";

export const registerSchema = z
  .object({
    role: z.enum(["guest", "host"]),

    fullName: z
      .string()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(100, "El nombre es demasiado largo"),

    email: z
      .string()
      .min(1, "El correo es obligatorio")
      .email("Correo electrónico inválido"),

    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d).+$/,
        "Debe contener letras y números"
      ),

    confirmPassword: z.string(),

    terms: z.boolean().refine((value) => value === true, {
      message: "Debes aceptar los términos de servicio",
    }),

    // Campos opcionales inicialmente
    name: z.string().optional(),
    province: z.string().optional(),
    description: z.string().optional(),
    whatsapp: z.string().optional(),
  })

  // Validar coincidencia de contraseñas
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  })

  // Validaciones exclusivas para host
  .superRefine((data, ctx) => {
    if (data.role === "host") {
      if (!data.name || data.name.length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["name"],
          message: "Ingresa el nombre del hospedaje",
        });
      }

      if (!data.province || data.province.length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["province"],
          message: "Ingresa la ubicación",
        });
      }

      if (!data.description || data.description.length < 20) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["description"],
          message:
            "La descripción debe tener al menos 20 caracteres",
        });
      }

      if (!data.whatsapp || data.whatsapp.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["whatsapp"],
          message: "Ingresa un número de WhatsApp válido",
        });
      }
    }
  });