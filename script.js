'use strict';

/* DIGITAL SUITCASE — practical, local-first travel packing planner. */
const app = document.getElementById('app');
const journeyProgress = document.getElementById('journey-progress');
const progressLabel = document.getElementById('progress-label');
const progressDots = document.getElementById('progress-dots');
const toastRegion = document.getElementById('toast-region');

const CATEGORIES = [
  { id: 'all', label: 'All items' },
  { id: 'clothing', label: 'Clothing' },
  { id: 'essentials', label: 'Essentials & documents' },
  { id: 'electronics', label: 'Electronics' },
  { id: 'comfort', label: 'Personal & comfort' }
];

const ITEMS = [
  { id: 'tshirt', name: 'T-shirt', category: 'clothing', weight: 0.20, emoji: '👕', description: 'Everyday top.', usefulFor: ['beach','mountain','hill','city','foreign'] },
  { id: 'jeans', name: 'Jeans / trousers', category: 'clothing', weight: 0.60, emoji: '👖', description: 'Versatile everyday bottoms.', usefulFor: ['mountain','hill','city','foreign'] },
  { id: 'shorts', name: 'Shorts', category: 'clothing', weight: 0.30, emoji: '🩳', description: 'Useful for warm days.', usefulFor: ['beach','city','foreign'] },
  { id: 'hoodie', name: 'Hoodie / warm layer', category: 'clothing', weight: 0.55, emoji: '🧥', description: 'A warm extra layer.', usefulFor: ['mountain','hill','foreign'] },
  { id: 'jacket', name: 'Light jacket', category: 'clothing', weight: 0.70, emoji: '🥼', description: 'For cool evenings and changing weather.', usefulFor: ['mountain','hill','city','foreign'] },
  { id: 'socks', name: 'Pair of socks', category: 'clothing', weight: 0.10, emoji: '🧦', description: 'Pack enough pairs for your stay.', usefulFor: ['mountain','hill','city','foreign'] },
  { id: 'underwear', name: 'Underwear', category: 'clothing', weight: 0.08, emoji: '🩲', description: 'Daily clothing essential.', usefulFor: ['beach','mountain','hill','city','foreign'] },
  { id: 'walking-shoes', name: 'Comfortable walking shoes', category: 'clothing', weight: 0.75, emoji: '👟', description: 'For airports, sightseeing and walking.', usefulFor: ['mountain','hill','city','foreign'] },
  { id: 'sandals', name: 'Sandals / flip-flops', category: 'clothing', weight: 0.30, emoji: '🩴', description: 'Useful for beaches and casual wear.', usefulFor: ['beach','city','foreign'] },
  { id: 'raincoat', name: 'Raincoat', category: 'clothing', weight: 0.35, emoji: '🌧️', description: 'Light rain protection.', usefulFor: ['mountain','hill','city','foreign'] },
  { id: 'scarf', name: 'Scarf', category: 'clothing', weight: 0.15, emoji: '🧣', description: 'A small layer for cool or windy weather.', usefulFor: ['mountain','hill','foreign'] },
  { id: 'swimwear', name: 'Swimwear', category: 'clothing', weight: 0.25, emoji: '🩱', description: 'For swimming and beach activities.', usefulFor: ['beach','foreign'] },
  { id: 'toothbrush', name: 'Toothbrush', category: 'essentials', weight: 0.05, emoji: '🪥', description: 'Daily hygiene essential.', usefulFor: ['beach','mountain','hill','city','foreign'] },
  { id: 'toiletries', name: 'Toiletry kit', category: 'essentials', weight: 0.35, emoji: '🧴', description: 'Personal hygiene items.', usefulFor: ['beach','mountain','hill','city','foreign'] },
  { id: 'first-aid', name: 'Small first-aid kit', category: 'essentials', weight: 0.25, emoji: '🩹', description: 'Basic supplies for minor issues.', usefulFor: ['beach','mountain','hill','city','foreign'] },
  { id: 'water-bottle', name: 'Reusable water bottle', category: 'essentials', weight: 0.30, emoji: '🚰', description: 'Carry water where permitted.', usefulFor: ['beach','mountain','hill','city','foreign'] },
  { id: 'documents', name: 'ID / travel documents pouch', category: 'essentials', weight: 0.10, emoji: '🪪', description: 'Keep important documents together.', usefulFor: ['beach','mountain','hill','city','foreign'] },
  { id: 'passport', name: 'Passport', category: 'essentials', weight: 0.08, emoji: '🛂', description: 'Check validity and entry requirements for international travel.', usefulFor: ['foreign'] },
  { id: 'visa', name: 'Visa / entry documents', category: 'essentials', weight: 0.05, emoji: '📄', description: 'Only if required for your destination.', usefulFor: ['foreign'] },
  { id: 'tickets', name: 'Flight / train tickets', category: 'essentials', weight: 0.02, emoji: '🎫', description: 'Keep digital and/or printed booking details accessible.', usefulFor: ['foreign'] },
  { id: 'insurance', name: 'Travel insurance details', category: 'essentials', weight: 0.02, emoji: '🛡️', description: 'Check whether cover is suitable for your trip.', usefulFor: ['foreign'] },
  { id: 'currency', name: 'Local currency / payment cards', category: 'essentials', weight: 0.05, emoji: '💳', description: 'Check payment options and notify your bank if needed.', usefulFor: ['foreign','city'] },
  { id: 'adapter', name: 'Travel plug adapter', category: 'electronics', weight: 0.12, emoji: '🔌', description: 'Check plug type and voltage at your destination.', usefulFor: ['foreign'] },
  { id: 'charger', name: 'Phone charger', category: 'electronics', weight: 0.20, emoji: '🔌', description: 'For your phone and other compatible devices.', usefulFor: ['beach','mountain','hill','city','foreign'] },
  { id: 'powerbank', name: 'Power bank', category: 'electronics', weight: 0.25, emoji: '🔋', description: 'Check airline rules and carry-on requirements.', usefulFor: ['mountain','hill','city','foreign'] },
  { id: 'headphones', name: 'Headphones', category: 'electronics', weight: 0.20, emoji: '🎧', description: 'For travel and downtime.', usefulFor: ['beach','mountain','hill','city','foreign'] },
  { id: 'camera', name: 'Camera', category: 'electronics', weight: 0.70, emoji: '📷', description: 'Optional photo gear.', usefulFor: ['beach','mountain','hill','foreign'] },
  { id: 'sunscreen', name: 'Sunscreen', category: 'essentials', weight: 0.15, emoji: '☀️', description: 'Useful for outdoor activities.', usefulFor: ['beach','mountain','hill','city','foreign'] },
  { id: 'sunglasses', name: 'Sunglasses', category: 'essentials', weight: 0.08, emoji: '🕶️', description: 'Sun and glare protection.', usefulFor: ['beach','mountain','city','foreign'] },
  { id: 'umbrella', name: 'Compact umbrella', category: 'comfort', weight: 0.35, emoji: '☂️', description: 'A compact option for showers.', usefulFor: ['city','hill','foreign'] },
  { id: 'medication', name: 'Personal medication', category: 'essentials', weight: 0.10, emoji: '💊', description: 'Bring what you need and check rules for your destination.', usefulFor: ['beach','mountain','hill','city','foreign'] },
  { id: 'book', name: 'Book / e-reader', category: 'comfort', weight: 0.30, emoji: '📚', description: 'For quiet time and transit.', usefulFor: ['beach','mountain','hill','city','foreign'] },
  { id: 'snacks', name: 'Travel snacks', category: 'comfort', weight: 0.25, emoji: '🍎', description: 'Check food import restrictions for international trips.', usefulFor: ['mountain','hill','city','foreign'] },
  { id: 'laundry-bag', name: 'Laundry bag', category: 'comfort', weight: 0.08, emoji: '🧺', description: 'Keep worn clothes separate.', usefulFor: ['beach','mountain','hill','city','foreign'] }
];

const state = {
  screen: 'home', destinations: [], climate: null, days: '', capacity: '',
  packed: [], category: 'all', customItemCount: 0, reminderDate: '', organizerZones: {}, organizerPlaced: {}
};

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function notify(message, type = 'success') {
  const node = document.createElement('div');
  node.className = `toast toast-${type}`;
  node.textContent = message;
  toastRegion.appendChild(node);
  window.setTimeout(() => node.remove(), 2800);
}
function setScreen(screen) {
  state.screen = screen;
  updateProgress();
  render();
  app.focus({preventScroll:true});
  window.scrollTo({top:0, behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
}
function updateProgress() {
  const steps = [{id:'scenarios',label:'TRIP DETAILS'},{id:'briefing',label:'TRIP SUMMARY'},{id:'packing',label:'PACKING LIST'},{id:'review',label:'PACKING SCORE'},{id:'organizer',label:'SUITCASE ORGANIZER'}];
  if (state.screen === 'home') { journeyProgress.hidden = true; return; }
  journeyProgress.hidden = false;
  const index = Math.max(0, steps.findIndex(s => s.id === state.screen));
  progressLabel.textContent = steps[index].label;
  progressDots.innerHTML = steps.map((s,i) => `<span class="progress-dot ${i<index?'done':i===index?'active':''}" aria-label="${s.label}"></span>`).join('');
}
function render() {
  const pages = {home:renderHome, scenarios:renderSetup, briefing:renderBriefing, packing:renderPacking, review:renderReview, organizer:renderOrganizer};
  app.innerHTML = (pages[state.screen] || renderHome)();
}
function renderHome() {
  return `<section class="screen home-screen"><div class="hero-grid"><div class="hero-copy">
    <div class="eyebrow">YOUR TRIP STARTS HERE · TRAVEL PLANNER</div><h1 class="display-title">DIGITAL<br><span class="highlight">SUITCASE.</span></h1>
    <p class="lead">A practical packing planner to build your list, estimate your bag weight, and remember the essentials before you leave.</p>
    <div class="hero-actions"><button class="button button-primary" data-action="start">BUILD MY PACKING LIST <span class="button-arrow">↗</span></button></div>
    <div class="hero-aside-note"><span class="note-stamp">✦</span> Pack smart. Panic less. Travel ready.</div>
    </div><div class="hero-art" role="img" aria-label="Illustration of a suitcase surrounded by travel essentials"><div class="art-grid"></div><div class="float-item one">🎧</div><div class="float-item two">☂️</div><div class="float-item three">🧦</div><div class="float-item four">🔋</div><div class="weight-sticker"><span>YOUR BAG</span><strong>YOUR LIMIT</strong><small>YOU DECIDE ↗</small></div><div class="hero-suitcase"><div class="suitcase-rib left"></div><div class="suitcase-rib right"></div><div class="suitcase-sticker">✈️</div><div class="suitcase-label">DIGITAL SUITCASE</div><div class="suitcase-face">✓</div></div><div class="art-caption">ONE LIST · YOUR REAL TRIP</div></div></div>
    <div class="feature-strip"><div class="feature"><div class="feature-icon">🧭</div><div><strong>1. Set up your trip</strong><small>Choose destination, climate, trip days and your own weight limit.</small></div></div><div class="feature"><div class="feature-icon">➕</div><div><strong>2. Build your list</strong><small>Adjust quantities and add your own items with their weights.</small></div></div><div class="feature"><div class="feature-icon">⚖️</div><div><strong>3. Score & organize</strong><small>Review missing essentials, then get a suggested place for every item.</small></div></div></div>
    <section class="card instructions-panel"><div class="panel-kicker">HOW TO USE THIS SYSTEM</div><h2>From trip details to a ready-to-use checklist.</h2><p>Enter the number of days and the luggage capacity you want to plan for. Select your destination and climate so the list can recommend relevant items. Use <strong>+</strong> and <strong>−</strong> to set quantities; each item contributes its listed weight to the live total. Add anything missing using the custom-item form, then review your packing readiness score and suggestions for items you may have missed. Weights are estimates—check your airline's baggage allowance separately.</p></section>
  </section>`;
}
function renderSetup() {
  const destinations = [
    {id:'beach',title:'Beach trip',emoji:'🏖️',desc:'Sun, sand and water activities.'},
    {id:'mountain',title:'Mountain trip',emoji:'🏔️',desc:'Trails, altitude and changing weather.'},
    {id:'hill',title:'Hill station',emoji:'🌄',desc:'Cool evenings and scenic walks.'},
    {id:'city',title:'City trip',emoji:'🏙️',desc:'Sightseeing, transport and long walks.'},
    {id:'foreign',title:'Foreign / international trip',emoji:'🌍',desc:'Passport, entry documents and travel essentials.'}
  ];
  const climates = [
    {id:'windy',title:'Windy',emoji:'💨',desc:'Consider a wind-resistant layer.'},
    {id:'summer',title:'Summer',emoji:'☀️',desc:'Light clothing and sun protection.'},
    {id:'winter',title:'Winter',emoji:'❄️',desc:'Warm layers for cold weather.'},
    {id:'rainy',title:'Rainy',emoji:'🌧️',desc:'Rain protection and dry storage.'}
  ];
  return `<section class="screen scenario-screen setup-screen"><div class="eyebrow">STEP 01 · TRIP DETAILS</div><div class="section-heading"><div><h2>Tell us about your trip.</h2><p>Your days and luggage capacity are entered by you—not preselected.</p></div><span class="step-label">YOUR TRIP</span></div>
    <div class="setup-block"><h3>01 / Choose one or more destinations</h3><p class="muted">Click multiple destination cards to select them; click a selected card again to remove it. The packing list combines recommendations from every selected destination.</p><div class="choice-grid destination-grid">${destinations.map(d=>`<button class="choice-card ${isDestination(d.id)?'selected':''}" data-action="destination" data-value="${d.id}" aria-pressed="${isDestination(d.id)}"><span class="choice-emoji">${d.emoji}</span><strong>${d.title}</strong><small>${d.desc}</small></button>`).join('')}</div></div>
    <div class="setup-block"><h3>02 / Choose the climate</h3><div class="choice-grid climate-grid">${climates.map(c=>`<button class="choice-card climate-card ${state.climate===c.id?'selected':''}" data-action="climate" data-value="${c.id}" aria-pressed="${state.climate===c.id}"><span class="choice-emoji">${c.emoji}</span><strong>${c.title}</strong><small>${c.desc}</small></button>`).join('')}</div></div>
    <div class="setup-block input-setup-grid"><div class="field-card"><label for="trip-days">03 / How many days?</label><p class="muted">Enter the total duration of your trip.</p><div class="numeric-input-wrap"><input id="trip-days" type="number" min="1" max="365" step="1" inputmode="numeric" placeholder="Enter number of days" value="${escapeHtml(state.days)}"><span>days</span></div></div><div class="field-card"><label for="trip-capacity">04 / Luggage weight limit</label><p class="muted">Enter the maximum weight you want to plan for.</p><div class="numeric-input-wrap"><input id="trip-capacity" type="number" min="0.1" max="100" step="0.1" inputmode="decimal" placeholder="Enter weight limit" value="${escapeHtml(state.capacity)}"><span>kg</span></div><small class="field-note">This is your planning limit. Airline limits vary by ticket and route.</small></div></div>
    <div class="setup-summary"><span>TRIP SUMMARY</span><strong>${state.destinations.length?state.destinations.map(id=>{const d=destinations.find(x=>x.id===id);return d?d.emoji+' '+d.title:''}).filter(Boolean).join(' + '):'Choose one or more destinations'} · ${state.climate?climates.find(c=>c.id===state.climate).title:'Choose climate'} · ${state.days?escapeHtml(state.days)+' days':'Days not entered'} · ${state.capacity?escapeHtml(state.capacity)+' kg':'Weight limit not entered'}</strong><p>Your packing list combines recommendations from every selected destination. Selecting an international trip also adds passport and entry-document reminders.</p></div>
    <div class="scenario-bottom"><span class="selection-tip">You can return and edit these details later.</span><div class="button-row"><button class="button button-ghost" data-action="home">← BACK</button><button class="button button-primary" data-action="continue-setup">BUILD MY LIST <span class="button-arrow">→</span></button></div></div></section>`;
}
function readTripInputs() {
  const days = document.getElementById('trip-days');
  const capacity = document.getElementById('trip-capacity');
  if (days) state.days = days.value.trim();
  if (capacity) state.capacity = capacity.value.trim();
}
function renderBriefing() {
  return `<section class="screen"><div class="eyebrow">STEP 02 · TRIP SUMMARY</div><div class="section-heading"><div><h2>Your packing plan.</h2><p>Review all selected destinations and your trip details before building the combined list.</p></div><span class="step-label">TRIP SUMMARY</span></div><div class="briefing-layout"><article class="card briefing-main"><h3 class="briefing-section-title">Your trip parameters</h3><div class="briefing-stats"><div class="brief-stat"><small>DESTINATION</small><strong>${escapeHtml(labelForDestination(state.destinations))}</strong></div><div class="brief-stat"><small>CLIMATE</small><strong>${escapeHtml(capitalize(state.climate))}</strong></div><div class="brief-stat"><small>DURATION</small><strong>${state.days} ${Number(state.days)===1?'day':'days'}</strong></div><div class="brief-stat"><small>PLANNING WEIGHT LIMIT</small><strong>${Number(state.capacity).toFixed(2)} kg</strong></div></div><h3 class="briefing-section-title">A few practical reminders</h3><div class="requirements-list"><div class="requirement-row"><span class="requirement-bullet">✓</span><div><strong>Check your actual baggage allowance</strong><div class="muted">The limit you entered is for planning; it may differ from airline rules.</div></div></div><div class="requirement-row"><span class="requirement-bullet">✓</span><div><strong>Review destination requirements</strong><div class="muted">For international travel, confirm passport validity, visa/entry rules, insurance and plug type.</div></div></div><div class="requirement-row"><span class="requirement-bullet">✓</span><div><strong>Pack for the length of your stay</strong><div class="muted">The list combines relevant items from all selected destinations; you choose final quantities.</div></div></div></div><div class="briefing-actions"><button class="button button-ghost" data-action="edit-trip">← EDIT DETAILS</button><button class="button button-primary" data-action="open-packing">OPEN PACKING LIST <span class="button-arrow">→</span></button></div></article><aside class="card briefing-visual"><div class="briefing-caption">YOUR TRIP</div><div class="big-weather">${state.destinations.map(destinationEmoji).join(' ')}</div><div><div class="briefing-caption">PACKING APPROACH</div><h3>Practical, not perfect.</h3><p>Start with essentials, set quantities, and keep an eye on the live weight total.</p></div></aside></div></section>`;
}
function isDestination(id) { return state.destinations.includes(id); }
// A practical warning list for international trips. Rules vary by country, airline,
// and whether an item is in carry-on or checked baggage, so flagged items need review.
function restrictedItemReason(item) {
  if (!isDestination('foreign') || !item) return '';
  const name = `${item.name || ''} ${item.description || ''}`.toLowerCase();
  const rules = [
    [/\b(knives?|knife|blades?|daggers?)\b/, 'Knives and blades may be prohibited or restricted.'],
    [/\b(screwdrivers?|tools?)\b/, 'Tools such as screwdrivers may be restricted in carry-on baggage.'],
    [/\b(gunpowder|gun powder|firearms?|guns?|ammunition|ammo|explosives?)\b/, 'Firearms, ammunition and explosive materials are heavily restricted.'],
    [/\b(weapons?|swords?|tasers?)\b/, 'Weapons may be prohibited or require authorization.'],
    [/\b(drugs?|narcotics?|cocaine|heroin|cannabis|marijuana|weed)\b/, 'Drugs and controlled substances may be prohibited or require documentation.'],
    [/\b(gold|bullion|gold bars?)\b/, 'Gold and precious metals may require customs declarations or documentation.'],
    [/\b(liquid|liquids|perfume|shampoo|lotion|gel|aerosol|alcohol|beverage|water bottle)\b/, 'Liquids, gels and aerosols can have quantity and cabin-baggage restrictions.']
  ];
  for (const [pattern, reason] of rules) if (pattern.test(name)) return reason;
  return '';
}
function renderRestrictedBadge(item) {
  const reason = restrictedItemReason(item);
  return reason ? `<span class="restricted-item-tag" title="${escapeHtml(reason)}">⚠ RESTRICTED — CHECK RULES</span>` : '';
}
function labelForDestination(id) { const labels={beach:'Beach trip',mountain:'Mountain trip',hill:'Hill station',city:'City trip',foreign:'Foreign / international trip'}; if (Array.isArray(id)) return id.length ? id.map(x=>labels[x]||x).join(' + ') : 'Not selected'; return labels[id] || 'Not selected'; }
function destinationEmoji(id) { return ({beach:'🏖️',mountain:'🏔️',hill:'🌄',city:'🏙️',foreign:'🌍'})[id] || '🧭'; }
function capitalize(s) { return s ? s.charAt(0).toUpperCase()+s.slice(1) : 'Not selected'; }
function recommendationScore(item) {
  let score = item.usefulFor && state.destinations.some(destination => item.usefulFor.includes(destination)) ? 4 : 0;
  if (isDestination('foreign') && ['passport','visa','tickets','insurance','currency','adapter','documents'].includes(item.id)) score += 12;
  if (state.climate==='rainy' && ['raincoat','umbrella','waterproof-bag'].includes(item.id)) score += 7;
  if (state.climate==='winter' && ['hoodie','jacket','scarf','socks'].includes(item.id)) score += 7;
  if (state.climate==='summer' && ['shorts','sunscreen','sunglasses','water-bottle','swimwear'].includes(item.id)) score += 7;
  if (state.climate==='windy' && ['jacket','hoodie','scarf'].includes(item.id)) score += 7;
  if (Number(state.days)>=5 && ['tshirt','shorts','socks','underwear','toiletries'].includes(item.id)) score += 2;
  return score;
}
function renderPacking() {
  const total = totalWeight();
  const capacity = Number(state.capacity);
  const percent = Math.min(100, total / capacity * 100);
  const remaining = Math.max(0, capacity-total);
  return `<section class="screen packing-screen"><div class="packing-topline"><span class="destination-chip">${state.destinations.map(destinationEmoji).join(' ')} ${escapeHtml(labelForDestination(state.destinations))}</span><span class="packing-instruction">${escapeHtml(capitalize(state.climate))} · ${state.days} ${Number(state.days)===1?'day':'days'} · Add, remove or customize items.</span><span class="step-label">STEP 03 / PACKING LIST</span></div><div class="packing-layout"><section class="card item-panel packing-column item-column"><div class="panel-head"><div><h2>Your packing list</h2><div class="panel-kicker">${ITEMS.length} ITEMS · CUSTOM ITEMS SUPPORTED</div></div><span class="tiny-status">${state.packed.length} PACKED</span></div><div class="category-filter" role="group" aria-label="Filter items">${CATEGORIES.map(c=>`<button class="filter-chip ${state.category===c.id?'active':''}" data-action="filter" data-category="${c.id}" aria-pressed="${state.category===c.id}">${c.label}</button>`).join('')}</div>${isDestination('foreign')?'<div class="international-restriction-notice"><strong>⚠ International travel restriction check</strong><p>Items matching the warning list are marked below, including custom items. Restrictions vary by destination and baggage type; verify official customs and airline rules before travelling.</p></div>':''}<div class="item-list" id="item-list">${renderItemList()}</div><form class="custom-item-form" id="custom-item-form"><div class="custom-item-heading"><span class="panel-kicker">YOUR OWN ITEMS</span><strong>Add an item and its weight</strong></div><div class="custom-item-fields"><label>Item name<input id="custom-item-name" name="itemName" type="text" maxlength="60" placeholder="e.g. Camera lens" required></label><label>Weight (kg)<input id="custom-item-weight" name="itemWeight" type="number" min="0.001" max="100" step="0.001" placeholder="e.g. 0.25" required></label><label>Category<select id="custom-item-category" name="itemCategory">${CATEGORIES.filter(c=>c.id!=='all').map(c=>`<option value="${c.id}">${c.label}</option>`).join('')}</select></label><button class="button button-primary custom-add-button" type="submit" aria-label="Add custom item">+ ADD ITEM</button></div><p class="field-note">Your item will appear in the list above with its entered weight.</p></form></section><section class="card suitcase-panel packing-column"><div class="suitcase-panel-heading"><h2>Your suitcase</h2><span class="tiny-status">LIVE WEIGHT</span></div>${renderSuitcase()}<div class="packed-count">${state.packed.length} ${state.packed.length===1?'ITEM':'ITEMS'} IN YOUR LIST</div><div class="packing-observation">${state.packed.length?`You have added ${state.packed.length} item${state.packed.length===1?'':'s'} to your packing list.`:'Your list is empty. Add items using the plus buttons.'}</div></section><aside class="card summary-panel packing-column"><div class="panel-head" style="padding:0 0 17px"><div><h2>Weight summary</h2><div class="panel-kicker">ESTIMATED TOTAL</div></div><span aria-hidden="true">⚖️</span></div><div class="weight-top"><div><div class="panel-kicker">TOTAL BAG WEIGHT</div><div class="weight-number">${total.toFixed(2)} <span>/ ${capacity.toFixed(2)} kg</span></div></div><div class="weight-remaining"><strong>${remaining.toFixed(2)} kg</strong><br>remaining</div></div><div class="weight-track" role="progressbar" aria-label="Planned luggage weight" aria-valuemin="0" aria-valuemax="${capacity}" aria-valuenow="${total.toFixed(2)}"><div class="weight-fill ${total>capacity?'danger':percent>=80?'warning':''}" style="width:${percent}%"></div></div><div class="weight-scale"><span>0 kg</span><span>${capacity.toFixed(2)} kg limit</span></div>${total>capacity?'<div class="weight-alert">Your list exceeds the weight limit you entered. Remove items or adjust quantities.</div>':''}<div class="packing-actions"><button class="button button-secondary button-small" data-action="clear-list">CLEAR LIST</button><button class="button button-primary" data-action="review-list">GET MY PACKING SCORE <span class="button-arrow">→</span></button></div><div class="packing-footer-actions"><button class="button button-ghost button-small" data-action="edit-trip">← EDIT TRIP DETAILS</button></div></aside></div></section>`;
}
function renderItemList() {
  const items = ITEMS.filter(item => state.category==='all' || item.category===state.category).slice().sort((a,b)=>recommendationScore(b)-recommendationScore(a));
  return items.map(item=>{
    const quantity=state.packed.filter(id=>id===item.id).length;
    const isCustom = item.custom === true;
    return `<article class="item-card ${quantity?'is-packed':''} ${restrictedItemReason(item)?'is-restricted':''}"><div class="item-emoji">${item.emoji||'🧳'}</div><div class="item-info"><div class="item-name-row"><span class="item-name">${escapeHtml(item.name)}</span><span class="item-weight">${Number(item.weight).toFixed(3).replace(/0+$/ ,'').replace(/\.$/,'')} kg each</span></div><p class="item-description">${escapeHtml(item.description||'Custom item added by you.')}</p>${isCustom?'<span class="custom-item-tag">YOUR ITEM</span>':''}${renderRestrictedBadge(item)}</div><div class="quantity-control" role="group" aria-label="Quantity of ${escapeHtml(item.name)}"><button class="quantity-button" data-action="remove-item" data-item-id="${item.id}" aria-label="Remove one ${escapeHtml(item.name)}" ${quantity===0?'disabled':''}>−</button><span class="quantity-value" aria-live="polite">${quantity}</span><button class="quantity-button add" data-action="add-item" data-item-id="${item.id}" aria-label="Add one ${escapeHtml(item.name)}">+</button></div></article>`;
  }).join('') || '<div class="item-empty">No items in this category yet.</div>';
}
function renderSuitcase() {
  const items=state.packed.map(id=>ITEMS.find(item=>item.id===id)).filter(Boolean);
  const shown=items.slice(0,12);
  return `<div class="suitcase-stage"><div class="suitcase-mini"><div class="suitcase-content">${shown.map(item=>`<span class="packed-token" title="${escapeHtml(item.name)}">${item.emoji||'🧳'}</span>`).join('')}${items.length>12?`<span class="packed-token more">+${items.length-12}</span>`:''}${!items.length?'<div class="suitcase-empty-message"><strong>🧳</strong><span>Your list will appear here</span></div>':''}</div></div></div><div class="packed-mini-list">${items.length?items.map(item=>`<span class="packed-mini-icon" title="${escapeHtml(item.name)}">${item.emoji||'🧳'}</span>`).join(''):'<span class="muted">Nothing added yet</span>'}</div>`;
}
function totalWeight() { return state.packed.reduce((sum,id)=>{const item=ITEMS.find(i=>i.id===id);return sum+(item?Number(item.weight):0);},0); }
function addItem(id) {
  const item=ITEMS.find(i=>i.id===id); if(!item)return;
  const newTotal=totalWeight()+Number(item.weight);
  if(newTotal>Number(state.capacity)+0.000001){notify(`Adding ${item.name} would exceed your ${Number(state.capacity).toFixed(2)} kg planning limit.`, 'warning');return;}
  state.packed.push(id); render();
  const restriction = restrictedItemReason(item);
  if (restriction) notify(`${item.name}: ${restriction}`, 'warning');
}
function removeItem(id) { const index=state.packed.indexOf(id);if(index>=0)state.packed.splice(index,1);render(); }
function addCustomItem(event) {
  event.preventDefault();
  const name=document.getElementById('custom-item-name').value.trim();
  const weight=Number(document.getElementById('custom-item-weight').value);
  const category=document.getElementById('custom-item-category').value;
  if(!name || !Number.isFinite(weight) || weight<=0 || weight>100){notify('Enter an item name and a weight greater than 0 kg.', 'warning');return;}
  state.customItemCount++;
  const id=`custom-${Date.now()}-${state.customItemCount}`;
  const categoryEmoji={clothing:'👕',essentials:'🧳',electronics:'🔌',comfort:'🎒'};
  ITEMS.push({id,name,category,weight:Number(weight.toFixed(3)),emoji:categoryEmoji[category]||'🧳',description:'Custom item added by you.',usefulFor:[...state.destinations],custom:true});
  state.category='all';
  render();
  const addedItem = ITEMS.find(item => item.id === id);
  const restriction = restrictedItemReason(addedItem);
  notify(restriction ? `${name} added, but flagged: ${restriction}` : `${name} added at ${weight.toFixed(3)} kg each.`, restriction ? 'warning' : 'success');
}
function getPackingRequirements() {
  const days = Math.max(1, Math.min(7, Number(state.days) || 1));
  const requirements = new Map();
  const add = (id, quantity, points, section, reason) => {
    const item = ITEMS.find(entry => entry.id === id);
    if (!item || item.custom) return;
    const existing = requirements.get(id);
    if (existing) {
      existing.quantity = Math.max(existing.quantity, quantity);
      existing.points = Math.max(existing.points, points);
      if (reason && !existing.reason.includes(reason)) existing.reason += ` ${reason}`;
    } else requirements.set(id, {id, quantity, points, section, reason: reason || item.description, item});
  };
  // Everyday basics; clothing quantities scale with trip length (up to one week).
  add('documents', 1, 9, 'Essentials', 'Keep your ID and bookings together.');
  add('toothbrush', 1, 5, 'Essentials', 'A basic personal-hygiene item.');
  add('toiletries', 1, 5, 'Essentials', 'Pack your personal hygiene kit.');
  add('medication', 1, 7, 'Essentials', 'Remember any personal medication you need.');
  add('charger', 1, 6, 'Essentials', 'Bring the charger for your phone or devices.');
  add('water-bottle', 1, 5, 'Essentials', 'A reusable bottle can be useful while travelling.');
  add('first-aid', 1, 4, 'Essentials', 'A small first-aid kit can be useful.');
  add('tshirt', days, 10, 'Clothing', `For ${state.days} day(s), consider enough tops or a laundry plan.`);
  add('underwear', days, 10, 'Clothing', `Plan underwear for each day or a laundry plan.`);
  add('socks', Math.min(days, 5), 5, 'Clothing', 'Pack enough socks for your activities.');
  if (state.climate === 'summer') {
    add('shorts', 1, 5, 'Climate', 'Light clothing can help in warm weather.');
    add('sunscreen', 1, 6, 'Climate', 'Consider sun protection.');
    add('sunglasses', 1, 3, 'Climate', 'Consider eye protection outdoors.');
  }
  if (state.climate === 'winter') {
    add('hoodie', 1, 7, 'Climate', 'Pack a warm layer for cold conditions.');
    add('jacket', 1, 7, 'Climate', 'Pack an outer layer for cold conditions.');
    add('scarf', 1, 3, 'Climate', 'An extra layer can help in cold weather.');
  }
  if (state.climate === 'windy') {
    add('jacket', 1, 7, 'Climate', 'A jacket can help in windy conditions.');
    add('scarf', 1, 4, 'Climate', 'Consider an extra layer for wind.');
  }
  if (state.climate === 'rainy') {
    add('raincoat', 1, 8, 'Climate', 'Rain protection is recommended.');
    add('umbrella', 1, 5, 'Climate', 'A compact umbrella may be useful.');
  }
  if (isDestination('beach')) {
    add('shorts', 1, 5, 'Destination', 'Useful for a beach trip.');
    add('swimwear', 1, 7, 'Destination', 'Pack swimwear if you plan to swim.');
    add('sandals', 1, 4, 'Destination', 'Sandals can be useful at the beach.');
  }
  if (isDestination('mountain')) {
    add('walking-shoes', 1, 8, 'Destination', 'Suitable footwear matters for walking or trails.');
    add('jacket', 1, 6, 'Destination', 'Mountain weather can change quickly.');
    add('powerbank', 1, 3, 'Destination', 'A power bank may be useful on longer outings.');
  }
  if (isDestination('hill')) {
    add('walking-shoes', 1, 7, 'Destination', 'Comfortable footwear helps with sightseeing.');
    add('jacket', 1, 6, 'Destination', 'Evenings may be cool.');
    if (state.climate === 'rainy') add('raincoat', 1, 4, 'Destination', 'Prepare for showers.');
  }
  if (isDestination('city')) {
    add('walking-shoes', 1, 7, 'Destination', 'Comfortable footwear helps on sightseeing days.');
    add('currency', 1, 4, 'Destination', 'Keep a suitable payment method accessible.');
  }
  if (isDestination('foreign')) {
    add('passport', 1, 14, 'International travel', 'Confirm your passport is valid for your destination.');
    add('tickets', 1, 8, 'International travel', 'Keep flight and booking details accessible.');
    add('insurance', 1, 5, 'International travel', 'Consider suitable travel insurance.');
    add('currency', 1, 6, 'International travel', 'Plan how you will pay at your destination.');
    add('adapter', 1, 4, 'International travel', 'Check plug type and voltage at your destination.');
    add('documents', 1, 5, 'International travel', 'Keep travel documents together.');
    add('visa', 1, 3, 'International travel', 'Check whether a visa or other entry document is required.');
  }
  return [...requirements.values()];
}
function renderReview() {
  const requirements = getPackingRequirements();
  const counts = new Map();
  state.packed.forEach(id => counts.set(id, (counts.get(id) || 0) + 1));
  const maxPoints = requirements.reduce((sum, r) => sum + r.points, 0) || 1;
  const earnedPoints = requirements.reduce((sum, r) => sum + r.points * Math.min((counts.get(r.id) || 0) / r.quantity, 1), 0);
  const score = Math.round(earnedPoints / maxPoints * 100);
  const missing = requirements.filter(r => (counts.get(r.id) || 0) < r.quantity).sort((a,b) => b.points-a.points);
  const total = totalWeight();
  const grouped=[];
  state.packed.forEach(id=>{const item=ITEMS.find(i=>i.id===id);if(!item)return;let entry=grouped.find(e=>e.id===id);if(!entry){entry={...item,quantity:0};grouped.push(entry);}entry.quantity++;});
  const itemsHtml=grouped.map(item=>`<div class="review-item"><span class="review-emoji">${item.emoji||'🧳'}</span><div><strong>${escapeHtml(item.name)} × ${item.quantity}</strong><small>${(item.weight*item.quantity).toFixed(3).replace(/0+$/,'').replace(/\.$/,'')} kg total · ${escapeHtml(categoryName(item.category))}</small>${renderRestrictedBadge(item)}</div></div>`).join('');
  const scoreTitle = score >= 90 ? 'Excellent packing coverage!' : score >= 75 ? 'Almost ready to go.' : score >= 50 ? 'A few important things are missing.' : 'Let’s complete your packing list.';
  const scoreMessage = score >= 90 ? 'Your list covers most of the items recommended for this trip. Check the suggestions below before leaving.' : 'Your score is based on destination, climate, trip duration, and key travel essentials. Add the suggested items that apply to you.';
  const missingHtml = missing.length ? missing.slice(0,10).map(r=>`<div class="review-item missing-item"><span class="review-emoji">${r.item.emoji||'🧳'}</span><div><strong>${escapeHtml(r.item.name)}${r.quantity>1?` — ${Math.max(0,r.quantity-(counts.get(r.id)||0))} more recommended`:''}</strong><small>${escapeHtml(r.reason)}</small></div><span class="missing-tag">MISSING</span></div>`).join('') : '<div class="review-empty">Great coverage! No recommended items are missing from this list.</div>';
  const weightStatus = total <= Number(state.capacity) ? 'Within your planned limit' : 'Over your planned limit';
  return `<section class="screen results-screen"><div class="eyebrow">STEP 04 · PACKING READINESS</div><div class="results-hero"><div class="results-hero-copy"><div class="results-eyebrow">YOUR PACKING READINESS</div><h1>${scoreTitle}</h1><p>${scoreMessage} This is a practical checklist score, not a guarantee that every personal or destination-specific need is covered.</p><span class="results-rank">${escapeHtml(labelForDestination(state.destinations))} · ${state.days} ${Number(state.days)===1?'day':'days'} · ${escapeHtml(capitalize(state.climate))}</span></div><div class="score-orbit"><div class="score-disc"><strong>${score}</strong><span>OUT OF 100</span></div></div></div><div class="results-grid"><article class="card score-breakdown"><h2>Items you may have missed</h2><p>Review these recommendations and add the ones that apply to your trip.</p>${missingHtml}<div class="summary-divider"></div><h2>Your selected packing list</h2><p>${state.packed.length} items · ${total.toFixed(2)} kg estimated total</p>${itemsHtml||'<div class="review-empty">Your list is empty. Return to the packing list to add items.</div>'}<div class="results-actions"><button class="button button-ghost" data-action="back-packing">← EDIT PACKING LIST</button><button class="button button-primary" data-action="edit-trip">EDIT TRIP DETAILS</button><button class="button button-primary" data-action="open-organizer">ORGANIZE MY SUITCASE →</button></div></article><aside class="results-side"><div class="card verdict-card"><div class="verdict-icon">⚖️</div><div class="verdict-label">WEIGHT SUMMARY</div><h3>${weightStatus}</h3><p>${total.toFixed(2)} kg packed out of ${Number(state.capacity).toFixed(2)} kg. ${Math.max(0,Number(state.capacity)-total).toFixed(2)} kg remaining.</p></div><div class="card" style="padding:20px"><h2>Trip summary</h2><div class="results-stats"><div class="result-stat"><span class="stat-emoji">📅</span><small>TRIP LENGTH</small><strong>${state.days} days</strong></div><div class="result-stat"><span class="stat-emoji">🧳</span><small>ITEMS SELECTED</small><strong>${state.packed.length}</strong></div><div class="result-stat"><span class="stat-emoji">⚖️</span><small>WEIGHT LIMIT</small><strong>${Number(state.capacity).toFixed(2)} kg</strong></div><div class="result-stat"><span class="stat-emoji">📌</span><small>RECOMMENDATIONS</small><strong>${requirements.length}</strong></div></div></div><div class="result-quote">Reminder: built-in weights are estimates. Confirm entry requirements, medicine rules and airline baggage limits before departure.<small>PACK SMART · PANIC LESS</small></div></aside></div><section class="card calendar-reminder-card"><div class="calendar-reminder-icon" aria-hidden="true">📅</div><div class="calendar-reminder-copy"><div class="panel-kicker">DON'T FORGET TO PACK</div><h2>Add your packing list to Google Calendar</h2><p>Choose the date you want to be reminded to pack. We'll prepare one calendar event containing every item and quantity in your selected list.</p><label for="packing-reminder-date">Reminder date</label><input id="packing-reminder-date" type="date" min="${getLocalDateString()}" value="${escapeHtml(state.reminderDate)}" required></div><div class="calendar-reminder-action"><button class="button button-primary" data-action="create-calendar-reminder">ADD TO GOOGLE CALENDAR ↗</button><small>Google Calendar opens in a new tab. Review the event and press Save.</small></div></section></section>`;
}
const ORGANIZER_ZONES = [
  { id:'bottom', title:'Bottom layer · near wheels', icon:'🧱', description:'Place heavier clothes and sturdy items here to help balance the suitcase.' },
  { id:'middle', title:'Middle layer', icon:'👕', description:'Stack or roll everyday clothes and softer items.' },
  { id:'sides', title:'Sides & gaps', icon:'🧦', description:'Use small, soft items to fill gaps and keep things from shifting.' },
  { id:'top', title:'Top · easy access', icon:'🧴', description:'Keep toiletries sealed and items you may need soon accessible.' },
  { id:'carryon', title:'Carry-on / personal bag', icon:'🎒', description:'Keep documents and valuables secure. Follow airline rules for electronics, batteries, liquids and restricted items.' }
];
function organizerDefaultZone(item) {
  const name = item.name.toLowerCase();
  if (/passport|visa|ticket|document|insurance|currency|payment card|gold|jewel|valuable/.test(name)) return 'carryon';
  if (/laptop|camera|power bank|powerbank|charger|phone|tablet|electronics|medication|medicine/.test(name)) return 'carryon';
  if (/shoe|sandal|jeans|trouser|jacket|hoodie|book|heavy/.test(name)) return 'bottom';
  if (/sock|underwear|cable|adapter|small|accessor|laundry/.test(name)) return 'sides';
  if (/toiletry|liquid|shampoo|perfume|toothbrush|water bottle/.test(name)) return 'top';
  if (item.category === 'essentials' && /document|passport|visa|ticket/.test(item.id)) return 'carryon';
  if (item.category === 'clothing') return 'middle';
  if (item.category === 'electronics') return 'carryon';
  if (item.category === 'comfort') return 'sides';
  return 'top';
}
function organizerInstances() {
  const counts = new Map();
  return state.packed.map(id => {
    const item = ITEMS.find(entry => entry.id === id);
    if (!item) return null;
    const index = counts.get(id) || 0; counts.set(id, index + 1);
    const key = `${id}::${index}`;
    if (!state.organizerZones[key]) state.organizerZones[key] = organizerDefaultZone(item);
    if (typeof state.organizerPlaced[key] !== 'boolean') state.organizerPlaced[key] = false;
    return { ...item, key, copyNumber:index + 1 };
  }).filter(Boolean);
}
function renderOrganizer() {
  const instances = organizerInstances();
  const placed = instances.filter(item => state.organizerPlaced[item.key]).length;
  const zonesHtml = ORGANIZER_ZONES.map(zone => {
    const items = instances.filter(item => state.organizerZones[item.key] === zone.id);
    return `<section class="organizer-zone" data-drop-zone="${zone.id}"><div class="organizer-zone-head"><span class="organizer-zone-icon">${zone.icon}</span><div><h3>${zone.title}</h3><p>${zone.description}</p></div><span class="organizer-zone-count">${items.length}</span></div><div class="organizer-zone-items">${items.length ? items.map(item => `<article class="organizer-item ${state.organizerPlaced[item.key]?'is-placed':''} ${restrictedItemReason(item)?'is-restricted':''}" draggable="true" data-organizer-key="${escapeHtml(item.key)}"><span class="organizer-item-emoji">${item.emoji||'🧳'}</span><div class="organizer-item-info"><strong>${escapeHtml(item.name)}${item.copyNumber>1?` #${item.copyNumber}`:''}</strong><small>${Number(item.weight).toFixed(3).replace(/0+$/,'').replace(/\.$/,'')} kg · ${escapeHtml(categoryName(item.category))}</small>${renderRestrictedBadge(item)}</div><label class="organizer-packed-toggle"><input type="checkbox" data-organizer-placed="${escapeHtml(item.key)}" ${state.organizerPlaced[item.key]?'checked':''}> Placed</label><select aria-label="Move ${escapeHtml(item.name)}" data-organizer-move="${escapeHtml(item.key)}">${ORGANIZER_ZONES.map(option=>`<option value="${option.id}" ${state.organizerZones[item.key]===option.id?'selected':''}>${option.title}</option>`).join('')}</select></article>`).join('') : '<p class="organizer-empty">Drag an item here or choose this zone from an item’s menu.</p>'}</div></section>`;
  }).join('');
  const allPlaced = instances.length > 0 && placed === instances.length;
  return `<section class="screen organizer-screen"><div class="eyebrow">STEP 05 · SMART SUITCASE ORGANIZER</div><div class="organizer-hero"><div><div class="panel-kicker">YOUR PERSONAL PACKING MAP</div><h1>Organize your suitcase.</h1><p>We’ve suggested a place for every selected item. Drag items between zones or use each item's menu. Check “Placed” as you pack it in real life.</p></div><div class="organizer-progress"><strong>${placed}<span> / ${instances.length}</span></strong><small>ITEMS PLACED</small><div class="organizer-progress-track"><span style="width:${instances.length?placed/instances.length*100:0}%"></span></div></div></div>${instances.length ? `<div class="organizer-tip"><strong>Smart packing tip</strong><span>Heavy items near the wheels help balance the suitcase. Protect fragile electronics, seal toiletries against leaks, and keep passports and valuables secure and accessible.</span></div><div class="organizer-zones">${zonesHtml}</div><div class="organizer-bottom-note">${allPlaced?'Everything on your list is marked as placed. Have a final check before leaving!':'Mark each item as placed as you pack. Your progress updates automatically.'}</div>` : '<div class="card organizer-empty-state"><h2>Your packing list is empty</h2><p>Add items to your packing list first, then come back to organize them.</p><button class="button button-primary" data-action="back-packing">← BACK TO PACKING LIST</button></div>'}<div class="organizer-actions"><button class="button button-ghost" data-action="back-review">← BACK TO PACKING SCORE</button><button class="button button-secondary" data-action="reset-organizer">RESET PLACEMENT</button><button class="button button-primary" data-action="back-packing">EDIT ITEMS</button></div></section>`;
}
function categoryName(id) { return CATEGORIES.find(c=>c.id===id)?.label || 'Travel item'; }
function handleClick(event) {
  const target=event.target.closest('[data-action]');if(!target||target.disabled)return;
  const action=target.dataset.action;
  switch(action){
    case 'start': state.destinations=[];state.climate=null;state.days='';state.capacity='';state.packed=[];state.category='all';state.organizerZones={};state.organizerPlaced={};setScreen('scenarios');break;
    case 'home':
    case 'go-home': setScreen('home');break;
    case 'destination': {const id=target.dataset.value;state.destinations=state.destinations.includes(id)?state.destinations.filter(x=>x!==id):[...state.destinations,id];render();}break;
    case 'climate': state.climate=target.dataset.value;render();break;
    case 'continue-setup': {
      readTripInputs();
      const days=Number(state.days),capacity=Number(state.capacity);
      if(!state.destinations.length)return notify('Choose at least one destination.','warning');
      if(!state.climate)return notify('Choose the climate for your trip.','warning');
      if(!state.days||!Number.isInteger(days)||days<1||days>365)return notify('Enter trip days as a whole number from 1 to 365.','warning');
      if(!state.capacity||!Number.isFinite(capacity)||capacity<=0||capacity>100)return notify('Enter a weight limit greater than 0 and no more than 100 kg.','warning');
      setScreen('briefing');break;
    }
    case 'edit-trip': setScreen('scenarios');break;
    case 'open-packing': state.category='all';setScreen('packing');break;
    case 'filter': state.category=target.dataset.category;render();break;
    case 'add-item': addItem(target.dataset.itemId);break;
    case 'remove-item': removeItem(target.dataset.itemId);break;
    case 'clear-list': if(!state.packed.length){notify('Your list is already empty.','warning');break;}state.packed=[];render();notify('Packing list cleared.');break;
    case 'review-list': setScreen('review');break;
    case 'open-organizer': setScreen('organizer');break;
    case 'back-review': setScreen('review');break;
    case 'reset-organizer': state.organizerPlaced={}; state.organizerZones={}; render(); notify('Placement choices reset.');break;
    case 'back-packing': setScreen('packing');break;
    case 'create-calendar-reminder': createCalendarReminder();break;
  }
}
function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
function createCalendarReminder() {
  const dateInput = document.getElementById('packing-reminder-date');
  const reminderDate = dateInput ? dateInput.value : state.reminderDate;
  if (!reminderDate) {
    notify('Choose the date you want to be reminded to pack.', 'warning');
    if (dateInput) dateInput.focus();
    return;
  }
  if (reminderDate < getLocalDateString()) {
    notify('Choose today or a future date for your reminder.', 'warning');
    if (dateInput) dateInput.focus();
    return;
  }
  state.reminderDate = reminderDate;
  const grouped = new Map();
  state.packed.forEach(id => {
    const item = ITEMS.find(entry => entry.id === id);
    if (!item) return;
    const current = grouped.get(id) || { item, quantity: 0 };
    current.quantity += 1;
    grouped.set(id, current);
  });
  const itemLines = [...grouped.values()].map(({item, quantity}) =>
    `☐ ${item.name} × ${quantity} — ${(item.weight * quantity).toFixed(2)} kg total`
  );
  const details = [
    `Packing reminder for ${labelForDestination(state.destinations)}.`,
    `Trip duration: ${state.days} day(s) | Climate: ${capitalize(state.climate)}.`,
    `Planned luggage limit: ${Number(state.capacity).toFixed(2)} kg.`,
    `Estimated selected-item weight: ${totalWeight().toFixed(2)} kg.`,
    '', 'PACKING CHECKLIST',
    ...(itemLines.length ? itemLines : ['No items have been selected yet.']),
    '', 'Review your packing readiness score and confirm destination-specific requirements before travelling.'
  ].join('\n');
  const startDate = reminderDate.replaceAll('-', '');
  const [year, month, day] = reminderDate.split('-').map(Number);
  const endDate = new Date(Date.UTC(year, month - 1, day + 1));
  const end = `${endDate.getUTCFullYear()}${String(endDate.getUTCMonth()+1).padStart(2,'0')}${String(endDate.getUTCDate()).padStart(2,'0')}`;
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `Pack for your ${labelForDestination(state.destinations)} trip`,
    dates: `${startDate}/${end}`,
    details
  });
  const calendarUrl = `https://calendar.google.com/calendar/render?${params.toString()}`;
  window.open(calendarUrl, '_blank', 'noopener,noreferrer');
  notify('Google Calendar opened with your packing checklist. Save the event there.');
}
function handleInput(event) {
  if(event.target.id==='trip-days') state.days=event.target.value;
  if(event.target.id==='trip-capacity') state.capacity=event.target.value;
  if(event.target.id==='packing-reminder-date') state.reminderDate=event.target.value;
}
document.addEventListener('click',handleClick);
document.addEventListener('input',handleInput);
document.addEventListener('change', event => {
  const placedKey = event.target.dataset.organizerPlaced;
  const moveKey = event.target.dataset.organizerMove;
  if (placedKey) { state.organizerPlaced[placedKey] = event.target.checked; render(); }
  if (moveKey) { state.organizerZones[moveKey] = event.target.value; render(); }
});
let draggedOrganizerKey = null;
document.addEventListener('dragstart', event => {
  const card = event.target.closest('[data-organizer-key]');
  if (!card) return;
  draggedOrganizerKey = card.dataset.organizerKey;
  event.dataTransfer?.setData('text/plain', draggedOrganizerKey);
  if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move';
});
document.addEventListener('dragover', event => {
  const zone = event.target.closest('[data-drop-zone]');
  if (zone) { event.preventDefault(); if (event.dataTransfer) event.dataTransfer.dropEffect = 'move'; }
});
document.addEventListener('drop', event => {
  const zone = event.target.closest('[data-drop-zone]');
  if (!zone) return;
  event.preventDefault();
  const key = event.dataTransfer?.getData('text/plain') || draggedOrganizerKey;
  if (key) { state.organizerZones[key] = zone.dataset.dropZone; render(); }
  draggedOrganizerKey = null;
});
document.addEventListener('submit',event=>{if(event.target.id==='custom-item-form')addCustomItem(event);});
updateProgress();
render();
