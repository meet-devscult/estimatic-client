import DropdownBox from "@/components/form-fields-components/dropdown-box";
import AddNewUserPopup from "@/components/form-fields-components/form-popup-layout";
import InputBox from "@/components/form-fields-components/input-box";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { NewUserSchema, TNewUserSchema } from "@/zod/company-creation.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useForm, UseFormReturn } from "react-hook-form";



export default function NewUserDetailsForm() {

    const userForm = useForm<TNewUserSchema>({
        resolver: zodResolver(NewUserSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            designation: "",
            type: "",
            phone: "",
        },
    })

    function onUserSubmit(data: TNewUserSchema) {
        console.log(data);
    }

    return  <AddNewUserPopup
    title="Add New User"
        triggerText={
            <Button variant="outline" size="lg" className="border-dashed hover:cursor-pointer">
            <PlusIcon />
            <span className="hidden lg:inline">Add User</span>
            </Button>
        } 
        form={
            <UserDetailsForm
            form={userForm}
            onSubmit={onUserSubmit}
            />}
            submitFunction={() => {
            console.log(userForm.getValues())
            userForm.reset()
            }}
        buttonText="Add User"
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
                    <InputBox form={form} name="name" placeholder="Name" />
                    <InputBox form={form} name="designation" placeholder="Designation" />
                    <InputBox form={form} name="phone" placeholder="Phone" />
                    <DropdownBox form={form} name="type" placeholder="Type" options={[{label: "Admin", value: "admin"}, {label: "User", value: "user"}]} className="w-full h-full" />
                    <InputBox form={form} name="email" placeholder="Email" />
                    <InputBox form={form} name="password" placeholder="Password" type="password" />
                </div>
            </form>
        </Form>
    )
}