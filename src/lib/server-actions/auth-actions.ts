"use server";
import { signIn, signOut } from "../../../auth";

type submitLoginFormProps = {
    email: string;
    password: string;
};

export const googleAuth = async () => {
    await signIn("google");
};

// @ts-expect-error don't know this type
export const magicLinkAuth = async (formData) => {
    await signIn("resend", formData);
};

export const signUserOut = async () => {
    await signOut();
};

export const submitLoginForm = async (loginFormData: submitLoginFormProps) => {
    //TODO: Add logic to submit form
    console.log("submitLoginForm", loginFormData);
};
