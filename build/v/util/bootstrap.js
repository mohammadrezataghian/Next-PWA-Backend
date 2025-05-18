/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
// eslint-disable-next-line no-unused-expressions
() => {
  return {
    autoTheme: () => {
      const getStoredTheme = () => localStorage.getItem("theme");
      const setStoredTheme = (theme) => localStorage.setItem("theme", theme);
      const getPreferredTheme = () => {
        const storedTheme = getStoredTheme();
        if (storedTheme) {
          return storedTheme;
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      };
      const setTheme = (theme) => {
        if (theme === "auto") {
          document.documentElement.setAttribute(
            "data-bs-theme",
            window.matchMedia("(prefers-color-scheme: dark)").matches
              ? "dark"
              : "light"
          );
        } else {
          document.documentElement.setAttribute("data-bs-theme", theme);
        }
      };
      setTheme(getPreferredTheme());
      const showActiveTheme = (theme, focus = false) => {
        const themeSwitcher = document.querySelector("#bd-theme");
        if (!themeSwitcher) {
          return;
        }
        const themeSwitcherText = document.querySelector("#bd-theme-text");
        const activeThemeIcon = document.querySelector(
          ".theme-icon-active use"
        );
        const btnToActive = document.querySelector(
          `[data-bs-theme-value="${theme}"]`
        );
        const svgOfActiveBtn = btnToActive
          .querySelector("svg use")
          .getAttribute("href");
        document
          .querySelectorAll("[data-bs-theme-value]")
          .forEach((element) => {
            element.classList.remove("active");
            element.setAttribute("aria-pressed", "false");
          });
        btnToActive.classList.add("active");
        btnToActive.setAttribute("aria-pressed", "true");
        activeThemeIcon.setAttribute("href", svgOfActiveBtn);
        const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`;
        themeSwitcher.setAttribute("aria-label", themeSwitcherLabel);
        if (focus) {
          themeSwitcher.focus();
        }
      };
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", () => {
          const storedTheme = getStoredTheme();
          if (storedTheme !== "light" && storedTheme !== "dark") {
            setTheme(getPreferredTheme());
          }
        });
      window.addEventListener("DOMContentLoaded", () => {
        showActiveTheme(getPreferredTheme());
        document.querySelectorAll("[data-bs-theme-value]").forEach((toggle) => {
          toggle.addEventListener("click", () => {
            const theme = toggle.getAttribute("data-bs-theme-value");
            setStoredTheme(theme);
            setTheme(theme);
            showActiveTheme(theme, true);
          });
        });
      });
    },
    load: (options = { rtl: true, theme: "auto", target }) =>
      new Promise((resolve) => {
        if (typeof options === "string") options = { theme: options };
        if (options.theme === "auto") v.util.bootstrap.autoTheme();
        else if (options.theme && options.theme !== "none")
          document.documentElement.setAttribute("data-bs-theme", options.theme);
        (options.target || document.head).append(
          options.rtl
            ? v.link({
                rel: "stylesheet",
                href: "/v/assets/bootstrap/bootstrap.rtl.min.css",
              })
            : v.link({
                rel: "stylesheet",
                href: "/v/assets/bootstrap/bootstrap.min.css",
              })
        );
        v.dom.loadScripts(
          ["/v/assets/bootstrap/bootstrap.bundle.min.js"],
          () => {
            (options.target || document.head).append(
              v.link({
                rel: "stylesheet",
                href: "/v/assets/bootstrap/bootstrap-icons.min.css",
              }),
              v.script({
                src: "/v/assets/bootstrap/masonry.pkgd.min.js",
              })
            );
            [...(options.target || document).querySelectorAll('[data-bs-toggle="tooltip"]')].map(
              (el) => {
                el.BS_Tooltip ||= new bootstrap.Tooltip(el, {
                  trigger: "hover",
                });
              }
            );
            [...(options.target || document).querySelectorAll(".collapse")].map((el) => {
              el.BS_Collapse ||= new bootstrap.Collapse(el, {
                toggle: false,
              });
            });
            resolve();
          },
          options.target
        );
      }),
  };
};
