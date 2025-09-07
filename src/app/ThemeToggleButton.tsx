"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggleButton() {
    const { setTheme, resolvedTheme } = useTheme(); // <- use resolvedTheme
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null; // avoid hydration mismatch

    const theme = (resolvedTheme ?? "light") as "light" | "dark";
    const isDark = theme === "dark";
    const next = isDark ? "light" : "dark";
    console.log("isDark", isDark);

    return (
        <button
            onClick={() => setTheme(next)}
            aria-label="Toggle theme"
            aria-pressed={isDark}
            title={`Switch to ${next} mode`}
        >
            {isDark ? (
                // Moon icon
                <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-5 w-5"
                >
                    <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            ) : (
                // Sun icon (React needs camelCase SVG attrs)
                <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-5 w-5"
                >
                    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )}
        </button>
    );
}
