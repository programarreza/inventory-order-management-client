import { z } from "zod";

export const registerValidationSchema = z.object({
  name: z.string({
    message: "Name is required!",
  }).min(1, "Please enter your full name!"),
  email: z.string({
    message: "Email is required!",
  }).trim().email("Please enter a valid email address!"),
  contactNo: z
    .string({
      message: "Contact number is required!",
    })
    .min(11, "Mobile number must be at least 11 digits!")
    .max(14, "Mobile number cannot exceed 14 digits!"),
  password: z
    .string({
      message: "Password is required!",
    })
    .trim()
    .min(6, "Password must be at least 6 characters!"),
});
