import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

const loadEnvFile = (fileName: string): Record<string, string> | null => {
    const filePath = path.join(process.cwd(), fileName);
    if (fs.existsSync(filePath)) {
        return dotenv.parse(fs.readFileSync(filePath));
    }
    return null;
};

const generateEnvExample = () => {
    // Charge .env.local ou .env en priorité
    const envVariables = loadEnvFile(".env.local") || loadEnvFile(".env");

    if (!envVariables) {
        console.log(
            "Aucun fichier .env.local ou .env trouvé à la racine du projet.",
        );
        return;
    }

    // Génère le contenu de .env.example avec des valeurs vides
    const exampleContent = Object.keys(envVariables)
        .map((key) => `${key}=`)
        .join("\n");

    const examplePath = path.join(process.cwd(), ".env.example");
    fs.writeFileSync(examplePath, exampleContent, "utf-8");

    console.log(".env.example a été généré avec succès à la racine du projet.");
};

generateEnvExample();
