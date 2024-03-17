import {TypeDef} from "../types/TypeDef.ts";

export async function generateType(name: string | null, typeDef: TypeDef): Promise<string> {
  const result: string[] = [
    name !== null ? `export interface ${name} {` : "{",
  ];
  for (const [varName, varType] of Object.entries(typeDef)) {
    result.push(`  ${varName}: ${varType};`);
  }
  return [...result, "}"].join("\n");
}