(function () {
  'use strict';

  var STORAGE_KEY = 'morganTripPlaces';

  var CHIPS = ['All', 'Dining', 'Waterfront', 'Brunch', 'Kid-Friendly', 'Nature', 'Free'];

  var places = [
    {
      id: 'shooters-waterfront',
      name: 'Shooters Waterfront',
      kind: 'dining',
      categories: ['Dining', 'Waterfront'],
      address: '3033 NE 32nd Ave, Fort Lauderdale, FL 33308',
      phone: '(954) 566-2855',
      website: 'https://www.shooterswaterfront.com',
      price: '$$$',
      rating: 4.6,
      description: 'Waterfront seafood and American dining — perfect for the graduation celebration dinner.',
      tags: ['Celebration Dinner', 'Waterfront'],
      hours: 'Call or check site for hours; reservations recommended for groups.',
    },
    {
      id: 'roccos-tacos',
      name: "Rocco's Tacos & Tequila Bar",
      kind: 'dining',
      categories: ['Dining', 'Kid-Friendly'],
      address: '1313 E Las Olas Blvd, Fort Lauderdale, FL 33301',
      phone: '(954) 524-9550',
      website: 'https://www.roccostacos.com',
      price: '$$',
      rating: 4.5,
      description: 'Lively Tex-Mex on Las Olas with tableside guacamole — great for families.',
      tags: ['Family-Friendly', 'Casual'],
      hours: 'Varies by day — check roccostacos.com.',
    },
    {
      id: 'lesters-diner',
      name: "Lester's Diner",
      kind: 'dining',
      categories: ['Dining', 'Brunch'],
      address: '250 State Rd 84, Fort Lauderdale, FL 33315',
      phone: '(954) 525-5641',
      website: 'https://www.lestersdiner.com',
      price: '$',
      rating: 4.7,
      description: 'Fort Lauderdale classic since 1968 — huge portions, brunch, open 24 hours.',
      tags: ['Brunch', 'Local Favorite'],
      hours: 'Open 24 hours daily.',
    },
    {
      id: 'coconuts-by-the-water',
      name: 'Coconuts by the Water',
      kind: 'dining',
      categories: ['Dining', 'Waterfront', 'Kid-Friendly'],
      address: '429 Seabreeze Blvd, Fort Lauderdale, FL 33316',
      phone: '(954) 525-2421',
      website: 'https://www.coconutsfortlauderdale.com',
      price: '$$',
      rating: 4.5,
      description: 'Casual waterfront dining near the convention center; kid-friendly menu.',
      tags: ['Seafood', 'Kid-Friendly'],
      hours: 'Call or check site; live music many weekends.',
    },
    {
      id: 'pirate-republic',
      name: 'The Pirate Republic Seafood & Bar',
      kind: 'dining',
      categories: ['Dining', 'Waterfront', 'Kid-Friendly'],
      address: '400 SW 3rd Ave, Fort Lauderdale, FL 33312',
      phone: '(954) 761-3500',
      website: 'https://www.thepiraterepublic.com',
      price: '$$',
      rating: 4.5,
      description: 'Pirate-themed waterfront on the New River — fun for groups with kids.',
      tags: ['Caribbean', 'Group-Friendly'],
      hours: 'Varies — check thepiraterepublic.com.',
    },
    {
      id: 'big-city-tavern',
      name: 'Big City Tavern',
      kind: 'dining',
      categories: ['Dining', 'Brunch'],
      address: '609 E Las Olas Blvd, Fort Lauderdale, FL 33301',
      phone: '(954) 727-0307',
      website: 'https://www.bigcitytavern.com',
      price: '$$$',
      rating: 4.4,
      description: 'American bistro on Las Olas with brunch Sat–Sun; good for groups with notice.',
      tags: ['Upscale Casual', 'Las Olas'],
      hours: 'Brunch Sat & Sun; dinner nightly — confirm on site.',
    },
    {
      id: 'jungle-queen',
      name: 'Jungle Queen Riverboat',
      kind: 'activity',
      categories: ['Waterfront', 'Kid-Friendly'],
      address: '801 Seabreeze Blvd, Fort Lauderdale, FL (Bahia Mar Marina)',
      phone: '(954) 462-5596',
      website: 'https://www.junglequeen.com',
      price: '$$',
      rating: 4.6,
      description: 'Iconic sightseeing cruise on the New River and Intracoastal — alligator and bird show.',
      tags: ['Sightseeing Cruise', 'All Ages'],
      hours: 'Cruise schedules vary — book on junglequeen.com.',
    },
    {
      id: 'xtreme-action-park',
      name: 'Xtreme Action Park',
      kind: 'activity',
      categories: ['Kid-Friendly'],
      address: '5300 Powerline Rd, Fort Lauderdale, FL 33309',
      phone: '(954) 491-6265',
      website: 'https://www.xtremeactionpark.com',
      price: '$$',
      rating: 4.5,
      description: 'Indoor go-karts, trampolines, bowling, arcade — air-conditioned family fun.',
      tags: ['Indoor Fun', 'All Ages'],
      hours: 'Mon–Thu 2–10 PM, Fri–Sun 10 AM–12 AM.',
    },
    {
      id: 'ftl-beach',
      name: 'Fort Lauderdale Beach',
      kind: 'activity',
      categories: ['Free', 'Nature', 'Kid-Friendly'],
      address: 'Along A1A / Fort Lauderdale Beach Blvd, Fort Lauderdale, FL',
      phone: '',
      website: '',
      price: 'Free',
      rating: 4.8,
      description: 'Wide beaches, gentle waves, lifeguards — classic Florida with the promenade nearby.',
      tags: ['Free', 'Classic Florida'],
      hours: 'Public beach — daylight hours typical; lifeguard hours vary by season.',
    },
    {
      id: 'riverwalk-water-taxi',
      name: 'Riverwalk Fort Lauderdale & Water Taxi',
      kind: 'activity',
      categories: ['Free', 'Waterfront', 'Kid-Friendly', 'Nature'],
      address: 'Along the New River, downtown Fort Lauderdale, FL',
      phone: '(954) 467-6677',
      website: 'https://www.watertaxi.com',
      price: '$$',
      rating: 4.5,
      description: 'Riverwalk park is free; Water Taxi hop-on pass for a scenic ride along the route.',
      tags: ['Free / Low Cost', 'Scenic'],
      hours: 'Riverwalk: typically dawn to dusk. Water Taxi: see watertaxi.com for schedule.',
    },
    {
      id: 'mods',
      name: 'Museum of Discovery & Science (MODS)',
      kind: 'activity',
      categories: ['Kid-Friendly'],
      address: '401 SW 2nd St, Fort Lauderdale, FL 33312',
      phone: '(954) 467-6637',
      website: 'https://www.mods.org',
      price: '$$',
      rating: 4.6,
      description: 'Interactive science, live animals, IMAX — ideal for a hot June afternoon.',
      tags: ['Educational', 'Indoor'],
      hours: 'Mon–Sat 10 AM–5 PM, Sun 12–5 PM.',
    },
    {
      id: 'butterfly-world',
      name: 'Butterfly World',
      kind: 'activity',
      categories: ['Nature', 'Kid-Friendly'],
      address: '3600 W Sample Rd, Coconut Creek, FL 33073',
      phone: '(954) 977-4400',
      website: 'https://www.butterflyworld.com',
      price: '$$$',
      rating: 4.7,
      description: 'World-class butterfly aviaries, hummingbirds, and tropical gardens — ~25 min from FTL.',
      tags: ['Nature', 'Unique Experience'],
      hours: 'Mon–Sat 9 AM–5 PM, Sun 11 AM–5 PM.',
    },
    {
      id: 'hugh-taylor-birch',
      name: 'Hugh Taylor Birch State Park',
      kind: 'activity',
      categories: ['Nature', 'Kid-Friendly'],
      address: '3109 E Sunrise Blvd, Fort Lauderdale, FL 33304',
      phone: '(954) 564-4521',
      website: 'https://www.floridastateparks.org/parks-and-trails/hugh-taylor-birch-state-park',
      price: '$',
      rating: 4.6,
      description: 'Trails, lagoon, beach access — $6 per vehicle; turtles, iguanas, and birds.',
      tags: ['Nature', 'Affordable'],
      hours: '8 AM–sunset daily.',
    },
  ];

  function telHref(phone) {
    if (!phone) return '';
    var d = phone.replace(/\D/g, '');
    if (!d) return '';
    return 'tel:+' + d;
  }

  function mapsUrl(address) {
    return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(address);
  }

  function loadStates() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return {};
      var parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (e) {
      return {};
    }
  }

  function saveStates(states) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(states));
    } catch (e) {}
  }

  function getState(id) {
    var all = loadStates();
    return all[id] || { favorite: false, wantToGo: false, visited: false };
  }

  function setState(id, partial) {
    var all = loadStates();
    var cur = all[id] || { favorite: false, wantToGo: false, visited: false };
    all[id] = {
      favorite: partial.favorite !== undefined ? partial.favorite : cur.favorite,
      wantToGo: partial.wantToGo !== undefined ? partial.wantToGo : cur.wantToGo,
      visited: partial.visited !== undefined ? partial.visited : cur.visited,
    };
    saveStates(all);
  }

  function countBy(key) {
    return places.filter(function (p) {
      return getState(p.id)[key];
    }).length;
  }

  var iconHeart = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
  var iconHeartFilled = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
  var iconStar = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
  var iconStarFilled = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
  var iconCheck = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';
  var iconCheckFilled =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>';
  function starsHtml(rating) {
    var n = Math.round(Math.min(5, Math.max(0, rating)));
    var out = '';
    for (var i = 1; i <= 5; i++) {
      if (i <= n) {
        out +=
          '<svg class="place-star place-star--on" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="var(--gold)" stroke="var(--gold-bright)" stroke-width="0.5" d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
      } else {
        out +=
          '<svg class="place-star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" stroke="var(--gray-300)" stroke-width="1.2"/></svg>';
      }
    }
    return '<span class="place-card__stars" aria-label="' + rating + ' out of 5">' + out + '</span>';
  }

  var selectedCategory = 'All';
  var statFilter = null;
  var searchQuery = '';
  var searchDebounceTimer = null;
  var highlightTimer = null;

  var els = {};

  function placeMatchesCategory(place, cat) {
    if (cat === 'All') return true;
    return place.categories.indexOf(cat) !== -1;
  }

  function placeMatchesSearch(place, q) {
    if (!q) return true;
    return place.name.toLowerCase().indexOf(q) !== -1;
  }

  function placeMatchesStat(place) {
    if (!statFilter) return true;
    var s = getState(place.id);
    return !!s[statFilter];
  }

  function placeVisible(place) {
    return (
      placeMatchesCategory(place, selectedCategory) &&
      placeMatchesSearch(place, searchQuery) &&
      placeMatchesStat(place)
    );
  }

  function updateStatsUI() {
    els.countFav.textContent = String(countBy('favorite'));
    els.countWant.textContent = String(countBy('wantToGo'));
    els.countVis.textContent = String(countBy('visited'));
    els.statFav.classList.toggle('is-active', statFilter === 'favorite');
    els.statWant.classList.toggle('is-active', statFilter === 'wantToGo');
    els.statVis.classList.toggle('is-active', statFilter === 'visited');
    els.statFav.setAttribute('aria-pressed', statFilter === 'favorite' ? 'true' : 'false');
    els.statWant.setAttribute('aria-pressed', statFilter === 'wantToGo' ? 'true' : 'false');
    els.statVis.setAttribute('aria-pressed', statFilter === 'visited' ? 'true' : 'false');
  }

  function renderChips() {
    els.chips.innerHTML = CHIPS.map(function (label) {
      var sel = label === selectedCategory ? ' is-selected' : '';
      return (
        '<button type="button" class="explore-chip' +
        sel +
        '" data-chip="' +
        escapeAttr(label) +
        '">' +
        escapeHtml(label) +
        '</button>'
      );
    }).join('');
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function escapeAttr(s) {
    return escapeHtml(s).replace(/'/g, '&#39;');
  }

  function renderGrid() {
    var frag = document.createDocumentFragment();
    var any = false;

    places.forEach(function (place) {
      var vis = placeVisible(place);
      if (!vis) return;
      any = true;

      var st = getState(place.id);
      var badgeClass = place.kind === 'dining' ? 'place-card__badge--dining' : 'place-card__badge--activity';
      var badgeText = place.kind === 'dining' ? 'Dining' : 'Fun';

      var wrap = document.createElement('div');
      wrap.className = 'explore-card-wrap';
      wrap.dataset.placeId = place.id;

      var card = document.createElement('article');
      card.className = 'card place-card' + (st.visited ? ' is-visited' : '');
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', 'Details for ' + place.name);

      card.innerHTML =
        '<span class="place-card__badge ' +
        badgeClass +
        '">' +
        escapeHtml(badgeText) +
        '</span>' +
        '<div class="place-card__body">' +
        '<h3 class="place-card__name">' +
        escapeHtml(place.name) +
        '</h3>' +
        '<p class="place-card__loc">' +
        escapeHtml(place.address) +
        '</p>' +
        starsHtml(place.rating) +
        '<div class="place-card__price">' +
        escapeHtml(place.price) +
        '</div>' +
        '<p class="place-card__desc">' +
        escapeHtml(place.description) +
        '</p>' +
        '<div class="place-card__actions">' +
        '<button type="button" class="place-card__action" data-action="favorite" aria-pressed="' +
        st.favorite +
        '" aria-label="Favorite">' +
        (st.favorite ? iconHeartFilled : iconHeart) +
        '</button>' +
        '<button type="button" class="place-card__action" data-action="wantToGo" aria-pressed="' +
        st.wantToGo +
        '" aria-label="Want to go">' +
        (st.wantToGo ? iconStarFilled : iconStar) +
        '</button>' +
        '<button type="button" class="place-card__action" data-action="visited" aria-pressed="' +
        st.visited +
        '" aria-label="Visited">' +
        (st.visited ? iconCheckFilled : iconCheck) +
        '</button>' +
        '</div></div>';

      [].forEach.call(card.querySelectorAll('.place-card__action'), function (btn) {
        if (st[btn.dataset.action]) btn.classList.add('is-on');
      });

      wrap.appendChild(card);
      frag.appendChild(wrap);
    });

    els.grid.innerHTML = '';
    if (!any) {
      var empty = document.createElement('p');
      empty.className = 'explore-empty';
      empty.textContent = 'No places match your filters. Try All or clear the search.';
      els.grid.appendChild(empty);
    } else {
      els.grid.appendChild(frag);
    }
  }

  function fullRefresh() {
    renderChips();
    updateStatsUI();
    renderGrid();
  }

  function softRefresh() {
    updateStatsUI();
    renderGrid();
  }

  function showToast(message) {
    els.toast.textContent = message;
    els.toast.classList.add('is-visible');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () {
      els.toast.classList.remove('is-visible');
    }, 3200);
  }

  function openModal(place) {
    var st = getState(place.id);
    els.modalTitle.textContent = place.name;
    els.modalBadge.textContent = place.kind === 'dining' ? 'Dining' : 'Activity';
    els.modalBadge.className = 'place-card__badge ' + (place.kind === 'dining' ? 'place-card__badge--dining' : 'place-card__badge--activity');

    var rows = '<dl class="explore-modal__dl">';
    rows += '<dt>Address</dt><dd class="explore-modal__dd">' + escapeHtml(place.address) + '</dd>';
    if (place.phone) {
      rows +=
        '<dt>Phone</dt><dd class="explore-modal__dd"><a href="' +
        escapeAttr(telHref(place.phone)) +
        '">' +
        escapeHtml(place.phone) +
        '</a></dd>';
    } else {
      rows += '<dt>Phone</dt><dd class="explore-modal__dd">—</dd>';
    }
    if (place.website) {
      rows +=
        '<dt>Website</dt><dd class="explore-modal__dd"><a href="' +
        escapeAttr(place.website) +
        '" target="_blank" rel="noopener noreferrer">' +
        escapeHtml(place.website.replace(/^https?:\/\//, '')) +
        '</a></dd>';
    } else {
      rows += '<dt>Website</dt><dd class="explore-modal__dd">—</dd>';
    }
    rows += '<dt>Hours</dt><dd class="explore-modal__dd">' + escapeHtml(place.hours) + '</dd>';
    rows +=
      '<dt>Rating</dt><dd class="explore-modal__dd explore-modal__rating"><span>' +
      starsHtml(place.rating) +
      '</span><span class="explore-modal__rating-num">' +
      place.rating +
      ' / 5</span></dd>';
    rows += '<dt>Price</dt><dd class="explore-modal__dd">' + escapeHtml(place.price) + '</dd>';
    rows += '</dl>';

    els.modalBody.innerHTML = rows + els.modalActionsTemplate;

    els.modalBackdrop.classList.add('is-open');
    els.modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    els.modalBackdrop.dataset.openPlaceId = place.id;

    var mapsBtn = els.modalBody.querySelector('[data-maps]');
    if (mapsBtn) mapsBtn.href = mapsUrl(place.address);
  }

  function closeModal() {
    els.modalBackdrop.classList.remove('is-open');
    els.modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    delete els.modalBackdrop.dataset.openPlaceId;
  }

  function onModalBodyClick(e) {
    if (e.target.closest('[data-modal-close]')) closeModal();
  }

  function findPlace(id) {
    for (var i = 0; i < places.length; i++) {
      if (places[i].id === id) return places[i];
    }
    return null;
  }

  function bind() {
    els.chips.addEventListener('click', function (e) {
      var btn = e.target.closest('.explore-chip');
      if (!btn) return;
      selectedCategory = btn.dataset.chip || 'All';
      fullRefresh();
    });

    els.search.addEventListener('input', function () {
      clearTimeout(searchDebounceTimer);
      searchDebounceTimer = setTimeout(function () {
        searchQuery = els.search.value.trim().toLowerCase();
        softRefresh();
      }, 180);
    });

    els.statFav.addEventListener('click', function () {
      statFilter = statFilter === 'favorite' ? null : 'favorite';
      softRefresh();
    });
    els.statWant.addEventListener('click', function () {
      statFilter = statFilter === 'wantToGo' ? null : 'wantToGo';
      softRefresh();
    });
    els.statVis.addEventListener('click', function () {
      statFilter = statFilter === 'visited' ? null : 'visited';
      softRefresh();
    });

    els.surprise.addEventListener('click', function () {
      var pool = places.filter(placeVisible);
      if (!pool.length) pool = places.slice();
      var pick = pool[Math.floor(Math.random() * pool.length)];
      var wrap = els.grid.querySelector('.explore-card-wrap[data-place-id="' + pick.id + '"]');
      if (wrap) {
        wrap.scrollIntoView({ behavior: 'smooth', block: 'center' });
        var card = wrap.querySelector('.place-card');
        if (card) {
          card.classList.remove('is-highlight');
          void card.offsetWidth;
          card.classList.add('is-highlight');
          clearTimeout(highlightTimer);
          highlightTimer = setTimeout(function () {
            card.classList.remove('is-highlight');
          }, 2000);
        }
      }
      showToast('Try: ' + pick.name);
    });

    els.grid.addEventListener('click', function (e) {
      var actBtn = e.target.closest('.place-card__action');
      if (actBtn) {
        e.stopPropagation();
        var wrap = actBtn.closest('.explore-card-wrap');
        if (!wrap) return;
        var id = wrap.dataset.placeId;
        var action = actBtn.dataset.action;
        var st = getState(id);
        var next = !st[action];
        var patch = {};
        patch[action] = next;
        setState(id, patch);
        softRefresh();
        return;
      }

      var card = e.target.closest('.place-card');
      if (!card) return;
      var wrap = card.closest('.explore-card-wrap');
      if (!wrap) return;
      var place = findPlace(wrap.dataset.placeId);
      if (place) openModal(place);
    });

    els.grid.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var card = e.target.closest('.place-card');
      if (!card || e.target.closest('.place-card__action')) return;
      e.preventDefault();
      var wrap = card.closest('.explore-card-wrap');
      var place = wrap && findPlace(wrap.dataset.placeId);
      if (place) openModal(place);
    });

    els.modalBackdrop.addEventListener('click', function (e) {
      if (e.target === els.modalBackdrop) closeModal();
    });

    var mx = document.getElementById('modal-close-x');
    if (mx) mx.addEventListener('click', closeModal);

    els.modalBody.addEventListener('click', onModalBodyClick);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && els.modalBackdrop.classList.contains('is-open')) closeModal();
    });
  }

  function init() {
    els.chips = document.getElementById('explore-chips');
    els.search = document.getElementById('explore-search');
    els.statFav = document.getElementById('stat-favorites');
    els.statWant = document.getElementById('stat-want');
    els.statVis = document.getElementById('stat-visited');
    els.countFav = document.getElementById('stat-favorites-count');
    els.countWant = document.getElementById('stat-want-count');
    els.countVis = document.getElementById('stat-visited-count');
    els.surprise = document.getElementById('explore-surprise');
    els.grid = document.getElementById('explore-grid');
    els.toast = document.getElementById('explore-toast');
    els.modalBackdrop = document.getElementById('explore-modal');
    els.modalTitle = document.getElementById('modal-title');
    els.modalBadge = document.getElementById('modal-badge');
    els.modalBody = document.getElementById('modal-body');

    els.modalActionsTemplate =
      '<div class="explore-modal__actions">' +
      '<a class="explore-modal__btn explore-modal__btn--primary" data-maps href="#" target="_blank" rel="noopener noreferrer">Get directions</a>' +
      '<button type="button" class="explore-modal__btn explore-modal__btn--secondary" data-modal-close>Close</button>' +
      '</div>';

    bind();
    fullRefresh();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
