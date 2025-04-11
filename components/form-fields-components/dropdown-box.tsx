import { FormControl, FormDescription, FormField, FormItem } from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface DropdownBoxProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    name: Path<T>;
    placeholder?: string;
    className?: string;
    options: {
        label: string;
        value: string;
    }[];
    groupLabel?: string;
}

export default function DropdownBox<T extends FieldValues>({ 
    form, 
    name, 
    placeholder = "Select an option",
    className,
    options,
    groupLabel
}: DropdownBoxProps<T>) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger size="lg" className={cn("border-dashed", className)}>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                            <SelectContent className="border-dashed">
                                <SelectGroup>
                                    {groupLabel && <SelectLabel>{groupLabel}</SelectLabel>}
                                    {options.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormDescription className="text-destructive">
                        {form.formState.errors[name]?.message as string || ""}
                    </FormDescription>
                </FormItem>
            )}
        />
    )
}
