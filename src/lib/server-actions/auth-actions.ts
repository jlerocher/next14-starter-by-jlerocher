"use server";
import { prisma } from "@/lib/prisma/prisma";
import bcrypt from "bcrypt";
import { signIn, signOut } from "../../../auth";

type submitLoginFormProps = {
    email: string;
    password: string;
};

type submitRegisterFormProps = {
    name: string;
    email: string;
    password: string;
};

/**
 * Asynchronously initiates authentication via Google.
 *
 * This function triggers a sign-in process using Google as the
 * authentication provider. It utilizes an external `signIn` function
 * and passes "google" as the provider parameter.
 *
 * @returns {Promise<void>} A promise that resolves when the authentication process is complete.
 */
export const googleAuth = async (): Promise<void> => {
    await signIn("google");
};

/**
 * Authenticates a user using a magic link sent via email.
 *
 * @async
 * @function magicLinkAuth
 * @param {Object} formData - The form data containing user credentials.
 * @returns {Promise<void>} - A promise that resolves when the sign-in process is complete.
 */
export const magicLinkAuth = async (formData: object): Promise<void> => {
    await signIn("resend", formData);
};

/**
 * Asynchronous function to sign out the current user.
 *
 * This function calls the `signOut` method to log the user out of their account.
 * It does not take any parameters and does not return a value.
 * Any errors during the sign-out process need to be handled by the caller.
 *
 * @returns {Promise<void>} A promise that resolves when the sign-out process is complete.
 */
export const signUserOut = async (): Promise<void> => {
    await signOut();
};

/**
 * Asynchronously submits the login form data for user authentication.
 *
 * @param {submitLoginFormProps} loginFormData - The login form data containing email and password.
 * @returns {Promise<{success: boolean, message: string}>} The result of the login attempt, indicating success or failure and an appropriate message.
 */
export const submitLoginForm = async (
    loginFormData: submitLoginFormProps,
): Promise<{ success: boolean; message: string }> => {
    const { email, password } = loginFormData;
    console.log(email, password);

    if (!email || !password) {
        return {
            success: false,
            message: "Please provide both email and password",
        };
    }

    try {
        await signIn("credentials", {
            email: email,
            password: password,
        });

        return {
            success: true,
            message: "Login successful",
        };
    } catch (error) {
        console.log(
            "Error while signing in",
            error instanceof Error ? error.message : error,
        );
        return {
            success: false,
            message: "An error occurred during login: ",
        };
    }
};

export async function submitRegisterForm(
    formData: submitRegisterFormProps,
): Promise<{ success: boolean; message: string }> {
    const { name, email, password } = formData;

    if (!name || !email || !password) {
        return {
            success: false,
            message: "Please fill in all fields",
        };
    }

    // Verify if user already exists
    const existingUser = await prisma.user.findUnique({
        where: { email: email },
    });

    if (existingUser) {
        return {
            success: false,
            message: "Email already in use",
        };
    }

    // Generate a hashed password
    const hashedPassword = await saltAndHashPassword(password);

    try {
        // Create new user in the database
        await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
            },
        });

        return {
            success: true,
            message: "Registration successful",
        };
    } catch (error) {
        return {
            success: false,
            message: "An error occurred during registration " + error,
        };
    }
}

/**
 * Generates a salted and hashed version of the given password.
 *
 * @param {string} password - The plain text password to be salted and hashed.
 * @return {Promise<string>} A promise that resolves to the salted and hashed password.
 */
export async function saltAndHashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
}

/**
 * Fetches a user from the database by their email and verifies the hashed password.
 *
 * @param {string} email - The email of the user to be fetched.
 * @param {string} hashedPassword - The hashed password to verify the user.
 * @return {Promise<Object|null>} A promise that resolves to the user object if found and password matches, otherwise null.
 */
export async function getUserFromDb(
    email: string,
    hashedPassword: string,
): Promise<object | null> {
    const user = await prisma.user.findUnique({
        where: { email: email },
    });

    if (
        !user ||
        !(await bcrypt.compare(hashedPassword, String(user.password)))
    ) {
        return null;
    }

    return user;
}

/**
 * Verifies if the provided password matches the hashed password using bcrypt.
 *
 * @param {string} password - The plain text password to verify.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @return {Promise<boolean>} A promise that resolves to true if the password matches the hashed password, otherwise false.
 */
export async function verifyPassword(
    password: string,
    hashedPassword: string,
): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
}
