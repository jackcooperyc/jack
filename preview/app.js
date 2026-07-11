/*
  Proxy-safe preview behavior.
  - Theme toggle is IN-MEMORY ONLY. No Web Storage or device-capture browser
    APIs are used anywhere (see the validator's forbidden list).
  - Initial theme derives from the OS prefers-color-scheme (guarded).
  - Case-study expanders and active-nav highlighting are pure DOM.
*/
(function () {
  "use strict";

  var root = document.documentElement;

  // ---- theme: derive initial from OS preference (guarded), in-memory only ----
  try {
    if (window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches) {
      root.classList.add("dark");
    }
  } catch (_err) { /* prefers-color-scheme unavailable; keep light default */ }

  function wireThemeToggle() {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    function syncLabel() {
      var dark = root.classList.contains("dark");
      btn.setAttribute(
        "aria-label",
        dark ? "Switch to light mode" : "Switch to dark mode"
      );
      btn.setAttribute("aria-pressed", dark ? "true" : "false");
    }
    syncLabel();
    btn.addEventListener("click", function () {
      // The <html>.dark class is the single source of truth; toggling it is
      // the entire persistence model for this session (in-memory).
      root.classList.toggle("dark");
      syncLabel();
    });
  }

  // ---- case-study expanders ----
  function wireExpanders() {
    var buttons = document.querySelectorAll("[data-expand]");
    Array.prototype.forEach.call(buttons, function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-expand");
        var panel = document.getElementById(id);
        if (!panel) return;
        var open = panel.classList.toggle("open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        btn.textContent = open ? "Hide case study \u2191" : "Read the case study \u2192";
      });
    });
  }

  // ---- active nav highlight based on visible section ----
  function wireScrollSpy() {
    var links = document.querySelectorAll(".nav a.navlink[data-spy]");
    if (!links.length || !("IntersectionObserver" in window)) return;
    var map = {};
    Array.prototype.forEach.call(links, function (l) {
      map[l.getAttribute("href").slice(1)] = l;
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var link = map[en.target.id];
        if (!link) return;
        if (en.isIntersecting) {
          Array.prototype.forEach.call(links, function (l) {
            l.style.color = "";
            l.style.fontWeight = "";
          });
          link.style.color = "var(--text)";
          link.style.fontWeight = "500";
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    Object.keys(map).forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) io.observe(sec);
    });
  }

  function init() {
    wireThemeToggle();
    wireExpanders();
    wireScrollSpy();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
