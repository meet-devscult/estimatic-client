import { useState } from 'react';

import dayjs from 'dayjs';
import { CalendarIcon, ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface FilterPannelProps {
	filterValues: any;
	defaultFilterValues: any;
	onFilterValuesChange: (filterValues: any) => void;

	searchbarClassName?: string;
	paidTimeClassName?: string;
	uptoValidatedAtClassName?: string;
	plantClassName?: string;

	placeholderForSearchInput?: string;
	placeholderForPaidTimeFilter?: string;
	placeholderForUptoValidatedAtFilter?: string;
	placeholderForPlantNameInput?: string;

	isSearchInput?: boolean;
	isStatusFilter?: boolean;
	isTypeFilter?: boolean;
	isPaymentModeFilter?: boolean;
	isPaidTimeFilter?: boolean;
	isUptoValidatedAtFilter?: boolean;
	isPlantNameInput?: boolean;
}

export default function FilterPannel({
	filterValues,
	defaultFilterValues,
	onFilterValuesChange,
	searchbarClassName,
	paidTimeClassName,
	uptoValidatedAtClassName,
	plantClassName,
	placeholderForSearchInput,
	placeholderForPaidTimeFilter,
	placeholderForUptoValidatedAtFilter,
	placeholderForPlantNameInput,
	isStatusFilter = false,
	isTypeFilter = false,
	isSearchInput = false,
	isPaymentModeFilter = false,
	isPaidTimeFilter = false,
	isUptoValidatedAtFilter = false,
	isPlantNameInput = false,
}: FilterPannelProps) {
	const [filter, setFilter] = useState(filterValues);

	return (
		<div className="flex justify-between gap-2 border-b border-dashed p-5">
			<div className="flex gap-2">
				{isSearchInput && (
					<SearchFilter
						placeholder={placeholderForSearchInput || 'Search'}
						filterValues={filter.search || ''}
						onFilterValuesChange={(newFilter) => {
							setFilter({
								...filter,
								search: newFilter.search,
							});
						}}
						className={searchbarClassName}
					/>
				)}
				{isStatusFilter && (
					<StatusFilter
						filterValues={filter.status || ''}
						onFilterValuesChange={(newFilter) => {
							setFilter({
								...filter,
								status: newFilter.status,
							});
						}}
					/>
				)}
				{isTypeFilter && (
					<TypeFilter
						filterValues={filter.type || ''}
						onFilterValuesChange={(newFilter) => {
							setFilter({
								...filter,
								type: newFilter.type,
							});
						}}
					/>
				)}
				{isPaymentModeFilter && (
					<PaymentModeFilter
						filterValues={filter.payment_mode || ''}
						onFilterValuesChange={(newFilter) => {
							setFilter({
								...filter,
								payment_mode: newFilter.payment_mode,
							});
						}}
					/>
				)}
				{isPlantNameInput && (
					<SearchFilter
						placeholder={placeholderForPlantNameInput || 'Search Plant Name'}
						filterValues={filter.plant_name || ''}
						onFilterValuesChange={(newFilter) => {
							setFilter({
								...filter,
								plant_name: newFilter.search,
							});
						}}
						className={searchbarClassName}
					/>
				)}
				{isPaidTimeFilter && (
					<DateFilter
						filterValues={filter.paid_time || null}
						onFilterValuesChange={(newFilter) => {
							setFilter({
								...filter,
								paid_time: newFilter.date,
							});
						}}
						placeholder={placeholderForPaidTimeFilter || 'Pick a date'}
						className={paidTimeClassName}
					/>
				)}
				{isUptoValidatedAtFilter && (
					<DateFilter
						filterValues={filter.upto_validated_at || null}
						onFilterValuesChange={(newFilter) => {
							setFilter({
								...filter,
								upto_validated_at: newFilter.date,
							});
						}}
						placeholder={placeholderForUptoValidatedAtFilter || 'Pick a date'}
						className={uptoValidatedAtClassName}
					/>
				)}
			</div>
			<div className="flex gap-2">
				<Button
					className="w-[150px] border-dashed text-white"
					onClick={() => onFilterValuesChange(filter)}
				>
					Apply
				</Button>
				<Button
					variant="outline"
					className="w-[150px] border-dashed"
					onClick={() => {
						defaultFilterValues && onFilterValuesChange?.(defaultFilterValues);
						setFilter(defaultFilterValues);
					}}
				>
					Reset
				</Button>
			</div>
		</div>
	);
}

export const SearchFilter = ({
	placeholder,
	filterValues,
	onFilterValuesChange,
	className,
}: {
	placeholder: string;
	filterValues: string;
	onFilterValuesChange: (filterValues: { search: string }) => void;
	className?: string;
}) => {
	return (
		<Input
			id="search"
			name="search"
			placeholder={placeholder}
			value={filterValues}
			className={cn('border-dashed', className)}
			type={'text'}
			onChange={(e) => onFilterValuesChange({ search: e.target.value })}
		/>
	);
};

export const StatusFilter = ({
	filterValues,
	onFilterValuesChange,
}: {
	filterValues: string;
	onFilterValuesChange: (filterValues: { status: string }) => void;
}) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					className="w-[150px] border-dashed capitalize"
				>
					{filterValues || 'Status'}
					<ChevronDownIcon
						className="-me-1 opacity-60"
						size={16}
						aria-hidden="true"
					/>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="min-w-(--radix-dropdown-menu-trigger-width)">
				<DropdownMenuItem
					onClick={() => onFilterValuesChange({ status: 'active' })}
				>
					Active
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => onFilterValuesChange({ status: 'inactive' })}
				>
					Inactive
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export const TypeFilter = ({
	filterValues,
	onFilterValuesChange,
}: {
	filterValues: string;
	onFilterValuesChange: (filterValues: { type: string }) => void;
}) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					className="w-[150px] border-dashed capitalize"
				>
					{filterValues || 'Type'}
					<ChevronDownIcon
						className="-me-1 opacity-60"
						size={16}
						aria-hidden="true"
					/>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="min-w-(--radix-dropdown-menu-trigger-width)">
				<DropdownMenuItem
					onClick={() => onFilterValuesChange?.({ type: 'free' })}
				>
					Free
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => onFilterValuesChange?.({ type: 'paid' })}
				>
					Paid
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export const PaymentModeFilter = ({
	filterValues,
	onFilterValuesChange,
}: {
	filterValues: string;
	onFilterValuesChange: (filterValues: { payment_mode: string }) => void;
}) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					className="w-[150px] border-dashed capitalize"
				>
					{filterValues || 'Paid Via'}
					<ChevronDownIcon
						className="-me-1 opacity-60"
						size={16}
						aria-hidden="true"
					/>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="min-w-(--radix-dropdown-menu-trigger-width)">
				<DropdownMenuItem
					onClick={() => onFilterValuesChange?.({ payment_mode: 'upi' })}
				>
					UPI
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() =>
						onFilterValuesChange?.({ payment_mode: 'bank_transfer' })
					}
				>
					Bank Transfer
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => onFilterValuesChange?.({ payment_mode: 'cheque' })}
				>
					Cheque
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => onFilterValuesChange?.({ payment_mode: 'cash' })}
				>
					Cash
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export const DateFilter = ({
	filterValues,
	onFilterValuesChange,
	placeholder,
	className,
}: {
	filterValues: number | null;
	onFilterValuesChange: (filterValues: { date: number | null }) => void;
	placeholder: string;
	className?: string;
}) => {
	const [open, setOpen] = useState(false);

	const handleDateSelect = (date: Date | undefined) => {
		if (date) {
			onFilterValuesChange({ date: dayjs(date).unix() });
		} else {
			onFilterValuesChange({ date: null });
		}
		setOpen(false);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					className={cn(
						'group bg-background hover:bg-background border-input h-9 w-full justify-between border-dashed px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]',
						!filterValues && 'text-muted-foreground',
						className
					)}
				>
					<span
						className={cn('truncate', !filterValues && 'text-muted-foreground')}
					>
						{filterValues
							? dayjs.unix(filterValues).format('DD/MM/YYYY')
							: placeholder || 'Pick a date'}
					</span>
					<CalendarIcon
						size={16}
						className="text-muted-foreground/80 group-hover:text-foreground shrink-0 transition-colors"
						aria-hidden="true"
					/>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-2" align="start">
				<Calendar
					mode="single"
					selected={
						filterValues ? dayjs.unix(filterValues).toDate() : undefined
					}
					onSelect={handleDateSelect}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
};
