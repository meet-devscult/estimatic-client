"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCompanyMutation } from "@/hooks/use-company";
import { CompanyCreationSchema, TCompanyCreationSchema } from "@/zod/company.zod";
import { TNewMachineSchema } from "@/zod/machine.zod";
import { TNewUserSchema } from "@/zod/user.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, PlusIcon, Trash2, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CompanyBasicDetailsForm from "../company-basic-details.form";
import NewMachineDetails from "../new-machine-details.form";
import NewUserDetailsForm from "../new-user-details.form";

export default function CompanyCreationView() {
    const router = useRouter()
    const queryClient = useQueryClient()

    const form = useForm<TCompanyCreationSchema>({
        resolver: zodResolver(CompanyCreationSchema),
        defaultValues: {
            name: "",
            website: "",
            type: "",
        },
    })


    const { mutate, isPending } = useCompanyMutation({queryClient})

    const [users, setUsers] = useState<TNewUserSchema[]>([]);
    const [machines, setMachines] = useState<TNewMachineSchema[]>([]);

    async function onSubmit(data: TCompanyCreationSchema) {
        await mutate({data: {...data, users: users, machines: machines}, method: 'post'})
        form.reset();
        setUsers([]);
        setMachines([]);
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
                    <NewUserDetailsForm onSubmit={(data) => setUsers([...users, data])} />
                </div>
                {users.length === 0 && <p className="text-sm text-center text-muted-foreground">No User Added</p>}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user, index) => (
                    <Card key={index}>
                        <CardHeader className="relative">
                            <CardTitle>{user.user_name}</CardTitle>
                            <CardDescription>{user.email}</CardDescription>
                            <div className="absolute top-0 right-6 flex gap-2">
                            <Button variant="outline" size="icon" className="text-destructive" onClick={() => setUsers(users.filter((_, i) => i !== index))}><Trash2 /></Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Badge className="text-white">{user.type}</Badge>
                            <Badge variant="outline">{user.designation}</Badge>
                            <Badge variant="outline">{user.phone_number}</Badge>
                        </CardContent>
                    </Card>
                ))}
                </div>
            </div>
            <div className="p-5 border-b border-dashed space-y-5">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold">Add Machines</h1>
                    <NewMachineDetails onSubmit={(data) => setMachines([...machines, data])} />
                </div>
                {machines.length === 0 && <p className="text-sm text-center text-muted-foreground">No Machine Added</p>}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {machines.map((machine, index) => (
                        <Card key={index}>
                            <CardHeader className="relative">
                                <CardTitle>{machine.name}</CardTitle>
                                <CardDescription>{machine.category}</CardDescription>
                                <Button variant="outline" size="icon" className="text-destructive absolute top-0 right-6" onClick={() => setMachines(machines.filter((_, i) => i !== index))}><Trash2 /></Button>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
            <div className="p-5 border-b border-dashed flex justify-end items-center gap-4">
                <Button variant="destructive" size="lg" className="border-dashed hover:cursor-pointer" onClick={() => {
                    form.reset();
                    router.replace("/company")
                }}>
                    <XIcon />
                    <span className="hidden lg:inline">Cancel</span>
                </Button>

                <Button 
                size="lg" 
                className="border-dashed hover:cursor-pointer dark:text-white" 
                disabled={isPending} 
                onClick={() => {
                    form.handleSubmit(onSubmit)();
                }}>
                    {isPending ? <Loader2 className="animate-spin" /> : <PlusIcon />}
                    <span className="hidden lg:inline">{isPending ? "Adding..." : "Add Company"}</span>
                </Button>
            </div>
        </div>
    )
}
