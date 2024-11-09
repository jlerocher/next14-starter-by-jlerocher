"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePasswordStore } from "@/store";
import { AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react";
import { ChangeEvent, useState } from "react";

interface PasswordComponentProps {
    placeholder?: string;
}

export default function PasswordComponent({
    placeholder = "Enter your password",
}: PasswordComponentProps) {
    const { password, setPassword } = usePasswordStore();
    const [touched, setTouched] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const validatePassword = (password: string): boolean => {
        return (
            password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /[0-9]/.test(password)
        );
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value);
        if (touched) {
            validateAndSetError(e.target.value);
        }
    };

    const handleBlur = (): void => {
        setTouched(true);
        validateAndSetError(password);
    };

    const validateAndSetError = (value: string): void => {
        if (value.length === 0) {
            setError("Password is required");
        } else if (!validatePassword(value)) {
            setError(
                "Password must be at least 8 characters long and contain uppercase, lowercase, and numeric characters",
            );
        } else {
            setError(null);
        }
    };

    const getInputClassName = (): string => {
        if (!touched) return "";
        return error
            ? "border-red-500 bg-red-50 pr-10"
            : "border-green-500 bg-green-50 pr-10";
    };

    const togglePasswordVisibility = (): void => {
        setShowPassword(!showPassword);
    };

    return (
        <fieldset className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
                <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder={placeholder}
                    value={password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClassName()}
                    aria-invalid={error ? "true" : "false"}
                    aria-describedby={error ? "password-error" : undefined}
                />
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={togglePasswordVisibility}
                    aria-label={
                        showPassword ? "Hide password" : "Show password"
                    }
                >
                    {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                    )}
                </Button>
                {touched && (
                    <span className="absolute inset-y-0 right-10 flex items-center pr-3 pointer-events-none">
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
                    id="password-error"
                    className="text-sm text-red-500 bg-red-50 border border-red-200 rounded p-2 flex items-center"
                >
                    <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                    {error}
                </p>
            )}
        </fieldset>
    );
}
