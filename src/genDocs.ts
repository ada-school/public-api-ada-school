import * as fs from "fs";
import * as path from "path";
import { promisify } from "util";

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

async function findSwaggerGeneratorFiles(directory: string): Promise<string[]> {
  const files: string[] = [];

  const entries = await readdir(directory);
  const promises = entries.map(async (entry) => {
    const fullPath = path.join(directory, entry);
    const fileStat = await stat(fullPath);

    if (fileStat.isDirectory()) {
      const nestedFiles = await findSwaggerGeneratorFiles(fullPath);
      files.push(...nestedFiles);
    } else if (entry === "swagger.generator.ts") {
      files.push(fullPath);
    }
  });

  await Promise.all(promises);

  return files;
}

async function executeSwaggerGenerators(files: string[]): Promise<void> {
  const promises = files.map(async (file) => {
    const generatorModule = await import(path.join("../", file));
    await generatorModule.default();
  });

  await Promise.all(promises);
}

async function main() {
  const directory = "./";
  const swaggerGeneratorFiles = await findSwaggerGeneratorFiles(directory);
  await executeSwaggerGenerators(swaggerGeneratorFiles);
}

// eslint-disable-next-line no-console
main().catch(console.error);
