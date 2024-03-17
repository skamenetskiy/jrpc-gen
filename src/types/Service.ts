import {Methods} from "./Methods.ts";
import {Types} from "./Types.ts";

export type Service = {
  name: string;
  methods: Methods;
  types: Types;
}