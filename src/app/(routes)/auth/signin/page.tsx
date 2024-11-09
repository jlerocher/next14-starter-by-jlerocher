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
import { submitLoginForm } from "@/lib/server-actions/auth-actions";
import { useEmailStore, usePasswordStore } from "@/store";
import Link from "next/link";

export default function SignInPage() {
    const { email } = useEmailStore();
    const { password } = usePasswordStore();
    return (
        <main className="min-h-screen">
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
                    <form
                        action={() => {
                            submitLoginForm({
                                email: email,
                                password: password,
                            });
                        }}
                    >
                        <EmailComponent />
                        <PasswordComponent />

                        <Button
                            type="submit"
                            variant="default"
                            size="lg"
                            className="w-full my-5"
                        >
                            Sign in
                        </Button>
                    </form>
                </CardContent>

                <CardFooter>
                    <p className="">
                        Does'nt have an account?{" "}
                        <Link
                            href="/auth/signup"
                            className="underline underline-offset-4"
                        >
                            create one here
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </main>
    );
}
