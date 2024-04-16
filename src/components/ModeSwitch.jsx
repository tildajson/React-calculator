import { Moon, Sun } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";

const ModeSwitch = () =>
{
    const [theme, setTheme] = useState("light");

    const toggleTheme = () =>
    {
        if (theme === "light") {
            setTheme("dark");
        } else {
            setTheme("light");
        }
        document.body.classList.toggle("dark");
    };

    useEffect(() =>
    {
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (isDark) {
            setTheme("dark");
            document.body.classList.add("dark");
        }
    }, []);

    return (
        <div className="flex items-center justify-center mb-5">
            <label htmlFor="switch">
                <input
                    type="checkbox"
                    id="switch"
                    className="hidden"
                    onChange={ toggleTheme }
                />
                <div className="flex items-center gap-4 cursor-pointer bg-light-200 dark:bg-dark-200 px-3 py-1 rounded-full">
                    <div className="dark:text-dark-300 text-primary">
                        <Sun size={ 20 } />
                    </div>
                    <div className="text-textDark dark:text-primary">
                        <Moon size={ 20 } />
                    </div>
                </div>
            </label>
        </div>
    );
};

export default ModeSwitch;