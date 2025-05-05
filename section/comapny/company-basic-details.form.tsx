import CalendarInputBox from "@/components/form-fields-components/calender-input-box";
import DropdownBox from "@/components/form-fields-components/dropdown-box";
import InputBox from "@/components/form-fields-components/input-box";
import { Form } from "@/components/ui/form";
import { TCompanyCreationSchema } from "@/zod/company.zod";
import { UseFormReturn } from "react-hook-form";

interface CompanyBasicDetailsFormProps {
    form: UseFormReturn<TCompanyCreationSchema>;
    onSubmit: (data: TCompanyCreationSchema) => void;
}

export default function CompanyBasicDetailsForm({form, onSubmit}: CompanyBasicDetailsFormProps) {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4">
                    <InputBox form={form} name="name" placeholder="Company Name" />
                    <InputBox form={form} name="website" placeholder="Company Website (optional)" type="url" />
                    <InputBox form={form} name="quotations_limits" placeholder="Number of Quotes" type="number" />
                    <DropdownBox form={form} name="type" placeholder="Company Type" options={[{label: "Free", value: "free"}, {label: "Pro", value: "pro"}]} className="w-full h-full" />
                    <CalendarInputBox form={form} name="upto_validated_at" futureDatesOnly />
                </div>
            </form>
        </Form>
    )
}