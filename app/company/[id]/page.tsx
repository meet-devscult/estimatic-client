import CompanyDetailsViewSection from "@/section/company-details/view/company-details.view";

export default async function CompanyDetailsPage({ params }: { params: Promise<{ id: string }>}) {
    const { id } = await params
    return (
        <div>
            <CompanyDetailsViewSection id={id} />
        </div>
    )
}