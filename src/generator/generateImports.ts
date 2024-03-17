export async function generateImports() {
  const result: string[] = [
    `import {Context} from "@skamenetskiy/jrpc";`
  ];

  return result.join("\n");
}