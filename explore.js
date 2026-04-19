(function () {
  'use strict';

  var STORAGE_KEY = 'morganTripPlaces';

  var CHIPS = [
    'All',
    'Dining',
    'Waterfront',
    'Brunch',
    'Kid-Friendly',
    'Nature',
    'Free',
    'Coffee',
    'Shopping',
  ];

  var SECTION_ORDER = ['eat', 'water', 'play', 'outdoors', 'shop'];
  var SECTION_LABELS = {
    eat: {
      title: 'Where to eat',
      blurb: 'Celebration dinners, waterfront decks, brunch, coffee stops, and easy group meals.',
    },
    water: {
      title: 'Water & scenic',
      blurb: 'River cruises, the Riverwalk, history on the water, and classic South Florida views.',
    },
    play: {
      title: 'Museums & indoor fun',
      blurb: 'Cool, indoor spots when you need a break from the sun — art, science, and kid-friendly exhibits.',
    },
    outdoors: {
      title: 'Beach, parks & nature',
      blurb: 'Shores, mangrove trails, gardens, and wildlife at a relaxed pace.',
    },
    shop: {
      title: 'Shopping & strolls',
      blurb: 'Walkable districts, malls, and outlets when you want to wander between meals.',
    },
  };

  var places = [
    {
      id: 'shooters-waterfront',
      image: 'images/explore/shooters-waterfront.jpg',
      sectionKey: 'eat',
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
      image: 'images/explore/roccos-tacos.png',
      sectionKey: 'eat',
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
      image: 'images/explore/lesters-diner.jpg',
      sectionKey: 'eat',
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
      image: 'images/explore/coconuts-by-the-water.jpg',
      sectionKey: 'eat',
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
      image: 'images/explore/pirate-republic.jpg',
      sectionKey: 'eat',
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
      image: 'images/explore/big-city-tavern.jpg',
      sectionKey: 'eat',
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
      image: 'images/explore/jungle-queen.png',
      sectionKey: 'water',
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
      image: 'images/explore/xtreme-action-park.jpg',
      sectionKey: 'play',
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
      image: 'images/explore/ftl-beach.jpg',
      sectionKey: 'outdoors',
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
      image: 'images/explore/riverwalk-water-taxi.jpg',
      sectionKey: 'water',
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
      image: 'images/explore/mods.jpg',
      sectionKey: 'play',
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
      image: 'images/explore/butterfly-world.jpg',
      sectionKey: 'outdoors',
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
      image: 'images/explore/hugh-taylor-birch.jpg',
      sectionKey: 'outdoors',
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
    {
      id: 'louie-bossi',
      image: 'images/explore/louie-bossi.jpg',
      sectionKey: 'eat',
      name: "Louie Bossi's Ristorante Bar Pizzeria",
      kind: 'dining',
      categories: ['Dining', 'Kid-Friendly', 'Waterfront'],
      address: '100 E Las Olas Blvd, Fort Lauderdale, FL 33301',
      phone: '(954) 306-2640',
      website: 'https://www.louiebossi.com',
      price: '$$',
      rating: 4.6,
      description: 'Bustling Italian on Las Olas — pizza, pasta, and patio energy; strong for groups.',
      tags: ['Las Olas', 'Italian'],
      hours: 'Lunch and dinner daily — reserve for weekends.',
    },
    {
      id: 'boatyard',
      image: 'images/explore/boatyard.jpg',
      sectionKey: 'eat',
      name: 'Boatyard',
      kind: 'dining',
      categories: ['Dining', 'Waterfront', 'Brunch'],
      address: '1555 SE 17th St, Fort Lauderdale, FL 33316',
      phone: '(954) 525-7400',
      website: 'https://boatyard.restaurant/',
      price: '$$$',
      rating: 4.5,
      description: 'Upscale waterfront seafood and steaks; marina views and a celebratory vibe.',
      tags: ['Seafood', 'Marina'],
      hours: 'Brunch weekends; dinner nightly — check site.',
    },
    {
      id: 'kaluz-restaurant',
      image: 'images/explore/kaluz-restaurant.jpg',
      sectionKey: 'eat',
      name: 'Kaluz Restaurant',
      kind: 'dining',
      categories: ['Dining', 'Waterfront', 'Brunch'],
      address: '3300 E Commercial Blvd, Fort Lauderdale, FL 33308',
      phone: '(954) 626-0373',
      website: 'https://www.kaluzrestaurant.com',
      price: '$$',
      rating: 4.4,
      description: 'Casual waterfront dining with broad American menu — good for mixed tastes.',
      tags: ['Waterfront', 'Groups'],
      hours: 'Brunch Sat–Sun; lunch and dinner — confirm on site.',
    },
    {
      id: 'blue-moon-fish',
      image: 'images/explore/blue-moon-fish.jpg',
      sectionKey: 'eat',
      name: 'Blue Moon Fish Co.',
      kind: 'dining',
      categories: ['Dining', 'Waterfront', 'Brunch'],
      address: '4405 W Tradewinds Ave, Lauderdale-By-The-Sea, FL 33308',
      phone: '(954) 630-1810',
      website: 'https://www.bluemoonfishco.com',
      price: '$$$',
      rating: 4.7,
      description: 'Inlet views with upscale seafood — memorable spot for a splurge lunch or dinner.',
      tags: ['Seafood', 'Views'],
      hours: 'Brunch Sun; lunch and dinner — reservations recommended.',
    },
    {
      id: 'foxy-brown',
      image: 'images/explore/foxy-brown.jpg',
      sectionKey: 'eat',
      name: 'Foxy Brown',
      kind: 'dining',
      categories: ['Dining', 'Brunch', 'Kid-Friendly'],
      address: '476 N Federal Hwy, Fort Lauderdale, FL 33301',
      phone: '(954) 630-3389',
      website: 'https://www.foxybrownftl.com',
      price: '$$',
      rating: 4.6,
      description: 'Neighborhood brunch and lunch favorite — sandwiches, salads, and comfort plates.',
      tags: ['Brunch', 'Casual'],
      hours: 'Breakfast and lunch daily; closed some evenings — verify hours.',
    },
    {
      id: 'henrys-sandwich',
      image: 'images/explore/henrys-sandwich.jpg',
      sectionKey: 'eat',
      name: "Henry's Sandwich Station",
      kind: 'dining',
      categories: ['Dining', 'Kid-Friendly'],
      address: '545 NW 1st Ave, Fort Lauderdale, FL 33301',
      phone: '(954) 530-2817',
      website: 'https://www.henryssandwichstation.com',
      price: '$',
      rating: 4.8,
      description: 'Serious sandwiches and quick takeout — easy before the beach or convention center.',
      tags: ['Quick Bite', 'Local'],
      hours: 'Typically Mon–Sat — check site.',
    },
    {
      id: 'stork-patisserie',
      image: 'images/explore/stork-patisserie.jpg',
      sectionKey: 'eat',
      name: "Stork's Bakery & Coffee House",
      kind: 'dining',
      categories: ['Dining', 'Coffee', 'Brunch'],
      address: '210 S Federal Hwy, Fort Lauderdale, FL 33301',
      phone: '(954) 467-1225',
      website: 'https://www.storksbakery.com',
      price: '$',
      rating: 4.7,
      description: 'European-style bakery and espresso — pastries, quiche, and strong coffee.',
      tags: ['Coffee', 'Pastries'],
      hours: 'Early morning through afternoon — verify daily hours.',
    },
    {
      id: 'carrie-b-cruises',
      image: 'images/explore/carrie-b-cruises.jpg',
      sectionKey: 'water',
      name: 'Carrie B Cruises',
      kind: 'activity',
      categories: ['Waterfront', 'Kid-Friendly'],
      address: '801 Seabreeze Blvd, Fort Lauderdale, FL 33316 (Bahia Mar area)',
      phone: '(954) 768-9920',
      website: 'https://www.carrieb.com',
      price: '$$',
      rating: 4.5,
      description: 'Sightseeing cruises on the Intracoastal — alternative vibe to the Jungle Queen.',
      tags: ['Cruise', 'Sightseeing'],
      hours: 'Seasonal schedule — book ahead on carrieb.com.',
    },
    {
      id: 'stranahan-house',
      image: 'images/explore/stranahan-house.jpg',
      sectionKey: 'water',
      name: 'Historic Stranahan House Museum',
      kind: 'activity',
      categories: ['Waterfront', 'Nature', 'Kid-Friendly'],
      address: '335 SE 6th Ave, Fort Lauderdale, FL 33301',
      phone: '(954) 524-4723',
      website: 'https://www.stranahanhouse.org',
      price: '$',
      rating: 4.6,
      description: "Fort Lauderdale's oldest home — guided tours on the New River; quick culture stop.",
      tags: ['History', 'Tour'],
      hours: 'Tours Wed–Sun — buy tickets online.',
    },
    {
      id: 'nsu-art-museum',
      image: 'images/explore/nsu-art-museum.jpg',
      sectionKey: 'play',
      name: 'NSU Art Museum Fort Lauderdale',
      kind: 'activity',
      categories: ['Kid-Friendly'],
      address: '1 E Las Olas Blvd, Fort Lauderdale, FL 33301',
      phone: '(954) 525-5500',
      website: 'https://www.nsuartmuseum.org',
      price: '$$',
      rating: 4.5,
      description: 'Contemporary art in the heart of Las Olas — 1–2 hours, air-conditioned.',
      tags: ['Art', 'Downtown'],
      hours: 'Tue–Sun; closed Mon — see site.',
    },
    {
      id: 'young-at-art',
      image: 'images/explore/young-at-art.png',
      sectionKey: 'play',
      name: 'Young At Art Museum',
      kind: 'activity',
      categories: ['Kid-Friendly'],
      address: '8000 W Broward Blvd, Plantation, FL 33388',
      phone: '(954) 424-0085',
      website: 'https://www.youngatartmuseum.org',
      price: '$$',
      rating: 4.5,
      description: "Hands-on children's art museum — ideal for younger kids on a hot afternoon.",
      tags: ['Kids', 'Creative'],
      hours: 'Thu–Sun typical — confirm before you go.',
    },
    {
      id: 'flamingo-gardens',
      image: 'images/explore/flamingo-gardens.jpg',
      sectionKey: 'outdoors',
      name: 'Flamingo Gardens',
      kind: 'activity',
      categories: ['Nature', 'Kid-Friendly'],
      address: '3750 S Flamingo Rd, Davie, FL 33330',
      phone: '(954) 473-2955',
      website: 'https://www.flamingogardens.org',
      price: '$$',
      rating: 4.6,
      description: 'Botanical gardens, wildlife sanctuary, and flamingos — ~30 min west of downtown.',
      tags: ['Wildlife', 'Garden'],
      hours: 'Daily 9:30 AM–5 PM — last admission 4 PM.',
    },
    {
      id: 'anne-kolb-nature',
      image: 'images/explore/anne-kolb-nature.jpg',
      sectionKey: 'outdoors',
      name: 'Anne Kolb Nature Center',
      kind: 'activity',
      categories: ['Nature', 'Kid-Friendly', 'Free'],
      address: '751 Sheridan St, Hollywood, FL 33019',
      phone: '(954) 357-5180',
      website: 'https://www.broward.org/Parks/Pages/AnneKolb.aspx',
      price: 'Free',
      rating: 4.7,
      description: 'Elevated mangrove boardwalks and exhibits — calm nature break near Hollywood Beach.',
      tags: ['Boardwalk', 'Birding'],
      hours: 'Wed–Sun typical hours — check Broward site.',
    },
    {
      id: 'john-u-lloyd-beach',
      image: 'images/explore/john-u-lloyd-beach.jpg',
      sectionKey: 'outdoors',
      name: 'Dr. Von D. Mizell-Eula Johnson State Park',
      kind: 'activity',
      categories: ['Nature', 'Kid-Friendly'],
      address: '6503 N Ocean Dr, Dania Beach, FL 33004',
      phone: '(954) 923-2833',
      website: 'https://www.floridastateparks.org/parks-and-trails/dr-von-d-mizell-eula-johnson-state-park',
      price: '$',
      rating: 4.7,
      description: 'Quiet beach, reef snorkeling, and picnic pavilions — different vibe than busy A1A.',
      tags: ['Beach', 'Snorkel'],
      hours: '8 AM until sunset.',
    },
    {
      id: 'secret-woods',
      image: 'images/explore/secret-woods.jpg',
      sectionKey: 'outdoors',
      name: 'Secret Woods Nature Center',
      kind: 'activity',
      categories: ['Nature', 'Kid-Friendly', 'Free'],
      address: '2701 W State Rd 84, Fort Lauderdale, FL 33312',
      phone: '(954) 357-8888',
      website: 'https://www.broward.org/Parks/Pages/SecretWoods.aspx',
      price: 'Free',
      rating: 4.6,
      description: 'Short trails and a small exhibit hall — easy nature stop without a long drive.',
      tags: ['Trails', 'Easy'],
      hours: 'Wed–Sun — verify on Broward site.',
    },
    {
      id: 'las-olas-district',
      image: 'images/explore/las-olas-district.jpg',
      sectionKey: 'shop',
      name: 'Las Olas Boulevard',
      kind: 'shopping',
      categories: ['Shopping', 'Free', 'Kid-Friendly'],
      address: 'E Las Olas Blvd between SE 6th Ave & Federal Hwy, Fort Lauderdale, FL',
      phone: '',
      website: 'https://www.lasolasboulevard.com',
      price: 'Free',
      rating: 4.7,
      description: 'Flagship stroll — boutiques, galleries, and people-watching between meals.',
      tags: ['Walkable', 'Boutiques'],
      hours: 'Store hours vary; public sidewalk anytime.',
    },
    {
      id: 'the-galleria',
      image: 'images/explore/the-galleria.jpg',
      sectionKey: 'shop',
      name: 'The Galleria at Fort Lauderdale',
      kind: 'shopping',
      categories: ['Shopping', 'Kid-Friendly'],
      address: '2414 E Sunrise Blvd, Fort Lauderdale, FL 33304',
      phone: '(954) 564-1036',
      website: 'https://www.galleriamallfl.com',
      price: '$$',
      rating: 4.4,
      description: 'Full-service mall — department stores, AC, and food court for a rainy afternoon.',
      tags: ['Mall', 'AC'],
      hours: 'Mon–Sat 10 AM–9 PM, Sun 12–6 PM — confirm holidays.',
    },
    {
      id: 'sawgrass-mills',
      image: 'images/explore/sawgrass-mills.jpg',
      sectionKey: 'shop',
      name: 'Sawgrass Mills',
      kind: 'shopping',
      categories: ['Shopping', 'Kid-Friendly'],
      address: '12801 W Sunrise Blvd, Sunrise, FL 33323',
      phone: '(954) 846-2300',
      website: 'https://www.simon.com/mall/sawgrass-mills',
      price: '$$',
      rating: 4.5,
      description: 'Huge outlet mall — worth the ~25 min drive if shoppers want deals.',
      tags: ['Outlets', 'All Day'],
      hours: 'Typically 10 AM–9 PM — check Simon site.',
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
    var parts = [place.name, place.description || '', place.address || '', place.hours || ''];
    if (place.tags && place.tags.length) parts.push(place.tags.join(' '));
    if (place.categories && place.categories.length) parts.push(place.categories.join(' '));
    var hay = parts.join(' ').toLowerCase();
    return hay.indexOf(q) !== -1;
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

  /* Cards use bundled images under images/explore/<id>; Picsum remains a fallback if an image fails to load. */
  var GALLERY_FALLBACK_PIC_IDS = { eat: 429, water: 1050, play: 206, outdoors: 575, shop: 366 };

  function gallerySeedSegment(place) {
    return ('morgan-' + place.sectionKey + '-' + place.id).replace(/[^a-zA-Z0-9-]/g, '-');
  }

  function galleryImageUrl(place) {
    if (place.image) return place.image;
    return (
      'https://picsum.photos/seed/' + encodeURIComponent(gallerySeedSegment(place)) + '/720/480'
    );
  }

  function attachGalleryImgFallback(img, place) {
    if (!img) return;
    img.addEventListener(
      'error',
      function onErr() {
        img.removeEventListener('error', onErr);
        var fid = GALLERY_FALLBACK_PIC_IDS[place.sectionKey] || 292;
        img.src = 'https://picsum.photos/id/' + fid + '/720/480';
        img.addEventListener(
          'error',
          function onErr2() {
            img.removeEventListener('error', onErr2);
            img.src = 'https://picsum.photos/720/480';
          },
          { once: true }
        );
      },
      { once: true }
    );
  }

  function createPlaceWrap(place) {
    var st = getState(place.id);
    var badgeClass =
      place.kind === 'dining'
        ? 'place-card__badge--dining'
        : place.kind === 'shopping'
          ? 'place-card__badge--shopping'
          : 'place-card__badge--activity';
    var badgeText =
      place.kind === 'dining' ? 'Dining' : place.kind === 'shopping' ? 'Shops' : 'Activity';

    var wrap = document.createElement('div');
    wrap.className = 'explore-card-wrap';
    wrap.dataset.placeId = place.id;

    var card = document.createElement('article');
    card.className =
      'card place-card place-card--gallery' + (st.visited ? ' is-visited' : '');
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', 'Details for ' + place.name);

    card.innerHTML =
      '<div class="place-card__media">' +
      '<img class="place-card__img" src="' +
      escapeAttr(galleryImageUrl(place)) +
      '" alt="' +
      escapeAttr(place.name) +
      '" loading="lazy" decoding="async" referrerpolicy="no-referrer" width="720" height="480" />' +
      '<span class="place-card__badge ' +
      badgeClass +
      '">' +
      escapeHtml(badgeText) +
      '</span>' +
      '</div>' +
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

    attachGalleryImgFallback(card.querySelector('.place-card__img'), place);

    wrap.appendChild(card);
    return wrap;
  }

  function renderToc() {
    var toc = document.getElementById('explore-toc');
    if (!toc) return;

    var linkParts = [];
    SECTION_ORDER.forEach(function (sk) {
      var has = places.some(function (p) {
        return p.sectionKey === sk && placeVisible(p);
      });
      if (!has) return;
      var meta = SECTION_LABELS[sk];
      linkParts.push(
        '<a class="explore-toc__link" href="#explore-' +
          sk +
          '">' +
          escapeHtml(meta.title) +
          '</a>'
      );
    });

    if (!linkParts.length) {
      toc.innerHTML = '';
      toc.setAttribute('hidden', '');
      return;
    }

    toc.removeAttribute('hidden');
    toc.innerHTML =
      '<span class="explore-toc__label">Jump to</span>' + linkParts.join('');
  }

  function renderSections() {
    els.main.innerHTML = '';
    var any = false;

    SECTION_ORDER.forEach(function (sk) {
      var inSection = places.filter(function (p) {
        return p.sectionKey === sk && placeVisible(p);
      });
      if (!inSection.length) return;
      any = true;

      var meta = SECTION_LABELS[sk];
      var section = document.createElement('section');
      section.className = 'explore-cat';
      section.id = 'explore-' + sk;

      var head = document.createElement('header');
      head.className = 'explore-cat__head';
      var h2 = document.createElement('h2');
      h2.className = 'explore-cat__title';
      h2.textContent = meta.title;
      var blurb = document.createElement('p');
      blurb.className = 'explore-cat__blurb';
      blurb.textContent = meta.blurb;
      head.appendChild(h2);
      head.appendChild(blurb);
      section.appendChild(head);

      var grid = document.createElement('div');
      grid.className = 'explore-grid explore-grid--cat';
      inSection.forEach(function (place) {
        grid.appendChild(createPlaceWrap(place));
      });
      section.appendChild(grid);
      els.main.appendChild(section);
    });

    if (!any) {
      var empty = document.createElement('p');
      empty.className = 'explore-empty';
      empty.textContent = 'No places match your filters. Try All or clear the search.';
      els.main.appendChild(empty);
    }

    renderToc();
  }

  function fullRefresh() {
    renderChips();
    updateStatsUI();
    renderSections();
  }

  function softRefresh() {
    updateStatsUI();
    renderSections();
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
    var modalKind =
      place.kind === 'dining' ? 'Dining' : place.kind === 'shopping' ? 'Shops' : 'Activity';
    var modalBadgeClass =
      place.kind === 'dining'
        ? 'place-card__badge--dining'
        : place.kind === 'shopping'
          ? 'place-card__badge--shopping'
          : 'place-card__badge--activity';
    els.modalBadge.textContent = modalKind;
    els.modalBadge.className = 'place-card__badge ' + modalBadgeClass;

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
      var wrap = els.main.querySelector('.explore-card-wrap[data-place-id="' + pick.id + '"]');
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

    els.main.addEventListener('click', function (e) {
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

    els.main.addEventListener('keydown', function (e) {
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
    els.main = document.getElementById('explore-main');
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
