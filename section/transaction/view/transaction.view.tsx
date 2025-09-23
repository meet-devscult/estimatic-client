'use client';

import { useEffect, useState, useTransition } from 'react';

import { Loader2 } from 'lucide-react';

import FilterPannel from '@/components/filter-pannel';
import { DataTable } from '@/components/table-layout/data-table';
import { useTransactions } from '@/hooks/use-transaction';

import { transactionTableColumn } from '../transaction-column';
import NewTransaction from '../transaction-form';

export default function TransactionViewSection() {
	const defaultFilter = {
		search: '',
		payment_mode: '',
		paid_time: '',
		upto_validated_at: '',
	};

	const [filter, setFilter] = useState(defaultFilter);
	const [isApplyingFilters, startTransition] = useTransition();

	const handleFilterChange = (newFilter: {
		search?: string;
		payment_mode?: string;
		paid_time?: string;
		upto_validated_at?: string;
	}) => {
		setFilter((prev) => ({
			...prev,
			...newFilter,
		}));
	};

	const { data, isLoading, refetch, isFetching } = useTransactions({
		...filter,
	});

	useEffect(() => {
		startTransition(async () => {
			await refetch();
		});
	}, [filter]);

	if (isLoading)
		return (
			<div className="flex h-screen items-center justify-center">
				<Loader2 className="h-10 w-10 animate-spin" />
			</div>
		);

	return (
		<div>
			<div>
				<div className="flex items-center justify-between border-b border-dashed p-5">
					<h1 className="text-2xl font-bold">Transactions</h1>
					<NewTransaction />
				</div>
			</div>
			<FilterPannel
				isSearchInput
				placeholderForSearchInput="Search Company Name"
				searchbarClassName="w-[300px]"
				filterValues={filter}
				onFilterValuesChange={handleFilterChange}
				defaultFilterValues={defaultFilter}
				isPaymentModeFilter
				isPaidTimeFilter
				placeholderForPaidTimeFilter="Start Date & Time"
				paidTimeClassName="w-[200px]"
				isUptoValidatedAtFilter
				placeholderForUptoValidatedAtFilter="End Date & Time"
				uptoValidatedAtClassName="w-[200px]"
			/>
			{isFetching && isApplyingFilters ? (
				<div className="mt-10 flex items-center justify-center">
					<Loader2 className="h-10 w-10 animate-spin" />
					<span className="ml-2">Applying Filters...</span>
				</div>
			) : (
				<DataTable columns={transactionTableColumn} data={data || []} />
			)}
		</div>
	);
}
