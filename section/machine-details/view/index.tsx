"use client"

import MachineDetailCard from "@/components/detail-cards/machine-detail-card"
import { useMachineById } from "@/hooks/use-machine"

export default function MachineDetailsViewSection({ id }: { id: string }) {
    const { data: machine, isLoading } = useMachineById(id)
    
    if (isLoading) return <div>Loading...</div>
    if (!machine) return <div>Machine not found</div>
    
    return <MachineDetailCard machine={machine} />
}