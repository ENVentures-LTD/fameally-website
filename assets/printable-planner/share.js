(() => {
    const controls = document.querySelector('[data-share-controls]');
    if (!controls) return;
    const canonical = document.querySelector('link[rel="canonical"]').href;
    const title = document.querySelector('h1').textContent;
    const nativeButton = controls.querySelector('[data-native-share]');
    const copyButton = controls.querySelector('[data-copy-link]');
    const status = document.querySelector('[data-share-status]');
    const fallback = document.querySelector('[data-share-fallback]');
    const input = fallback.querySelector('input');
    input.value = canonical;
    controls.hidden = false;
    fallback.hidden = true;

    function showFallback() {
        fallback.hidden = false;
        input.focus();
        input.select();
        status.textContent = 'Select and copy the article link below.';
    }

    copyButton.addEventListener('click', async () => {
        try {
            if (!navigator.clipboard?.writeText) { showFallback(); return; }
            await navigator.clipboard.writeText(canonical);
            status.textContent = 'Article link copied.';
            fallback.hidden = true;
        } catch {
            showFallback();
        }
    });

    if (typeof navigator.share === 'function') {
        nativeButton.hidden = false;
        nativeButton.addEventListener('click', async () => {
            status.textContent = '';
            try {
                await navigator.share({ title, url: canonical });
            } catch (error) {
                if (error.name !== 'AbortError') showFallback();
            }
        });
    }
})();
