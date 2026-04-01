import { z } from "zod";

export const commonSchoolUserValidationSchema = z.object({
  name: z.string().min(1, "Please enter user name!"),
  email: z.string().trim().email("Please enter a valid email!"),
  contactNo: z
    .string()
    .regex(/^\d{11}$/, "Please enter a valid mobile number!"),
  password: z
    .string()
    .trim()
    .min(6, "Password needs to be at least 6 characters!"),
  role: z.string().min(1, "Role is required").optional(),
  instituteId: z
    .string({ error: "Please select a institute" })
    .min(1, "Institute ID is required"),
});
