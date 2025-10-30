
import AddNewUserPopup from "@/components/form-fields-components/form-popup-layout";
import InputBox from "@/components/form-fields-components/input-box";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { usePermissionStore } from "@/guard/permission.store";
import { usePlantMutation, usePlantsByCompanyId } from "@/hooks/use-plants";
import { PERMISSION } from "@/types/user.type";
import { plantSchema, TPlantSchema } from "@/zod/plant.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { PencilIcon, PlusIcon } from "lucide-react";
import { useForm, UseFormReturn } from "react-hook-form";

interface NewPlantDetailsFormsProps {
    company_id?: string | null;
    defaultValues?: TPlantSchema;
    onSubmit?: (data: TPlantSchema) => void;
    iconButton?: boolean;
}

export default function NewPlantDetailsForms({defaultValues, company_id, onSubmit, iconButton = false}: NewPlantDetailsFormsProps) {
    const { getPermission } = usePermissionStore();
    const permission = getPermission('companies');

    const queryClient = useQueryClient()

    // const [isLoading, setIsLoading] = useState(false)
    
    const plantForm = useForm<TPlantSchema>({
        resolver: zodResolver(plantSchema),
        defaultValues: defaultValues || {
            company_id: company_id || undefined,
            name: ""
        }
    })

    const { mutate: createPlant, isPending: isCreatingPlant } = usePlantMutation({queryClient, companyId: company_id || ""})

    const { refetch } = usePlantsByCompanyId(company_id || "")

    return  <AddNewUserPopup
        title={defaultValues ? "Edit Plant" : "Add New Plant"}
        triggerText={
            !iconButton ? <Button variant="outline" size="lg" className="border-dashed hover:cursor-pointer" disabled={permission !== PERMISSION.FULL_ACCESS}>
              {!defaultValues && <PlusIcon />}
              {defaultValues ? <span className="hidden lg:inline">Edit Plant</span> : <span className="hidden lg:inline">Add Plant</span>}
            </Button> : <Button variant="outline" size="lg" className="border-dashed hover:cursor-pointer" disabled={permission !== PERMISSION.FULL_ACCESS}>
              {iconButton && defaultValues && <PencilIcon /> || <PlusIcon />}
            </Button>
        } 
        form={
            <NewPlantForm
                form={plantForm}
                onSubmit={
                    async (data) => {
                        try {
                    if(onSubmit) {
                        onSubmit(data)
                        plantForm.reset()
                    } else {
                        await createPlant({ data, method: defaultValues ? 'put' : 'post' })
                        plantForm.reset()
                    }} catch (error) {
                        console.error("Error creating/updating plant:", error)
                    } finally {
                        refetch()
                    }
                }
                }
            />}
            submitFunction={async () => {
                try {
                if(onSubmit) {
                    onSubmit(plantForm.getValues())
                    plantForm.reset()
                } else {
                    await createPlant({ data: plantForm.getValues(), method: defaultValues ? 'put' : 'post' })
                    plantForm.reset()
                }} catch (error) {
                    console.error("Error creating/updating plant:", error)
                } finally {
                    refetch()
                }
            }
            }
        buttonText={defaultValues ? "Update Plant" : "Create Plant"}
        isLoading={isCreatingPlant}
        loadingText={defaultValues ? "Updating Plant..." : "Creating Plant..."}
        formInstance={plantForm}
        />
}

interface NewPlantFormProps {
    form: UseFormReturn<TPlantSchema>;
    onSubmit: (data: TPlantSchema) => void;
}

export function NewPlantForm({form, onSubmit}: NewPlantFormProps) {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="px-5">
                    <InputBox form={form} name="name" placeholder="Plant Name" />
                </div>
            </form>
        </Form>
    )
}