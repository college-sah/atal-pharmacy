// Gallery Filtering + Lightbox
(function(){
    const filterBtns = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.g-item');
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightboxImg');
    const lbCaption = document.getElementById('lightboxCaption');
    const lbClose = document.getElementById('lightboxClose');
    const lbPrev = document.getElementById('lightboxPrev');
    const lbNext = document.getElementById('lightboxNext');
    let currentIndex = 0;
    let visibleItems = [];

    function updateVisible() {
        visibleItems = Array.from(items).filter(it => it.style.display !== 'none');
    }

    // Filtering
    if (filterBtns.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b=>b.classList.remove('active'));
                btn.classList.add('active');
                const cat = btn.dataset.filter;
                items.forEach(it => {
                    if (cat === 'all' || it.dataset.category === cat) {
                        it.style.display = '';
                    } else {
                        it.style.display = 'none';
                    }
                });
                updateVisible();
            });
        });
    }
    updateVisible();

    // Lightbox open
    function openLightbox(index) {
        if (!lightbox || !lbImg) return;
        currentIndex = index;
        const item = visibleItems[currentIndex];
        if (!item) return;
        const img = item.querySelector('img');
        const cap = item.dataset.caption || img?.alt || '';
        lbImg.src = img?.dataset.full || img?.src || '';
        lbImg.alt = img?.alt || '';
        if (lbCaption) lbCaption.textContent = cap;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    }
    function navigate(dir) {
        if (!visibleItems.length) return;
        currentIndex = (currentIndex + dir + visibleItems.length) % visibleItems.length;
        const item = visibleItems[currentIndex];
        const img = item.querySelector('img');
        const cap = item.dataset.caption || img?.alt || '';
        if (lbImg) {
            lbImg.src = img?.dataset.full || img?.src || '';
            lbImg.alt = img?.alt || '';
        }
        if (lbCaption) lbCaption.textContent = cap;
    }

    // Click handlers
    items.forEach((it) => {
        it.addEventListener('click', () => {
            updateVisible();
            const idx = visibleItems.indexOf(it);
            if (idx >=0) openLightbox(idx);
        });
    });
    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    if (lbPrev) lbPrev.addEventListener('click', () => navigate(-1));
    if (lbNext) lbNext.addEventListener('click', () => navigate(1));
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }
    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('open')) return;
        if (e.key === 'ArrowLeft') navigate(-1);
        if (e.key === 'ArrowRight') navigate(1);
        if (e.key === 'Escape') closeLightbox();
    });
})();
