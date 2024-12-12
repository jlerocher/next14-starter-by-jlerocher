"use server";
import UserAvatar from "@/components/auth/UserAvatar";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { auth } from "../../../auth";
import SiteTitle from "./SiteTitle";

const Header = async () => {
    const session = await auth();
    return (
        <header className="flex items-center justify-between py-4 px-4 border-b border-border">
            <SiteTitle />

            <div className="flex items-center gap-4">
                <ModeToggle />
                {session === null ? (
                    <Button type="button" variant="default" className="">
                        <Link
                            href="/auth/signin"
                            className="flex items-center gap-2"
                        >
                            <LogIn className="size-4" />
                            Sign in
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
