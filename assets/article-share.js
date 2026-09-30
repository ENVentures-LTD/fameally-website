(() => {
    const controls = document.querySelector('[data-share-controls]');
    if (!controls) return;
    const canonical = document.querySelector('link[rel="canonical"]')?.href;
    const title = document.querySelector('h1')?.textContent.trim();
    const button = controls.querySelector('[data-article-share]');
    const status = controls.querySelector('[data-share-status]');
    const fallback = controls.querySelector('[data-share-fallback]');
    const input = fallback.querySelector('input');
    if (!canonical || !title) return;
    input.value = canonical;

    // Match Fameally's NativeShareIcon: iOS uses ArrowUpOnSquare, others Share.
    const appleMobile = /iPhone|iPad|iPod/.test(navigator.userAgent ?? '') ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    controls.querySelector('[data-share-icon="ios"]').hidden = !appleMobile;
    controls.querySelector('[data-share-icon="generic"]').hidden = appleMobile;

    function showFallback() {
        fallback.hidden = false;
        input.focus();
        input.select();
        status.textContent = 'Select and copy the article link below.';
    }

    async function copyLink() {
        try {
            if (!navigator.clipboard?.writeText) { showFallback(); return; }
            await navigator.clipboard.writeText(canonical);
            fallback.hidden = true;
            status.textContent = 'Article link copied.';
        } catch {
            showFallback();
        }
    }

    button.addEventListener('click', async () => {
        button.disabled = true;
        status.textContent = '';
        try {
            const payload = { title, url: canonical };
            let canShare = typeof navigator.share === 'function';
            if (canShare && typeof navigator.canShare === 'function') {
                try { canShare = navigator.canShare(payload); }
                catch { canShare = false; }
            }
            if (canShare) {
                try {
                    await navigator.share(payload);
                    fallback.hidden = true;
                    return;
                } catch (error) {
                    if (error?.name === 'AbortError') return;
                }
            }
            await copyLink();
        } finally {
            button.disabled = false;
        }
    });
    fallback.hidden = true;
    button.hidden = false;
})();
