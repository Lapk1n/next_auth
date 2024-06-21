import { ExtendedUser } from "@/auth"
import { Card, CardContent, CardHeader } from "./ui/Card";
import { Badge } from "./ui/Badge";

interface UserInfoProps {
    user?: ExtendedUser
    label: string;
}

const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card className="w-full max-w-[44.7rem] shadow-md">
        <CardHeader>
            <p className="text-xl font-semibold text-center">{label}</p>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-4">
            <div className="flex items-center justify-between p-3 rounded-md border shadow-md">
                <p className="text-sm font-medium">ID</p>
                <p className="truncate text-xs max-w-[160px] font-mono p-1 bg-slate-100 rounded-md">
                    {user?.id || "Not provided"}
                </p>
            </div>
            <div className="flex items-center justify-between p-3 rounded-md border shadow-md">
                <p className="text-sm font-medium">Name</p>
                <p className="truncate text-xs max-w-[160px] font-mono p-1 bg-slate-100 rounded-md">
                    {user?.name || "Not provided"}
                </p>
            </div>
            <div className="flex items-center justify-between p-3 rounded-md border shadow-md">
                <p className="text-sm font-medium">Email</p>
                <p className="truncate text-xs max-w-[160px] font-mono p-1 bg-slate-100 rounded-md">
                    {user?.email || "Not provided"}
                </p>
            </div>
            <div className="flex items-center justify-between p-3 rounded-md border shadow-md">
                <p className="text-sm font-medium">Role</p>
                <p className="truncate text-xs max-w-[160px] font-mono p-1 bg-slate-100 rounded-md">
                    {user?.role || "Not provided"}
                </p>
            </div>
            <div className="flex items-center justify-between p-3 rounded-md border shadow-md">
                <p className="text-sm font-medium">Two factor authentication</p>
                <Badge className="truncate text-xs max-w-[160px] font-mono px-2 py-1" variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
                    {user?.isTwoFactorEnabled ? "ON" : "OFF" }
                </Badge>
            </div>
        </CardContent>
    </Card>
  )
}

export default UserInfo