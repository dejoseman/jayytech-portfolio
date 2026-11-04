import React from "react";
import { Sun, Moon } from "lucide-react";

/**
 * Accessible Sun/Moon theme switch.
 * variant="icon"  → round icon button for the header
 * variant="row"   → full-width labelled row for the mobile drawer
 */
const ThemeToggle = ({ theme, onToggle, variant = "icon" }) => {
    const isDark = theme === "dark";
    const label = `Switch to ${isDark ? "light" : "dark"} mode`;

    if (variant === "row") {
        return (
            <button type="button" className="drawer-theme-row" onClick={onToggle} aria-label={label}>
                <span className="drawer-theme-row__label">
                    {isDark ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}
                    Appearance
                </span>
                <span className="drawer-theme-row__value">{isDark ? "Dark" : "Light"}</span>
            </button>
        );
    }

    return (
        <button
            type="button"
            className="theme-toggle"
            onClick={onToggle}
            aria-label={label}
            title={label}
            data-theme-state={theme}
        >
            <Sun size={18} className="theme-toggle__icon theme-toggle__sun" aria-hidden="true" />
            <Moon size={18} className="theme-toggle__icon theme-toggle__moon" aria-hidden="true" />
        </button>
    );
};

export default ThemeToggle;
