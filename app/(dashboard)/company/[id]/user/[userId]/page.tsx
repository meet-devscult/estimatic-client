import UserDetailsViewSection from "@/section/user-details/view"

export default async function UserDetailsPage({ params }: { params: Promise<{ userId: string, id: string }>}) {
    const { userId, id } = await params
    return (
        <div>
            <UserDetailsViewSection userId={userId} companyId={id} />
        </div>
    )
}