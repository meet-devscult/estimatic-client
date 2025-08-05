import PopupForForm from "@/components/form-fields-components/form-popup-layout"
import { Button } from "@/components/ui/button"
import { useCompanyById, useCompanyMutation } from "@/hooks/use-company"
import { cn } from "@/lib/utils"
import CompanyBasicDetailsForm from "@/section/comapny/company-basic-details.form"
import { ICompany } from "@/types/company.type"
import { CompanyCreationSchema, TCompanyCreationSchema } from "@/zod/company.zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import dayjs from "dayjs"
import { Loader2, PencilIcon } from "lucide-react"
import React from "react"
import { useForm } from "react-hook-form"

interface CompanyDetailsCardProps {
    id: string
}

export default function CompanyDetailsCard({id}: CompanyDetailsCardProps) {

    const queryClient = useQueryClient()
    const { data, isLoading } = useCompanyById(id)
    const { mutate: updateCompany, isPending: isUpdatingCompany } = useCompanyMutation({ queryClient })

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

    const company_details_grid: Record<string, string>[] = [
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
            value: status
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

    return (
        <div>
        <div className="flex justify-between items-center p-5 border-b border-dashed">
            <h1 className="text-2xl font-bold">Companies</h1>
            <PopupForForm
                title="Edit Company Details"
                triggerText={
                    <Button variant="outline" size="lg" className="border-dashed hover:cursor-pointer">
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
        </div>
        <div className="grid grid-cols-3 divide-x">
            {company_details_grid.map((item, index) => (
                <div className={cn(
                    "flex items-center gap-1 border-b border-dashed p-2",
                    (index + 1) % 3 === 0 && "border-r-0" 
                )} key={item.title}>
                    <h1 className="font-medium text-muted-foreground">{item.title} :</h1>
                    <p>{item.value}</p>
                </div>
            ))}
        </div>
    </div>
    )
}