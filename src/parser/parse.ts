import {join} from "https://deno.land/std@0.212.0/path/join.ts";
import {parse} from "yaml";
import {Parsed} from "../types/Parsed.ts";

export async function parseFile(inFile: string): Promise<Parsed> {
  const fileContents = await Deno.readTextFile(inFile);
  const parsed = parse(fileContents);
  return parsed as Parsed;
}

export async function parseDir(dirName: string): Promise<Parsed[]> {
  const result: Parsed[] = [];

  for await (const entry of Deno.readDir(dirName)) {
    if (entry.isDirectory) {
      result.push(...await parseDir(join(dirName, entry.name)));
    } else {
      if (!entry.name.endsWith(".yaml") && !entry.name.endsWith(".yml")) {
        continue;
      }
      result.push(await parseFile(join(dirName, entry.name)));
    }
  }

  return result;
}