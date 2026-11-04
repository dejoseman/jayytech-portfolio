import { useCallback, useEffect, useState } from "react";

/**
 * Theme management for the portfolio.
 *
 * - Dark is the default for first-time visitors (no OS-preference sniffing).
 * - The choice is persisted in localStorage under THEME_STORAGE_KEY.
 * - index.html runs a tiny inline script that applies the saved theme to
 *   <html data-theme="..."> before first paint, so there is no flash.
 *   This hook simply reads that attribute and keeps it in sync.
 */
export const THEME_STORAGE_KEY = "jt-theme";
const THEMES = ["dark", "light"];
const META_COLORS = { dark: "#070b1d", light: "#f7f8fc" };
let transitionTimer;

const readInitialTheme = () => {
    if (typeof document === "undefined") return "dark";
    const attr = document.documentElement.getAttribute("data-theme");
    return THEMES.includes(attr) ? attr : "dark";
};

const applyTheme = (theme) => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.style.colorScheme = theme;
    document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", META_COLORS[theme]);
};

export default function useTheme() {
    const [theme, setTheme] = useState(readInitialTheme);

    useEffect(() => {
        applyTheme(theme);
        try {
            localStorage.setItem(THEME_STORAGE_KEY, theme);
        } catch {
            /* storage unavailable (private mode etc.) — theme still applies for this visit */
        }
    }, [theme]);

    const toggleTheme = useCallback(() => {
        const root = document.documentElement;
        // Enable colour transitions only while switching, so normal hovers stay snappy
        root.classList.add("theme-transition");
        window.clearTimeout(transitionTimer);
        transitionTimer = window.setTimeout(() => root.classList.remove("theme-transition"), 400);
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    }, []);

    return { theme, toggleTheme, isDark: theme === "dark" };
}
