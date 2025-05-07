import CalendarInputBox from "@/components/form-fields-components/calender-input-box";
import DropdownBox from "@/components/form-fields-components/dropdown-box";
import AddTransactionPopup from "@/components/form-fields-components/form-popup-layout";
import InputBox from "@/components/form-fields-components/input-box";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { useCompany } from "@/hooks/use-company";
import { useMutateTransaction } from "@/hooks/use-transaction";
import { transactionSchema, TTransactionFormType } from "@/zod/transactions.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { useForm, UseFormReturn } from "react-hook-form";

export default function NewTransaction({defaultValues, companyId}: { defaultValues?: TTransactionFormType, companyId?: string}) {

    const form = useForm<TTransactionFormType>({
      resolver: zodResolver(transactionSchema),
      defaultValues: defaultValues || {
        company_id: companyId || undefined,
        company_name: "",
      }
    })


    const queryClient = useQueryClient()
  
    const { mutate: createTransaction, isPending: isCreatingTransaction } = useMutateTransaction(queryClient, companyId || "")
    
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
              onSubmit={() => {
                createTransaction({data: form.getValues(), method: defaultValues ? 'put' : 'post'})
                form.reset()
              }}
            />}
            submitFunction={() => {
              createTransaction({data: form.getValues(), method: defaultValues ? 'put' : 'post'})
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

    const PAYMENT_PLANS = [
        {label: "Monthly", value: "monthly"},
        {label: "Quarterly", value: "quarterly"},
        {label: "Yearly", value: "yearly"}
    ]

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4 px-5">
                    {isLoading ? <Skeleton className="w-full h-full" /> : <DropdownBox 
                        form={form} 
                        name="company_name" 
                        placeholder="Company Name" 
                        options={data.map((company: {name: string}) => ({label: company.name, value: company.name})) || []} 
                        className="w-full h-full" 
                    />}
                    <CalendarInputBox form={form} name="paid_time" placeholder="Paid Date" futureDatesOnly />
                    <InputBox form={form} name="amount" placeholder="Amount Paid" type="number" />
                    <CalendarInputBox form={form} name="upto_validated_at" placeholder="Valid Until" futureDatesOnly />
                    <InputBox form={form} name="payment_mode" placeholder="Payment Mode" />
                    {/* <DropdownBox form={form} name="paidVia" placeholder="Payment Mode" options={[{label: "UPI", value: "UPI"}, {label: "Bank Transfer", value: "Bank Transfer"}, {label: "Cheque", value: "Cheque"}, {label: "Cash", value: "Cash"}]} className="w-full h-full" /> */}
                    {/* <InputBox form={form} name="plan" placeholder="Paid For" /> */}
                    <DropdownBox form={form} name="plan" placeholder="Paid For" options={PAYMENT_PLANS} className="w-full h-full" />
                </div>
            </form>
        </Form>
    )
}