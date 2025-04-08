import PartDetailsViewSection from "@/section/part-details/view"

export default async function PartDetailsPage({ params }: { params: Promise<{ partId: string }>}) {
    const { partId } = await params
    return (
        <div>
            <PartDetailsViewSection id={partId} />
        </div>
    )
}