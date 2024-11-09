"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNameStore } from "@/store";
import { AlertCircle, CheckCircle } from "lucide-react";
import { ChangeEvent, useState } from "react";

interface NameComponentProps {
    placeholder?: string;
}

export default function NameComponent({
    placeholder = "John Doe",
}: NameComponentProps) {
    const { name, setName } = useNameStore();
    const [touched, setTouched] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const validateName = (name: string): boolean => {
        return name.trim().length >= 4 && /^[a-zA-Z\s-]+$/.test(name);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const newName = e.target.value;
        setName(newName);
        if (touched) {
            validateAndSetError(newName);
        }
    };

    const handleBlur = (): void => {
        setTouched(true);
        validateAndSetError(name);
    };

    const validateAndSetError = (value: string): void => {
        if (value.trim().length === 0) {
            setError("Name is required");
        } else if (!validateName(value)) {
            setError(
                "Please enter a valid name (letters, spaces, and hyphens only)",
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

    return (
        <fieldset className="space-y-2">
            <Label htmlFor="name">Your name</Label>
            <div className="relative">
                <Input
                    type="text"
                    id="name"
                    placeholder={placeholder}
                    value={name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClassName()}
                    aria-invalid={error ? "true" : "false"}
                    aria-describedby={error ? "name-error" : undefined}
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
                    id="name-error"
                    className="text-sm text-red-500 bg-red-50 border border-red-200 rounded p-2 flex items-center"
                >
                    <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                    {error}
                </p>
            )}
        </fieldset>
    );
}
