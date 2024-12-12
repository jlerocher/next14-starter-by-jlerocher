interface AppMetadata {
    title: string;
    description: string;
    keywords: string;
    baseUrl: string;
}

/**
 * The metadata for the app.
 *
 * @remarks
 * This is an interface with the different metadata for the app.
 *
 * @property {string} title The title of the app.
 * @property {string} description The description of the app.
 * @property {string} keywords The keywords for the app.
 * @property {string} baseUrl The base url of the app.
 */
export const AppMetadata = {
    title: "NextJS Starter",
    description: "A powerful starter app for NextJS",
    keywords: "nextjs, tailwindcss, prisma, typescript, react",

    baseUrl: "https://jlerocher.com",
};
