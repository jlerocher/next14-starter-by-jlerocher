"use server";

import { z } from "zod";

export const registerFormSchema = z.object({
    userName: z
        .string()
        .min(2, "Le nom d'utilisateur doit contenir au moins 2 caractères")
        .max(30, "Le nom d'utilisateur ne doit pas dépasser 30 caractères"),
    email: z.string().email("Adresse email invalide"),
    password: z
        .string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        .max(100, "Le mot de passe ne doit pas dépasser 100 caractères")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
            "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial",
        ),
    confirmPassword: z
        .string()
        .min(
            8,
            "Le mot de passe de confirmation doit contenir au moins 8 caractères",
        )
        .max(100),
    hasAcceptedTerms: z.boolean().refine((val) => val === true, {
        message: "Vous devez accepter les conditions d'utilisation",
    }),
    hasAcceptedPrivacyPolicy: z.boolean().refine((val) => val === true, {
        message: "Vous devez accepter la politique de confidentialité",
    }),
});
