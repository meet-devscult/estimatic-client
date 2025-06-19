import { cn } from '@/lib/utils';
import NewMachineDetails from '@/section/comapny/new-machine-details.form';
import { IMachine } from '@/types/machine.type';

interface MachineDetailCardProps {
	machine: IMachine;
}
export default function MachineDetailCard({ machine }: MachineDetailCardProps) {
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
		{
			label: 'Power Consumption (KW/hour)',
			value: machine.power_consumption,
		},
	];

	const section2 = [
		// {
		//     label: "Status",
		//     value: machine.status
		// },
		{
			label: 'Allowance (in%)',
			value: machine.allowance,
		},
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

	return (
		<div>
			<div className="flex items-center justify-between border-b border-dashed p-5">
				<h1 className="text-2xl font-bold">Machine Details</h1>
				<NewMachineDetails
					defaultValues={{
						company_id: machine.company_id,
						machine_id: machine.machine_id,

						// basic information
						plant_name: machine.plant_name,
						name: machine.name,
						type: machine.type,
						category: machine.category,
						manufacturer: machine.manufacturer,
						max_rpm: machine.max_rpm,
						efficiency: machine.efficiency,
						power_consumption: machine.power_consumption,
						status: machine.status,

						// machine specifications
						allowance: machine.allowance,
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
							<p>{item.value}</p>
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
