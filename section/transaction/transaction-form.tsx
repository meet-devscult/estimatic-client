import CalendarInputBox from "@/components/form-fields-components/calender-input-box";
import DropdownBox from "@/components/form-fields-components/dropdown-box";
import InputBox from "@/components/form-fields-components/input-box";
import { Form } from "@/components/ui/form";
import { useCompany } from "@/hooks/use-company";
import { TTransactionFormType } from "@/zod/transactions.zod";
import { UseFormReturn } from "react-hook-form";

interface TransactionFormProps {
    form: UseFormReturn<TTransactionFormType>;
    onSubmit: (data: TTransactionFormType) => void;
}

export default function TransactionForm({form, onSubmit}: TransactionFormProps) {

    const { data, isLoading } = useCompany()

    if (isLoading) return null

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4">
                    <DropdownBox 
                        form={form} 
                        name="name" 
                        placeholder="Company Name" 
                        options={data?.data.map((company: {companyName: string}) => ({label: company.companyName, value: company.companyName})) || []} 
                        className="w-full h-full" 
                    />
                    <CalendarInputBox form={form} name="paidDate" placeholder="Paid Date" futureDatesOnly />
                    <InputBox form={form} name="amount" placeholder="Amount Paid" type="number" />
                    <CalendarInputBox form={form} name="validUntil" placeholder="Valid Until" futureDatesOnly />
                    <DropdownBox form={form} name="paymentMethod" placeholder="Payment Mode" options={[{label: "UPI", value: "upi"}, {label: "Bank Transfer", value: "banktransfer"}, {label: "Cheque", value: "cheque"}, {label: "Cash", value: "cash"}]} className="w-full h-full" />
                    <DropdownBox form={form} name="paidFor" placeholder="Paid For" options={[{label: "Free", value: "free"}, {label: "Pro", value: "pro"}]} className="w-full h-full" />
                </div>
            </form>
        </Form>
    )
}