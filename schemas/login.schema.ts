import { z } from "zod";

const loginValidationSchema = z.object({
  email: z.string({
    message: "Email is required!",
  }).trim().email("Please enter a valid email!"),
  password: z
    .string({
      message: "Password is required!",
    })
    .trim()
    .min(6, "Password needs to be at least 6 characters!"),
});

const studentLoginValidationSchema = z.object({
  customStudentId: z
    .string()
    .trim()
    .min(6, "Student ID must be at least 6 characters!"),
  password: z
    .string()
    .trim()
    .min(6, "Password needs to be at least 6 characters!"),
});

export { loginValidationSchema, studentLoginValidationSchema };
