"use client"

import { CalendarIcon } from "lucide-react"
import { useEffect, useId, useState } from "react"
import { FieldValues, Path, UseFormReturn } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { FormControl, FormDescription, FormField, FormItem } from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import dayjs from "dayjs"

interface CalendarInputBoxProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    name: Path<T>;
    className?: string;
    pastDatesOnly?: boolean;
    futureDatesOnly?: boolean;
    minDate?: Date;
    maxDate?: Date;
    placeholder?: string;
}

export default function CalendarInputBox<T extends FieldValues>({ 
    form, 
    name, 
    className,
    placeholder,
    pastDatesOnly = false,
    futureDatesOnly = false,
    minDate,
    maxDate
}: CalendarInputBoxProps<T>) {
    const id = useId()
    const formValue = form.watch(name);
    const [date, setDate] = useState<Date | undefined>(() => {
        return formValue ? new Date(formValue) : undefined;
    });

    useEffect(() => {
        if (formValue) {
            setDate(new Date(formValue));
        }
    }, [formValue]);

    const getDisabledDates = () => {
        if (pastDatesOnly) {
            return { from: new Date(), to: new Date(2100, 0, 1) }
        }
        if (futureDatesOnly) {
            return { from: new Date(1900, 0, 1), to: new Date() }
        }
        return undefined
    }

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    id={id}
                                    variant={"outline"}
                                    className={cn(
                                        "group bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px] h-14 border-dashed",
                                        !date && "text-muted-foreground",
                                        className
                                    )}
                                >
                                    <span
                                        className={cn("truncate", !date && "text-muted-foreground")}
                                    >
                                        {date ? dayjs(date).format("DD/MM/YYYY") : placeholder || "Pick a date"}
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
                                    selected={date}
                                    onSelect={(selectedDate) => {
                                        setDate(selectedDate);
                                        field.onChange(selectedDate);
                                    }}
                                    disabled={getDisabledDates()}
                                    fromDate={minDate}
                                    toDate={maxDate}
                                />
                            </PopoverContent>
                        </Popover>
                    </FormControl>
                    <FormDescription className="text-destructive">
                        {form.formState.errors[name]?.message as string || ""}
                    </FormDescription>
                </FormItem>
            )}
        />
    )
}
