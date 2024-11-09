"use client";
import { magicLinkAuth } from "@/lib/server-actions/auth-actions";
import { Mail } from "lucide-react";
import { DialogBody } from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";

type ResendLoginButtonProps = {
    label?: string;
};

export function ResendLoginButton({
    label = "Login with magic link",
}: ResendLoginButtonProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="flex items-center gap-2 w-full group/resend"
                >
                    <Mail className="size-6 group-hover/resend:motion-preset-shake" />
                    <span>{label}</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Magic link login</DialogTitle>
                    <DialogDescription>
                        Enter your email address and we'll send you a magic link
                        to log in.
                    </DialogDescription>
                </DialogHeader>

                <DialogBody>
                    <form
                        action={magicLinkAuth}
                        className="flex flex-col gap-4"
                    >
                        <Input type="email" name="email" placeholder="Email" />
                        <Button type="submit" variant="default">
                            Send magic link
                        </Button>
                    </form>
                </DialogBody>
            </DialogContent>
        </Dialog>
    );
}
