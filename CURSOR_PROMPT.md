# Cursor AI Prompt — Morgan King Graduation Trip Website

## Copy everything below this line and paste it into Cursor's AI chat when you open the project.

---

You are editing a small **multi-page** static website for Dr. Morgan King's doctoral graduation celebration trip. The project is deployed on Vercel at https://morgan-graduation-trip.vercel.app and the GitHub repo is https://github.com/runellking123/morgan-graduation-trip.

**Information architecture:** The home page is a short hub (hero + trip summary + topic cards). Detailed content lives on separate HTML pages so visitors are not scrolling through one endless document.

## Project Structure

```
morgan-graduation-trip/
├── index.html          # Hub: hero, trip summary, links to topic pages
├── travel.html         # Airbnb, Sprinter vans, budget
├── schedule.html       # Graduation logistics, day-by-day agenda
├── explore.html        # Restaurants, kid-friendly activities
├── checklist.html      # Planning checklist
├── styles.css          # Shared styles (design tokens + layout)
├── morgan-photo.jpg    # Morgan's doctoral portrait (37KB, optimized)
├── Morgan's Doctoral Gown Head Shot 2.PNG  # Original hi-res photo (2.3MB, not used in site)
├── README.md           # Project readme with live URL
├── .gitignore          # Ignores .vercel directory
└── .vercel/            # Vercel deployment config
```

## Tech Stack

- **Pure HTML + CSS** — no JavaScript, no framework, no build step
- **Google Fonts** — Playfair Display (serif headings) + Inter (body text), linked from each page
- **Deployed on Vercel** — redeploy with `vercel --prod` from the project root
- **GitHub** — push changes with `git add -A && git commit -m "message" && git push`

## Design System

### Colors (CSS custom properties in `:root`)
- `--navy: #0F1D36` — primary dark (hero, site nav bar, section number badges)
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

## Page map

| Page | Contents |
|------|----------|
| **index.html** | Hero, sticky site navigation, trip summary table, “Plan by topic” cards |
| **travel.html** | Airbnb (7 listings + comparison table), Sprinter rentals, budget tables and tips |
| **schedule.html** | Ceremony logistics, what to wear, parking, tickets, photo spots; Thu–Sun agenda |
| **explore.html** | Restaurant cards, kid-friendly activities |
| **checklist.html** | Prioritized checklist (urgent / soon / normal) |

Every page includes the same sticky **site header** (logo + links to all pages). Topic pages open with a short **page title** and intro line.

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
- **Phone (≤480px):** stacked layouts, smaller fonts, horizontal-scroll tables, compact site nav

## Collapsible sections

Older single-page versions used `<details>` / `<summary>` for long sections. The multi-page layout keeps content visible per page instead. Legacy `details.section` styles may still exist in `styles.css` for reference.

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
- Add a framework (Next.js, etc.) if the site outgrows static HTML
- Add interactive features (countdown timer, RSVP form, etc.)
- Improve animations or transitions

When I ask for changes, edit the relevant HTML file(s) and/or `styles.css`. Keep the existing design system consistent across pages.
