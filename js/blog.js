// Blog Search & Filter
(function(){
    const searchInput = document.getElementById('blogSearch');
    const cards = document.querySelectorAll('[data-blog-card]');
    const catButtons = document.querySelectorAll('[data-blog-cat]');
    let activeCat = 'all';

    function filter() {
        const q = (searchInput?.value || '').toLowerCase().trim();
        cards.forEach(card => {
            const title = (card.dataset.title || '').toLowerCase();
            const desc = (card.dataset.desc || '').toLowerCase();
            const cat = card.dataset.category || '';
            const matchesSearch = !q || title.includes(q) || desc.includes(q);
            const matchesCat = activeCat === 'all' || cat === activeCat;
            card.style.display = (matchesSearch && matchesCat) ? '' : 'none';
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', filter);
    }
    catButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            catButtons.forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
            activeCat = btn.dataset.blogCat || 'all';
            filter();
        });
    });
})();
