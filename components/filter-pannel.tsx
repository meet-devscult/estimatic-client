import { CalendarIcon, ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { useState } from "react";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface FilterPannelProps {
    filterValues: any
    defaultFilterValues: any
    onFilterValuesChange: (filterValues: any) => void;

    searchbarClassName?: string;
    
    placeholderForSearchInput?: string;
    placeholderForStartDateFilter?: string;
    placeholderForEndDateFilter?: string;

    isStatusFilter?: boolean;
    isTypeFilter?: boolean;
    isSearchInput?: boolean;
    isStartDateFilter?: boolean;
    isEndDateFilter?: boolean;
}

export default function FilterPannel({ 
    filterValues,
    onFilterValuesChange,
    defaultFilterValues,
    placeholderForSearchInput,
    searchbarClassName,
    isStatusFilter = false, 
    isTypeFilter = false,
    isSearchInput = false,
    isStartDateFilter = false,
    isEndDateFilter = false,
    placeholderForStartDateFilter,
    placeholderForEndDateFilter
}: FilterPannelProps) {

    const [filter, setFilter] = useState(filterValues)

    return (
        <div className="flex justify-between gap-2 p-5 border-b border-dashed">
            <div className="flex gap-2">
                {isSearchInput && <SearchFilter placeholder={placeholderForSearchInput || "Search"} filterValues={filter.search || ""} onFilterValuesChange={(newFilter) => {
                    setFilter({
                        ...filter,
                        search: newFilter.search
                    })
                }} className={searchbarClassName} />}
                {isStatusFilter && <StatusFilter filterValues={filter.status || ""} onFilterValuesChange={(newFilter) => {
                    setFilter({
                        ...filter,
                        status: newFilter.status
                    })
                }} />}
                {isTypeFilter && <TypeFilter filterValues={filter.type || ""} onFilterValuesChange={(newFilter) => {
                    setFilter({
                        ...filter,
                        type: newFilter.type
                    })
                }} />}
                {isStartDateFilter && <DateFilter filterValues={filter.start_date || null} onFilterValuesChange={(newFilter) => {
                    setFilter({
                        ...filter,
                        start_date: newFilter.date
                    });
                }} placeholder={placeholderForStartDateFilter || "Pick a date"} />}
                {isEndDateFilter && <DateFilter filterValues={filter.end_date || null} onFilterValuesChange={(newFilter) => {
                    setFilter({
                        ...filter,
                        end_date: newFilter.date
                    });
                }} placeholder={placeholderForEndDateFilter || "Pick a date"} />}
            </div>
            <div className="flex gap-2">
            <Button
                className="text-white border-dashed w-[150px]"
                onClick={() => onFilterValuesChange(filter)}
            >
                Apply
            </Button>
            <Button 
                variant="outline" 
                className="border-dashed w-[150px]" 
                onClick={() => {
                    defaultFilterValues && onFilterValuesChange?.(defaultFilterValues)
                    setFilter(defaultFilterValues)
                }}
            >
                Reset
            </Button>
            </div>
        </div>
    )
}

export const SearchFilter = ({placeholder, filterValues, onFilterValuesChange, className }: { placeholder: string,  filterValues: string, onFilterValuesChange: (filterValues: { search: string }) => void, className?: string }) =>  {
    return (
        <Input 
            id="search"
            name="search"
            placeholder={placeholder} 
            value={filterValues}
            className={cn("border-dashed", className)} 
            type={"text"}
            onChange={(e) => onFilterValuesChange({ search: e.target.value })}
        />
    )
}

export const StatusFilter = ({ filterValues, onFilterValuesChange }: { filterValues: string, onFilterValuesChange: (filterValues: { status: string }) => void }) => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-dashed w-[150px] capitalize">
                    {filterValues || "Status"}
                    <ChevronDownIcon
                        className="-me-1 opacity-60"
                        size={16}
                        aria-hidden="true"
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-(--radix-dropdown-menu-trigger-width)">
                <DropdownMenuItem onClick={() => onFilterValuesChange({ status: "active" })}>Active</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onFilterValuesChange({ status: "inactive" })}>Inactive</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export const TypeFilter = ({ filterValues, onFilterValuesChange }: { filterValues: string, onFilterValuesChange: (filterValues: { type: string }) => void }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-dashed w-[150px] capitalize">
                    {filterValues || "Type"}
                    <ChevronDownIcon
                        className="-me-1 opacity-60"
                        size={16}
                        aria-hidden="true"
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-(--radix-dropdown-menu-trigger-width)">
                <DropdownMenuItem onClick={() => onFilterValuesChange?.({ type: "free" })}>Free</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onFilterValuesChange?.({ type: "paid" })}>Paid</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export const PaidViewFilter = ({ filterValues, onFilterValuesChange }: { filterValues: string, onFilterValuesChange: (filterValues: { paid_view: string }) => void }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-dashed w-[150px] capitalize">
                    {filterValues || "Paid View"}
                    <ChevronDownIcon
                        className="-me-1 opacity-60"
                        size={16}
                        aria-hidden="true"
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-(--radix-dropdown-menu-trigger-width)">
                <DropdownMenuItem onClick={() => onFilterValuesChange?.({ paid_view: "upi" })}>UPI</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onFilterValuesChange?.({ paid_view: "bank_transfer" })}>Bank Transfer</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onFilterValuesChange?.({ paid_view: "cheque" })}>Cheque</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onFilterValuesChange?.({ paid_view: "cash" })}>Cash</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export const DateFilter = ({ 
    filterValues, 
    onFilterValuesChange, 
    placeholder, 
    className 
}: { 
    filterValues: number | null, 
    onFilterValuesChange: (filterValues: { date: number | null }) => void, 
    placeholder: string, 
    className?: string 
}) => {
    const [open, setOpen] = useState(false)

    const handleDateSelect = (date: Date | undefined) => {
        if (date) {
            onFilterValuesChange({ date: dayjs(date).unix() });
        } else {
            onFilterValuesChange({ date: null });
        }
        setOpen(false);
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "group bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px] h-14 border-dashed",
                        !filterValues && "text-muted-foreground",
                        className
                    )}
                >
                    <span
                        className={cn("truncate", !filterValues && "text-muted-foreground")}
                    >
                        {filterValues ? dayjs.unix(filterValues).format("DD/MM/YYYY") : placeholder || "Pick a date"}
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
                    selected={filterValues ? dayjs.unix(filterValues).toDate() : undefined}
                    onSelect={handleDateSelect}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}