"use client"
import PartDetailCard from "@/components/detail-cards/part-detail-card"
import { usePartById } from "@/hooks/use-part"

export default function PartDetailsViewSection({ id }: { id: string }) {
    const { data: part, isLoading } = usePartById(id)
    
    if (isLoading) return <div>Loading...</div>
    if (!part) return <div>Part not found</div>
    
    return <PartDetailCard part={part} />
}