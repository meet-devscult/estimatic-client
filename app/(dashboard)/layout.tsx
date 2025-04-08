import DashboardWrapper from "@/components/wrapper/dashboard.wrapper";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <DashboardWrapper>
        {children}
      </DashboardWrapper>
    )
}