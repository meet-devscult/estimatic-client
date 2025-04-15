import DropdownBox from "@/components/form-fields-components/dropdown-box";
import InputBox from "@/components/form-fields-components/input-box";
import { Form } from "@/components/ui/form";
import { TNewUserSchema } from "@/zod/company-creation.zod";
import { UseFormReturn } from "react-hook-form";

interface NewUserDetailsFormProps {
    form: UseFormReturn<TNewUserSchema>;
    onSubmit: (data: TNewUserSchema) => void;
}

export default function NewUserDetailsForm({form, onSubmit}: NewUserDetailsFormProps) {

    return (
        <>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4 px-5">
                    <InputBox form={form} name="name" placeholder="Name" />
                    <InputBox form={form} name="designation" placeholder="Designation" />
                    <InputBox form={form} name="phone" placeholder="Phone" />
                    <DropdownBox form={form} name="type" placeholder="Type" options={[{label: "Admin", value: "admin"}, {label: "User", value: "user"}]} className="w-full h-full" />
                    <InputBox form={form} name="email" placeholder="Email" />
                    <InputBox form={form} name="password" placeholder="Password" />
                </div>
            </form>
        </Form>
      </>
    )
}