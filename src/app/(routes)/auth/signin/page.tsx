"use client";

import EmailComponent from "@/components/auth/EmailComponent";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
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
import { submitLoginForm } from "@/lib/server-actions/auth-actions";
import { useEmailStore, usePasswordStore } from "@/store";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function SignInPage() {
    const { email } = useEmailStore();
    const { password } = usePasswordStore();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const result = await submitLoginForm({
                email: email,
                password: password,
            });
            toast({
                title: result.message,
                description: result.success
                    ? "You'll be redirected to dashboard soon!"
                    : "Please login again",
            });
        } catch (error) {
            console.log(
                "Error while signing in",
                error instanceof Error ? error.message : error,
            );
            toast({
                title: "Error",
                description: "An unexpected error occurred. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen px-4">
            <Card className="max-w-lg mx-auto my-10">
                <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                    <CardDescription>
                        Use social media or email to login.
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-6 py-5 space-y-4">
                    <GoogleLoginButton />
                    <ResendLoginButton />

                    <div className="flex items-center gap-2 my-5">
                        <hr className="w-1/2" />
                        or
                        <hr className="w-1/2" />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <EmailComponent />
                        <PasswordComponent />

                        <Button
                            type="submit"
                            variant="default"
                            size="lg"
                            className="w-full my-5"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                "Sign in"
                            )}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter>
                    <p className="">
                        Don't have an account?{" "}
                        <Link
                            href="/auth/signup"
                            className="underline underline-offset-4"
                        >
                            Create one here
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </main>
    );
}
