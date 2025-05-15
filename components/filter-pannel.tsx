import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Input } from "./ui/input";

interface FilterPannelProps {
    filterValues: any
    defaultFilterValues: any
    onFilterValuesChange: (filterValues: any) => void;

    searchbarClassName?: string;

    placeholderForSearchInput?: string;
    isStatusFilter?: boolean;
    isTypeFilter?: boolean;
    isSearchInput?: boolean;
}

export default function FilterPannel({ 
    filterValues,
    onFilterValuesChange,
    defaultFilterValues,
    placeholderForSearchInput,
    searchbarClassName,
    isStatusFilter = false, 
    isTypeFilter = false,
    isSearchInput = false
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

export const SearchFilter = ({placeholder, filterValues, onFilterValuesChange, className }: { placeholder: string,  filterValues: string, onFilterValuesChange: (filterValues: { search: string }) => void, className?: string }) =>  {
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