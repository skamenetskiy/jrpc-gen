import {Service} from "../types/Service.ts";
import {generateImports} from "./generateImports.ts";
import {generateService} from "./generateService.ts";
import {generateTypes} from "./generateTypes.ts";

export async function generate(services: Service[]): Promise<string> {
  const result: string[] = [
    await generateImports(),
  ];
  for (const {name, methods, types} of services) {
    result.push(
      await generateService(name, methods),
      await generateTypes(types),
    );
  }
  return [...result].join("\n");
}







