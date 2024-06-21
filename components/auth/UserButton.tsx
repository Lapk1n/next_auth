"use client"

import { AvatarImage } from "@radix-ui/react-avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/DropdownMenu"
import { FaUser } from "react-icons/fa"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { LogoutButton } from "./LogoutButton"
import { ExitIcon } from "@radix-ui/react-icons"
import { Avatar, AvatarFallback } from "../ui/Avatar"

const UserButton = () => {
    const user = useCurrentUser()
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full">
                <Avatar>
                    <AvatarImage src={user?.image || ""} />
                    <AvatarFallback className="bg-sky-600">
                        <FaUser className="text-white" />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 p-0" align="end">
                <LogoutButton>
                    <DropdownMenuItem className="p-2">
                        <ExitIcon className="w-4 h-4 mr-2"/>
                        Logout
                    </DropdownMenuItem>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>
  )
}

export default UserButton