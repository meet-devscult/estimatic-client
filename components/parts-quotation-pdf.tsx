import {
	Document,
	Page,
	StyleSheet,
	Text,
	View,
	pdf,
} from '@react-pdf/renderer';
import dayjs from 'dayjs';

// Define styles for the PDF
const styles = StyleSheet.create({
	page: {
		flexDirection: 'column',
		backgroundColor: '#ffffff',
		padding: 0,
		fontSize: 10,
	},
	container: {
		padding: 0,
		overflow: 'hidden',
		width: '100%',
		height: '100%',
		border: '1px solid #E5E7EB',
		// borderRadius: 8,
	},
	blueHeader: {
		backgroundColor: '#2563EB',
		height: 8,
		width: '100%',
	},
	contentSection: {
		padding: 16,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		marginBottom: 20,
		paddingBottom: 20,
	},
	partDetails: {
		flexDirection: 'column',
	},
	partDetailsLabel: {
		fontSize: 9,
		color: '#6B7280',
		marginBottom: 2,
		textTransform: 'capitalize',
	},
	partName: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 4,
		color: '#000000',
	},
	partSpecs: {
		fontSize: 11,
		color: '#6B7280',
		lineHeight: 1.3,
	},
	invoiceSection: {
		flexDirection: 'column',
		alignItems: 'flex-end',
	},
	invoiceLabel: {
		fontSize: 9,
		color: '#6B7280',
		marginBottom: 2,
		textTransform: 'capitalize',
	},
	invoiceAmount: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#2563EB',
	},
	invoiceDateSection: {
		marginBottom: 10,
	},
	invoiceDateLabel: {
		fontSize: 9,
		color: '#6B7280',
		marginBottom: 2,
		textTransform: 'capitalize',
	},
	invoiceDate: {
		fontSize: 13,
		fontWeight: 'semibold',
		color: '#000000',
	},
	table: {
		marginTop: 10,
	},
	tableHeader: {
		flexDirection: 'row',
		borderTop: '1px solid #E5E7EB',
		borderBottom: '1px solid #E5E7EB',
		paddingVertical: 10,
		paddingHorizontal: 16,
		// backgroundColor: '#F9FAFB',
	},
	tableHeaderText: {
		fontSize: 11,
		fontWeight: 'normal',
		// color: '#374151',
		textTransform: 'uppercase',
	},
	tableRow: {
		flexDirection: 'row',
		paddingVertical: 10,
		paddingHorizontal: 16,
	},
	totalRow: {
		flexDirection: 'row',
		paddingVertical: 10,
		paddingHorizontal: 16,
		borderTop: '1px solid #E5E7EB',
		// backgroundColor: '#F9FAFB',
	},
	itemDetail: {
		width: '25%', // 3/12 cols
		paddingRight: 8,
	},
	itemName: {
		fontSize: 11,
		fontWeight: 'semibold',
		marginBottom: 1,
		color: '#000000',
	},
	itemDescription: {
		fontSize: 11,
		color: '#6B7280',
	},
	quantity: {
		width: '25%', // 3/12 cols
		textAlign: 'right',
		fontSize: 11,
		color: '#000000',
	},
	rate: {
		width: '25%', // 3/12 cols
		textAlign: 'right',
		fontSize: 11,
		color: '#000000',
	},
	amount: {
		width: '25%', // 3/12 cols
		textAlign: 'right',
		fontSize: 11,
		fontWeight: 'normal',
		color: '#000000',
	},
	totalLabel: {
		fontSize: 13,
		fontWeight: 'semibold',
		// color: '#000000',
	},
	totalAmount: {
		fontSize: 18,
		fontWeight: 'bold',
		// color: '#374151',
	},
	profitText: {
		fontSize: 11,
		color: '#6B7280',
	},
});

interface QuotationData {
	part_name: string;
	material: string;
	tolerance: string;
	raw_material_cost: number;
	raw_material_quantity: number;
	machining_cost: number;
	machining_quantity: number;
	profit_percent: number;
	profit_amount: number;
	scrap_cost: number;
	scrap_quantity: number;
	total_cost_per_piece: number;
	total_quantity: number;
	total_cost_all: number;
	currency: string;
}

// PDF Document Component
const QuotationPDFDocument = ({
	data,
	currencySymbolLocal,
	created_at,
}: {
	data: QuotationData;
	currencySymbolLocal: string;
	created_at?: number;
}) => {
	const {
		part_name,
		material,
		tolerance,
		raw_material_cost,
		machining_cost,
		profit_percent,
		profit_amount,
		scrap_cost,
		total_quantity,
		total_cost_all,
		currency,
	} = data;

	// Clean the part name to remove unwanted characters
	const cleanPartName = (name: string) => {
		if (!name) return 'Unnamed Part';
		return name
			.replace(/\/×\//g, ' x ') // Replace /×/ with x
			.replace(/\/×/g, ' x') // Replace /× with x
			.replace(/×\//g, 'x ') // Replace ×/ with x
			.replace(/\//g, ' ') // Replace remaining / with space
			.replace(/×/g, 'x') // Replace × with x
			.replace(/\s+/g, ' ') // Replace multiple spaces with single space
			.trim(); // Remove leading/trailing spaces
	};

	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<View style={styles.container}>
					{/* Blue Header Bar */}
					<View style={styles.blueHeader}></View>

					<View style={styles.contentSection}>
						{/* Header: Part Details & Invoice Amount */}
						<View style={styles.header}>
							<View style={styles.partDetails}>
								<Text style={styles.partDetailsLabel}>Part Details</Text>
								<Text style={styles.partName}>{cleanPartName(part_name)}</Text>
								<Text style={styles.partSpecs}>
									{material}
									{'\n'}
									{tolerance}
								</Text>
							</View>
							<View style={styles.invoiceSection}>
								<Text style={styles.invoiceLabel}>Invoice of ({currency})</Text>
								<Text style={styles.invoiceAmount}>
									{currencySymbolLocal}
									{total_cost_all.toFixed(2)}
								</Text>
							</View>
						</View>

						{/* Invoice Date */}
						<View style={styles.invoiceDateSection}>
							<Text style={styles.invoiceDateLabel}>Invoice Date</Text>
							<Text style={styles.invoiceDate}>
								{created_at
									? dayjs(created_at * 1000).format('DD/MM/YYYY')
									: ''}
							</Text>
						</View>

						{/* Table */}
						<View style={styles.table}>
							{/* Table Header */}
							<View style={styles.tableHeader}>
								<Text style={[styles.tableHeaderText, styles.itemDetail]}>
									ITEM DETAIL
								</Text>
								<Text style={[styles.tableHeaderText, styles.quantity]}>
									QTY
								</Text>
								<Text style={[styles.tableHeaderText, styles.rate]}>
									RATE PER PIECE
								</Text>
								<Text style={[styles.tableHeaderText, styles.amount]}>
									AMOUNT
								</Text>
							</View>

							{/* Raw Material Cost Row */}
							<View style={styles.tableRow}>
								<View style={styles.itemDetail}>
									<Text style={styles.itemName}>Raw Material Cost</Text>
								</View>
								<Text style={styles.quantity}>{total_quantity || '-'}</Text>
								<Text style={styles.rate}>
									{currencySymbolLocal}
									{raw_material_cost.toFixed(2)}
								</Text>
								<Text style={styles.amount}>
									{currencySymbolLocal}
									{(raw_material_cost * (total_quantity || 1)).toFixed(2)}
								</Text>
							</View>

							{/* Machining Cost Row */}
							<View style={styles.tableRow}>
								<View style={styles.itemDetail}>
									<Text style={styles.itemName}>Machining Cost</Text>
								</View>
								<Text style={styles.quantity}>{total_quantity || '-'}</Text>
								<Text style={styles.rate}>
									{currencySymbolLocal}
									{machining_cost.toFixed(2)}
								</Text>
								<Text style={styles.amount}>
									{currencySymbolLocal}
									{(machining_cost * (total_quantity || 1)).toFixed(2)}
								</Text>
							</View>

							{/* Profit Row */}
							<View style={styles.tableRow}>
								<View style={styles.itemDetail}>
									<Text style={styles.itemName}>
										Profit{' '}
										<Text style={styles.profitText}>({profit_percent}%)</Text>
									</Text>
								</View>
								<Text style={styles.quantity}>{total_quantity || '-'}</Text>
								<Text style={styles.rate}>
									{currencySymbolLocal}
									{profit_amount.toFixed(2)}
								</Text>
								<Text style={styles.amount}>
									{currencySymbolLocal}
									{(profit_amount * (total_quantity || 1)).toFixed(2)}
								</Text>
							</View>

							{/* Scrap Cost Row */}
							<View style={styles.tableRow}>
								<View style={styles.itemDetail}>
									<Text style={styles.itemName}>Scrap Cost (per Kg)</Text>
								</View>
								<Text style={styles.quantity}>{total_quantity || '-'}</Text>
								<Text style={styles.rate}>
									{currencySymbolLocal}
									{scrap_cost.toFixed(2)}
								</Text>
								<Text style={styles.amount}>
									{currencySymbolLocal}
									{(scrap_cost * (total_quantity || 1)).toFixed(2)}
								</Text>
							</View>
							{/* Total Row */}
							<View style={styles.totalRow}>
								<View style={styles.itemDetail}></View>
								<Text style={[styles.quantity, styles.totalLabel]}>Total</Text>
								<View style={styles.rate}></View>
								<Text style={[styles.amount, styles.totalAmount]}>
									{currencySymbolLocal}
									{total_cost_all.toFixed(2)}
								</Text>
							</View>
						</View>
					</View>
				</View>
			</Page>
		</Document>
	);
};

// Function to generate and download PDF
export const downloadQuotationPDF = async (
	data: QuotationData,
	created_at?: number
) => {
	try {
		const blob = await pdf(
			<QuotationPDFDocument
				data={data}
				currencySymbolLocal="Rs."
				created_at={created_at}
			/>
		).toBlob();
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		const safePart_Name = data.part_name || 'unnamed-part';
		link.download = `quotation-${safePart_Name.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.pdf`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	} catch (error) {
		console.error('Error generating PDF:', error);
		throw error;
	}
};

export default QuotationPDFDocument;
