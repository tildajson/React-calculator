import { ArrowUUpLeft, PlusMinus, Percent, Divide, X, Minus, Plus, Dot, Equals } from "@phosphor-icons/react";
import React from "react";
import Button from "./Button";


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
    return (
        <>
            <div className="mb-2 px-4">
                <div className="flex min-h-[9rem] flex-col items-end justify-end py-4 text-right">
                    <span className="w-full text-6xl text-textDark dark:text-white">
                        123
                    </span>
                </div>
            </div>
            <div className="flex items-center justify-center bg-light-100 px-4 py-2 dark:bg-dark-100">
                <span className="mr-3 cursor-pointer hover:text-black dark:hover:text-white">
                    <ArrowUUpLeft size={ 20 } />
                </span>
                <div className="flex w-full items-center overflow-x-auto text-2xl font-extralight [&>*:first-child]:ml-auto">
                    <span>123</span>
                </div>
            </div>
            {/* Keyboard */ }
            <div className="flex items-center justify-between p-4">
                <div className="flex w-full flex-col gap-1 rounded-lg">
                    {
                        Object.keys(Buttons).map((key) => (
                            <div className="grid grid-cols-4 gap-1" key={ key }>
                                { Buttons[key].map((item) => (
                                    <Button
                                        key={ item.value }
                                        className={ "w-full" + " " + item.className || "" }>{ item.label }</Button>
                                )) }
                            </div>
                        )) }
                </div>
            </div>
        </>
    );
};

export default Calculator;