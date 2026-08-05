/*! Copyright (c) 2019, XAPPmedia */
const VARIABLE_REGEX = /(?:\$\{|\{-\|)([^\}]+)\}/g;
const VARIABLE_REPLACEMENT_REGEX = /%%%%%([^\%]+)%%%%%/g;
const BRACKET_REGEX = /\{([^\}]+)\}/g;
export var StringVariableStyle;
(function (StringVariableStyle) {
    /**
     * ES Template Literal style, ${VAR}
     */
    StringVariableStyle["ESTemplateLiteral"] = "ES";
    /**
     * Alexa Utterances style, {-|VAR}
     */
    StringVariableStyle["AlexaUtterances"] = "AU";
    /**
     * Alexa Slot style, {VAR}
     */
    StringVariableStyle["AlexaSlot"] = "ALEXA";
})(StringVariableStyle || (StringVariableStyle = {}));
export class StringExpanderProps {
}
/**
 * Expands strings when the pattern {option0|option1} is found within the string.
 *
 * If either ${VAR} or the alexa-utterances {-|VAR} is within the string, it preserved and
 * converted to ${} by default.
 */
export class StringExpander {
    constructor(props) {
        this.variableStyle = StringVariableStyle.ESTemplateLiteral;
        this.reduceToOneSpace = false;
        this.trim = false;
        if (props) {
            this.variableStyle = props.variableStyle !== undefined ? props.variableStyle : this.variableStyle;
            this.reduceToOneSpace =
                typeof props.reduceToOneSpace === "boolean" ? props.reduceToOneSpace : this.reduceToOneSpace;
            this.trim = typeof props.trim === "boolean" ? props.trim : this.trim;
        }
    }
    expand(str) {
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
        function expand(toExpand) {
            let expandedFully = [];
            const regex = new RegExp(BRACKET_REGEX);
            const result = regex.exec(toExpand);
            if (!result) {
                return [toExpand];
            }
            const match = result[0];
            const capture = result[1];
            const values = capture.split("|");
            const expanded = [];
            values.forEach(value => {
                expanded.push(toExpand.replace(match, value));
            });
            expanded.forEach(expandedValue => {
                expandedFully = expandedFully.concat(expand(expandedValue));
            });
            return expandedFully;
        }
        // Expand the string using... RECURSION
        const expanded = expand(str);
        // Not go back through and replace the variables back in
        const finalExpanded = [];
        expanded.forEach(value => {
            // Replace the variables with the new style ${} variables
            value = value.replace(VARIABLE_REPLACEMENT_REGEX, (match, capture) => {
                let newValue;
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
//# sourceMappingURL=StringExpander.js.map