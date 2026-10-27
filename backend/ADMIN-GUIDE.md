# Django Admin — full site data map

Run **`npm run api`** from the **`fencesense`** folder, then open **http://127.0.0.1:8000/admin/**.

The React app loads **`GET /api/v1/bootstrap/`** (all data in one call). You can also use the separate endpoints below.

## Admin → website

| Django Admin (Core) | On the site | API |
|---------------------|-------------|-----|
| **Stats** | Orange numbers band (10k Satisfied Clients, …) | `GET /api/v1/stats/` |
| **Offerings** | Capability bullets on Home / About | `GET /api/v1/offerings/` |
| **Social links** | Footer & contact social icons | `GET /api/v1/socials/` |
| **Customer testimonials** | Trusted by Our Customers slider | `GET /api/v1/testimonials/` |
| **Partner logos** | Partner companies marquee | `GET /api/v1/partners/` |
| **Customer logos** | Our Customers logo strip | `GET /api/v1/customers/` |
| **Offices** | Contact page locations & maps | `GET /api/v1/offices/` |
| **Company profile** | Phone, email, CIN | `GET /api/v1/company/` |
| **Site settings → pages** | Home/About hero & section titles (JSON) | in `bootstrap` → `site.pages` |

| Django Admin (Content) | On the site | API |
|------------------------|-------------|-----|
| **Services** | `/services` list + detail | `GET /api/v1/content/services/<slug>/` → `detailContent` |
| **Solutions** | `/solutions` list + detail | `GET /api/v1/content/solutions/<slug>/` → `detailContent` |

### Key benefits & methodology (easy admin — no JSON)

Open a **Service** or **Solution** in admin:

1. **Detail page — section headings:** `benefits_title`, `methodology_title`, CTA text  
2. **Key benefits** table: title, description *or* bullets (one per line), optional icon  
3. **Methodology steps** table: step (`01`), title, text  
4. **FAQs** table: question + answer  

Save → refresh the detail page on the site. API builds `detailContent` automatically.
| **Blog posts** | Blogs | `/api/v1/content/blog/` |
| **Contact enquiries** | Form submissions | `POST /api/v1/enquiries/` |

## Bootstrap (everything at once)

**`GET /api/v1/bootstrap/`** returns:

`company`, `stats`, `offerings`, `socials`, `testimonials`, `partners`, `customers`, `offices`, `services`, `solutions`, `posts`, and `site.pages`.

## Edit stats band (your screenshot)

1. **Core → Stats**
2. Each row: **value** (10), **suffix** (k or +), **label** (Satisfied Clients), **sort order**, **published**
3. Save → refresh http://localhost:5173

## Edit partners & customers

1. **Partner logos** — image path e.g. `/partners/01.png`, sort order  
2. **Customer logos** — e.g. `/customers/01.png`  
3. **Customer testimonials** — quote, name, role, logo path  

## First-time / re-import from `frontend/src/data.js`

From **`fencesense`** folder:

```bash
npm run api:seed
```

Creates superuser (once):

```bash
cd backend
py -3 manage.py createsuperuser
```
