/* eslint-disable react/no-unescaped-entities */
"use client";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { registerFormSchema } from "@/lib/clientValidation";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

export const RegisterForm = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
    const [hasAcceptedPrivacyPolicy, setHasAcceptedPrivacyPolicy] =
        useState(false);
    const { toast } = useToast();

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                const validation = registerFormSchema.safeParse({
                    userName: userName,
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword,
                    hasAcceptedTerms: hasAcceptedTerms,
                    hasAcceptedPrivacyPolicy: hasAcceptedPrivacyPolicy,
                });
                if (validation.success) {
                    const createUser = async () => {}};
            }}
            className="flex flex-col gap-4 text-sm sm:text-base"
        >
            <fieldset className="">
                <Label htmlFor="username">Nom d'utilisateur</Label>
                <Input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    value={userName}
                    onChange={(e) => {
                        setUserName(e.target.value);
                    }}
                />
            </fieldset>

            <fieldset>
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </fieldset>

            <fieldset>
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                    id="password"
                    name="password"
                    placeholder="Mot de passe"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </fieldset>

            <fieldset>
                <Label htmlFor="confirmPassword">
                    Confirme le mot de passe
                </Label>
                <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirme le mot de passe"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </fieldset>

            <fieldset className="space-y-4">
                <div className="flex flex-row gap-2 items-start">
                    <Input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        className="size-6"
                        checked={hasAcceptedTerms}
                        onChange={(e) => {
                            setHasAcceptedTerms(e.target.checked);
                        }}
                    />
                    <label htmlFor="terms">
                        J'ai lu et j'accepte les{" "}
                        <Link
                            href="/terms-and-conditions"
                            className="underline-offset-4 font-medium underline"
                        >
                            termes et conditions d'utlisation
                        </Link>
                    </label>
                </div>

                <div className="flex flex-row gap-2 items-start">
                    <Input
                        id="privacy"
                        name="privacy"
                        type="checkbox"
                        className="size-6"
                        checked={hasAcceptedPrivacyPolicy}
                        onChange={(e) => {
                            setHasAcceptedPrivacyPolicy(e.target.checked);
                        }}
                    />
                    <label htmlFor="privacy">
                        J'ai lu et j'accepte les{" "}
                        <Link
                            href="/privacy-conditions"
                            className="underline-offset-4 font-medium underline"
                        >
                            conditions de confidentialité
                        </Link>
                    </label>
                </div>
            </fieldset>

            <fieldset>
                <Button variant="default" type="submit" size="lg">
                    Sign in
                </Button>
            </fieldset>
        </form>
    );
};
