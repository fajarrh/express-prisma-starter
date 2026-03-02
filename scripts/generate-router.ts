import fs from "fs";
import path from "path";


const controllersDir = path.resolve(process.cwd(), "src/http/controller");
const outputFile = path.resolve(process.cwd(), "src/router.ts");

function getFilesRecursively(dir: string, basePath = ""): string[] {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  let exports: string[] = [];

  for (const file of files) {
    if (file.name.startsWith("_")) {
      /**
       * Skip files or directories that start with '_'.
       *
       * Konvensi ini digunakan untuk menandai controller sebagai "private" atau
       * "tidak di-generate otomatis". File/folder dengan prefix '_' tidak akan
       * dimasukkan ke dalam router.ts hasil generate.
       *
       * Gunakan prefix '_' jika kamu ingin mendaftarkan controller secara manual
       * menggunakan `createRouter` dari `frexp/lib/Decorator` langsung di server.ts.
       *
       * Contoh: '_internal.controller.ts' → tidak ter-generate, harus didaftarkan manual.
       */
      continue;
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
