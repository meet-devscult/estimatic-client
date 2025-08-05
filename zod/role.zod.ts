import { z } from "zod";

export const RoleCreationSchema = z.object({
  user_id: z.string().min(1, "User ID is required"),
  user_name: z.string().min(1, "Name is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  status: z.enum(["active", "inactive"]),
  allow_all_access: z.boolean(),
  permissions: z.object({
    dashboard: z.enum(["full_access", "view_only", "restricted"]),
    companies: z.enum(["full_access", "view_only", "restricted"]),
    transactions: z.enum(["full_access", "view_only", "restricted"]),
    enquiries: z.enum(["full_access", "view_only", "restricted"]),
  })
});

export type TRoleCreationSchema = z.infer<typeof RoleCreationSchema>;