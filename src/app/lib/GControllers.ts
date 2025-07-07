import fs from "fs";
import path from "path";

const controllersDir = path.resolve(process.cwd(), "src/app/http/controller");
const outputFile = path.resolve(process.cwd(), "src/router.ts");

function getFilesRecursively(dir: string, basePath = ""): string[] {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  let exports: string[] = [];

  for (const file of files) {
    if (file.name.startsWith("_")) {
      continue; // Skip files or directories that start with '_'
    }

    const relativePath = path.join(basePath, file.name);
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      exports = exports.concat(getFilesRecursively(fullPath, relativePath));
    } else if (file.isFile() && file.name.endsWith("Controller.ts")) {
      const exportPath = `@controller/${relativePath
        .replace(/\\/g, "/")
        .replace(".ts", "")}`;
      exports.push(`export * from "${exportPath}";`);
    } else if (file.isFile() && file.name.endsWith(".controller.ts")) {
      const exportPath = `@controller/${relativePath
        .replace(/\\/g, "/")
        .replace(".ts", "")}`;
      exports.push(`export * from "${exportPath}";`);
    }
  }

  return exports;
}

function generateControllerIndex() {
  const exports = getFilesRecursively(controllersDir);
  fs.writeFileSync(outputFile, exports.join("\n"), "utf-8");
  console.log(`Controller index generated at: ${outputFile}`);
}

generateControllerIndex();
