import RoleDetailsViewSection from "@/section/role/view/role-details.view";

export default async function RoleDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <div>
            <RoleDetailsViewSection id={id} />
        </div>
    );
}