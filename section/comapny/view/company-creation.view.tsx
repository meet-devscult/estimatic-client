"use client"

import PopupForForm from "@/components/form-fields-components/form-popup-layout";
import { Button } from "@/components/ui/button";
import { companyCreationSchema, newUserSchema, TCompanyCreationSchema, TNewMachineSchema, TNewUserSchema } from "@/zod/company-creation.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CompanyBasicDetailsForm from "../company-basic-details.form";
import NewMachineDetailsFormPopUp from "../new-machine-details.form";
import NewUserDetailsForm from "../new-user-details.form";

export default function CompanyCreationView() {

    const [ machines, setMachines ] = useState<TNewMachineSchema[]>([])

    const form = useForm<TCompanyCreationSchema>({
        resolver: zodResolver(companyCreationSchema),
        defaultValues: {
            name: "",
            website: "",
            companyType: "",
        },
    })

    function onSubmit(data: TCompanyCreationSchema) {
        console.log({data, machines: machines});
    }

    const userForm = useForm<TNewUserSchema>({
        resolver: zodResolver(newUserSchema),
        defaultValues: {
            name: "",
            designation: "",
            phone: "",
            type: "",
            email: "",
            password: "",
        },
    })
    
    function onUserSubmit(data: TNewUserSchema) {
        if (userForm.formState.isValid) {
            console.log(data);
            userForm.reset();
        }
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
                    <PopupForForm
                        title="Add User" 
                        triggerText={
                            <Button variant="outline" size="lg" className="border-dashed hover:cursor-pointer">
                                <PlusIcon />
                                <span className="hidden lg:inline">Add User</span>
                            </Button>
                        } 
                        form={<NewUserDetailsForm form={userForm} onSubmit={onUserSubmit} />} 
                        submitFunction={() => {
                            onUserSubmit(userForm.getValues());
                        }}
                        buttonText="Add User"
                        formInstance={userForm}
                    />
                </div>
                <p className="text-sm text-center text-muted-foreground">No User Added</p>
            </div>
            <div className="p-5 border-b border-dashed space-y-5">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold">Add Machines</h1>
                    <NewMachineDetailsFormPopUp setMachines={(data) => setMachines([...machines, data])} />
                </div>
                {machines.length === 0 && <p className="text-sm text-center text-muted-foreground">No Machine Added</p>}
                {machines.length > 0 && <p className="text-sm text-center text-muted-foreground">Machines Added {machines.length}</p>}
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
