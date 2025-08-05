import { DownloadCloud } from "lucide-react";
import { Button } from "../ui/button";

interface PartDetailCardProps {
    partData: any
}

// Define field configurations for each material shape
export const getMaterialShapeFields = (shape: string) => {
	switch (shape) {
		case 'Round Bar':
			return [
				{ name: 'diameter', placeholder: 'Diameter (in mm)', type: 'number' },
				{ name: 'length', placeholder: 'Length (in mm)', type: 'number' },
			];
		case 'Flat Bar':
			return [
				{ name: 'width', placeholder: 'Width (in mm)', type: 'number' },
				{ name: 'thickness', placeholder: 'Thickness (in mm)', type: 'number' },
				{ name: 'length', placeholder: 'Length (in mm)', type: 'number' },
			];
		case 'Sheet Metal':
			return [
				{ name: 'length', placeholder: 'Length (in mm)', type: 'number' },
				{ name: 'width', placeholder: 'Width (in mm)', type: 'number' },
				{ name: 'thickness', placeholder: 'Thickness (in mm)', type: 'number' },
			];
		case 'Pipe':
			return [
				{
					name: 'outer_diameter',
					placeholder: 'Outer Diameter (in mm)',
					type: 'number',
				},
				{
					name: 'wall_thickness',
					placeholder: 'Wall Thickness (in mm)',
					type: 'number',
				},
				{ name: 'length', placeholder: 'Length (in mm)', type: 'number' },
			];
		case 'Square Bar':
			return [
				{ name: 'side', placeholder: 'Side (in mm)', type: 'number' },
				{ name: 'length', placeholder: 'Length (in mm)', type: 'number' },
			];
		case 'Hex Bar':
			return [
				{
					name: 'flat_to_flat_distance',
					placeholder: 'Flat-to-Flat Distance (in mm)',
					type: 'number',
				},
				{ name: 'length', placeholder: 'Length (in mm)', type: 'number' },
			];
		case 'Angle':
			return [
				{ name: 'leg_1', placeholder: 'Leg 1 (in mm)', type: 'number' },
				{ name: 'leg_2', placeholder: 'Leg 2 (in mm)', type: 'number' },
				{ name: 'thickness', placeholder: 'Thickness (in mm)', type: 'number' },
				{ name: 'length', placeholder: 'Length (in mm)', type: 'number' },
			];
		case 'Channel':
			return [
				{ name: 'width', placeholder: 'Width (in mm)', type: 'number' },
				{ name: 'web_height', placeholder: 'Height (in mm)', type: 'number' },
				{ name: 'thickness', placeholder: 'Thickness (in mm)', type: 'number' },
				{ name: 'length', placeholder: 'Length (in mm)', type: 'number' },
			];
		case 'I-Beam':
			return [
				{
					name: 'flange_width',
					placeholder: 'Flange Width (in mm)',
					type: 'number',
				},
				{
					name: 'web_height',
					placeholder: 'Web Height (in mm)',
					type: 'number',
				},
				{
					name: 'web_thickness',
					placeholder: 'Web Thickness (in mm)',
					type: 'number',
				},
				{
					name: 'flange_thickness',
					placeholder: 'Flange Thickness (in mm)',
					type: 'number',
				},
				{ name: 'length', placeholder: 'Length (in mm)', type: 'number' },
			];
		case 'Plate':
			return [
				{ name: 'length', placeholder: 'Length (in mm)', type: 'number' },
				{ name: 'width', placeholder: 'Width (in mm)', type: 'number' },
				{ name: 'thickness', placeholder: 'Thickness (in mm)', type: 'number' },
			];
		case 'Coil':
			return [
				{ name: 'width', placeholder: 'Width (in mm)', type: 'number' },
				{ name: 'thickness', placeholder: 'Thickness (in mm)', type: 'number' },
				{
					name: 'coil_weight',
					placeholder: 'Coil Weight or Length',
					type: 'number',
				},
			];
		case 'Wire':
			return [
				{ name: 'diameter', placeholder: 'Diameter (in mm)', type: 'number' },
				{ name: 'length', placeholder: 'Length (in mm)', type: 'number' },
			];
		case 'Billet':
			return [
				{ name: 'width', placeholder: 'Width (in mm)', type: 'number' },
				{ name: 'web_height', placeholder: 'Height (in mm)', type: 'number' },
				{
					name: 'length',
					placeholder: 'Length (or Diameter, Length if round)',
					type: 'number',
				},
			];
		case 'Ingot':
			return [
				{ name: 'width', placeholder: 'Width (in mm)', type: 'number' },
				{ name: 'web_height', placeholder: 'Height (in mm)', type: 'number' },
				{ name: 'length', placeholder: 'Length (in mm)', type: 'number' },
			];
		case 'Rod':
			return [
				{ name: 'diameter', placeholder: 'Diameter (in mm)', type: 'number' },
				{ name: 'length', placeholder: 'Length (in mm)', type: 'number' },
			];
		case 'Strip':
			return [
				{ name: 'width', placeholder: 'Width (in mm)', type: 'number' },
				{ name: 'thickness', placeholder: 'Thickness (in mm)', type: 'number' },
				{ name: 'length', placeholder: 'Length (in mm)', type: 'number' },
			];
		case 'Foil':
			return [
				{ name: 'width', placeholder: 'Width (in mm)', type: 'number' },
				{ name: 'thickness', placeholder: 'Thickness (in mm)', type: 'number' },
				{ name: 'length', placeholder: 'Length (in mm)', type: 'number' },
			];
		default:
			return [
				{ name: 'length', placeholder: 'Length (in mm)', type: 'number' },
				{ name: 'breadth', placeholder: 'Breadth (in mm)', type: 'number' },
				{ name: 'width', placeholder: 'Width (in mm)', type: 'number' },
			];
	}
};

export default function PartDetailCard({ partData }: PartDetailCardProps) {
	// Add safety check for undefined partData
	if (!partData) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="text-center">
					<div className="text-lg font-medium text-gray-900">No Part Data</div>
					<div className="text-sm text-gray-500">Part data is not available</div>
				</div>
			</div>
		);
	}

	// Define the data sections for the grid layout
	const section1 = [
		{
			label: "Material Std",
			value: partData.material_standard
		},
		{
			label: "Material Category",
			value: partData.material_category
		},
		{
			label: "No. of lots",
			value: partData.lots_count
		},
		{
			label: "Stock per lot",
			value: partData.stock_qty_per_lot
		},
		{
			label: "Material Cost (per Kg)",
			value: partData.material_cost
		}
	];

	// Dynamic section2 based on material shape
	const shapeFields = getMaterialShapeFields(partData.material_shape || '');
	const section2 = [
		{
			label: "Shape",
			value: partData.material_shape
		},
		...shapeFields.map(field => ({
			label: field.placeholder,
			value: partData[field.name]
		}))
	];

	const section3 = [
		{
			label: "Scrap Cost (per Kg)",
			value: partData.scrap_cost
		},
		{
			label: "Raw material weight (in Kg)",
			value: partData.raw_material_weight
		},
		{
			label: "Tolerance Standard",
			value: partData.tolerance_standard
		}
	];

    return (
        <div>
			<div className="flex justify-between items-center p-5 border-b border-dashed">
				<h1 className="text-2xl font-bold">Part Details</h1>
				<div className="flex gap-2">
					<Button variant="outline" size="lg" className="border-dashed cursor-pointer">
						<DownloadCloud />
						<span className="hidden lg:inline">Download Part File</span>
					</Button>
					<Button variant="outline" size="lg" className="border-dashed cursor-pointer">
						<DownloadCloud />
						<span className="hidden lg:inline">Download Operations</span>
					</Button>
					<Button variant="outline" size="lg" className="border-dashed cursor-pointer">
						<DownloadCloud />
						<span className="hidden lg:inline">Download Quotation</span>
					</Button>
				</div>
			</div>
			<div className="grid grid-cols-3 border-b border-dashed divide-x divide-dashed">
				<div className="divide-y divide-dashed">
					{section1.map((item) => (
						<div className="flex items-center gap-1 p-2" key={item.label}>
							<h1 className="font-medium text-muted-foreground">{item.label}:</h1>
							<p>{item.value || '-'}</p>
						</div>
					))}
				</div>
				<div className="divide-y divide-dashed">
					{section2.map((item) => (
						<div className="flex items-center gap-1 p-2" key={item.label}>
							<h1 className="font-medium text-muted-foreground">{item.label}:</h1>
							<p>{item.value || '-'}</p>
						</div>
					))}
				</div>
				<div className="divide-y divide-dashed">
					{section3.map((item) => (
						<div className="flex items-center gap-1 p-2" key={item.label}>
							<h1 className="font-medium text-muted-foreground">{item.label}:</h1>
							<p>{item.value || '-'}</p>
						</div>
					))}
				</div>
			</div>
		</div>
    )
}