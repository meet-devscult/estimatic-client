import DropdownBox from "@/components/form-fields-components/dropdown-box";
import PopupForForm from "@/components/form-fields-components/form-popup-layout";
import InputBox from "@/components/form-fields-components/input-box";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useMachineCategories, useMachineMutation, useMachineTypes } from "@/hooks/use-machine";
import { newMachineSchema, TNewMachineSchema } from "@/zod/machine.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { useForm, UseFormReturn } from "react-hook-form";

interface NewMachineDetailsFormPopUpProps {
    setMachines?: (data: TNewMachineSchema) => void;
    defaultValues?: TNewMachineSchema;
    companyId?: string;
}

export default function NewMachineDetails({setMachines, defaultValues, companyId}: NewMachineDetailsFormPopUpProps) {
    
    const queryClient = useQueryClient()
    const { mutate: createMachine, isPending: isCreatingMachine } = useMachineMutation(queryClient, companyId || "")

    const machineForm = useForm<TNewMachineSchema>({
        resolver: zodResolver(newMachineSchema),
        defaultValues: defaultValues ? defaultValues : {
            plant_name: "",
            name: "",
            type: "",
            category: "",
            manufacturer: "",
        },
    })

    function onMachineSubmit(data: TNewMachineSchema) {
        if (machineForm.formState.isValid) {
            if(setMachines) {
                setMachines(data);
                machineForm.reset();
                // return;
            }
            console.log(data);
            machineForm.reset();
        }
    }
    
    return (
        <PopupForForm
            title={defaultValues ? "Edit Machine" : "Add Machine"} 
            triggerText={
                <Button variant="outline" size="lg" className="border-dashed hover:cursor-pointer" >
                    {!defaultValues && <PlusIcon />}
                    {defaultValues ? <span className="hidden lg:inline">Edit Info</span> : <span className="hidden lg:inline">Add Machine</span>}
                </Button>
            } 
            form={<NewMachineDetailsForm form={machineForm} onSubmit={() => createMachine({data: machineForm.getValues(), method: defaultValues ? 'put' : 'post'})} />} 
            submitFunction={() => {
                createMachine({data: machineForm.getValues(), method: defaultValues ? 'put' : 'post'})
                machineForm.reset();
            }}
            buttonText="Add Machine"
            formInstance={machineForm}
        />
    )
}

interface NewMachineDetailsFormProps {
    form: UseFormReturn<TNewMachineSchema>;
    onSubmit: (data: TNewMachineSchema) => void;
}

export function NewMachineDetailsForm({form, onSubmit}: NewMachineDetailsFormProps) {

    const { data: machineTypes, isLoading: isMachineTypesLoading } = useMachineTypes()
    const { data: machineCategories, isLoading: isMachineCategoriesLoading } = useMachineCategories()

    if (isMachineTypesLoading || isMachineCategoriesLoading) return null

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="pb-5 px-5 border-b border-dashed space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <InputBox form={form} name="plant_name" placeholder="Plant Name" />
                        <InputBox form={form} name="name" placeholder="Machine Name" />
                        <DropdownBox form={form} name="type" placeholder="Machine Type" options={
                            machineTypes.map((machineType: string) => ({label: machineType, value: machineType}))
                        } className="w-full h-full" />
                        <DropdownBox form={form} name="category" placeholder="Machine Category" options={
                            machineCategories.map((machineCategory: string) => ({label: machineCategory, value: machineCategory}))
                        } className="w-full h-full" />
                        <InputBox form={form} name="manufacturer" placeholder="Machine Manufacturer" />
                        <InputBox form={form} name="max_rpm" placeholder="Spindle Max RPM" type="number" />
                        <InputBox form={form} name="efficiency" placeholder="Efficiency %" type="number" />
                        <InputBox form={form} name="power_consumption" placeholder="Power Consumption (KW/hour)" type="number" />
                    </div>
                </div>
                <div className="py-5 px-5 border-b border-dashed space-y-5">
                    <h1 className="text-lg">Machine Specifications</h1>
                    <div className="grid grid-cols-2 gap-4 border-dashed">
                        <InputBox form={form} name="allowance" placeholder="Allowance (in %)" type="number" />
                        <InputBox form={form} name="setup_base_time" placeholder="Setup Base Time (in mins)" type="number" />
                    </div>
                </div>
                <div className="py-5 px-5 border-b border-dashed space-y-5">
                    <h1 className="text-lg">Rates</h1>
                    <div className="grid grid-cols-2 gap-4">
                        <InputBox form={form} name="machine_rate" placeholder="Machine Rate (hourly rate in Rs.)" type="number" />
                        <InputBox form={form} name="setup_hour_rate" placeholder="Setup Hour Rate" type="number" />
                    </div>
                </div>
                <div className="pt-5 px-5 space-y-5">
                    <h1 className="text-lg">Optional Inputs</h1>
                    <div className="grid grid-cols-2 gap-4">
                        <InputBox form={form} name="max_tool_length" placeholder="Max Tool Length (in meter)" type="number" />
                        <InputBox form={form} name="max_tool_diameter" placeholder="Max Tool Diameter (in meter)" type="number" />
                        <InputBox form={form} name="max_table_length" placeholder="Max Table Length (in meter)" type="number" />
                        <InputBox form={form} name="max_table_breadth" placeholder="Max Table Breadth (in meter)" type="number" />
                        <InputBox form={form} name="max_workpiece_weight" placeholder="Max Workpiece Weight (in Kg)" type="number" />
                        <InputBox form={form} name="tool_change_time" placeholder="Tool Change Time (in mins) (optional)" type="number" />
                    </div>
                </div>
            </form>
        </Form>
    )
}