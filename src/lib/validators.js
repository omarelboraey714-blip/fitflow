// lib/validators.js
import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2, "الاسم يجب أن يكون من حرفين على الأقل"),
    email: z.string().email("بريد إلكتروني غير صالح"),
    password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
    confirmPassword: z.string(),
    phone: z.string().optional(),
    age: z.number().int().min(12).max(100).optional(),
    gender: z.enum(["ذكر", "أنثى", "أفضل عدم الإفصاح"]),
    goal: z.string().optional(),
    experience: z.string().optional(),
    plan: z.enum(["monthly", "quarterly", "yearly", "VIP"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirmPassword"],
  });
