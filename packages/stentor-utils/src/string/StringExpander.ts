/*! Copyright (c) 2019, XAPPmedia */
const VARIABLE_REGEX = /(?:\$\{|\{-\|)([^\}]+)\}/g;
const VARIABLE_REPLACEMENT_REGEX = /%%%%%([^\%]+)%%%%%/g;
const BRACKET_REGEX = /\{([^\}]+)\}/g;

export enum StringVariableStyle {
    /**
     * ES Template Literal style, ${VAR}
     */
    ESTemplateLiteral = "ES",
    /**
     * Alexa Utterances style, {-|VAR}
     */
    AlexaUtterances = "AU",
    /**
     * Alexa Slot style, {VAR}
     */
    AlexaSlot = "ALEXA"
}

export class StringExpanderProps {
    /**
     * Override the default value of ESTemplateLiteral ${VAR}
     */
    public variableStyle?: StringVariableStyle;
    /**
     * Reduce multiple spaces to one.
     */
    public reduceToOneSpace?: boolean;
    /**
     * Trim leading and trailing spaces
     */
    public trim?: boolean;
}

/**
 * Expands strings when the pattern {option0|option1} is found within the string.
 *
 * If either ${VAR} or the alexa-utterances {-|VAR} is within the string, it preserved and
 * converted to ${} by default.
 */
export class StringExpander {
    private variableStyle: StringVariableStyle = StringVariableStyle.ESTemplateLiteral;
    private reduceToOneSpace = false;
    private trim = false;
    public constructor(props?: StringExpanderProps) {
        if (props) {
            this.variableStyle = props.variableStyle !== undefined ? props.variableStyle : this.variableStyle;
            this.reduceToOneSpace =
                typeof props.reduceToOneSpace === "boolean" ? props.reduceToOneSpace : this.reduceToOneSpace;
            this.trim = typeof props.trim === "boolean" ? props.trim : this.trim;
        }
    }

    public expand(str: string): string[] {
        if (!str) {
            return [];
        }
        // First look for variables, replace them with something
        // that will not mess up the regex and hopefully a user will never
        // user themselves in the string
        str = str.replace(VARIABLE_REGEX, (match, capture) => {
            return `%%%%%${capture}%%%%%`;
        });
        /**
         * Used for recursively expanding utterances.
         *
         * @param toExpand
         */
        function expand(toExpand: string): string[] {
            let expandedFully: string[] = [];

            const regex = new RegExp(BRACKET_REGEX);
            const result = regex.exec(toExpand);

            if (!result) {
                return [toExpand];
            }

            const match = result[0];
            const capture = result[1];
            const values = capture.split("|");
            const expanded: string[] = [];
            values.forEach(value => {
                expanded.push(toExpand.replace(match, value));
            });
            expanded.forEach(expandedValue => {
                expandedFully = expandedFully.concat(expand(expandedValue));
            });

            return expandedFully;
        }
        // Expand the string using... RECURSION
        const expanded: string[] = expand(str);
        // Not go back through and replace the variables back in
        const finalExpanded: string[] = [];
        expanded.forEach(value => {
            // Replace the variables with the new style ${} variables
            value = value.replace(VARIABLE_REPLACEMENT_REGEX, (match, capture) => {
                let newValue: string;
                switch (this.variableStyle) {
                    case StringVariableStyle.AlexaSlot:
                        newValue = "{" + capture + "}";
                        break;
                    case StringVariableStyle.AlexaUtterances:
                        newValue = "{-|" + capture + "}";
                        break;
                    default:
                        newValue = "${" + capture + "}";
                }
                return newValue;
            });
            if (this.reduceToOneSpace) {
                value = value.replace(/\s\s+/g, " ");
            }
            if (this.trim) {
                value = value.trim();
            }
            // it is possible to end up with an empty string,
            // we only push if it has length
            if (value.length > 0) {
                finalExpanded.push(value);
            }
        });
        // And ship it
        return finalExpanded;
    }
}
