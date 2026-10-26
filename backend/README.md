# Fencesense Django backend

REST API and **Django Admin** for managing offices, services, solutions, blog posts, and contact enquiries. Use this with the React/Vite frontend in the repo root.

## Setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate          # Windows
pip install -r requirements.txt
copy .env.example .env            # edit secrets if needed
python manage.py migrate
node ../scripts/build-snapshot.cjs   # export src/data.js → seed_data/snapshot.json
python manage.py seed_demo
python manage.py createsuperuser
python manage.py runserver
```

- **Admin:** http://127.0.0.1:8000/admin/
- **API base:** http://127.0.0.1:8000/api/v1/

## API endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/bootstrap/` | **Single load:** company, site settings, testimonials, partners, customers, offices, services, solutions, posts |
| GET | `/api/v1/stats/` | Stats band (10k Satisfied Clients, …) |
| GET | `/api/v1/offerings/` | Capability / offering list |
| GET | `/api/v1/socials/` | Social links |
| GET | `/api/v1/testimonials/` | Trusted by Our Customers (quotes) |
| GET | `/api/v1/partners/` | Partner logo marquee |
| GET | `/api/v1/customers/` | Customer logo strip |
| GET | `/api/v1/offices/` | Published offices |
| GET | `/api/v1/company/` | Phone, email, CIN |
| GET | `/api/v1/content/services/` | Service list |
| GET | `/api/v1/content/services/<slug>/` | Service detail + `detail_content` JSON |
| GET | `/api/v1/content/solutions/` | Solution list |
| GET | `/api/v1/content/solutions/<slug>/` | Solution detail |
| GET | `/api/v1/content/blog/` | Blog posts |
| GET | `/api/v1/content/blog/<slug>/` | Blog post detail |
| POST | `/api/v1/enquiries/` | Contact form `{ full_name, email, phone, message, preferred_office? }` |

## Customize content in Admin

1. **Offices** — three locations, CIN on New Delhi, sort order, publish flag.
2. **Site settings** — stats, offerings, social links, page copy (JSON).
3. **Customer testimonials / Partner logos / Customer logos** — separate admin lists (not JSON).
4. **Catalog items** — services & solutions; `detail_content` JSON for benefits, methodology, FAQs (same shape as `src/detailContent.js`).
5. **Blog posts** — list + paragraph JSON for article body.
6. **Contact enquiries** — submissions from the site.
7. **Company profile** — global phone, email, CIN.

Re-seed from the frontend files after editing copy:

```bash
npm run api:seed
```

## Connect the React app

The Vite app loads **`GET /api/v1/bootstrap/`** on startup (`SiteProvider`) and falls back to `src/data.js` if the API is offline. Detail pages fetch **`/api/v1/content/services|solutions/<slug>/`**; contact forms **POST `/api/v1/enquiries/`** (mailto fallback if the API fails).

```js
// vite.config.js — already configured
server: { proxy: { '/api': 'http://127.0.0.1:8000' } }
```

Optional production env: `VITE_API_BASE_URL` (see repo `.env.example`).

## Apps

- `core` — company profile, offices, site settings
- `content` — services, solutions, blog
- `enquiries` — contact form storage + email notify
