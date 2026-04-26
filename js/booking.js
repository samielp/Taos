// ========== BOOKING PAGE JS ==========

const hotelData = {
  'maison-dor':     { name: "Maison d'Or", location: 'Paris, France', img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400', prices: { deluxe: 1240, 'junior-suite': 1680, 'grand-suite': 2400, presidential: 4200 } },
  'villa-caldera':  { name: 'Villa Caldera', location: 'Santorini, Greece', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400', prices: { deluxe: 890, 'junior-suite': 1250, 'grand-suite': 1800, presidential: 3200 } },
  'puri-serenity':  { name: 'Puri Serenity', location: 'Bali, Indonesia', img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400', prices: { deluxe: 560, 'junior-suite': 780, 'grand-suite': 1100, presidential: 2000 } },
  'al-nakheel':     { name: 'Al Nakheel Palace', location: 'Dubai, UAE', img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400', prices: { deluxe: 2100, 'junior-suite': 3200, 'grand-suite': 4800, presidential: 9500 } },
  'manhattan-grand':{ name: 'The Manhattan Grand', location: 'New York, USA', img: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=400', prices: { deluxe: 780, 'junior-suite': 1100, 'grand-suite': 1600, presidential: 3000 } },
  'ryokan-kumo':    { name: 'Ryokan Kumo', location: 'Tokyo, Japan', img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400', prices: { deluxe: 950, 'junior-suite': 1350, 'grand-suite': 1900, presidential: 3600 } }
};

function updateRooms() {
  const hotelKey = document.getElementById('hotelSelect').value;
  if (!hotelKey || !hotelData[hotelKey]) return;
  const hotel = hotelData[hotelKey];

  // Update summary
  document.getElementById('summaryName').textContent = hotel.name;
  document.getElementById('summaryLocation').textContent = hotel.location;
  document.querySelector('.summary-img').style.backgroundImage = `url('${hotel.img}')`;

  // Update room prices
  const priceMap = { deluxe: hotel.prices.deluxe, 'junior-suite': hotel.prices['junior-suite'], 'grand-suite': hotel.prices['grand-suite'], presidential: hotel.prices.presidential };
  const roomCards = document.querySelectorAll('.room-card');
  const roomKeys = ['deluxe', 'junior-suite', 'grand-suite', 'presidential'];
  roomCards.forEach((card, i) => {
    const priceEl = card.querySelector('.room-price');
    if (priceEl && priceMap[roomKeys[i]]) {
      priceEl.textContent = `From $${priceMap[roomKeys[i]].toLocaleString()}/night`;
    }
  });

  calculateTotal();
}

function calculateTotal() {
  const hotelKey = document.getElementById('hotelSelect').value;
  const checkin = document.getElementById('checkin').value;
  const checkout = document.getElementById('checkout').value;
  const selectedRoom = document.querySelector('input[name=room]:checked');

  if (!hotelKey || !checkin || !checkout || !selectedRoom) return;

  const nights = Math.max(1, Math.ceil((new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24)));
  const hotel = hotelData[hotelKey];
  const pricePerNight = hotel.prices[selectedRoom.value] || 0;
  const subtotal = pricePerNight * nights;
  const tax = Math.round(subtotal * 0.12);
  const total = subtotal + tax;

  document.getElementById('summaryRoom').textContent = selectedRoom.value.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  document.getElementById('summaryCheckin').textContent = new Date(checkin).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  document.getElementById('summaryCheckout').textContent = new Date(checkout).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  document.getElementById('summaryNights').textContent = nights + (nights === 1 ? ' Night' : ' Nights');
  document.getElementById('summaryRate').textContent = '$' + subtotal.toLocaleString();
  document.getElementById('summaryTax').textContent = '$' + tax.toLocaleString();
  document.getElementById('summaryTotal').textContent = '$' + total.toLocaleString();
}

// Listen for room selection changes
document.querySelectorAll('input[name=room]').forEach(radio => {
  radio.addEventListener('change', calculateTotal);
});

function goToStep(step) {
  // Validation for step 1
  if (step === 2) {
    const hotel = document.getElementById('hotelSelect').value;
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const room = document.querySelector('input[name=room]:checked');
    if (!hotel) { alert('Please select a hotel.'); return; }
    if (!checkin || !checkout) { alert('Please select check-in and check-out dates.'); return; }
    if (new Date(checkout) <= new Date(checkin)) { alert('Check-out must be after check-in.'); return; }
    if (!room) { alert('Please select a room type.'); return; }
  }

  document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
  document.getElementById('step' + step).classList.add('active');

  // Update progress
  for (let i = 1; i <= 3; i++) {
    const prog = document.getElementById('prog' + i);
    if (i < step) { prog.classList.add('done'); prog.classList.remove('active'); prog.textContent = '✓'; }
    else if (i === step) { prog.classList.add('active'); prog.classList.remove('done'); prog.textContent = i; }
    else { prog.classList.remove('active', 'done'); prog.textContent = i; }
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleBooking(e) {
  e.preventDefault();
  const ref = 'AUR-2026-' + Math.floor(1000 + Math.random() * 9000);
  document.getElementById('bookingRef').textContent = ref;
  document.getElementById('successModal').classList.add('active');
}

function formatCard(input) {
  let val = input.value.replace(/\D/g, '').substring(0, 16);
  input.value = val.replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(input) {
  let val = input.value.replace(/\D/g, '').substring(0, 4);
  if (val.length >= 3) val = val.substring(0, 2) + ' / ' + val.substring(2);
  input.value = val;
}

// Pre-select hotel from URL
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const hotelParam = params.get('hotel');
  if (hotelParam) {
    const select = document.getElementById('hotelSelect');
    if (select) {
      select.value = hotelParam;
      updateRooms();
    }
  }
});
