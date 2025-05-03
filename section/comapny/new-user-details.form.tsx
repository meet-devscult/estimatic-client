import DropdownBox from "@/components/form-fields-components/dropdown-box";
import AddNewUserPopup from "@/components/form-fields-components/form-popup-layout";
import InputBox from "@/components/form-fields-components/input-box";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useUserMutation } from "@/hooks/use-user";
import { NewUserSchema, TNewUserSchema } from "@/zod/user.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { useForm, UseFormReturn } from "react-hook-form";

export default function NewUserDetailsForm({defaultValues, company_id}: { defaultValues?: TNewUserSchema, company_id?: string }) {

    const queryClient = useQueryClient()

    const userForm = useForm<TNewUserSchema>({
        resolver: zodResolver(NewUserSchema),
        defaultValues: defaultValues || {
            company_id: company_id || undefined,
            user_name: "",
            email: "",
            password: "",
            designation: "",
            type: "",
            phone_number: "",
        },
    })

    const { mutate: createUser, isPending: isCreatingUser } = useUserMutation({queryClient, companyId: company_id || ""})

    return  <AddNewUserPopup
        title={defaultValues ? "Edit User" : "Add New User"}
        triggerText={
            <Button variant="outline" size="lg" className="border-dashed hover:cursor-pointer" >
              {!defaultValues && <PlusIcon />}
              {defaultValues ? <span className="hidden lg:inline">Edit Info</span> : <span className="hidden lg:inline">Add User</span>}
            </Button>
        } 
        form={
            <UserDetailsForm
                form={userForm}
                onSubmit={async (data) => {
                    await createUser({ data, method: defaultValues ? 'put' : 'post' })
                    userForm.reset()
                }}
            />}
            submitFunction={async () => {
                await createUser({ data: userForm.getValues(), method: defaultValues ? 'put' : 'post' })
                userForm.reset()
            }}
        buttonText="Add User"
        isLoading={isCreatingUser}
        loadingText="Adding User..."
        formInstance={userForm}
        />    

}

interface NewUserDetailsFormProps {
    form: UseFormReturn<TNewUserSchema>;
    onSubmit: (data: TNewUserSchema) => void;
}

export function UserDetailsForm({form, onSubmit}: NewUserDetailsFormProps) {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4 px-5">
                    <InputBox form={form} name="user_name" placeholder="Name" />
                    <InputBox form={form} name="designation" placeholder="Designation" />
                    <InputBox form={form} name="phone_number" placeholder="Phone" />
                    <DropdownBox form={form} name="type" placeholder="Type" options={[{label: "Admin", value: "admin"}, {label: "User", value: "user"}]} className="w-full h-full" />
                    <InputBox form={form} name="email" placeholder="Email" />
                    <InputBox form={form} name="password" placeholder="Password" type="password" />
                </div>
            </form>
        </Form>
    )
}