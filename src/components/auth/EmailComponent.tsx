"use client";

import { useEmailStore } from "@/store";
import { AlertCircle, CheckCircle } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface EmailComponentProps {
    placeholder?: string;
}

export default function EmailComponent({
    placeholder = "johndoe@example.com",
}: EmailComponentProps) {
    const { email, setEmail } = useEmailStore();
    const [touched, setTouched] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const validateEmail = (email: string): boolean => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
        if (touched) {
            validateAndSetError(e.target.value);
        }
    };

    const handleBlur = (): void => {
        setTouched(true);
        validateAndSetError(email);
    };

    const validateAndSetError = (value: string): void => {
        if (value.length === 0) {
            setError("Email is required");
        } else if (!validateEmail(value)) {
            setError("Invalid email address");
        } else {
            setError(null);
        }
    };

    const getInputClassName = (): string => {
        if (!touched) return "";
        return error
            ? "border-red-500 bg-red-50"
            : "border-green-500 bg-green-50";
    };

    return (
        <fieldset className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <div className="relative">
                <Input
                    type="email"
                    id="email"
                    placeholder={placeholder}
                    value={email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClassName()}
                    aria-invalid={error ? "true" : "false"}
                    aria-describedby={error ? "email-error" : undefined}
                />
                {touched && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        {error ? (
                            <AlertCircle className="h-5 w-5 text-red-500" />
                        ) : (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                    </span>
                )}
            </div>
            {error && (
                <p
                    id="email-error"
                    className="text-sm text-red-500 bg-red-50 border border-red-200 rounded p-2 flex items-center"
                >
                    <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                    {error}
                </p>
            )}
        </fieldset>
    );
}
