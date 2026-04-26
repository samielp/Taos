// ========== REVIEWS PAGE JS ==========

const sampleReviews = [
  { id:1, name:'Sophia Marceau', hotel:'Villa Caldera — Santorini', hotelKey:'villa-caldera', rating:5, title:'Absolutely transcendent', body:'The most extraordinary stay of my life. Every detail was perfect — from the infinity pool overlooking the caldera to the staff who remembered my coffee order on day two. This is what luxury truly means.', date:'March 2026', type:'Couple', color:'#c9a96e' },
  { id:2, name:'James Whitfield', hotel:"Maison d'Or — Paris", hotelKey:'maison-dor', rating:5, title:'Paris distilled into one address', body:"I've stayed in hundreds of hotels worldwide — none compare to the effortless elegance of Maison d'Or. The Michelin-starred breakfast alone is worth the journey. I'll return every year.", date:'February 2026', type:'Business', color:'#8b6914' },
  { id:3, name:'Amara Osei', hotel:'Puri Serenity — Bali', hotelKey:'puri-serenity', rating:5, title:'Pure magic in the jungle', body:'Puri Serenity gave me what no other hotel could: genuine stillness. The jungle setting, the sound of water, the warmth of the people — I came alone and left feeling whole. Already planning my return.', date:'January 2026', type:'Solo', color:'#5a7a3a' },
  { id:4, name:'Henrik Larsson', hotel:'Al Nakheel Palace — Dubai', hotelKey:'al-nakheel', rating:5, title:'Opulence beyond imagination', body:'Al Nakheel Palace defies every superlative. The underwater suite was an experience from another world. The rooftop pool at 280m was simply jaw-dropping. Worth every penny for a once-in-a-lifetime celebration.', date:'April 2026', type:'Couple', color:'#2a5a8a' },
  { id:5, name:'Charlotte Evans', hotel:'The Manhattan Grand — New York', hotelKey:'manhattan-grand', rating:5, title:'Art deco perfection', body:'The Manhattan Grand is New York at its most glamorous. Central Park views from our suite, the legendary jazz bar downstairs — we felt like we had stepped back into the golden age of travel.', date:'March 2026', type:'Couple', color:'#8a3a6a' },
  { id:6, name:'Kenji Nakamura', hotel:'Ryokan Kumo — Tokyo', hotelKey:'ryokan-kumo', rating:5, title:'The soul of Japan, perfectly captured', body:'As a Japanese person, I was skeptical that any hotel could authentically capture the ryokan tradition for modern travelers. Ryokan Kumo exceeded every expectation. The kaiseki dinner was a spiritual experience.', date:'February 2026', type:'Family', color:'#3a6a8a' },
  { id:7, name:'Isabella Romano', hotel:'Villa Caldera — Santorini', hotelKey:'villa-caldera', rating:4, title:'A sunset I will never forget', body:'The views are beyond anything I had imagined. The cave suite was romantic and beautifully designed. Service was exceptional throughout. Only minor note: the restaurant was slightly overpriced for what it offered, but the location more than compensates.', date:'January 2026', type:'Couple', color:'#9a6e3a' },
  { id:8, name:'Marcus Thompson', hotel:"Maison d'Or — Paris", hotelKey:'maison-dor', rating:5, title:'Our honeymoon was a dream', body:"We chose Maison d'Or for our honeymoon and cannot imagine a more perfect choice. The staff arranged a private rooftop dinner overlooking the Eiffel Tower on our anniversary night — completely unexpected and utterly magical.", date:'December 2025', type:'Couple', color:'#6a3a8a' },
];

let visibleCount = 4;
let currentHotelFilter = 'all';
let currentRatingFilter = 'all';

function renderReviews() {
  const grid = document.getElementById('reviewsGrid');
  if (!grid) return;

  const filtered = sampleReviews.filter(r => {
    const hotelMatch = currentHotelFilter === 'all' || r.hotelKey === currentHotelFilter;
    const ratingMatch = currentRatingFilter === 'all' || r.rating === parseInt(currentRatingFilter);
    return hotelMatch && ratingMatch;
  });

  const toShow = filtered.slice(0, visibleCount);
  grid.innerHTML = toShow.map(r => `
    <div class="review-card">
      <div class="review-header">
        <div class="reviewer-info">
          <div class="reviewer-avatar" style="background:${r.color}">${r.name.charAt(0)}</div>
          <div>
            <div class="reviewer-name">${r.name}</div>
            <div class="reviewer-meta">${r.date}</div>
          </div>
        </div>
        <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div>
      </div>
      <div class="review-hotel-tag">📍 ${r.hotel}</div>
      <div class="review-title">${r.title}</div>
      <p class="review-body">${r.body}</p>
      <span class="review-type">${r.type}</span>
    </div>
  `).join('');

  const loadBtn = document.getElementById('loadMoreBtn');
  if (loadBtn) loadBtn.style.display = filtered.length > visibleCount ? 'inline-block' : 'none';
}

function filterReviews() {
  currentHotelFilter = document.getElementById('reviewHotelFilter').value;
  currentRatingFilter = document.getElementById('reviewRatingFilter').value;
  visibleCount = 4;
  renderReviews();
}

function loadMoreReviews() {
  visibleCount += 4;
  renderReviews();
}

// Star rating
const stars = document.querySelectorAll('.star');
const ratingInput = document.getElementById('ratingInput');

stars.forEach(star => {
  star.addEventListener('mouseover', () => {
    const val = parseInt(star.dataset.val);
    stars.forEach((s, i) => s.classList.toggle('active', i < val));
  });
  star.addEventListener('click', () => {
    const val = parseInt(star.dataset.val);
    if (ratingInput) ratingInput.value = val;
    stars.forEach((s, i) => {
      s.classList.toggle('active', i < val);
      s.dataset.selected = i < val ? 'true' : 'false';
    });
  });
});
document.querySelector('.star-rating')?.addEventListener('mouseleave', () => {
  const selectedVal = ratingInput ? parseInt(ratingInput.value) : 0;
  stars.forEach((s, i) => s.classList.toggle('active', i < selectedVal));
});

// Submit review
function submitReview(e) {
  e.preventDefault();
  const form = e.target;
  const rating = ratingInput ? parseInt(ratingInput.value) : 0;
  if (!rating) { alert('Please select a star rating.'); return; }

  // Add to front of reviews list
  const newReview = {
    id: Date.now(),
    name: form.querySelector('[name=name]').value,
    hotel: form.querySelector('[name=hotel]').value,
    hotelKey: 'all',
    rating: rating,
    title: form.querySelector('[name=title]').value,
    body: form.querySelector('[name=body]').value,
    date: 'Just now',
    type: form.querySelector('[name=traveltype]:checked').value,
    color: ['#c9a96e','#8b6914','#5a7a3a','#3a6a8a','#8a3a6a'][Math.floor(Math.random()*5)]
  };
  sampleReviews.unshift(newReview);

  document.getElementById('reviewModal').classList.add('active');
  form.reset();
  stars.forEach(s => s.classList.remove('active'));
  if (ratingInput) ratingInput.value = 0;
  renderReviews();
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  renderReviews();

  // Check for hotel param
  const params = new URLSearchParams(window.location.search);
  const hotelParam = params.get('hotel');
  if (hotelParam) {
    const filter = document.getElementById('reviewHotelFilter');
    if (filter) { filter.value = hotelParam; filterReviews(); }
  }
});
