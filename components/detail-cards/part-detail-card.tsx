import { deleteParts, getSignedUrl } from "@/actions/part.action";
import { usePermissionStore } from "@/guard/permission.store";
import { IOperation } from "@/types/operations.type";
import { IPart } from "@/types/part.type";
import { PERMISSION } from "@/types/user.type";
import { ColumnDef } from '@tanstack/react-table';
import { DownloadCloud, LoaderCircle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { downloadQuotationPDF } from "../parts-quotation-pdf";
import { DataTable } from "../table-layout/data-table";
import { Button } from "../ui/button";

interface PartDetailCardProps {
    partData: IPart
}

// Define field configurations for each material shape
export const getMaterialShapeFields = (shape: string) => {
	switch (shape) {
		case 'Cylindrical Block':
			return [
				{ name: 'length', placeholder: 'Length (in mm)', type: 'number' },
				{ name: 'diameter', placeholder: 'Diameter (in mm)', type: 'number' },
			];
		default:
			return [
				{ name: 'length', placeholder: 'Length (in mm)', type: 'number' },
				{ name: 'height', placeholder: 'Height (in mm)', type: 'number' },
				{ name: 'width', placeholder: 'Width (in mm)', type: 'number' },
			];
	}
};

// Define operation columns
export const OperationColumn: ColumnDef<IOperation>[] = [
	{
		accessorKey: 'srno',
		header: 'Sr No.',
		cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
	},
	{
		accessorKey: 'machineName',
		header: 'Machine Name',
		cell: ({ row }) => (
			<div className="text-center">{row.original.machine_name}</div>
		),
	},
	{
		accessorKey: 'operation',
		header: 'Operation',
		cell: ({ row }) => (
			<div className="text-center">{row.original.operation}</div>
		),
	},
	{
		accessorKey: 'inputs',
		header: 'Description',
		cell: ({ row }) => (
			<div className="text-center whitespace-normal">{row.original.inputs}</div>
		),
	},
	{
		accessorKey: 'time',
		header: () => (
			<div className="text-center">
				Time
				<br />
				(per piece in mins)
			</div>
		),
		cell: ({ row }) => (
			<div className="text-center">{row.original.time_per_piece_min}</div>
		),
	},
	{
		accessorKey: 'cost',
		header: () => (
			<div className="text-center">
				Cost
				<br />
				(per piece in rs)
			</div>
		),
		cell: ({ row }) => (
			<div className="text-center">{row.original.cost_per_piece}</div>
		),
	},
];

export default function PartDetailCard({ partData }: PartDetailCardProps) {
	const { getPermission } = usePermissionStore();
	const permission = getPermission('companies');
	const router = useRouter()
	const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
	const [isDownloadingPartFile, setIsDownloadingPartFile] = useState(false);
	const [isDeleting, startTransition] = useTransition()

	console.log("Part Data:", partData);

	const handleDownloadPDF = async () => {
		setIsGeneratingPDF(true);
		try {
			// Validate part_id exists and is a string
			if (!partData.part_id || typeof partData.part_id !== 'string' || !partData.quotation) {
				throw new Error('Invalid part ID');
			}
			
			// Extract the required data from aiResponse.data
			const quotationData = {
				part_name: partData.quotation.part_name,
				material: partData.quotation.material,
				tolerance: partData.quotation.tolerance,
				raw_material_cost: partData.quotation.raw_material_cost,
				raw_material_quantity: partData.quotation.raw_material_quantity,
				machining_cost: partData.quotation.machining_cost,
				machining_quantity: partData.quotation.machining_quantity,
				profit_percent: partData.quotation.profit_percent,
				profit_amount: partData.quotation.profit_amount,
				scrap_cost: partData.quotation.scrap_cost,
				scrap_quantity: partData.quotation.scrap_quantity,
				total_cost_per_piece: partData.quotation.total_cost_per_piece,
				total_quantity: partData.quotation.total_quantity,
				total_cost_all: partData.quotation.total_cost_all,
				currency: partData.quotation.currency,
			};
			
			// Generate and download PDF with AI-generated data
			await downloadQuotationPDF(quotationData, partData.created_at);
		} catch (error) {
			console.error('Failed to download PDF:', error);
			// You can add toast notification here if you have one
		} finally {
			setIsGeneratingPDF(false);
		}
	};

	const handleDownloadPartFile = async () => {
		setIsDownloadingPartFile(true);
		try {
			// Validate step_key exists
			const stepKey = (partData as any).step_key;
			if (!stepKey || typeof stepKey !== 'string') {
				throw new Error('Step file key not found');
			}

			// Get signed URL for step file
			const signedUrlResponse = await getSignedUrl(stepKey, "step");

			// Open the signed URL in a new tab to download the file
			if (signedUrlResponse && signedUrlResponse.step_file_sign_url) {
				window.open(signedUrlResponse.step_file_sign_url, '_blank', 'noopener,noreferrer');
			} else {
				throw new Error('Failed to get download URL');
			}
		} catch (error) {
			console.error('Failed to download part file:', error);
		} finally {
			setIsDownloadingPartFile(false);
		}
	};
	
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
			value: (partData as any)[field.name]
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
		},
		{
			label: "Status",
			value: partData.total_cost ? 'Completed' : 'Ongoing'
		}
	];

	const handleDelete = () => {
			startTransition(async () => {
				try {
					await deleteParts(partData.part_id)
					toast.success("Part deleted successfully")
					router.back()
				} catch (error) {
					console.error("Failed to delete part:", error)
				}
			})
		}

    return (
        <div>
			<div className="flex justify-between items-center p-5 border-b border-dashed">
				<div>
					<h1 className="text-2xl font-bold">{partData.name}</h1>
					<h2 className="text-base text-muted-foreground">{partData.company_name}</h2>
				</div>
				<div className="flex gap-2">
					{partData.quotation && (
						<Button 
						onClick={handleDownloadPartFile}
						variant="outline" 
						size="lg" 
						className="border-dashed cursor-pointer"
						disabled={isDownloadingPartFile}
					>
						<DownloadCloud />
						<span className="hidden lg:inline">
							{isDownloadingPartFile ? 'Downloading...' : 'Download Part File'}
						</span>
					</Button>)}
					{/* <Button variant="outline" size="lg" className="border-dashed cursor-pointer">
						<DownloadCloud />
						<span className="hidden lg:inline">Download Operations</span>
					</Button> */}
					{partData.estimation_status && <Button 
						onClick={handleDownloadPDF} 
						variant="outline" 
						size="lg" 
						className="border-dashed cursor-pointer"
						disabled={isGeneratingPDF}
					>
						<DownloadCloud />
						<span className="hidden lg:inline">
							{isGeneratingPDF ? 'Generating...' : 'Download Quotation'}
						</span>
					</Button>}
					<Button variant="destructive" size="lg" className="border-dashed hover:cursor-pointer" 
            			onClick={handleDelete}
            			disabled={isDeleting || permission !== PERMISSION.FULL_ACCESS}>
            			{isDeleting ? <LoaderCircle className="animate-spin" /> : <Trash2 />}
            			{isDeleting ? "Deleting..." : "Delete Part"}
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
			
			{/* Operations Table */}
			<div className="mt-5">
				<div className="p-5 border-b border-dashed">
					<h2 className="text-xl font-bold">Recommended Operations</h2>
				</div>
				<div className="mt-5">
					<DataTable
						columns={OperationColumn}
						data={partData.recommended_operations || []}
					/>
				</div>
			</div>
		</div>
    )
}