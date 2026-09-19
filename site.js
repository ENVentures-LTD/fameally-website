(() => {
    const page = new URL(window.location.href);
    const links = document.querySelectorAll(".nav-links a");
    for (const link of links) {
        const destination = new URL(link.href);
        if (
            destination.origin === page.origin &&
            destination.pathname === page.pathname &&
            !destination.hash
        ) {
            link.setAttribute("aria-current", "page");
        }
    }
})();
