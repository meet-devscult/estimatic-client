import { redirect } from 'next/navigation';

interface PartListPageProps {
  params: Promise<{ id: string }>;
}

export default async function PartListPage({ params }: PartListPageProps) {
  const { id } = await params;
  
  // Redirect to company details page since parts are shown in a tab there
  redirect(`/company/${id}?tab=parts`);
}