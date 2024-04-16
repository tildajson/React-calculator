import React from "react";
import { AutoTextSize } from "auto-text-size";

const NumericFormat = ({ value, maxLimit, className, autoTextSize }) =>
{
    let formattedValue = Number(value);
    if (maxLimit && value.toString().length > maxLimit) {
        formattedValue = Number.parseFloat(formattedValue).toExponential(2);
    }
    formattedValue = formattedValue.toLocaleString();

    return (
        <span className={ `select-none ${className}` }>
            { autoTextSize ? (
                <AutoTextSize
                    mode={ autoTextSize.mode }
                    minFontSizePx={ autoTextSize.minFontSize }
                    maxFontSizePx={ autoTextSize.maxFontSize }
                    as="p"
                    className="ml-auto"
                >
                    { formattedValue }
                </AutoTextSize>
            ) : (
                formattedValue
            ) }
        </span>
    );
};

export default NumericFormat;