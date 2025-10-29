import { changeUserPassword } from "@/actions/users.action";
import AddNewUserPopup from "@/components/form-fields-components/form-popup-layout";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Pencil } from "lucide-react";
import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const changePasswordSchema = z.object({
    password: z.string().min(8, {message: "Password must be at least 8 characters long"}),
    confirm_password: z.string().min(8, {message: "Password must be at least 8 characters long"}),
}).refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
})

export type TChangePasswordSchema = z.infer<typeof changePasswordSchema>;

interface ChangePasswordFormProps {
    user_id: string | null;
    disabled?: boolean;
}

export default function ChangePasswordForm({user_id, disabled = false}: ChangePasswordFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    
    const changePasswordForm = useForm<TChangePasswordSchema>({
        resolver: zodResolver(changePasswordSchema),
    })

    const handleSubmit = async (data: TChangePasswordSchema) => {
        try {
            setIsLoading(true)
            await changeUserPassword({
                user_id: user_id,
                new_password: data.password
            })
            toast.success("Password updated successfully")
            changePasswordForm.reset()
        } catch (error) {
            toast.error("Failed to update password")
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return  <AddNewUserPopup
        title={"Change Password"}
        triggerText={
            <Button variant="outline" size="lg" className="border-dashed hover:cursor-pointer" disabled={disabled}>
                <Pencil />
                <p>Change Password</p>
            </Button>
        } 
        form={
            <PasswordForm
                form={changePasswordForm}
                onSubmit={handleSubmit}
            />}
            submitFunction={async () => {
                await changePasswordForm.handleSubmit(handleSubmit)()
            }}
        buttonText={"Update Password"}
        isLoading={isLoading}
        loadingText="Updating Password..."
        formInstance={changePasswordForm}
        isValidate={true}
        />
}

interface PasswordFormProps {
    form: UseFormReturn<TChangePasswordSchema>;
    onSubmit: (data: TChangePasswordSchema) => void;
}
export function PasswordForm({form, onSubmit}: PasswordFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 gap-4 px-5">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="relative">
                                        <Input 
                                            placeholder="New Password" 
                                            {...field} 
                                            value={field.value ?? ''}
                                            className={cn("h-14 border-dashed pr-10")} 
                                            type={showPassword ? "text" : "password"}
                                        />
                                        <Button
                                            type="button"
                                            size="icon"
                                            className="absolute right-0 top-0 h-full px-3 cursor-pointer py-2 bg-transparent hover:bg-transparent"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-muted-foreground" />
                                            )}
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormDescription className="text-destructive">
                                    {form.formState.errors.password?.message as string || ""}
                                </FormDescription>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirm_password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="relative">
                                        <Input 
                                            placeholder="Confirm New Password" 
                                            {...field} 
                                            value={field.value ?? ''}
                                            className={cn("h-14 border-dashed pr-10")} 
                                            type={showConfirmPassword ? "text" : "password"}
                                        />
                                        <Button
                                            type="button"
                                            size="icon"
                                            className="absolute right-0 top-0 h-full px-3 cursor-pointer py-2 bg-transparent hover:bg-transparent"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-muted-foreground" />
                                            )}
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormDescription className="text-destructive">
                                    {form.formState.errors.confirm_password?.message as string || ""}
                                </FormDescription>
                            </FormItem>
                        )}
                    />
                </div>
            </form>
        </Form>
    )
}