import { cn } from "@/lib/utils";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";

interface InputBoxProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    name: Path<T>;
    placeholder: string;
    className?: string;
    type?: string;
}

export default function InputBox<T extends FieldValues>({ form, name, placeholder, className, type="text" }: InputBoxProps<T>) {   
    return <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
            <FormItem>
                <FormControl>
                    <Input 
                        placeholder={placeholder} 
                        {...field} 
                        value={field.value ?? ''}
                        className={cn("h-14 border-dashed", className)} 
                        type={type}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (type === "number") {
                                // Convert to number or undefined if empty
                                field.onChange(value === '' ? undefined : Number(value));
                            } else {
                                field.onChange(value);
                            }
                        }}
                    />
                </FormControl>
                <FormDescription className="text-destructive">{form.formState.errors[name]?.message as string || ""}</FormDescription>
            </FormItem>
        )}
    />
}