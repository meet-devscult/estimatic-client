import { z } from "zod";

export const RoleCreationSchema = z.object({
  user_name: z.string().min(1, "Name is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  email: z.string().email("Invalid email address"),
  company_admin_password: z.string().min(6, "Company admin password is required"),
  allow_all_access: z.boolean(),
  permissions: z.object({
    dashboard: z.enum(["full_access", "view_only", "restricted"]),
    companies: z.enum(["full_access", "view_only", "restricted"]),
    transactions: z.enum(["full_access", "view_only", "restricted"]),
    enquiries: z.enum(["full_access", "view_only", "restricted"]),
    roles: z.enum(["full_access", "view_only", "restricted"]),
  })
});

export type TRoleCreationSchema = z.infer<typeof RoleCreationSchema>;