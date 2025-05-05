import CalendarInputBox from "@/components/form-fields-components/calender-input-box";
import DropdownBox from "@/components/form-fields-components/dropdown-box";
import AddTransactionPopup from "@/components/form-fields-components/form-popup-layout";
import InputBox from "@/components/form-fields-components/input-box";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useCompany } from "@/hooks/use-company";
import { useCreateTransaction } from "@/hooks/use-transaction";
import { TTransactionFormType } from "@/zod/transactions.zod";
import { useQueryClient } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { useForm, UseFormReturn } from "react-hook-form";

export default function NewTransaction({defaultValues}: { defaultValues?: TTransactionFormType}) {

    const form = useForm<TTransactionFormType>({defaultValues})
    const queryClient = useQueryClient()
  
    const { mutate: createTransaction, isPending: isCreatingTransaction } = useCreateTransaction(queryClient)
    
    return <AddTransactionPopup title={defaultValues ? "Edit Transaction" : "Add New Transaction"} 
          triggerText={
            <Button variant="outline" size="lg" className="border-dashed hover:cursor-pointer" disabled={isCreatingTransaction}>
              {!defaultValues && <PlusIcon />}
              {defaultValues ? <span className="hidden lg:inline">Edit Info</span> : <span className="hidden lg:inline">Add Transaction</span>}
            </Button>
          } 
          form={
            <TransactionForm
              form={form}
              onSubmit={createTransaction}
            />}
            submitFunction={() => {
              createTransaction(form.getValues())
              form.reset()
            }}
          buttonText="Add Transaction"
          formInstance={form}
        />    
}

interface TransactionFormProps {
    form: UseFormReturn<TTransactionFormType>;
    onSubmit: (data: TTransactionFormType) => void;
}

export function TransactionForm({form, onSubmit}: TransactionFormProps) {

    const { data, isLoading } = useCompany()

    if (isLoading) return null

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4 px-5">
                    <DropdownBox 
                        form={form} 
                        name="name" 
                        placeholder="Company Name" 
                        options={data.data.list?.map((company: {name: string}) => ({label: company.name, value: company.name})) || []} 
                        className="w-full h-full" 
                    />
                    <CalendarInputBox form={form} name="datePaid" placeholder="Paid Date" futureDatesOnly />
                    <InputBox form={form} name="amount" placeholder="Amount Paid" type="number" />
                    <CalendarInputBox form={form} name="validUntil" placeholder="Valid Until" futureDatesOnly />
                    <DropdownBox form={form} name="paidVia" placeholder="Payment Mode" options={[{label: "UPI", value: "UPI"}, {label: "Bank Transfer", value: "Bank Transfer"}, {label: "Cheque", value: "Cheque"}, {label: "Cash", value: "Cash"}]} className="w-full h-full" />
                    <DropdownBox form={form} name="paidFor" placeholder="Paid For" options={[{label: "Free", value: "Free"}, {label: "Pro", value: "Pro"}]} className="w-full h-full" />
                </div>
            </form>
        </Form>
    )
}