import {Methods} from "../types/Methods.ts";
import {TypeDef} from "../types/TypeDef.ts";
import {generateType} from "./generateType.ts";

export async function generateService(name: string, methods: Methods): Promise<string> {
  const result: string[] = [];
  const types: string[] = [];
  for (const [methodName, {request, response}] of Object.entries(methods)) {
    const reqName = typeof request === "string" ? request : ucFirst(methodName) + "Request";
    const resName = typeof response === "string" ? response : ucFirst(methodName) + "Response";

    if (typeof request !== "string") {
      types.push(await generateType(reqName, request as TypeDef));
    }
    if (typeof response !== "string") {
      types.push(await generateType(resName, response as TypeDef));
    }

    result.push(`  ${methodName}(ctx: Context, req: ${reqName}): Promise<${resName}>`);
  }
  return [ `export interface ${name} {`, ...result, "}", ...types].join("\n");
}

function ucFirst(input: string): string {
  return input.charAt(0).toUpperCase() + input.substring(1);
}