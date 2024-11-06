import { readFile as fsReadFile } from "fs/promises";
import fs from "fs";

export const readJsonFile = async (filename) => {
  try {
    const data = await fsReadFile(filename, "utf8");
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (error) {
    console.error(`Error reading JSON file from ${filename}`, error);
  }
};

export const fileExists = (path) => fs.existsSync(path);
