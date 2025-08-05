import { redirect } from 'next/navigation';

interface UserListPageProps {
  params: Promise<{ id: string }>;
}

export default async function UserListPage({ params }: UserListPageProps) {
  const { id } = await params;
  
  // Redirect to company details page since users are shown in a tab there
  redirect(`/company/${id}?tab=users`);
}