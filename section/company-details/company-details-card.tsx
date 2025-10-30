import { deleteCompany } from "@/actions/company.action"
import PopupForForm from "@/components/form-fields-components/form-popup-layout"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { usePermissionStore } from "@/guard/permission.store"
import { useCompanyById, useCompanyMutation } from "@/hooks/use-company"
import { useToggleMutation } from "@/hooks/use-toggle"
import { endpoints } from "@/lib/axios"
import { cn } from "@/lib/utils"
import CompanyBasicDetailsForm from "@/section/comapny/company-basic-details.form"
import { ICompany } from "@/types/company.type"
import { PERMISSION } from "@/types/user.type"
import { CompanyCreationSchema, TCompanyCreationSchema } from "@/zod/company.zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import dayjs from "dayjs"
import { Loader2, LoaderCircle, PencilIcon, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useTransition } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

interface CompanyDetailsCardProps {
    id: string
}

export default function CompanyDetailsCard({id}: CompanyDetailsCardProps) {

    const { getPermission } = usePermissionStore();
    const permission = getPermission('companies');

    const router = useRouter()
    const [isDeleting, startTransition] = useTransition()

    const queryClient = useQueryClient()
    const { data, isLoading } = useCompanyById(id)
    const { mutate: updateCompany, isPending: isUpdatingCompany } = useCompanyMutation({ queryClient })
    const {mutate: updateCompanyStatus, isPending} = useToggleMutation({queryClient, queryKey: ["company"]})

    // Form setup with default values - initialize with empty values first
    const companyForm = useForm<TCompanyCreationSchema>({
        resolver: zodResolver(CompanyCreationSchema),
        defaultValues: {
            name: "",
            website: "",
            quotations_limits: 0,
            type: "",
            upto_validated_at: 0,
        },
    })

    // Update form values when data loads
    React.useEffect(() => {
        if (data?.data) {
            const companyData = data.data as ICompany;
            companyForm.reset({
                name: companyData.name,
                website: companyData.website || "",
                quotations_limits: companyData.quotations_limits,
                type: companyData.type,
                upto_validated_at: companyData.upto_validated_at,
            });
        }
    }, [data, companyForm]);

    if (isLoading) return <div className="flex justify-center items-center">
        <Loader2 className="w-10 h-10 animate-spin" />
    </div>

    const companyData = data.data as ICompany;
    const { name, website, created_at, type, status, upto_validated_at, quotations_limits, users_count, machines_count } = companyData;

    const company_details_grid: Record<string, string | any>[] = [
        {
            title: "Company Name",
            value: name
        },
        {
            title: "Website",
            value: website
        },
        {
            title: "Created On",
            value: dayjs.unix(created_at).format("DD/MM/YYYY")
        },  
        {
            title: "Type",
            value: type
        },
        {
            title: "Status",
            value: <div className="flex items-center justify-center">
                <span className="mr-2 text-sm font-medium">{status === "active" ? "Active" : "Inactive"}</span>
                <Switch
                    checked={status === "active"}
                    onCheckedChange={() => {
                        updateCompanyStatus({data: {company_id: companyData.company_id,status: status === "active" ? "inactive" : "active"}, url: endpoints.companies.root})
                    }}
                disabled={isPending || permission !== PERMISSION.FULL_ACCESS}
                />
            </div>
        },
        {
            title: "Valid Upto",
            value: dayjs.unix(upto_validated_at).format("DD/MM/YYYY")
        },
        {
            title: "Quotations",
            value: quotations_limits.toString()
        },
        {
            title: "Users",
            value: users_count.toString()
        },
        {
            title: "Machines",
            value: machines_count.toString() || "0"    
        },
    ]

    const handleDelete = () => {
        startTransition(async () => {
            try {
                await deleteCompany(id)
                toast.success("Company deleted successfully")
                router.back()
            } catch (error) {
                console.error("Failed to delete company:", error)
            }
        })
    }

    return (
        <div>
        <div className="flex justify-between items-center p-5 border-b border-dashed">
            <h1 className="text-2xl font-bold">Companies</h1>
            <div className="flex gap-2">
                <PopupForForm
                title="Edit Company Details"
                isSubmitDisabled={permission !== PERMISSION.FULL_ACCESS}
                triggerText={
                    <Button variant="outline" size="lg" className="border-dashed hover:cursor-pointer" disabled={permission !== PERMISSION.FULL_ACCESS}>
                        <PencilIcon />
                        <span className="hidden lg:inline">Edit Info</span>
                    </Button>
                }
                form={
                    <CompanyBasicDetailsForm
                        form={companyForm}
                        onSubmit={async (data) => {
                            await updateCompany({ 
                                data: { 
                                    ...data,
                                    company_id: companyData.company_id 
                                }, 
                                method: 'put' 
                            })
                            companyForm.reset()
                        }}
                    />
                }
                submitFunction={async () => {
                    await updateCompany({ 
                        data: { 
                            ...companyForm.getValues(),
                            company_id: companyData.company_id 
                        }, 
                        method: 'put' 
                    })
                    companyForm.reset()
                }}
                buttonText="Update Company"
                isLoading={isUpdatingCompany}
                loadingText="Updating Company..."
                formInstance={companyForm}
            />
            <Button variant="destructive" size="lg" className="border-dashed hover:cursor-pointer" 
                onClick={handleDelete}
                disabled={isDeleting || permission !== PERMISSION.FULL_ACCESS}>
                {isDeleting ? <LoaderCircle className="animate-spin" /> : <Trash2 />}
                {isDeleting ? "Deleting..." : "Delete Company"}
            </Button>
            </div>
        </div>
        <div className="grid grid-cols-3 divide-x">
            {company_details_grid.map((item, index) => (
                <div className={cn(
                    "flex items-center gap-1 border-b border-dashed p-2",
                    (index + 1) % 3 === 0 && "border-r-0" 
                )} key={item.title}>
                    <h1 className="font-medium text-muted-foreground">{item.title} :</h1>
                    <div>{item.value}</div>
                </div>
            ))}
        </div>
    </div>
    )
}