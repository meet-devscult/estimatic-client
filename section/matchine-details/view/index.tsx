"use client"

import MachineDetailCard from "@/components/detail-cards/matchine-detail-card"
import { useMachineById } from "@/hooks/use-matchine"

export default function MachineDetailsViewSection({ id }: { id: string }) {
    console.log(id)
    const { data: machine, isLoading } = useMachineById(id)
    
    if (isLoading) return <div>Loading...</div>
    if (!machine) return <div>Machine not found</div>
    
    return <MachineDetailCard machine={machine} />
}