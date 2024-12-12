"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { signUserOut } from "@/lib/server-actions/auth-actions";
import { LogOut, Settings, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function UserAvatar() {
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);

    if (!session?.user) {
        return null;
    }

    const user = session.user;

    const avatarComponent = (
        <Avatar className="h-10 w-10">
            <AvatarImage src={user.image || undefined} alt={user.name || ""} />
            <AvatarFallback>
                {user.name ? user.name.charAt(0) : "?"}
            </AvatarFallback>
        </Avatar>
    );

    const handleLogout = async () => {
        await signUserOut();
    };

    const userMenuItems = [
        {
            label: "Profile",
            icon: User,
            url: `/auth/profile/${user.id}`,
        },
        {
            label: "Settings",
            icon: Settings,
            url: "/auth/settings",
        },
    ];

    return (
        <TooltipProvider>
            <Tooltip>
                <DropdownMenu open={open} onOpenChange={setOpen}>
                    <DropdownMenuTrigger asChild>
                        <TooltipTrigger
                            asChild
                            className="shadow-lg"
                            role="button"
                            aria-label="User menu"
                        >
                            {avatarComponent}
                        </TooltipTrigger>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-56"
                        align="end"
                        forceMount
                    >
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none first-letter:capitalize">
                                    {user.name}
                                </p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    {/*@ts-expect-error xxxxx */}
                                    {user.email}
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {userMenuItems.map((item) => (
                            <DropdownMenuItem
                                key={item.label}
                                asChild
                                className="group"
                            >
                                <Link href={item.url}>
                                    <item.icon className="mr-2 h-4 w-4" />
                                    <span>{item.label}</span>
                                </Link>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={handleLogout}
                            className="bg-red-500/40 hover:bg-red-500/70 focus:bg-red-500/70 group/signout"
                        >
                            <LogOut className="mr-2 h-4 w-4 group-hover/signout:motion-preset-shake" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <TooltipContent side="bottom">
                    <p className="first-letter:capitalize">{user.name}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
