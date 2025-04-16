"use client"

import { Button } from "@/components/ui/button";
import { CompanyCreationSchema, TCompanyCreationSchema } from "@/zod/company-creation.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, XIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import CompanyBasicDetailsForm from "../company-basic-details.form";
import NewMachineDetails from "../new-machine-details.form";
import NewUserDetailsForm from "../new-user-details.form";

export default function CompanyCreationView() {

    const form = useForm<TCompanyCreationSchema>({
        resolver: zodResolver(CompanyCreationSchema),
        defaultValues: {
            name: "",
            website: "",
            companyType: "",
        },
    })

    function onSubmit(data: TCompanyCreationSchema) {
        console.log({data});
    }

    return (
        <div>
            <div className="p-5 border-b border-dashed">
                <h1 className="text-2xl font-bold">Companies Registration</h1>
            </div>
            <div className="p-5 border-b border-dashed space-y-5">
                <h1 className="text-xl font-bold">Companies Information</h1>
                <CompanyBasicDetailsForm form={form} onSubmit={onSubmit} />
            </div>
            <div className="p-5 border-b border-dashed space-y-5">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold">Add Users</h1>
                    <NewUserDetailsForm />
                </div>
                <p className="text-sm text-center text-muted-foreground">No User Added</p>

            </div>
            <div className="p-5 border-b border-dashed space-y-5">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold">Add Machines</h1>
                    <NewMachineDetails />
                </div>
                <p className="text-sm text-center text-muted-foreground">No Machine Added</p>
            </div>
            <div className="p-5 border-b border-dashed flex justify-end items-center gap-4">
                <Button variant="destructive" size="lg" className="border-dashed hover:cursor-pointer" onClick={() => {
                    form.reset();
                }}>
                    <XIcon />
                    <span className="hidden lg:inline">Cancel</span>
                </Button>

                <Button size="lg" className="border-dashed hover:cursor-pointer dark:text-white" onClick={() => {
                    form.handleSubmit(onSubmit)();
                }}>
                    <PlusIcon />
                    <span className="hidden lg:inline">Add Company</span>
                </Button>
            </div>
        </div>
    )
}
