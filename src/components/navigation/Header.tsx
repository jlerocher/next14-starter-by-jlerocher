"use server";
import UserAvatar from "@/components/auth/UserAvatar";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { UserCircle2 } from "lucide-react";
import Link from "next/link";
import { auth } from "../../../auth";
import SiteTitle from "./SiteTitle";

const Header = async () => {
    const session = await auth();
    return (
        <header className="flex items-center justify-between py-4 px-2 md:px-4 border-b border-border">
            <SiteTitle />

            <div className="flex items-center gap-1 md:gap-4">
                <ModeToggle />
                {session === null ? (
                    <Button type="button" variant="default" className="">
                        <Link
                            href="/auth/signin"
                            className="flex items-center gap-2"
                        >
                            <UserCircle2 className="size-5" />
                            <span className="hidden md:inline">Sign in</span>
                        </Link>
                    </Button>
                ) : (
                    <UserAvatar />
                )}
            </div>
        </header>
    );
};

export default Header;
