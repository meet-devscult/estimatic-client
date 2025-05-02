import { cn } from "@/lib/utils"
import { IUser } from "@/types/user.type"
import { PencilIcon, SquareAsteriskIcon } from "lucide-react"
import { Button } from "../ui/button"

interface UserDetailCardProps {
    user: IUser
}
export default function UserDetailCard({ user }: UserDetailCardProps) {

    const section1 = [
        {
            label: "Name",
            value: user.user_name
        },
        {
            label: "Designation",
            value: user.designation
        },
        {
            label: "Created On",
            value: user.created_at
        },
    ]

    const section2 = [
        {
            label: "Status",
            value: user.status
        },
        {
            label: "Role",
            value: user.role
        },
        {
            label: "Mobile Number",
            value: user.phone_number
        },
    ]

    const section3 = [
        // {
        //     label: "Quotations",
        //     value: user.quotations
        // },
        {
            label: "Email ID",
            value: user.email
        },
    ]

    return (
        <div>
        <div className="flex justify-between items-center p-5 border-b border-dashed">
            <h1 className="text-2xl font-bold">User Details</h1>
            <div className="flex gap-2">
            <Button variant="outline" size="lg" className="border-dashed cursor-pointer">
                <PencilIcon />
                <span className="hidden lg:inline">Edit Info</span>
            </Button>
            <Button variant="outline" size="lg" className="border-dashed cursor-pointer">
                <SquareAsteriskIcon />
                <span className="hidden lg:inline">Change Password</span>
            </Button>
            </div>
        </div>
        <div className="grid grid-cols-3 border-b border-dashed divide-x divide-dashed">
            <div className="divide-y divide-dashed">
            {section1.map((item) => (
                <div className={cn(
                    "flex items-center gap-1 p-2",
                )} key={item.label}>
                    <h1 className="font-medium text-muted-foreground">{item.label} :</h1>
                    <p>{item.value}</p>
                </div>
            ))}
            </div>
            <div className="divide-y divide-dashed">
            {section2.map((item) => (
                <div className={cn(
                    "flex items-center gap-1 border-b border-dashed p-2",
                )} key={item.label}>
                    <h1 className="font-medium text-muted-foreground">{item.label} :</h1>
                    <p>{item.value}</p>
                </div>
            ))}
            </div>
            <div className="divide-y divide-dashed">
            {section3.map((item) => (
                <div className={cn(
                    "flex items-center gap-1 border-b border-dashed p-2",
                )} key={item.label}>
                    <h1 className="font-medium text-muted-foreground">{item.label} :</h1>
                    <p>{item.value}</p>
                </div>
            ))}
            </div>
        </div>
    </div>
    )
}