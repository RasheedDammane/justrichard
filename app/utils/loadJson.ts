import fs from "fs";
import path from "path";

/**
 * Charge un fichier JSON statique depuis app/data/default/{lang}/{fileName}
 * Retourne toujours un objet (même vide) pour éviter les crashes
 */
export async function loadLocalJson<T = any>(
  lang: string,
  fileName: string
): Promise<T> {
  try {
    const filePath = path.join(
      process.cwd(),
      "app",
      "data",
      "default",
      lang,
      fileName
    );

    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content) as T;
  } catch (error) {
    console.error(`❌ Error loading JSON file ${fileName} for lang ${lang}`, error);
    // Toujours retourner un objet safe pour éviter les crashes
    return {} as T;
  }
}
