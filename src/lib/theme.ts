/**
 * Storage-free theme helpers.
 *
 * This build intentionally uses NO Web Storage APIs. On a fresh load the theme
 * defaults from the OS color-scheme preference. The toggle updates the `<html>`
 * `.dark` class, which is the single source of truth and persists in-memory
 * across client-side navigation within a session. Persistence across a hard
 * reload is deliberately not implemented.
 */

export type Theme = "light" | "dark";

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
