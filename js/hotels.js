// ========== HOTELS PAGE JS ==========

const filterBtns = document.querySelectorAll('.filter-btn');
const hotelCards = document.querySelectorAll('.hotel-card-full');
const sortSelect = document.getElementById('sortSelect');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    hotelCards.forEach(card => {
      const region = card.dataset.region;
      card.style.display = (filter === 'all' || region === filter) ? 'grid' : 'none';
    });
  });
});

if (sortSelect) {
  sortSelect.addEventListener('change', () => {
    const grid = document.getElementById('hotelsGrid');
    const cards = [...grid.querySelectorAll('.hotel-card-full')];
    cards.sort((a, b) => {
      const val = sortSelect.value;
      if (val === 'price-low') return parseInt(a.dataset.price) - parseInt(b.dataset.price);
      if (val === 'price-high') return parseInt(b.dataset.price) - parseInt(a.dataset.price);
      if (val === 'rating') return parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating);
      return 0;
    });
    cards.forEach(c => grid.appendChild(c));
  });
}

// Pre-select hotel from URL param
const params = new URLSearchParams(window.location.search);
const hotelParam = params.get('hotel');
