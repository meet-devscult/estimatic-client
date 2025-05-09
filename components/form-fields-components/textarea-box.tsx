import { cn } from "@/lib/utils";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem } from "../ui/form";
import { Textarea } from "../ui/textarea";

interface TextareaProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    name: Path<T>;
    placeholder: string;
    className?: string;
    type?: string;
}

export default function TextareaBox<T extends FieldValues>({ form, name, placeholder, className, type="text" }: TextareaProps<T>) {   
    return <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
            <FormItem>
                <FormControl>
                    <Textarea
                        placeholder={placeholder} 
                        {...field} 
                        value={field.value ?? ''}
                        className={cn("h-14 border-dashed", className)}
                        onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value);
                        }}
                    />
                </FormControl>
                <FormDescription className="text-destructive">{form.formState.errors[name]?.message as string || ""}</FormDescription>
            </FormItem>
        )}
    />
}