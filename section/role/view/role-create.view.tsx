"use client"

import { createCompanyAdminUser, updateCompanyAdminUserPermissions } from "@/actions/users.action";
import InputBox from "@/components/form-fields-components/input-box";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUserById } from "@/hooks/use-user";
import { PERMISSIONS } from "@/types/user.type";
import { RoleCreationSchema, TRoleCreationSchema } from "@/zod/role.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, XIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function RoleCreateView() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const searchParams = useSearchParams();
    const userId = searchParams.get('user_id');

    const { data: userData } = useUserById(userId || "");

    const form = useForm<TRoleCreationSchema>({
        resolver: zodResolver(RoleCreationSchema),
        defaultValues: {
            user_name: "",
            password: "",
            email: "",
            company_admin_password: "",
            allow_all_access: false,
            permissions: {
                dashboard: "restricted",
                companies: "restricted",
                transactions: "restricted",
                enquiries: "restricted",
                roles: "restricted",
            },
        },
    });

    useEffect(() => {
        if (userData && userId) {
            form.setValue("user_name", userData.user_name);
            form.setValue("email", userData.email);
            form.setValue("password", "Abcd1234");
            form.setValue("company_admin_password", "Abcd1234");
            const permissions = userData.permissions;
            form.setValue("permissions.dashboard", permissions.dashboard);
            form.setValue("permissions.companies", permissions.companies);
            form.setValue("permissions.transactions", permissions.transactions);
            form.setValue("permissions.enquiries", permissions.enquiries);
            form.setValue("permissions.roles", permissions.roles);
        }
    }, [userData, userId, form]);

    const STATUS_OPTIONS = [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
    ];

    const allowAllAccess = form.watch("allow_all_access");

    // When "Allow All Access" is checked, set all permissions to full_access
    const handleAllowAllAccessChange = (checked: boolean) => {
        form.setValue("allow_all_access", checked);
        if (checked) {
            form.setValue("permissions.dashboard", "full_access");
            form.setValue("permissions.companies", "full_access");
            form.setValue("permissions.transactions", "full_access");
            form.setValue("permissions.enquiries", "full_access");
        }
    };

    async function onSubmit(data: TRoleCreationSchema) {
        setIsSubmitting(true);
        try {
            // Simulate API call
            const { allow_all_access, ...dataToSend } = data;
            if (!userId) {
                await createCompanyAdminUser(dataToSend as TRoleCreationSchema);
                toast.success("Role created successfully!");
            }
            else {
                await updateCompanyAdminUserPermissions({ user_id: userId || "", permissions: dataToSend.permissions as PERMISSIONS });
                toast.success("Role updated successfully!");
            }
            // Reset form and navigate back
            form.reset();
            router.push("/roles");
        } catch (error) {
            if (!userId) {
                toast.error("Failed to create role.");
            } else {
                toast.error("Failed to update role.");
            }
            console.error("Failed to create role:", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div>
            <div className="p-5 border-b border-dashed">
                <h1 className="text-2xl font-bold">{userId ? "Edit Role" : "Create Role"}</h1>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {/* Login Details Section */}
                    <div className="p-5 border-b border-dashed space-y-5">
                        <h2 className="text-xl font-bold">Login Details</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <InputBox
                                form={form}
                                name="user_name"
                                placeholder="Name"
                                disabled={!!userId}
                            />
                            {!userId && (
                                <InputBox
                                form={form}
                                name="password"
                                placeholder="Password"
                                type="password"
                            />)}
                            <InputBox
                                form={form}
                                name="email"
                                placeholder="Email Address"
                                disabled={!!userId}
                            />
                            {!userId && (
                                <InputBox
                                form={form}
                                name="company_admin_password"
                                placeholder="Company Admin Password"
                                type="password"
                            />)}
                        </div>
                    </div>

                    {/* Assign Access Section */}
                    <div className="border-b border-dashed space-y-5">
                        <div className="flex justify-between items-center px-5 pt-5">
                            <h2 className="text-xl font-bold">Assign Access</h2>
                            <FormField
                                control={form.control}
                                name="allow_all_access"
                                render={({ field }) => (
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={handleAllowAllAccessChange}
                                            />
                                        </FormControl>
                                        <FormLabel className="text-sm font-normal">
                                            Allow All Access
                                        </FormLabel>
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Access Permissions Table */}
                        <div className="border border-dashed overflow-hidden">
                            <div className="grid grid-cols-4 bg-muted/50">
                                <div className="p-4 font-medium border-r border-dashed">Access Role</div>
                                <div className="p-4 font-medium text-center">Full Access</div>
                                <div className="p-4 font-medium text-center">View Only</div>
                                <div className="p-4 font-medium text-center">Restricted</div>
                            </div>
                            
                            {/* Dashboard Row */}
                            <div className="grid grid-cols-4 border-b border-dashed">
                                <div className="p-4 border-r border-dashed font-medium">Dashboard</div>
                                <FormField
                                    control={form.control}
                                    name="permissions.dashboard"
                                    render={({ field }) => (
                                        <FormItem className="col-span-3">
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                    className="grid grid-cols-3 w-full"
                                                    disabled={allowAllAccess}
                                                >
                                                    <div className="flex items-center justify-center p-4">
                                                        <RadioGroupItem value="full_access" className="mx-auto" />
                                                    </div>
                                                    <div className="flex items-center justify-center p-4">
                                                        <RadioGroupItem value="view_only" className="mx-auto" />
                                                    </div>
                                                    <div className="flex items-center justify-center p-4">
                                                        <RadioGroupItem value="restricted" className="mx-auto" />
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Companies Row */}
                            <div className="grid grid-cols-4 border-b border-dashed">
                                <div className="p-4 border-r border-dashed font-medium">Companies</div>
                                <FormField
                                    control={form.control}
                                    name="permissions.companies"
                                    render={({ field }) => (
                                        <FormItem className="col-span-3">
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                    className="grid grid-cols-3 w-full"
                                                    disabled={allowAllAccess}
                                                >
                                                    <div className="flex items-center justify-center p-4">
                                                        <RadioGroupItem value="full_access" className="mx-auto" />
                                                    </div>
                                                    <div className="flex items-center justify-center p-4">
                                                        <RadioGroupItem value="view_only" className="mx-auto" />
                                                    </div>
                                                    <div className="flex items-center justify-center p-4">
                                                        <RadioGroupItem value="restricted" className="mx-auto" />
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Transactions Row */}
                            <div className="grid grid-cols-4 border-b border-dashed">
                                <div className="p-4 border-r border-dashed font-medium">Transactions</div>
                                <FormField
                                    control={form.control}
                                    name="permissions.transactions"
                                    render={({ field }) => (
                                        <FormItem className="col-span-3">
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                    className="grid grid-cols-3 w-full"
                                                    disabled={allowAllAccess}
                                                >
                                                    <div className="flex items-center justify-center p-4">
                                                        <RadioGroupItem value="full_access" className="mx-auto" />
                                                    </div>
                                                    <div className="flex items-center justify-center p-4">
                                                        <RadioGroupItem value="view_only" className="mx-auto" />
                                                    </div>
                                                    <div className="flex items-center justify-center p-4">
                                                        <RadioGroupItem value="restricted" className="mx-auto" />
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Enquiries Row */}
                            <div className="grid grid-cols-4">
                                <div className="p-4 border-r border-dashed font-medium">Enquiries</div>
                                <FormField
                                    control={form.control}
                                    name="permissions.enquiries"
                                    render={({ field }) => (
                                        <FormItem className="col-span-3">
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                    className="grid grid-cols-3 w-full"
                                                    disabled={allowAllAccess}
                                                >
                                                    <div className="flex items-center justify-center p-4">
                                                        <RadioGroupItem value="full_access" className="mx-auto" />
                                                    </div>
                                                    <div className="flex items-center justify-center p-4">
                                                        <RadioGroupItem value="view_only" className="mx-auto" />
                                                    </div>
                                                    <div className="flex items-center justify-center p-4">
                                                        <RadioGroupItem value="restricted" className="mx-auto" />
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="p-5 flex justify-end items-center gap-4">
                        <Button 
                            type="button"
                            variant="destructive" 
                            size="lg" 
                            className="border-dashed hover:cursor-pointer"
                            onClick={() => {
                                form.reset();
                                router.push("/roles");
                            }}
                            disabled={isSubmitting}
                        >
                            <XIcon />
                            <span className="hidden lg:inline">Cancel</span>
                        </Button>

                        <Button 
                            type="submit"
                            size="lg" 
                            className="border-dashed hover:cursor-pointer dark:text-white" 
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <Loader2 className="animate-spin" /> : null}
                            <span className="hidden lg:inline">
                                {isSubmitting ? userId ? "Updating..." : "Creating..." : userId ? "Update Role" : "Create Role"}
                            </span>
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
