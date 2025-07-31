export type Theme = "light" | "dark" | "system";

export function getTheme(): Theme {
  if (typeof window !== "undefined") {
    return (localStorage.getItem("theme") as Theme) ?? "system";
  }
  return "system";
}

export function setTheme(theme: Theme) {
  if (typeof window !== "undefined") {
    localStorage.setItem("theme", theme);
    applyTheme(theme);
  }
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;

  if (theme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    root.classList.remove("light", "dark");
    root.classList.add(systemTheme);
  } else {
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }
}
