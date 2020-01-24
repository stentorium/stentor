/*! Copyright (c) 2019, XAPPmedia */
/**
 * A sentence aware string truncation.
 *
 * @param text
 * @param maxLength
 */
export function truncate(text: string, maxLength: number): string {
    let truncatedText = "";

    // Sanity check
    if (!text || text.length <= maxLength) {
        return text;
    }

    // Break it up to sentences
    const sentences = text.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");

    // Starts with a very long sentence
    if (sentences[0].length > maxLength) {
        const ellipsis = "...";
        truncatedText = sentences[0].substr(0, maxLength - ellipsis.length) + ellipsis;
    } else {
        sentences.some((sentence: string) => {
            if (truncatedText.length + sentence.length < maxLength) {
                if (!truncatedText) {
                    truncatedText = sentence;
                } else {
                    truncatedText = truncatedText + " " + sentence;
                }
                return false;
            } else {
                return true; // done
            }
        });
    }

    return truncatedText;
}
