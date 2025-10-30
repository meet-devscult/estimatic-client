import { deleteMachine } from '@/actions/machine.action';
import { usePermissionStore } from '@/guard/permission.store';
import { useToggleMutation } from '@/hooks/use-toggle';
import { endpoints } from '@/lib/axios';
import { cn } from '@/lib/utils';
import NewMachineDetails from '@/section/comapny/new-machine-details.form';
import { IMachine } from '@/types/machine.type';
import { PERMISSION } from '@/types/user.type';
import { useQueryClient } from '@tanstack/react-query';
import { LoaderCircle, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';

interface MachineDetailCardProps {
	machine: IMachine;
}
export default function MachineDetailCard({ machine }: MachineDetailCardProps) {
	const { getPermission } = usePermissionStore();
	const permission = getPermission("companies");
	const router = useRouter()
	const [isDeleting, startTransition] = useTransition()
	const queryClient = useQueryClient()
	const { mutate, isPending } = useToggleMutation({queryClient, queryKey: ["machines", "company", machine.company_id], revalidateKey: ["machines", machine.machine_id]})
	
	const section1 = [
		{
			label: 'Name',
			value: machine.name,
		},
		{
			label: 'Plant',
			value: machine.plant_name,
		},
		{
			label: 'Machine Type',
			value: machine.type,
		},
		{
			label: 'Machine',
			value: machine.category,
		},
		{
			label: 'Machine Inputs',
			value: machine.machine_inputs,
		},
		{
			label: 'Manufacturer',
			value: machine.manufacturer,
		},
		{
			label: 'Spindle Max RPM',
			value: machine.max_rpm,
		},
		{
			label: 'Efficiency %',
			value: machine.efficiency,
		},
	];

	const section2 = [
		{
			label: 'Setup Base Time',
			value: machine.setup_base_time,
		},
		{
			label: 'Machine Hourly Rate',
			value: machine.machine_rate,
		},
		{
			label: 'Setup Hour Rate ',
			value: machine.setup_hour_rate,
		},
		{
			label: "Status",
			value: <div className="flex items-center gap-2">
						<span className="text-sm">{machine.status === 'active' ? 'Active' : 'Inactive'}</span>
						<Switch 
							checked={machine.status === 'active'} 
							onCheckedChange={() => {
								mutate({url: endpoints.machines.root, data: {machine_id: machine.machine_id, status: machine.status === 'active' ? 'inactive' : 'active'}})
							}} 
							disabled={isPending || permission !== PERMISSION.FULL_ACCESS} 
						/>
			</div>,
		},
	];

	const section3 = [
		{
			label: 'Max. Tool Length',
			value: machine.max_tool_length,
		},
		{
			label: 'Max Tool Dia',
			value: machine.max_tool_diameter,
		},
		{
			label: 'Max Table Length ',
			value: machine.max_table_length,
		},
		{
			label: 'Max table Breadth ',
			value: machine.max_table_breadth,
		},
		{
			label: 'Max Workpiece Weight ',
			value: machine.max_workpiece_weight,
		},
		{
			label: 'Tool Change Time',
			value: machine.tool_change_time,
		},
	];

	const handleDelete = () => {
        startTransition(async () => {
            try {
                await deleteMachine(machine.machine_id)
                toast.success("Machine deleted successfully")
                router.back()
            } catch (error) {
                console.error("Failed to delete machine:", error)
            }
        })
    }

	return (
		<div>
			<div className="flex items-center justify-between border-b border-dashed p-5">
				<h1 className="text-2xl font-bold">Machine Details</h1>
				<div className='flex gap-2'>
					<NewMachineDetails
						defaultValues={{
							company_id: machine.company_id,
							machine_id: machine.machine_id,

							// basic information
							plant_name: machine.plant_name,
							name: machine.name,
							type: machine.type,
							category: machine.category,
							machine_inputs: machine.machine_inputs,
							manufacturer: machine.manufacturer,
							max_rpm: machine.max_rpm,
							efficiency: machine.efficiency,

							// machine specifications
							setup_base_time: machine.setup_base_time,

							// machine rates
							machine_rate: machine.machine_rate,
							setup_hour_rate: machine.setup_hour_rate,

							max_tool_length: machine.max_tool_length,
							max_tool_diameter: machine.max_tool_diameter,
							max_table_length: machine.max_table_length,
							max_table_breadth: machine.max_table_breadth,
							max_workpiece_weight: machine.max_workpiece_weight,
							tool_change_time: machine.tool_change_time,
						}}
					/>
					<Button variant="destructive" size="lg" className="border-dashed hover:cursor-pointer" 
            			onClick={handleDelete}
            			disabled={isDeleting || permission !== PERMISSION.FULL_ACCESS}>
						{isDeleting ? <LoaderCircle className="animate-spin" /> : <Trash2 />}
						{isDeleting ? "Deleting..." : "Delete Machine"}
            		</Button>
				</div>
			</div>
			<div className="grid grid-cols-3 divide-x divide-dashed border-b border-dashed">
				<div className="divide-y divide-dashed">
					{section1.map((item) => (
						<div className={cn('flex items-center gap-1 p-2')} key={item.label}>
							<h1 className="text-muted-foreground font-medium">
								{item.label} :
							</h1>
							<p>{item.value}</p>
						</div>
					))}
				</div>
				<div className="divide-y divide-dashed">
					{section2.map((item) => (
						<div
							className={cn(
								'flex items-center gap-1 border-b border-dashed p-2'
							)}
							key={item.label}
						>
							<h1 className="text-muted-foreground font-medium">
								{item.label} :
							</h1>
							<div>{item.value}</div>
						</div>
					))}
				</div>
				<div className="divide-y divide-dashed">
					{section3.map((item) => (
						<div
							className={cn(
								'flex items-center gap-1 border-b border-dashed p-2'
							)}
							key={item.label}
						>
							<h1 className="text-muted-foreground font-medium">
								{item.label} :
							</h1>
							<p>{item.value}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
