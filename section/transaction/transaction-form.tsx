import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { PlusIcon } from 'lucide-react';
import { useEffect } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';

import CalendarInputBox from '@/components/form-fields-components/calender-input-box';
import DropdownBox from '@/components/form-fields-components/dropdown-box';
import AddTransactionPopup from '@/components/form-fields-components/form-popup-layout';
import InputBox from '@/components/form-fields-components/input-box';
import TextareaBox from '@/components/form-fields-components/textarea-box';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Skeleton } from '@/components/ui/skeleton';
import { usePermissionStore } from '@/guard/permission.store';
import { useCompany } from '@/hooks/use-company';
import { useMutateTransaction } from '@/hooks/use-transaction';
import { PERMISSION } from '@/types/user.type';
import {
	TTransactionFormType,
	transactionSchema,
} from '@/zod/transactions.zod';

export default function NewTransaction({
	defaultValues,
	companyId,
}: {
	defaultValues?: TTransactionFormType;
	companyId?: string;
}) {

	const { getPermission } = usePermissionStore();
	const permission = getPermission("transactions");

	const form = useForm<TTransactionFormType>({
		resolver: zodResolver(transactionSchema),
		defaultValues: defaultValues || {
			company_id: companyId || undefined,
			company_name: '',
		},
	});

	const queryClient = useQueryClient();

	const { mutate: createTransaction, isPending: isCreatingTransaction } =
		useMutateTransaction(queryClient, companyId || '');

	return (
		<AddTransactionPopup
			title={defaultValues ? 'Edit Transaction' : 'Add New Transaction'}
			isSubmitDisabled={permission !== PERMISSION.FULL_ACCESS}
			triggerText={
				<Button
					variant="outline"
					size="lg"
					className="border-dashed hover:cursor-pointer"
					disabled={isCreatingTransaction || permission !== PERMISSION.FULL_ACCESS}
				>
					{!defaultValues && <PlusIcon />}
					{defaultValues ? (
						<span className="hidden lg:inline">Edit Info</span>
					) : (
						<span className="hidden lg:inline">Add Transaction</span>
					)}
				</Button>
			}
			form={
				<TransactionForm
					form={form}
					onSubmit={() => {
						createTransaction({
							data: form.getValues(),
							method: defaultValues ? 'put' : 'post',
						});
						form.reset();
					}}
				/>
			}
			submitFunction={async () => {
				createTransaction({
					data: form.getValues(),
					method: defaultValues ? 'put' : 'post',
				});
				form.reset();
			}}
			buttonText={defaultValues ? "Update Transaction" : "Add Transaction"}
			formInstance={form}
		/>
	);
}

interface TransactionFormProps {
	form: UseFormReturn<TTransactionFormType>;
	onSubmit: (data: TTransactionFormType) => void;
}

export function TransactionForm({ form, onSubmit }: TransactionFormProps) {
	const { data, isLoading } = useCompany({});

	const PAYMENT_PLANS = [
		{ label: 'Monthly', value: 'monthly' },
		{ label: 'Quarterly', value: 'quarterly' },
		{ label: 'Yearly', value: 'yearly' },
	];

	// Watch for company_name changes and update company_id accordingly
	const watchedCompanyName = form.watch('company_name');

	useEffect(() => {
		if (watchedCompanyName && data && data.length > 0) {
			const selectedCompany = data.find((company: { name: string; company_id: string }) => 
				company.name === watchedCompanyName
			);
			
			if (selectedCompany) {
				form.setValue('company_id', selectedCompany.company_id);
			}
		}
	}, [watchedCompanyName, data, form]);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="grid grid-cols-2 gap-4 px-5">
					{isLoading ? (
						<Skeleton className="h-full w-full" />
					) : (
						<DropdownBox
							form={form}
							name="company_name"
							placeholder="Company Name"
							options={
								data.map((company: { name: string }) => ({
									label: company.name,
									value: company.name,
								})) || []
							}
							className="h-full w-full"
						/>
					)}
					<CalendarInputBox
						form={form}
						name="paid_time"
						placeholder="Paid Date"
					/>
					<InputBox
						form={form}
						name="amount"
						placeholder="Amount Paid"
						type="number"
					/>
					<CalendarInputBox
						form={form}
						name="upto_validated_at"
						placeholder="Valid Until"
					/>
					<InputBox
						form={form}
						name="payment_mode"
						placeholder="Payment Mode"
					/>
					{/* <DropdownBox form={form} name="paidVia" placeholder="Payment Mode" options={[{label: "UPI", value: "UPI"}, {label: "Bank Transfer", value: "Bank Transfer"}, {label: "Cheque", value: "Cheque"}, {label: "Cash", value: "Cash"}]} className="w-full h-full" /> */}
					{/* <InputBox form={form} name="plan" placeholder="Paid For" /> */}
					<DropdownBox
						form={form}
						name="plan"
						placeholder="Paid For"
						options={PAYMENT_PLANS}
						className="h-full w-full"
					/>
				</div>
				<div className="grid grid-cols-1 px-5 pt-4">
					<TextareaBox form={form} name="reason" placeholder="Reason" />
				</div>
			</form>
		</Form>
	);
}
