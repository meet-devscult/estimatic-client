import DropdownBox from "@/components/form-fields-components/dropdown-box";
import InputBox from "@/components/form-fields-components/input-box";
import { Form } from "@/components/ui/form";
import { TNewMachineSchema } from "@/zod/company-creation.zod";
import { UseFormReturn } from "react-hook-form";

interface NewMachineDetailsFormProps {
    form: UseFormReturn<TNewMachineSchema>;
    onSubmit: (data: TNewMachineSchema) => void;
}

export default function NewMachineDetailsForm({form, onSubmit}: NewMachineDetailsFormProps) {

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="pb-5 px-5 border-b border-dashed space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <InputBox form={form} name="plantName" placeholder="Plant Name" />
                        <InputBox form={form} name="machineName" placeholder="Machine Name" />
                        <DropdownBox form={form} name="machineType" placeholder="Machine Type" options={[{label: "Option 1", value: "option 1"}, {label: "Option 2", value: "option 2"}]} className="w-full h-full" />
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
