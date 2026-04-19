(function () {
  'use strict';

  var STORAGE_KEY = 'morganTripPlaces';
  var NAME_KEY = 'morganTripUser';
  var SUPABASE_URL = 'https://gvacgvtokbjnqmaiynpr.supabase.co';
  var SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2YWNndnRva2JqbnFtYWl5bnByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxMjA3NzIsImV4cCI6MjA5MTY5Njc3Mn0.BTuscHq7T1lJbSKv-UNk5tfhbJTvscr_NgZSggvVH54';
  var FAMILY_NAMES = ['Morgan', 'Runell', 'Lillie', 'Marvin', 'Kai', 'Khol', 'Nathan', 'Kayla', 'Kelis', 'Keosha'];
  var sb = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON) : null;
  var allFavorites = [];
  var currentUser = localStorage.getItem(NAME_KEY) || '';

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
      menuHighlights: [
        { name: 'Macadamia nut mahi mahi', price: '$39' },
        { name: 'Half-pound lobster roll', price: '$42' },
        { name: 'Blackened fish tacos', price: '$22' },
        { name: 'Jumbo lump crab cakes', price: '$24' },
        { name: 'Shrimp & crab Louie salad', price: '$26' },
        { name: 'Prime burgers', price: '$21' },
        { name: 'Raw oysters (half dozen)', price: '$28' },
        { name: 'Key lime pie', price: '$12' },
        { name: 'Sesame-seared tuna appetizer', price: '$19' },
        { name: 'Wood-grilled salmon', price: '$36' },
      ],
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
      menuHighlights: [
        { name: 'Tableside guacamole', price: '$16' },
        { name: 'Carne asada tacos (3)', price: '$18' },
        { name: 'Chicken enchiladas suizas', price: '$19' },
        { name: 'California burrito', price: '$22' },
        { name: 'Rocco salad with grilled shrimp', price: '$17' },
        { name: 'Queso fundido', price: '$14' },
        { name: 'Street corn', price: '$12' },
        { name: 'Fish tacos', price: '$17' },
        { name: 'Steak fajitas', price: '$26' },
        { name: 'Churros with chocolate', price: '$10' },
      ],
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
      menuHighlights: [
        { name: 'Greek omelette', price: '$14' },
        { name: 'Corned beef hash & eggs', price: '$13' },
        { name: 'Patty melt', price: '$15' },
        { name: 'Open-face Reuben', price: '$16' },
        { name: 'Chicken souvlaki platter', price: '$18' },
        { name: 'Hot turkey sandwich', price: '$14' },
        { name: 'Banana pecan pancakes', price: '$12' },
        { name: 'Chocolate malt', price: '$8' },
        { name: 'Meatloaf dinner', price: '$15' },
        { name: 'NY strip steak dinner', price: '$28' },
      ],
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
      menuHighlights: [
        { name: 'Coconut shrimp', price: '$18' },
        { name: 'Blackened mahi sandwich', price: '$18' },
        { name: 'Fish & chips', price: '$22' },
        { name: 'Conch fritters', price: '$14' },
        { name: 'Key West pink shrimp dinner', price: '$28' },
        { name: 'Cheeseburger', price: '$16' },
        { name: 'Grilled chicken Caesar', price: '$17' },
        { name: 'Key lime pie', price: '$9' },
        { name: 'Crab cake sandwich', price: '$20' },
        { name: 'Coconut mojito', price: '$12' },
      ],
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
      menuHighlights: [
        { name: 'Jerk chicken', price: '$22' },
        { name: 'Pulled pork sandwich', price: '$15' },
        { name: 'Coconut shrimp', price: '$17' },
        { name: 'Blackened fish tacos', price: '$16' },
        { name: 'Rum flight (3)', price: '$18' },
        { name: 'Kids mac & cheese', price: '$9' },
        { name: 'Conch fritters', price: '$14' },
        { name: 'Key lime pie', price: '$9' },
        { name: 'Grilled catch of the day', price: '$28' },
        { name: 'Pirate punch (fish bowl)', price: '$16' },
      ],
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
      menuHighlights: [
        { name: 'Prime rib (10 oz)', price: '$38' },
        { name: 'Filet mignon', price: '$44' },
        { name: 'Lobster bisque', price: '$14' },
        { name: 'BCT burger', price: '$22' },
        { name: 'Seared sea scallops', price: '$36' },
        { name: 'Rigatoni alla vodka', price: '$24' },
        { name: 'Brunch egg Benedict', price: '$16' },
        { name: 'Tuna tartare', price: '$19' },
        { name: 'Crème brûlée', price: '$12' },
        { name: 'House Caesar', price: '$14' },
      ],
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
      feeSchedule: [
        {
          label: '90-minute narrated sightseeing — adult (typical advance online)',
          value: 'from ~$31',
        },
        { label: 'Youth pricing', value: 'See checkout at junglequeen.com' },
        {
          label: 'Evening Bahia Mar parking (night cruises — pay onboard)',
          value: '$20 / vehicle validated',
        },
      ],
      feeSourceNote:
        'junglequeen.com · Per-person fares vary by date/show; infants under 2 must be counted in the reservation.',
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
      feeSchedule: [
        { label: 'Park entry', value: 'Free (pay per attraction)' },
        { label: 'Trampoline — 1 hour', value: '$20 / person (tax incl.)' },
        { label: 'Trampoline grip socks', value: '$4 (required)' },
        { label: 'Go-karts — Pro race (1 session)', value: '$29' },
        { label: 'Go-karts — Xtreme Race License + head sock', value: '$10 (new riders)' },
        { label: 'Go-karts — Junior session (ages 5–9)', value: '$17' },
        { label: 'Laser tag — 1 session', value: '$15' },
        { label: 'Mini golf', value: '$17' },
        { label: 'Bowling — per game', value: '$11' },
        { label: 'New arcade/game card', value: '$5 card fee (new customers)' },
      ],
      feeSourceNote:
        'xtremeactionpark.com/prices · Feb 2026 sheet; age/height/weight limits apply; prices include sales tax.',
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
      feeSchedule: [
        { label: 'Beach & Intracoastal access', value: 'Free' },
        {
          label: 'Parking along A1A / garages',
          value: 'Paid meters & lots — rates vary',
        },
      ],
      feeSourceNote: 'No admission to the beach itself; parking is posted on-site.',
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
      feeSchedule: [
        {
          label: 'Riverwalk parks & Water Trolley (downtown stops)',
          value: 'Free',
        },
        { label: 'Water Taxi — All Day Pass adult (10 AM–10 PM)', value: '$38' },
        { label: 'Water Taxi — ages 5–11', value: '$18' },
        { label: 'Water Taxi — ages 0–4', value: 'Free' },
        {
          label: 'Water Taxi — Evening Pass adult (after 5 PM)',
          value: '$25',
        },
        {
          label: 'Water Taxi — Multi-Day Pass (30 consecutive days)',
          value: '$140',
        },
      ],
      feeSourceNote:
        'watertaxi.com FAQ · Route includes Hollywood; Pompano-only pricing differs; riders under 5 ride free.',
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
      feeSchedule: [
        {
          label: 'Discovery Pass — Adult (exhibits + one IMAX)',
          value: '$28',
        },
        {
          label: 'Discovery Pass — Child ages 1–12',
          value: '$23',
        },
        { label: 'Discovery Pass — Senior 65+', value: '$26' },
        { label: 'Discovery Pass — Military', value: '$25' },
        { label: 'Infants ages 0–12 months', value: 'Free' },
        {
          label: 'South FL residents — Adult (Tri-County ID)',
          value: '$25 same bundle',
        },
        {
          label: 'Museums for All (SNAP/EBT/WIC + photo ID)',
          value: '$4 / person (≤4)',
        },
      ],
      feeSourceNote:
        'mods.org/tickets · Non-member Discovery Pass; PLUS/IMAX bundles cost more — see website.',
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
      feeSchedule: [
        {
          label: 'General admission — ages 12+',
          value: '$32.50',
        },
        { label: 'Children ages 3–11', value: '$22.50' },
        { label: 'Ages 2 & under', value: 'Free' },
        {
          label: 'Tradewinds Park vehicle fee (weekends & holidays)',
          value: '$3 (≤8 people)',
        },
      ],
      feeSourceNote:
        'butterflyworld.com · Inside Tradewinds Park; weekday parking often free — confirm gate signage.',
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
      feeSchedule: [
        {
          label: 'Vehicle entry (≤8 people)',
          value: '$6',
        },
        {
          label: 'Single-occupant vehicle / motorcycle',
          value: '$4',
        },
        {
          label: 'Pedestrians, cyclists, extra passengers',
          value: '$2',
        },
      ],
      feeSourceNote:
        'floridastateparks.org · Fee applies per vehicle/walk-in; Florida State Parks annual passes accepted.',
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
      menuHighlights: [
        { name: 'Wood-fired margherita pizza', price: '$18' },
        { name: 'Spaghetti carbonara', price: '$22' },
        { name: 'Chicken parmesan', price: '$26' },
        { name: 'Burrata appetizer', price: '$18' },
        { name: 'Tagliatelle Bolognese', price: '$23' },
        { name: 'Eggplant parmigiana', price: '$21' },
        { name: 'Lasagna alla Napoletana', price: '$24' },
        { name: 'Prosciutto & fig flatbread', price: '$17' },
        { name: 'Affogato', price: '$9' },
        { name: 'Tiramisu', price: '$11' },
      ],
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
      menuHighlights: [
        { name: 'Whole crispy snapper', price: '$48' },
        { name: 'Maine lobster roll', price: '$38' },
        { name: 'Filet mignon (8 oz)', price: '$48' },
        { name: 'Jumbo lump crab cakes', price: '$24' },
        { name: 'Wood-grilled salmon', price: '$42' },
        { name: 'Raw bar trio', price: '$44' },
        { name: 'Tuna poke bowl', price: '$28' },
        { name: 'Weekend brunch entrée', price: '$28' },
        { name: 'Key lime pie', price: '$12' },
        { name: 'Colossal shrimp cocktail', price: '$22' },
      ],
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
      menuHighlights: [
        { name: 'Chilean sea bass', price: '$46' },
        { name: 'Center-cut filet', price: '$48' },
        { name: 'Fire-grilled artichoke', price: '$16' },
        { name: 'Kaluz burger', price: '$22' },
        { name: 'Pan-roasted chicken', price: '$32' },
        { name: 'Fish tacos', price: '$21' },
        { name: 'Caesar salad', price: '$14' },
        { name: 'Key lime martini', price: '$14' },
        { name: 'Chocolate lava cake', price: '$12' },
        { name: 'Grilled swordfish', price: '$38' },
      ],
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
      menuHighlights: [
        { name: 'Yellowtail snapper', price: '$42' },
        { name: 'South African lobster tail', price: '$68' },
        { name: 'Oysters on the half shell (half dozen)', price: '$22' },
        { name: 'Seared rare tuna appetizer', price: '$22' },
        { name: 'Sunday brunch buffet', price: '$48' },
        { name: 'Surf & turf', price: '$72' },
        { name: 'Shrimp scampi linguine', price: '$34' },
        { name: 'Key lime pie', price: '$11' },
        { name: 'Colossal stone crab claws', price: 'Market' },
        { name: 'Crab-stuffed lobster', price: '$56' },
      ],
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
      menuHighlights: [
        { name: 'Foxy breakfast bowl', price: '$14' },
        { name: 'Nutella-stuffed French toast', price: '$15' },
        { name: 'Fried chicken sandwich', price: '$16' },
        { name: 'Smash burger', price: '$17' },
        { name: 'Avocado toast', price: '$13' },
        { name: 'Kale Caesar salad', price: '$13' },
        { name: 'Chicken & waffles', price: '$16' },
        { name: 'BLTA', price: '$14' },
        { name: 'Cold brew float', price: '$8' },
        { name: 'Side of bacon', price: '$6' },
      ],
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
      menuHighlights: [
        { name: 'Pastrami Reuben', price: '$16' },
        { name: 'Nashville hot chicken sandwich', price: '$15' },
        { name: 'Italian cold cut', price: '$14' },
        { name: 'French dip', price: '$15' },
        { name: 'Cubano', price: '$13' },
        { name: 'Loaded fries', price: '$8' },
        { name: 'Breakfast sandwich', price: '$12' },
        { name: 'Side mac & cheese', price: '$7' },
        { name: 'House chocolate chip cookie', price: '$4' },
        { name: 'Korean fried chicken sandwich', price: '$15' },
      ],
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
      menuHighlights: [
        { name: 'Almond croissant', price: '$5' },
        { name: 'Spinach & feta quiche slice', price: '$9' },
        { name: 'Bagel with lox & schmear', price: '$14' },
        { name: 'Large latte', price: '$5' },
        { name: 'Chocolate croissant', price: '$5' },
        { name: 'Breakfast burrito', price: '$12' },
        { name: 'Key lime tart', price: '$6' },
        { name: 'Cinnamon roll', price: '$6' },
        { name: 'Cold brew (16 oz)', price: '$5' },
        { name: 'Spinach pie slice', price: '$8' },
      ],
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
      feeSchedule: [
        {
          label: 'Narrated sightseeing cruise — adult (typical online)',
          value: 'from ~$30',
        },
        {
          label: 'Child 3–12 (reseller sites; confirm official)',
          value: 'from ~$20',
        },
        { label: 'Ages 0–2', value: 'See carrieb.com' },
      ],
      feeSourceNote:
        'carrieb.com — 90-minute “Venice of America” tours; buy direct for current bar & snack pricing.',
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
      feeSchedule: [
        {
          label: 'Guided docent tour — Adult (under 60)',
          value: '$12',
        },
        {
          label: 'Guided docent tour — Senior ages 60+',
          value: '$11',
        },
        {
          label: 'Student with ID',
          value: '$7',
        },
        { label: 'Ages 0–5', value: 'Free' },
      ],
      feeSourceNote:
        'stranahanhouse.org/visit · Admission by guided tour only; purchase online or at door subject to availability.',
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
      feeSchedule: [
        { label: 'General admission — Adults', value: '$16' },
        { label: 'Seniors', value: '$10' },
        { label: 'U.S. military', value: '$8' },
        { label: 'College students (valid ID)', value: '$5' },
        { label: 'Ages 13–17', value: 'Free' },
        {
          label: 'Ages 12 & under; NSU/BC students & listed members',
          value: 'Free',
        },
        {
          label: 'U.S. veterans & dependents (same household)',
          value: 'Free',
        },
      ],
      feeSourceNote:
        'nsuartmuseum.org/visit · First Thursday monthly free 11a–7p; special ticketed shows may cost extra.',
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
      feeSchedule: [
        {
          label: 'Museum admission — ages 2+ (children & adults)',
          value: '$12 each',
        },
        { label: 'Under 2 years', value: 'Free' },
      ],
      feeSourceNote:
        'youngatartmuseum.org/visit · Located inside Broward Mall; members free.',
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
      feeSchedule: [
        {
          label: 'General admission — Adults ages 12+',
          value: '$24',
        },
        {
          label: 'Children ages 3–11',
          value: '$17',
        },
        { label: 'Ages 2 & under; members', value: 'Free' },
        {
          label: 'Wheelchair / stroller rental',
          value: '$7–$30 + deposit',
        },
      ],
      feeSourceNote:
        'flamingogardens.org/visit · Parking free; tram & aviary close before 5 PM.',
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
      feeSchedule: [
        {
          label: 'Nature center exhibits & boardwalks',
          value: 'Free',
        },
        {
          label: 'County park vehicle fee (weekends/holidays)',
          value: '$3 (≤8 occupants)',
        },
      ],
      feeSourceNote:
        'broward.org/Parks · Weekday gate fees often waived — read entrance signage.',
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
      feeSchedule: [
        {
          label: 'Vehicle entry (≤8 people)',
          value: '$6',
        },
        {
          label: 'Single-occupant vehicle / motorcycle',
          value: '$4',
        },
        {
          label: 'Pedestrians / cyclists / extra passengers',
          value: '$2',
        },
        {
          label: 'Boat ramp launch',
          value: '$9 + tax',
        },
      ],
      feeSourceNote:
        'floridastateparks.org · Former John U. Lloyd Beach; snorkeling from shore — gear not included.',
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
      feeSchedule: [
        {
          label: 'Nature center exhibits & trails',
          value: 'Free',
        },
        {
          label: 'County park vehicle fee (if gate charged)',
          value: 'See broward.org/Parks/Fees',
        },
      ],
      feeSourceNote:
        'Small urban nature stop; weekends may require the standard Broward regional-park vehicle fee.',
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
      feeSchedule: [
        { label: 'Strolling the boulevard', value: 'Free' },
        {
          label: 'Street parking / garages',
          value: 'Paid — varies by block',
        },
      ],
      feeSourceNote: 'No district admission; shop & dining prices vary by merchant.',
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
      feeSchedule: [
        { label: 'Mall entry', value: 'Free' },
        {
          label: 'Parking (garage & surface)',
          value: 'Paid premium options + free lots — see site',
        },
      ],
      feeSourceNote:
        'galleriamallfl.com · Valet or reserved parking may charge separate rates.',
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
      feeSchedule: [
        { label: 'Mall & outlet entry', value: 'Free' },
        {
          label: 'Parking',
          value: 'Large free lots; premium spots may charge',
        },
      ],
      feeSourceNote:
        'simon.com/mall/sawgrass-mills · Electric vehicle or valet stalls may bill hourly.',
    },
    {
      id: 'aventura-mall',
      image: 'images/explore/aventura-mall.jpg',
      sectionKey: 'shop',
      name: 'Aventura Mall',
      kind: 'shopping',
      categories: ['Shopping', 'Kid-Friendly'],
      address: '19501 Biscayne Blvd, Aventura, FL 33180',
      phone: '(305) 935-1110',
      website: 'https://www.aventuramall.com',
      price: '$$',
      rating: 4.6,
      description:
        'Major enclosed mall north of Miami — upscale anchors and a wide mix of shops; worth the drive if your group wants a big mall day.',
      tags: ['Mall', 'Anchors'],
      hours: 'Typically Mon–Sat 11 AM–9 PM, Sun 12–8 PM — confirm holidays.',
      feeSchedule: [
        { label: 'Mall entry', value: 'Free' },
        {
          label: 'Parking (multi-level garages)',
          value: 'Usually free — premium/valet may charge',
        },
      ],
      feeSourceNote:
        'aventuramall.com · From Fort Lauderdale, plan ~30–40 min depending on traffic.',
    },
    {
      id: 'broward-mall',
      image: 'images/explore/westfield-broward.jpg',
      sectionKey: 'shop',
      name: 'Broward Mall',
      kind: 'shopping',
      categories: ['Shopping', 'Kid-Friendly'],
      address: '8000 W Broward Blvd, Plantation, FL 33388',
      phone: '(954) 473-8100',
      website: 'https://visitbrowardmall.com',
      price: '$$',
      rating: 4.4,
      description:
        'Regional mall in Plantation (long known as Westfield Broward) — closer than Sawgrass if you want department stores without as long a haul.',
      tags: ['Mall', 'Regional'],
      hours: 'Typically Mon–Sat 10 AM–9 PM, Sun 11 AM–6 PM — confirm on site.',
      feeSchedule: [
        { label: 'Mall entry', value: 'Free' },
        {
          label: 'Parking',
          value: 'Large free lots; premium or reserved spots may charge',
        },
      ],
      feeSourceNote:
        'visitbrowardmall.com · ~20–25 min west of downtown Fort Lauderdale in normal traffic.',
    },
    {
      id: 'bal-harbour-shops',
      image: 'images/explore/bal-harbour-shops.jpg',
      sectionKey: 'shop',
      name: 'Bal Harbour Shops',
      kind: 'shopping',
      categories: ['Shopping'],
      address: '9700 Collins Ave, Bal Harbour, FL 33154',
      phone: '(305) 866-0311',
      website: 'https://balharbourshops.com',
      price: '$$$',
      rating: 4.7,
      description:
        'Open-air luxury destination — designer boutiques and polished dining; window-shopping is an event.',
      tags: ['Luxury', 'Walkable'],
      hours: 'Typically Mon–Sat 11 AM–8 PM, Sun 12–7 PM — verify holidays.',
      feeSchedule: [
        { label: 'Courtyard entry', value: 'Free' },
        {
          label: 'Parking (garage/valet)',
          value: 'Paid — see mall site',
        },
      ],
      feeSourceNote:
        'balharbourshops.com · About 35–45 min south via A1A/I-95 depending on traffic.',
    },
    {
      id: 'coral-square-mall',
      image: 'images/explore/coral-square-mall.jpg',
      sectionKey: 'shop',
      name: 'Coral Square',
      kind: 'shopping',
      categories: ['Shopping', 'Kid-Friendly'],
      address: '9469 W Atlantic Blvd, Coral Springs, FL 33071',
      phone: '(954) 755-5550',
      website: 'https://www.simon.com/mall/coral-square',
      price: '$$',
      rating: 4.3,
      description:
        'Simon-managed mall in Coral Springs — straightforward indoor shopping northwest of Fort Lauderdale.',
      tags: ['Mall', 'Regional'],
      hours: 'Typically Mon–Sat 11 AM–8 PM, Sun 12–6 PM — check Simon for holidays.',
      feeSchedule: [
        { label: 'Mall entry', value: 'Free' },
        {
          label: 'Parking',
          value: 'Free surface lots',
        },
      ],
      feeSourceNote:
        'simon.com/mall/coral-square · ~25–35 min northwest of central Fort Lauderdale.',
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

  /* --- Supabase-backed state --- */

  function loadFavoritesFromSupabase(cb) {
    if (!sb) { cb && cb(); return; }
    sb.from('trip_favorites').select('*').then(function (res) {
      allFavorites = (res.data || []);
      cb && cb();
    });
  }

  function getState(id) {
    if (!currentUser) return { favorite: false, wantToGo: false, visited: false };
    var fav = false, want = false, vis = false;
    allFavorites.forEach(function (r) {
      if (r.place_id === id && r.person_name === currentUser) {
        if (r.action === 'favorite') fav = true;
        if (r.action === 'wantToGo') want = true;
        if (r.action === 'visited') vis = true;
      }
    });
    return { favorite: fav, wantToGo: want, visited: vis };
  }

  function setState(id, partial) {
    if (!currentUser || !sb) return;
    var action = Object.keys(partial)[0];
    var isOn = partial[action];
    if (isOn) {
      var row = { person_name: currentUser, place_id: id, action: action };
      allFavorites.push(row);
      sb.from('trip_favorites').upsert(row, { onConflict: 'person_name,place_id,action' }).then(function () {});
    } else {
      allFavorites = allFavorites.filter(function (r) {
        return !(r.person_name === currentUser && r.place_id === id && r.action === action);
      });
      sb.from('trip_favorites').delete()
        .eq('person_name', currentUser)
        .eq('place_id', id)
        .eq('action', action)
        .then(function () {});
    }
  }

  function countBy(key) {
    if (!currentUser) return 0;
    return places.filter(function (p) {
      return getState(p.id)[key];
    }).length;
  }

  function getPeopleForPlace(id, action) {
    var names = [];
    allFavorites.forEach(function (r) {
      if (r.place_id === id && r.action === action && names.indexOf(r.person_name) === -1) {
        names.push(r.person_name);
      }
    });
    return names;
  }

  function ensureUser(cb) {
    if (currentUser) { cb(); return; }
    showNamePicker(cb);
  }

  function showNamePicker(cb) {
    var backdrop = document.getElementById('name-picker-backdrop');
    var btnsWrap = document.getElementById('name-picker-buttons');
    var customInput = document.getElementById('name-picker-custom');
    var goBtn = document.getElementById('name-picker-go');
    backdrop.setAttribute('aria-hidden', 'false');
    backdrop.classList.add('is-open');

    btnsWrap.innerHTML = '';
    FAMILY_NAMES.forEach(function (name) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = name;
      btn.style.cssText = 'padding:8px 16px;background:var(--gold-pale);border:2px solid var(--gold);border-radius:8px;font-size:14px;font-weight:600;color:var(--navy);cursor:pointer;transition:background 0.2s;';
      btn.addEventListener('click', function () {
        pickName(name);
      });
      btnsWrap.appendChild(btn);
    });

    function pickName(name) {
      currentUser = name.trim();
      if (!currentUser) return;
      localStorage.setItem(NAME_KEY, currentUser);
      backdrop.classList.remove('is-open');
      backdrop.setAttribute('aria-hidden', 'true');
      updateUserBadge();
      cb && cb();
    }

    goBtn.onclick = function () {
      var val = customInput.value.trim();
      if (val) pickName(val);
    };
    customInput.onkeydown = function (e) {
      if (e.key === 'Enter') {
        var val = customInput.value.trim();
        if (val) pickName(val);
      }
    };
  }

  function updateUserBadge() {
    var badge = document.getElementById('current-user-badge');
    if (badge) {
      badge.textContent = currentUser || 'Pick name';
    }
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

  function peopleChipsHtml(placeId) {
    var names = getPeopleForPlace(placeId, 'favorite');
    if (!names.length) return '';
    var chips = names.map(function (n) {
      return '<span class="place-card__person">' + escapeHtml(n) + '</span>';
    }).join('');
    return '<div class="place-card__people">' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none" style="color:var(--gold);flex-shrink:0;margin-top:1px;"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>' +
      chips + '</div>';
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

  /** Sort key: 0 = free, 1–4 = $ count, 99 = unknown text */
  function priceRank(place) {
    var raw = String(place.price || '').trim();
    if (/^free$/i.test(raw)) return 0;
    var n = (raw.match(/\$/g) || []).length;
    return n > 0 ? n : 99;
  }

  /**
   * Structured price for cards/modal (Google-style $ scale + short label).
   * mod: free | d1–d4 | unknown
   */
  function priceTier(place) {
    var raw = String(place.price || '').trim();
    if (/^free$/i.test(raw)) {
      return { rank: 0, dots: '', label: 'Free', mod: 'free' };
    }
    var n = (raw.match(/\$/g) || []).length;
    if (n <= 0) {
      return { rank: 99, dots: '', label: raw, mod: 'unknown', raw: raw };
    }
    var labels = ['', 'Budget', 'Moderate', 'Upscale', 'Splurge'];
    var label = labels[n] || 'Splurge';
    var dots = '';
    for (var i = 0; i < n; i++) dots += '$';
    return { rank: n, dots: dots, label: label, mod: 'd' + Math.min(n, 4) };
  }

  function priceRowHtml(place) {
    var t = priceTier(place);
    if (t.mod === 'unknown') {
      return (
        '<div class="place-card__price">' +
        '<span class="price-tier price-tier--unknown">' +
        escapeHtml(t.raw) +
        '</span></div>'
      );
    }
    if (t.mod === 'free') {
      return (
        '<div class="place-card__price">' +
        '<span class="price-tier price-tier--free">Free</span>' +
        '</div>'
      );
    }
    return (
      '<div class="place-card__price">' +
      '<span class="price-tier price-tier--' +
      t.mod +
      '" title="' +
      escapeAttr(t.label + ' — typical entrée range') +
      '">' +
      '<span class="price-tier__dots">' +
      escapeHtml(t.dots) +
      '</span></span>' +
      '<span class="price-tier__label">' +
      escapeHtml(t.label) +
      '</span>' +
      '</div>'
    );
  }

  function priceModalInnerHtml(place) {
    var t = priceTier(place);
    if (t.mod === 'unknown') return escapeHtml(place.price);
    if (t.mod === 'free') return '<span class="price-tier price-tier--free">Free</span>';
    return (
      '<span class="price-tier price-tier--' +
      t.mod +
      '"><span class="price-tier__dots">' +
      escapeHtml(t.dots) +
      '</span></span> <span class="price-tier__label">' +
      escapeHtml(t.label) +
      '</span>'
    );
  }

  /** Dining only: popular picks with prices (modal). Max 10 items in data. */
  function feeScheduleSectionHtml(place) {
    if (!place.feeSchedule || !place.feeSchedule.length) return '';
    var fid = 'explore-modal-fees-' + place.id.replace(/[^a-zA-Z0-9_-]/g, '-');
    var note = place.feeSourceNote
      ? '<p class="explore-modal__fee-note">' + escapeHtml(place.feeSourceNote) + '</p>'
      : '';
    var lis = '';
    for (var i = 0; i < place.feeSchedule.length; i++) {
      var row = place.feeSchedule[i];
      lis +=
        '<li class="explore-modal__fee-item">' +
        '<span class="explore-modal__fee-label">' +
        escapeHtml(row.label) +
        '</span>' +
        '<span class="explore-modal__fee-value">' +
        escapeHtml(row.value) +
        '</span>' +
        '</li>';
    }
    return (
      '<section class="explore-modal__fee-block" aria-labelledby="' +
      escapeAttr(fid) +
      '">' +
      '<h3 id="' +
      escapeAttr(fid) +
      '" class="explore-modal__fee-title">Fees &amp; tickets</h3>' +
      note +
      '<ul class="explore-modal__fee-list">' +
      lis +
      '</ul></section>'
    );
  }

  function popularMenuSectionHtml(place) {
    if (place.kind !== 'dining' || !place.menuHighlights || !place.menuHighlights.length) return '';
    var items = place.menuHighlights.slice(0, 10);
    var mhId = 'explore-modal-menu-' + place.id.replace(/[^a-zA-Z0-9_-]/g, '-');
    var lis = '';
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      lis +=
        '<li class="explore-modal__menu-item">' +
        '<span class="explore-modal__menu-name">' +
        escapeHtml(it.name) +
        '</span>' +
        '<span class="explore-modal__menu-price">' +
        escapeHtml(it.price) +
        '</span>' +
        '</li>';
    }
    return (
      '<section class="explore-modal__menu-block" aria-labelledby="' +
      escapeAttr(mhId) +
      '">' +
      '<h3 id="' +
      escapeAttr(mhId) +
      '" class="explore-modal__menu-title">Popular menu items</h3>' +
      '<p class="explore-modal__menu-disclaimer">Representative items and prices — menus change; confirm when you order.</p>' +
      '<ul class="explore-modal__menu-list">' +
      lis +
      '</ul></section>'
    );
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
      priceRowHtml(place) +
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
      '</div>' +
      peopleChipsHtml(place.id) +
      '</div>';

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

  function captureExploreOpenSections() {
    var map = {};
    [].forEach.call(els.main.querySelectorAll('details.explore-cat'), function (d) {
      if (d.open) map[d.id] = true;
    });
    return map;
  }

  function applyExploreHash() {
    var id = location.hash.replace(/^#/, '');
    if (!id || id.indexOf('explore-') !== 0) return;
    var det = document.getElementById(id);
    if (det && det.tagName === 'DETAILS') {
      det.open = true;
    }
  }

  function renderSections() {
    var wasOpen = captureExploreOpenSections();

    els.main.innerHTML = '';
    var any = false;

    SECTION_ORDER.forEach(function (sk) {
      var inSection = places.filter(function (p) {
        return p.sectionKey === sk && placeVisible(p);
      });
      if (!inSection.length) return;
      any = true;

      inSection.sort(function (a, b) {
        var ra = priceRank(a);
        var rb = priceRank(b);
        if (ra !== rb) return ra - rb;
        return a.name.localeCompare(b.name);
      });

      var meta = SECTION_LABELS[sk];
      var sid = 'explore-' + sk;

      var details = document.createElement('details');
      details.className = 'explore-cat';
      details.id = sid;
      if (wasOpen[sid]) details.open = true;

      var summary = document.createElement('summary');
      summary.className = 'explore-cat__summary';

      var sumInner = document.createElement('div');
      sumInner.className = 'explore-cat__summary-inner';

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
      sumInner.appendChild(head);
      summary.appendChild(sumInner);
      details.appendChild(summary);

      var body = document.createElement('div');
      body.className = 'explore-cat__body';

      var grid = document.createElement('div');
      grid.className = 'explore-grid explore-grid--cat';
      inSection.forEach(function (place) {
        grid.appendChild(createPlaceWrap(place));
      });
      body.appendChild(grid);
      details.appendChild(body);

      els.main.appendChild(details);
    });

    if (!any) {
      var empty = document.createElement('p');
      empty.className = 'explore-empty';
      empty.textContent = 'No places match your filters. Try All or clear the search.';
      els.main.appendChild(empty);
    }

    renderToc();
    applyExploreHash();
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
    rows +=
      '<dt>Price</dt><dd class="explore-modal__dd explore-modal__price">' + priceModalInnerHtml(place) + '</dd>';
    rows += '</dl>';
    rows += feeScheduleSectionHtml(place);
    rows += popularMenuSectionHtml(place);

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
        var sectionDetails = wrap.closest('details.explore-cat');
        if (sectionDetails) sectionDetails.open = true;
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
        ensureUser(function () {
          var st = getState(id);
          var next = !st[action];
          var patch = {};
          patch[action] = next;
          setState(id, patch);
          softRefresh();
        });
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
    window.addEventListener('hashchange', applyExploreHash);

    /* Add user badge to stats area */
    var statsArea = document.querySelector('.explore-stats');
    if (statsArea) {
      var userBtn = document.createElement('button');
      userBtn.type = 'button';
      userBtn.className = 'explore-stat';
      userBtn.id = 'current-user-btn';
      userBtn.innerHTML =
        '<div class="explore-stat__icon" aria-hidden="true">' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' +
        '</div>' +
        '<div class="explore-stat__label">You are</div>' +
        '<div class="explore-stat__count" id="current-user-badge" style="font-size:13px;font-weight:700;">' + (currentUser || 'Pick name') + '</div>';
      userBtn.addEventListener('click', function () {
        showNamePicker(function () { softRefresh(); });
      });
      statsArea.appendChild(userBtn);
    }

    loadFavoritesFromSupabase(function () {
      fullRefresh();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
