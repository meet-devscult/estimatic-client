"use client"

import DropdownBox from "@/components/form-fields-components/dropdown-box";
import InputBox from "@/components/form-fields-components/input-box";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RoleCreationSchema, TRoleCreationSchema } from "@/zod/role.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function RoleCreateView() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<TRoleCreationSchema>({
        resolver: zodResolver(RoleCreationSchema),
        defaultValues: {
            user_id: "",
            user_name: "",
            password: "",
            status: "active",
            allow_all_access: false,
            permissions: {
                dashboard: "restricted",
                companies: "restricted", 
                transactions: "restricted",
                enquiries: "restricted",
            },
        },
    });

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
            // Here you would typically call an API to create the role
            console.log("Role creation data:", data);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Reset form and navigate back
            form.reset();
            router.push("/role");
        } catch (error) {
            console.error("Failed to create role:", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div>
            <div className="p-5 border-b border-dashed">
                <h1 className="text-2xl font-bold">Create Role</h1>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {/* Login Details Section */}
                    <div className="p-5 border-b border-dashed space-y-5">
                        <h2 className="text-xl font-bold">Login Details</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <InputBox
                                form={form}
                                name="user_id"
                                placeholder="User ID"
                            />
                            <DropdownBox
                                form={form}
                                name="status"
                                placeholder="Status"
                                options={STATUS_OPTIONS}
                                className="h-full w-full"
                            />
                            <InputBox
                                form={form}
                                name="user_name"
                                placeholder="Name"
                            />
                            <InputBox
                                form={form}
                                name="password"
                                placeholder="Password"
                                type="password"
                            />
                        </div>
                    </div>

                    {/* Assign Access Section */}
                    <div className="p-5 border-b border-dashed space-y-5">
                        <div className="flex justify-between items-center">
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
                        <div className="border border-dashed rounded-lg overflow-hidden">
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
                                router.push("/role");
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
                                {isSubmitting ? "Creating..." : "Confirm Changes"}
                            </span>
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
