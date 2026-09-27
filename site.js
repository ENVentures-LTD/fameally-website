(() => {
    const nav = document.querySelector(".topbar");
    const toggle = nav?.querySelector(".menu-toggle");
    const links = nav?.querySelector(".nav-links");
    if (!toggle || !links) return;
    function closeMenu(returnFocus = false) {
        nav.removeAttribute("data-open");
        toggle.setAttribute("aria-expanded", "false");
        if (returnFocus) toggle.focus();
    }
    toggle.addEventListener("click", () => {
        const open = toggle.getAttribute("aria-expanded") !== "true";
        toggle.setAttribute("aria-expanded", String(open));
        nav.toggleAttribute("data-open", open);
    });
    nav.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true")
            closeMenu(true);
    });
    links.addEventListener("click", (event) => {
        if (event.target.closest("a")) closeMenu();
    });
    document.addEventListener("click", (event) => {
        if (!nav.contains(event.target)) closeMenu();
    });
    window.matchMedia("(min-width: 761px)").addEventListener("change", () => closeMenu());
    // Enhance only after handlers are ready: links remain visible without JS.
    nav.setAttribute("data-enhanced", "");
    toggle.hidden = false;
})();
