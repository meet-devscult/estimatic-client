import axiosInstance, { endpoints } from '@/lib/axios';
import { TTransactionFormType } from '@/zod/transactions.zod';

/**
 * Get all transactions
 * @returns {Promise<TTransaction[]>}
 */
export async function getTransactions(filters: {
	search?: string;
	payment_mode?: string;
	paid_time?: string;
	upto_validated_at?: string;
}) {
	const finalFilters = {
		company_name: filters.search ? filters.search : undefined,
		payment_mode: filters.payment_mode
			? filters.payment_mode.toLowerCase()
			: undefined,
		start_time: filters.paid_time ? filters.paid_time : undefined,
		end_time: filters.upto_validated_at ? filters.upto_validated_at : undefined,
	};
	const URL = endpoints.transactions.root;
	const response = await axiosInstance.get(URL, { params: finalFilters });
	return response.data.data.list;
}

/**
 * Get transactions by company id
 * @param {string} companyId
 * @returns {Promise<TTransaction[]>}
 */
export async function getTransactionsByCompanyId(
	companyId: string,
	filters: {
		search?: string;
		payment_mode?: string;
		paid_time?: string;
		upto_validated_at?: string;
	}
) {
	const finalFilters = {
		company_name: filters.search ? filters.search : undefined,
		payment_mode: filters.payment_mode
			? filters.payment_mode.toLowerCase()
			: undefined,
		start_time: filters.paid_time ? filters.paid_time : undefined,
		end_time: filters.upto_validated_at ? filters.upto_validated_at : undefined,
	};
	const URL = endpoints.transactions.root;
	const response = await axiosInstance.get(URL, {
		params: { company_id: companyId, ...finalFilters },
	});
	return response.data.data.list;
}

/**
 * Create a new transaction
 * @param {TTransactionFormType} data
 * @returns {Promise<TTransaction>}
 */
export async function mutateTransaction(
	data: TTransactionFormType,
	companyId: string,
	method: 'post' | 'put'
) {
	const URL = endpoints.transactions.root;
	const response = await axiosInstance[method](URL, {
		...data,
		reason: data.reason || 'TEMP REASON',
		company_id: companyId,
	});
	return response.data.data;
}
