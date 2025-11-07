import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { PlusIcon } from 'lucide-react';
import { UseFormReturn, useForm } from 'react-hook-form';

import DropdownBox from '@/components/form-fields-components/dropdown-box';
import PopupForForm from '@/components/form-fields-components/form-popup-layout';
import InputBox from '@/components/form-fields-components/input-box';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { usePermissionStore } from '@/guard/permission.store';
import {
	useMachineMutation
} from '@/hooks/use-machine';
import { MachineFamily } from '@/lib/const.data';
import { PERMISSION } from '@/types/user.type';
import { TNewMachineSchema, newMachineSchema } from '@/zod/machine.zod';

interface NewMachineDetailsFormPopUpProps {
	setMachines?: (data: TNewMachineSchema) => void;
	defaultValues?: TNewMachineSchema;
	companyId?: string;
	onSubmit?: (data: TNewMachineSchema) => void;
}

export default function NewMachineDetails({
	setMachines,
	defaultValues,
	companyId,
	onSubmit,
}: NewMachineDetailsFormPopUpProps) {
	const { getPermission } = usePermissionStore();
	const permission = getPermission('companies');
	const queryClient = useQueryClient();
	const { mutate: createMachine, isPending: isCreatingMachine } =
		useMachineMutation(queryClient, companyId || '');

	const machineForm = useForm<TNewMachineSchema>({
		resolver: zodResolver(newMachineSchema),
		defaultValues: defaultValues
			? defaultValues
			: {
					company_id: companyId || '',
					plant_name: '',
					name: '',
					type: '',
					category: '',
					manufacturer: '',
				},
	});

	return (
		<PopupForForm
			title={defaultValues ? 'Edit Machine' : 'Add Machine'}
			triggerText={
				<Button
					variant="outline"
					size="lg"
					className="border-dashed hover:cursor-pointer"
					disabled={permission !== PERMISSION.FULL_ACCESS}
				>
					{!defaultValues && <PlusIcon />}
					{defaultValues ? (
						<span className="hidden lg:inline">Edit Info</span>
					) : (
						<span className="hidden lg:inline">Add Machine</span>
					)}
				</Button>
			}
			form={
				<NewMachineDetailsForm
					form={machineForm}
					onSubmit={() => {
						if (onSubmit) {
							onSubmit(machineForm.getValues());
							machineForm.reset();
						} else {
							createMachine({
								data: machineForm.getValues(),
								method: defaultValues ? 'put' : 'post',
							});
							machineForm.reset();
						}
					}}
				/>
			}
			submitFunction={async () => {
				if (onSubmit) {
					onSubmit(machineForm.getValues());
					machineForm.reset();
				} else {
					createMachine({
						data: machineForm.getValues(),
						method: defaultValues ? 'put' : 'post',
					});
					machineForm.reset();
				}
			}}
			buttonText={defaultValues ? "Update Machine" : "Add Machine"}
			formInstance={machineForm}
		/>
	);
}

interface NewMachineDetailsFormProps {
	form: UseFormReturn<TNewMachineSchema>;
	onSubmit: (data: TNewMachineSchema) => void;
}

export function NewMachineDetailsForm({
	form,
	onSubmit,
}: NewMachineDetailsFormProps) {
	// Watch form values for cascading selection
	const watchedType = form.watch('type');
	const watchedCategory = form.watch('category');

	// Get machine type options from MachineFamily keys
	const machineTypeOptions = Object.keys(MachineFamily).map((machineType) => ({
		label: machineType,
		value: machineType,
	}));

	// Get subtype options based on selected machine type
	const subTypeOptions = watchedType
		? MachineFamily[watchedType]?.map((item: any) => ({
				label: item.sub_type,
				value: item.sub_type,
			})) || []
		: [];

	// Get input options based on selected subtype
	const inputOptions =
		watchedCategory && watchedType
			? MachineFamily[watchedType]
					?.find((item: any) => item.sub_type === watchedCategory)
					?.inputs?.map((input: string) => ({
						label: input,
						value: input,
					})) || []
			: [];

	// if (isMachineTypesLoading || isMachineCategoriesLoading) return null

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="space-y-5 border-b border-dashed px-5 pb-5">
					<div className="grid grid-cols-2 gap-4">
						<InputBox form={form} name="plant_name" placeholder="Plant Name" />
						<InputBox form={form} name="name" placeholder="Machine Name" />
						<DropdownBox
								form={form}
								name="type"
								placeholder="Machine Type"
								options={machineTypeOptions}
								className="h-full w-full"
							/>
							<DropdownBox
								form={form}
								name="category"
								placeholder="Machine Subtype"
								options={subTypeOptions}
								className="h-full w-full"
								disabled={!watchedType}
							/>

							<DropdownBox
								form={form}
								name="machine_inputs"
								placeholder="Machine Inputs"
								options={inputOptions}
								className="h-full w-full"
								disabled={!watchedCategory}
							/>
						<InputBox
							form={form}
							name="manufacturer"
							placeholder="Machine Manufacturer"
						/>
						<InputBox
							form={form}
							name="max_rpm"
							placeholder="Spindle Max RPM"
							type="number"
						/>
						<InputBox
							form={form}
							name="efficiency"
							placeholder="Efficiency %"
							type="number"
						/>
					</div>
				</div>
				<div className="space-y-5 border-b border-dashed px-5 py-5">
					<h1 className="text-lg">Machine Specifications</h1>
					<div className="grid grid-cols-2 gap-4 border-dashed">
						<InputBox
							form={form}
							name="setup_base_time"
							placeholder="Setup Base Time (in mins)"
							type="number"
						/>
					</div>
				</div>
				<div className="space-y-5 border-b border-dashed px-5 py-5">
					<h1 className="text-lg">Rates</h1>
					<div className="grid grid-cols-2 gap-4">
						<InputBox
							form={form}
							name="machine_rate"
							placeholder="Machine Rate (hourly rate in Rs.)"
							type="number"
						/>
						<InputBox
							form={form}
							name="setup_hour_rate"
							placeholder="Setup Hour Rate"
							type="number"
						/>
					</div>
				</div>
				<div className="space-y-5 px-5 pt-5">
					<h1 className="text-lg">Optional Inputs</h1>
					<div className="grid grid-cols-2 gap-4">
						<InputBox
							form={form}
							name="max_tool_length"
							placeholder="Max Tool Length (in mm)"
							type="number"
						/>
						<InputBox
							form={form}
							name="max_tool_diameter"
							placeholder="Max Tool Diameter (in mm)"
							type="number"
						/>
						<InputBox
							form={form}
							name="max_table_length"
							placeholder="Max Table Length (in mm)"
							type="number"
						/>
						<InputBox
							form={form}
							name="max_table_breadth"
							placeholder="Max Table Breadth (in mm)"
							type="number"
						/>
						<InputBox
							form={form}
							name="max_workpiece_weight"
							placeholder="Max Workpiece Weight (in Kg)"
							type="number"
						/>
						<InputBox
							form={form}
							name="tool_change_time"
							placeholder="Tool Change Time (in mins)"
							type="number"
						/>
					</div>
				</div>
			</form>
		</Form>
	);
}
