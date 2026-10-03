// FAQ Accordion
(function(){
    const items = document.querySelectorAll('.faq-item');
    // allow multiple open, but add smooth behavior
    items.forEach(item => {
        const q = item.querySelector('.faq-q');
        if (!q) return;
        q.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            // For single-open behavior uncomment next 2 lines:
            // items.forEach(i => i.classList.remove('open'));
            // if (!isOpen) item.classList.add('open');
            // For multi-open:
            item.classList.toggle('open', !isOpen);
        });
    });

    // Category filtering for FAQ page
    const catBtns = document.querySelectorAll('[data-faq-category]');
    if (catBtns.length) {
        catBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                catBtns.forEach(b=>b.classList.remove('active'));
                btn.classList.add('active');
                const cat = btn.dataset.faqCategory;
                document.querySelectorAll('.faq-item').forEach(it => {
                    if (cat === 'all' || it.dataset.category === cat) it.style.display = '';
                    else it.style.display = 'none';
                });
            });
        });
    }
})();
