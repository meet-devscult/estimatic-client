import { redirect } from 'next/navigation';

interface MachineListPageProps {
  params: Promise<{ id: string }>;
}

export default async function MachineListPage({ params }: MachineListPageProps) {
  const { id } = await params;
  
  // Redirect to company details page since machines are shown in a tab there
  redirect(`/company/${id}?tab=machines`);
}