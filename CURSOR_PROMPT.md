# Cursor AI Prompt — Morgan King Graduation Trip Website

## Copy everything below this line and paste it into Cursor's AI chat when you open the project.

---

You are editing a single-page static website for Dr. Morgan King's doctoral graduation celebration trip. The project is deployed on Vercel at https://morgan-graduation-trip.vercel.app and the GitHub repo is https://github.com/runellking123/morgan-graduation-trip.

## Project Structure

```
morgan-graduation-trip/
├── index.html          # The entire website (HTML + CSS, no JS framework)
├── morgan-photo.jpg    # Morgan's doctoral portrait (37KB, optimized)
├── Morgan's Doctoral Gown Head Shot 2.PNG  # Original hi-res photo (2.3MB, not used in site)
├── README.md           # Project readme with live URL
├── .gitignore          # Ignores .vercel directory
└── .vercel/            # Vercel deployment config
```

## Tech Stack

- **Pure HTML + CSS** — no JavaScript, no framework, no build step
- **Google Fonts** — Playfair Display (serif headings) + Inter (body text), loaded non-blocking
- **Deployed on Vercel** — redeploy with `vercel --prod` from the project root
- **GitHub** — push changes with `git add -A && git commit -m "message" && git push`

## Design System

### Colors (CSS custom properties in `:root`)
- `--navy: #0F1D36` — primary dark (hero, TOC bar, section number badges)
- `--navy-light: #1E3258` — secondary dark
- `--gold: #C5A030` — accent (borders, highlights, decorative lines)
- `--gold-bright: #D4AF37` — brighter gold for hover states
- `--gold-pale: #FBF5E0` — light gold for tip boxes, tags
- `--cream: #FAF8F3` — page background
- `--green: #2B8A3E` — prices
- `--red: #C92A2A` — urgent checklist items
- `--blue: #1971C2` — links

### Typography
- **Headings:** Playfair Display (serif), 700-800 weight
- **Body:** Inter (sans-serif), 400-700 weight
- **Base font size:** 15px desktop, 14px mobile

### Layout
- Max content width: 1100px, centered
- Cards: white background, 12px border radius, gold top-line on hover
- Section headers: numbered gold badges + Playfair Display h2 + gold underline

## Page Structure (current section order)

1. **Hero** — Morgan's doctoral portrait, name, trip subtitle, meta info bar
2. **Trip Summary** (always visible, not collapsible) — table with trip overview
3. **Airbnb Rentals** (collapsible) — 7 verified listings with prices, per-adult cost, comparison table
4. **Sprinter Van Rentals** (collapsible) — 5 Houston rental companies
5. **Budget Breakdown** (collapsible) — itemized cost table, per-adult split
6. **Graduation Day Logistics** (collapsible) — ceremony details, dress code, parking, tickets, photo spots
7. **Day-by-Day Agenda** (collapsible) — 4 day timeline (Thu-Sun)
8. **Restaurants** (collapsible) — 6 Fort Lauderdale dining options
9. **Kid-Friendly Activities** (collapsible) — 7 activity options
10. **Planning Checklist** (collapsible) — prioritized action items

## Key Details

- **Graduate:** Dr. Morgan King, Capella University doctoral degree
- **Ceremony:** Saturday, June 27, 2026 at 10:00 AM, Broward County Convention Center
- **Group:** 8 people (6 adults, 2 children)
- **Route:** Houston, TX → Fort Lauderdale, FL, driven straight through (~16 hrs each way)
- **Drivers:** Runell & Marvin, splitting driving time
- **Airbnb budget:** $1,290–$1,598 for 3 nights (all fees included)
- **Total trip budget:** ~$5,205 (~$868/adult)

## Responsive Breakpoints

- **Desktop:** default styles
- **Tablet (≤768px):** single-column cards, reduced padding
- **Phone (≤480px):** stacked layouts, smaller fonts, horizontal-scroll tables, compact TOC

## Collapsible Sections

Sections use native HTML `<details>` / `<summary>` elements. All start collapsed. The `+`/`−` toggle is rendered via CSS `::after` pseudo-element on the summary's `.section-header`.

## How to Deploy Changes

After making edits:
```bash
# Deploy to Vercel
vercel --prod

# Push to GitHub
git add -A && git commit -m "description of changes" && git push
```

## What I May Ask You To Do

- Change text content (names, dates, prices, descriptions)
- Adjust colors or typography
- Add/remove Airbnb listings or restaurants
- Improve mobile layout for specific sections
- Add new sections or features
- Convert to a multi-page site or add a framework (Next.js, etc.)
- Add interactive features (countdown timer, RSVP form, etc.)
- Improve animations or transitions

When I ask for changes, edit the `index.html` file directly. Show me the specific changes. Keep the existing design system consistent.
