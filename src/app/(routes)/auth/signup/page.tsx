"use client";

import EmailComponent from "@/components/auth/EmailComponent";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import NameComponent from "@/components/auth/NameComponent";
import PasswordComponent from "@/components/auth/PasswordComponent";
import { ResendLoginButton } from "@/components/auth/ResendLoginButton";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { submitRegisterForm } from "@/lib/server-actions/auth-actions";
import { useEmailStore, useNameStore, usePasswordStore } from "@/store";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function SignUpPage() {
    const { email } = useEmailStore();
    const { password } = usePasswordStore();
    const { name } = useNameStore();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const result = await submitRegisterForm({
                name: name,
                email: email,
                password: password,
            });
            toast({
                title: result.message,
                description: result.success
                    ? "You'll be redirected to signin page soon!"
                    : "Please verify your credentials",
            });
            if (result.success) {
                setTimeout(() => {
                    window.location.href = "/auth/signin";
                }, 2000);
            }
        } catch (error) {
            console.log(
                "Error while signing up",
                error instanceof Error ? error.message : error,
            );
            toast({
                title: "Error",
                description: "An unexpected error occurred. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen">
            <Card className="max-w-lg mx-auto my-10">
                <CardHeader>
                    <CardTitle>Sign up</CardTitle>
                    <CardDescription>
                        Create an account to get started.
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-6 py-5 space-y-4">
                    <GoogleLoginButton label="Create an account with Google" />
                    <ResendLoginButton label="Create an account with magic link" />

                    <div className="flex items-center gap-2 my-5">
                        <hr className="w-1/2" />
                        or
                        <hr className="w-1/2" />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <NameComponent />
                            <EmailComponent />
                            <PasswordComponent />
                        </div>

                        <Button
                            type="submit"
                            variant="default"
                            size="lg"
                            className="w-full my-5"
                            disabled={isLoading || !email || !password || !name}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Signing up...
                                </>
                            ) : (
                                "Sign up"
                            )}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter>
                    <p className="">
                        Already have an account?{" "}
                        <Link
                            href="/auth/signin"
                            className="underline underline-offset-4"
                        >
                            Sign in here
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </main>
    );
}
