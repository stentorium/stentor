/*! Copyright (c) 2025, XAPP AI */

// Helper function to escape special regex characters
function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Normalizes legacy Moment.js format strings to Luxon format strings
 * @param momentFormat - The Moment.js format string
 * @returns The equivalent Luxon format string
 */
export function normalizeLegacyFormat(momentFormat: string): string {
  // Special case: handle YYYY-MM-DDTmm:ss which appears to be a typo/legacy format
  // where mm:ss should be HH:mm (hours:minutes not minutes:seconds)
  if (momentFormat === "YYYY-MM-DDTmm:ss") {
    return "yyyy-MM-dd'T'HH:mm";
  }
  
  // Quick check: if format looks like it's already Luxon-style (lowercase yyyy, dd in date context), return as-is  
  // Use bounded matching to prevent ReDoS attacks
  if (/yyyy[^M]{0,10}-MM-dd/.test(momentFormat) || /dd[^M]{0,10}-MM-yyyy/.test(momentFormat)) {
    return momentFormat;
  }

  // For mixed formats with dd in date context, we need to be careful not to convert dd to weekday
  // Use non-greedy, bounded matching to prevent ReDoS attacks
  const hasMixedDateFormat = /(?:YYYY|yyyy)[^M]{0,10}-MM-dd/.test(momentFormat) || /dd[^M]{0,10}-MM-(?:YYYY|yyyy)/.test(momentFormat);

  // Handle escaped characters in brackets first
  // Limit content within brackets to prevent ReDoS attacks
  const escapedChars: string[] = [];
  let result = momentFormat.replace(/\[([^\]]{0,100})\]/g, (_, content) => {
    const placeholder = `###ESC${escapedChars.length}###`;
    escapedChars.push(content);
    return placeholder;
  });

  // Define token replacements in order of precedence (longer patterns first)
  // Use placeholder system to prevent re-processing of already converted tokens
  // Use numbers to avoid character conflicts
  const tokenReplacements = [
    // 4-character tokens
    { moment: /YYYY/g, luxon: "@@1@@" },
    { moment: /MMMM/g, luxon: "@@2@@" },
    { moment: /dddd/g, luxon: "@@3@@" },  
    { moment: /DDDD/g, luxon: "@@4@@" },  
    
    // 3-character tokens  
    { moment: /MMM/g, luxon: "@@5@@" },
    { moment: /ddd/g, luxon: "@@6@@" },
    { moment: /DDD/g, luxon: "@@7@@" },
    { moment: /SSS/g, luxon: "@@8@@" },
    { moment: /ZZZ/g, luxon: "@@9@@" },
    
    // 2-character tokens
    { moment: /Do/g, luxon: "@@10@@" },
    { moment: /DD/g, luxon: "@@11@@" },     // Day of month
    ...(hasMixedDateFormat ? [] : [{ moment: /dd/g, luxon: "@@12@@" }]),     // Skip weekday conversion in date context
    { moment: /MM/g, luxon: "@@13@@" },
    { moment: /YY/g, luxon: "@@14@@" },
    { moment: /HH/g, luxon: "@@15@@" },
    { moment: /hh/g, luxon: "@@16@@" },
    { moment: /mm/g, luxon: "@@17@@" },
    { moment: /ss/g, luxon: "@@18@@" },
    { moment: /SS/g, luxon: "@@19@@" },
    { moment: /ww/g, luxon: "@@20@@" },
    { moment: /ZZ/g, luxon: "@@21@@" },
    
    // 1-character tokens (only match when not part of words)
    { moment: /(?<!\w)D(?!\w)/g, luxon: "@@22@@" },       // Day of month 
    ...(hasMixedDateFormat ? [] : [{ moment: /(?<!\w)d(?!\w)/g, luxon: "@@23@@" }]),       // Skip weekday conversion in date context
    { moment: /(?<!\w)M(?!\w)/g, luxon: "@@24@@" },
    { moment: /(?<!\w)H(?!\w)/g, luxon: "@@25@@" },
    { moment: /(?<!\w)h(?!\w)/g, luxon: "@@26@@" },
    { moment: /(?<!\w)m(?!\w)/g, luxon: "@@27@@" },
    { moment: /(?<!\w)s(?!\w)/g, luxon: "@@28@@" },
    { moment: /(?<!\w)S(?!\w)/g, luxon: "@@29@@" },
    { moment: /(?<!\w)A(?!\w)/g, luxon: "@@30@@" },
    { moment: /(?<!\w)a(?!\w)/g, luxon: "@@31@@" },
    { moment: /(?<!\w)Z(?!\w)/g, luxon: "@@32@@" },
    { moment: /(?<!\w)Q(?!\w)/g, luxon: "@@33@@" },
    { moment: /(?<!\w)w(?!\w)/g, luxon: "@@34@@" },
    { moment: /(?<!\w)X(?!\w)/g, luxon: "@@35@@" },
    { moment: /(?<!\w)x(?!\w)/g, luxon: "@@36@@" },
  ];

  // Apply replacements in order
  for (const replacement of tokenReplacements) {
    result = result.replace(replacement.moment, replacement.luxon);
  }

  // Replace numeric placeholders with actual Luxon tokens
  const placeholderMap: Record<string, string> = {
    "@@1@@": "yyyy",     // YYYY
    "@@2@@": "MMMM",     // MMMM
    "@@3@@": "cccc",     // dddd
    "@@4@@": "ooo",      // DDDD
    "@@5@@": "MMM",      // MMM
    "@@6@@": "ccc",      // ddd
    "@@7@@": "o",        // DDD
    "@@8@@": "SSS",      // SSS
    "@@9@@": "ZZZZ",     // ZZZ
    "@@10@@": "Do",      // Do
    "@@11@@": "dd",      // DD (day of month)
    "@@12@@": "cc",      // dd (weekday)
    "@@13@@": "MM",      // MM
    "@@14@@": "yy",      // YY
    "@@15@@": "HH",      // HH
    "@@16@@": "hh",      // hh
    "@@17@@": "mm",      // mm
    "@@18@@": "ss",      // ss
    "@@19@@": "SS",      // SS
    "@@20@@": "WW",      // ww
    "@@21@@": "ZZZ",     // ZZ
    "@@22@@": "d",       // D (day of month)
    "@@23@@": "c",       // d (weekday)
    "@@24@@": "M",       // M
    "@@25@@": "H",       // H
    "@@26@@": "h",       // h
    "@@27@@": "m",       // m
    "@@28@@": "s",       // s
    "@@29@@": "S",       // S
    "@@30@@": "a",       // A
    "@@31@@": "a",       // a
    "@@32@@": "ZZ",      // Z
    "@@33@@": "q",       // Q
    "@@34@@": "W",       // w
    "@@35@@": "X",       // X
    "@@36@@": "x",       // x
  };

  // Replace all placeholders
  for (const [placeholder, luxonToken] of Object.entries(placeholderMap)) {
    result = result.replace(new RegExp(escapeRegex(placeholder), "g"), luxonToken);
  }

  // Restore escaped characters (Luxon uses single quotes for literals)
  escapedChars.forEach((content, index) => {
    const placeholder = `###ESC${index}###`;
    result = result.replace(placeholder, `'${content}'`);
  });

  return result;
}
