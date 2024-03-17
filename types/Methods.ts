import { TypeDef } from "./TypeDef.ts";

export type Methods = {
  [key: string]: {
    request: string | TypeDef;
    response: string | TypeDef;
  };
}