import { ArrowUUpLeft, PlusMinus, Percent, Divide, X, Minus, Plus, Dot, Equals } from "@phosphor-icons/react";
import React, { useState, useEffect, useRef } from "react";
import Button from "./Button";
import NumericFormat from "./NumericFormat";



const Buttons = {
    row1: [
        {
            value: "AC",
            label: "AC",
            className: "bg-light-300 dark:bg-dark-300",
            type: "clear",
        },
        {
            value: "+/-",
            label: <PlusMinus size={ 25 } />,
            className: "bg-light-300 dark:bg-dark-300",
            type: "plusminus",
        },
        {
            value: "%",
            label: <Percent size={ 25 } />,
            className: "bg-light-300 dark:bg-dark-300",
            type: "percent",
        },
        {
            value: "/",
            label: <Divide size={ 25 } />,
            className: "!bg-primary text-white",
            type: "operator",
        },
    ],
    row2: [
        { value: "7", label: "7", type: "number" },
        { value: "8", label: "8", type: "number" },
        { value: "9", label: "9", type: "number" },
        {
            value: "*",
            label: <X size={ 25 } />,
            className: "!bg-primary text-white",
            type: "operator",
        },
    ],
    row3: [
        { value: "4", label: "4", type: "number" },
        { value: "5", label: "5", type: "number" },
        { value: "6", label: "6", type: "number" },
        {
            value: "-",
            label: <Minus size={ 25 } />,
            className: "!bg-primary text-white",
            type: "operator",
        },
    ],
    row4: [
        { value: "1", label: "1", type: "number" },
        { value: "2", label: "2", type: "number" },
        { value: "3", label: "3", type: "number" },
        {
            value: "+",
            label: <Plus size={ 25 } />,
            className: "!bg-primary text-white",
            type: "operator",
        },
    ],
    row5: [
        { value: "0", label: "0", className: "col-span-2", type: "number" },
        { value: ".", label: <Dot size={ 25 } />, type: "dot" },
        {
            value: "=",
            label: <Equals size={ 25 } />,
            className: "!bg-primary text-white",
            type: "equal",
        },
    ],
};

const Calculator = () =>
{
    const buttonsRef = useRef({});
    const removeBtnRef = useRef(null);
    const [inputValue, setInputValue] = useState([]);
    const [result, setResult] = useState(0);
    const [settings, setSettings] = useState({ valueCalculated: false });
    const [history, setHistory] = useState([]);

    const handleButtonClick = (value) =>
    {
        if (settings.valueCalculated && value !== "=") {
            setInputValue([]);
            setResult(0);
            setSettings((prev) => ({ ...prev, valueCalculated: false }));
        }

        const button = Object.values(Buttons)
            .flat()
            .find((item) => item.value === value);
        let resultValue;
        if (settings.valueCalculated) {
            resultValue = BigInt(result).toString();
        }

        const lastInputValue = settings.valueCalculated
            ? { value: resultValue, label: resultValue, type: "number" }
            : inputValue[inputValue.length - 1];

        const handleClear = () =>
        {
            setInputValue([]);
            setResult(0);
            setSettings((prev) => ({ ...prev, valueCalculated: false }));
        };

        const handleUnaryOperation = (operation) =>
        {
            if (lastInputValue && lastInputValue.type === "number") {
                const newInputValue = {
                    ...lastInputValue,
                    value: operation(lastInputValue.value),
                    label: operation(lastInputValue.value),
                };
                setInputValue((prev) => [...prev.slice(0, -1), newInputValue]);
            }
        };

        const handleOperator = () =>
        {
            if (inputValue.length > 0) {
                if (lastInputValue && lastInputValue.type === "operator") {
                    const newInputValue = {
                        ...lastInputValue,
                        value: button.value,
                        label: button.label,
                    };
                    setInputValue((prev) => [...prev.slice(0, -1), newInputValue]);
                } else {
                    setInputValue((prev) => [
                        ...prev.slice(0, -1),
                        lastInputValue,
                        button,
                    ]);
                }
            }
        };

        const handleDot = () =>
        {
            if (lastInputValue && lastInputValue.type === "number") {
                let value = lastInputValue.value;
                if (!lastInputValue.value.includes(".")) {
                    value = lastInputValue.value + ".";
                }
                let label = lastInputValue.label;
                if (!lastInputValue.label.includes(".")) {
                    label = lastInputValue.label + ".";
                }

                const newInputValue = {
                    ...lastInputValue,
                    value,
                    label,
                };
                setInputValue((prev) => [...prev.slice(0, -1), newInputValue]);
            } else if (!lastInputValue || lastInputValue.type !== "number") {
                const newInputValue = { value: "0.", label: "0.", type: "number" };
                setInputValue((prev) => [...prev, newInputValue]);
            }
        };

        const handleNumber = () =>
        {
            if (lastInputValue && lastInputValue.type === "number") {
                let newValue = lastInputValue.value;
                if (lastInputValue.value.toString().length < 15) {
                    newValue = lastInputValue.value + value;
                }
                const newInputValue = {
                    ...lastInputValue,
                    value: newValue,
                    label: newValue,
                };
                setInputValue((prev) => [...prev.slice(0, -1), newInputValue]);
            } else {
                setInputValue((prev) => [...prev, button]);
            }
        };

        const handleEqual = () =>
        {
            if (inputValue.length > 0) {
                calculate();
            }
        };

        switch (button.type) {
            case "clear":
                handleClear();
                break;
            case "plusminus":
                handleUnaryOperation((num) => -num);
                break;
            case "percent":
                handleUnaryOperation((num) => num / 100);
                break;
            case "operator":
                handleOperator();
                break;
            case "dot":
                handleDot();
                break;
            case "number":
                handleNumber();
                break;
            case "equal":
                handleEqual();
                break;
            default:
                break;
        }
    };

    const handleKeyboardButtonClick = (btn) =>
    {
        buttonsRef.current[btn].click();
        buttonsRef.current[btn].classList.add("ring-2", "ring-blue-500");
        setTimeout(() =>
        {
            buttonsRef.current[btn].classList.remove("ring-2", "ring-blue-500");
        }, 200);
    };

    const handleKeyPress = (e) =>
    {
        if (buttonsRef.current[e.key]) {
            handleKeyboardButtonClick(e.key);
        }

        if (e.key === "Backspace") {
            removeBtnRef.current && removeBtnRef.current.click();
        }

        if (e.key === "Enter") {
            handleKeyboardButtonClick("=");
        }

        // remove history if up arrow
        if (e.key === "ArrowUp") {
            history.length > 1 && handleRestoreHistory(history[history.length - 1]);
        }
    };

    const calculate = () =>
    {
        const inputValueToCalculate = [...inputValue];
        const lastInputValue =
            inputValueToCalculate[inputValueToCalculate.length - 1];

        if (lastInputValue && lastInputValue.type === "operator") {
            inputValueToCalculate.pop();
            setInputValue(inputValueToCalculate);
        }

        const expression = inputValueToCalculate
            .map((item) =>
            {
                //  remove leading zeros and return the value
                if (item.type === "number") {
                    return Number(item.value);
                }
                return item.value;
            })
            .join("");

        if (!expression) return;

        try {
            const result = eval(expression);
            if (isNaN(result) || !isFinite(result)) {
                throw new Error("Invalid expression");
            }
            setResult(result);
            setSettings((prev) => ({ ...prev, valueCalculated: true }));
            setHistory((prev) => [
                ...prev,
                {
                    inputValue,
                    result,
                },
            ]);
        } catch (error) {
            console.log(error);
        }
    };

    const handleBackspace = () =>
    {
        if (inputValue.length > 0) {
            const lastInputValue = inputValue[inputValue.length - 1];
            if (lastInputValue.type === "number") {
                if (lastInputValue.value.toString().length > 1) {
                    const newInputValue = {
                        ...lastInputValue,
                        value: lastInputValue.value.slice(0, -1),
                        label: lastInputValue.value.slice(0, -1),
                    };
                    setInputValue((prev) => [...prev.slice(0, -1), newInputValue]);
                } else {
                    setInputValue((prev) => [...prev.slice(0, -1)]);
                }
            } else {
                setInputValue((prev) => [...prev.slice(0, -1)]);
            }
        }
    };

    const handleRestoreHistory = (historyItem) =>
    {
        setInputValue(historyItem.inputValue);
        setResult(historyItem.result);
        setSettings((prev) => ({ ...prev, valueCalculated: true }));
        setHistory((prev) => prev.slice(0, -1));
    };

    useEffect(() =>
    {
        document.addEventListener("keydown", handleKeyPress);
        return () =>
        {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    const renderInputValue = () =>
    {
        if (!inputValue.length) return <span>0</span>;

        return inputValue.map((item, index) =>
            item.type === "number" ? (
                <NumericFormat key={ index } value={ item.value } />
            ) : (
                <span
                    key={ index }
                    className={ item.type === "operator" ? "text-primary" : "" }
                >
                    { item.label }
                </span>
            )
        );
    };

    return (
        <>
            <div className="mb-2 px-4">
                <div className="flex min-h-[9rem] flex-col items-end justify-end py-4 text-right">
                    { history.length > 1 && (
                        <div className="flex items-center gap-2 mb-4 cursor-pointer rounded-full bg-light-200 dark:bg-dark-300 py-0.5 px-3 text-xs"
                            onClick={ () =>
                                handleRestoreHistory(
                                    history[history.length - 2] || history[history.length - 1]
                                ) }>
                            <Clock size={ 15 } />
                            <NumericFormat
                                value={
                                    history[history.length - 2].result ||
                                    history[history.length - 1].result
                                } />
                        </div>
                    ) }
                    <NumericFormat
                        className="w-full text-6xl text-textDark dark:text-white"
                        value={ result }
                        maxLimit={ 20 }
                        autoTextSize={ {
                            mode: "oneline",
                            minFontSize: 20,
                            maxFontSize: 50,
                        } }
                    />
                </div>
            </div>
            <div className="flex items-center justify-between bg-light-100 px-4 py-2 dark:bg-dark-100">
                { inputValue.length > 0 && (
                    <span
                        className="mr-3 cursor-pointer hover:text-black dark:hover:text-white"
                        onClick={ handleBackspace }
                        ref={ removeBtnRef }
                    >
                        <ArrowUUpLeft size={ 20 } />
                    </span>
                ) }
                <div className="flex w-full items-center overflow-x-auto text-2xl font-extralight [&>*:first-child]:ml-auto">
                    { renderInputValue() }
                </div>
            </div>
            <div className="flex items-center justify-between p-4">
                <div className="flex w-full flex-col gap-1 rounded-lg">
                    {
                        Object.keys(Buttons).map((key) => (
                            <div className="grid grid-cols-4 gap-1" key={ key }>
                                { Buttons[key].map((item) => (
                                    <Button
                                        key={ item.value }
                                        className={ "w-full" + " " + item.className || "" }
                                        ref={ (button) =>
                                        {
                                            buttonsRef.current[item.value] = button;
                                        } }
                                        onClick={ () => handleButtonClick(item.value) }
                                    >
                                        { item.label }
                                    </Button>
                                )) }
                            </div>
                        )) }
                </div>
            </div>
        </>
    );
};

export default Calculator;