/**
 * Storage-safe theme helpers.
 *
 * Preview sandboxes (e.g. deploy_website) may run the page in an environment
 * where `localStorage` throws on access (SecurityError) or is undefined. Every
 * access here is guarded, and an in-memory fallback keeps the toggle working
 * for the session even when persistence is impossible. Nothing here can throw.
 */

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

// Session-only fallback used when Web Storage is unavailable or blocked.
let memoryTheme: Theme | null = null;

function safeLocalStorage(): Storage | null {
  try {
    if (typeof window === "undefined") return null;
    const ls = window.localStorage;
    // Touch it — some sandboxes expose the object but throw on read/write.
    const probe = "__theme_probe__";
    ls.setItem(probe, "1");
    ls.removeItem(probe);
    return ls;
  } catch {
    return null;
  }
}

/** Read the persisted theme, falling back to the in-memory value. */
export function readStoredTheme(): Theme | null {
  const ls = safeLocalStorage();
  if (ls) {
    try {
      const v = ls.getItem(STORAGE_KEY);
      if (v === "light" || v === "dark") return v;
    } catch {
      /* fall through to memory */
    }
  }
  return memoryTheme;
}

/** Persist the theme; silently degrades to in-memory when storage is blocked. */
export function writeStoredTheme(theme: Theme): void {
  memoryTheme = theme;
  const ls = safeLocalStorage();
  if (ls) {
    try {
      ls.setItem(STORAGE_KEY, theme);
    } catch {
      /* keep the in-memory value; nothing else to do */
    }
  }
}

/** True when the OS prefers dark mode; safe if matchMedia is missing. */
export function prefersDark(): boolean {
  try {
    return (
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  } catch {
    return false;
  }
}
