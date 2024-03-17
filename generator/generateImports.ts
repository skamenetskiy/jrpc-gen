export async function generateImports() {
  const result: string[] = [
    `import {Context} from "https://deno.land/x/jrpc@v0.0.7/types/Context.ts";`,
  ];

  return result.join("\n");
}