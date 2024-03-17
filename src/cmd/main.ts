import {generate} from "../generator/generate.ts";
import {parseFile, parseDir} from "../parser/parse.ts";
import {Parsed} from "../types/Parsed.ts";
import {program} from "commander";

try {
  const options =program
    .name("jrpc-gen")
    .option("--input <path...>", "input yaml files", [])
    .option("--output <path>", "output file path", "src/types/service/Service.ts")
    .parse(Deno.args, {from: "user"})
    .opts<{
      input: string[];
      output: string;
    }>();

  let parsed: Parsed[] = [];

  for (const input of options.input) {
    const info = await Deno.stat(input);
    if (info.isDirectory) {
      parsed = [...parsed, ...await parseDir(input)];
    } else {
      if (!input.endsWith(".yaml") && !input.endsWith(".yml")) {
        continue
      }
      parsed = [...parsed, await parseFile(input)];
    }
  }

  const services = parsed.map(({service}) => service);
  const generated = await generate(services);

  await Deno.writeTextFile(options.output, generated);

} catch (error) {
  console.error(error);
}
