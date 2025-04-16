import DropdownBox from "@/components/form-fields-components/dropdown-box";
import PopupForForm from "@/components/form-fields-components/form-popup-layout";
import InputBox from "@/components/form-fields-components/input-box";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useMachineTypes } from "@/hooks/use-machine";
import { newMachineSchema, TNewMachineSchema } from "@/zod/company-creation.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useForm, UseFormReturn } from "react-hook-form";

interface NewMachineDetailsFormPopUpProps {
    setMachines?: (data: TNewMachineSchema) => void;
    defaultValues?: TNewMachineSchema;
}

export default function NewMachineDetailsFormPopUp({setMachines, defaultValues}: NewMachineDetailsFormPopUpProps) {

    const machineForm = useForm<TNewMachineSchema>({
        resolver: zodResolver(newMachineSchema),
        defaultValues: defaultValues ? defaultValues : {
            plantName: "",
            machineName: "",
            machineType: "",
            machineCategory: "",
            machineManufacturer: "",
        },
    })

    function onMachineSubmit(data: TNewMachineSchema) {
        if (machineForm.formState.isValid) {
            // if(setMachines) {
            //     setMachines(data);
            //     machineForm.reset();
            //     return;
            // }
            console.log(data);
            machineForm.reset();
        }
    }
    
    return (
        <PopupForForm
            title="Add Machine" 
            triggerText={
                <Button variant="outline" size="lg" className="border-dashed hover:cursor-pointer">
                    <PlusIcon />
                    <span className="hidden lg:inline">Add Machine</span>
                </Button>
            } 
            form={<NewMachineDetailsForm form={machineForm} onSubmit={onMachineSubmit} />} 
            submitFunction={() => {
                onMachineSubmit(machineForm.getValues());
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
    // const { data: machineCategories, isLoading: isMachineCategoriesLoading } = useMachineCategories()

    if (isMachineTypesLoading) return null
    // if (isMachineCategoriesLoading) return null

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="pb-5 px-5 border-b border-dashed space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <InputBox form={form} name="plantName" placeholder="Plant Name" />
                        <InputBox form={form} name="machineName" placeholder="Machine Name" />
                        <DropdownBox form={form} name="machineType" placeholder="Machine Type" options={
                            machineTypes.map((machineType: {value: string, label: string}) => ({label: machineType.label, value: machineType.value}))
                        } className="w-full h-full" />
                        <DropdownBox form={form} name="machineCategory" placeholder="Machine Category" options={[{label: "Option 1", value: "option 1"}, {label: "Option 2", value: "option 2"}]} className="w-full h-full" />
                        <InputBox form={form} name="machineManufacturer" placeholder="Machine Manufacturer" />
                        <InputBox form={form} name="spindleMaxRPM" placeholder="Spindle Max RPM" type="number" />
                        <InputBox form={form} name="efficiency" placeholder="Efficiency %" type="number" />
                        <InputBox form={form} name="powerConsumption" placeholder="Power Consumption (KW/hour)" type="number" />
                    </div>
                </div>
                <div className="py-5 px-5 border-b border-dashed space-y-5">
                    <h1 className="text-lg">Machine Specifications</h1>
                    <div className="grid grid-cols-2 gap-4 border-dashed">
                        <InputBox form={form} name="allowance" placeholder="Allowance (in %)" type="number" />
                        <InputBox form={form} name="setupBaseTime" placeholder="Setup Base Time (in mins)" type="number" />
                    </div>
                </div>
                <div className="py-5 px-5 border-b border-dashed space-y-5">
                    <h1 className="text-lg">Rates</h1>
                    <div className="grid grid-cols-2 gap-4">
                        <InputBox form={form} name="ratePerHour" placeholder="Machine Rate (hourly rate in Rs.)" type="number" />
                        <InputBox form={form} name="setupRatePerHour" placeholder="Setup Hour Rate" type="number" />
                    </div>
                </div>
                <div className="pt-5 px-5 space-y-5">
                    <h1 className="text-lg">Optional Inputs</h1>
                    <div className="grid grid-cols-2 gap-4">
                        <InputBox form={form} name="maxToolLength" placeholder="Max Tool Length (in meter)" type="number" />
                        <InputBox form={form} name="maxToolDiameter" placeholder="Max Tool Diameter (in meter)" type="number" />
                        <InputBox form={form} name="maxTableLength" placeholder="Max Table Length (in meter)" type="number" />
                        <InputBox form={form} name="maxTableBreadth" placeholder="Max Table Breadth (in meter)" type="number" />
                        <InputBox form={form} name="maxWorkpieceWeight" placeholder="Max Workpiece Weight (in Kg)" type="number" />
                        <InputBox form={form} name="toolChangeTime" placeholder="Tool Change Time (in mins) (optional)" type="number" />
                    </div>
                </div>
            </form>
        </Form>
    )
}
