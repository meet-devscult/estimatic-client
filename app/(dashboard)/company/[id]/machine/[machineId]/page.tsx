import MachineDetailsViewSection from "@/section/matchine-details/view"

export default async function MachineDetailsPage({ params }: { params: Promise<{ machineId: string }>}) {
    const { machineId } = await params
    return (
        <div>
            <MachineDetailsViewSection id={machineId} />
        </div>
    )
}