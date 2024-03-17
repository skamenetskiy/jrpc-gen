import {Types} from "../types/Types.ts";
import {generateType} from "./generateType.ts";

export async function generateTypes(types: Types) {
  const result: string[] = [];
  for (const [name, typeDef] of Object.entries(types)) {
    result.push(await generateType(name, typeDef));
  }
  return result.join("\n");
}