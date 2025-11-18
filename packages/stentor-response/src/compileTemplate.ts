/*! Copyright (c) 2025, XAPP AI */

export type TemplateData = Record<string, any>;

export function compileTemplate(str: string): (data: TemplateData) => string {
  return (data: TemplateData) => {
    try {
      // Use Function constructor to safely interpolate values
      return new Function("data", "with (data) { return `" + str.replace(/\\/g, "\\\\").replace(/`/g, "\\`") + "`; }")(data);
    } catch (e) {
      console.error("Template compilation error:", e);
      return str;
    }
  };
}
