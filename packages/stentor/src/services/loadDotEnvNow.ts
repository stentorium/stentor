/*! Copyright (c) 2026, XAPPmedia */
import { loadDotEnv } from "./loadDotEnv";

/**
 * Side-effect module: importing it loads `.env` at that point in the import order. Assistant.ts
 * imports it first, before anything that might read process.env while loading, which is what
 * the `require("dotenv").config()` it replaces did by being the first statement in the file.
 */
loadDotEnv();
