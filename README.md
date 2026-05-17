# Black Horse Pub

Full-stack pub website and admin system built with:

- Frontend: Next.js
- Backend: Spring Boot
- Database: PostgreSQL in production, H2 in-memory fallback for local development

The system includes public pages for the pub website, online ordering, reservations, entertainment, open mic registration, menu, tap list, media, news, and a protected admin API/dashboard surface.

## Project Structure

```text
BlackHorsePub/
  BlackHorse-backend/    Spring Boot REST API
  BlackHorse-frontend/   Next.js web app
```

## Requirements

- Java 25
- Node.js and npm
- PostgreSQL, optional for local development

The backend can run locally without PostgreSQL because it falls back to an in-memory H2 database.

## Run Backend

```powershell
cd BlackHorse-backend
.\mvnw.cmd spring-boot:run
```

Backend URL:

```text
http://localhost:8080
```

Run backend tests:

```powershell
cd BlackHorse-backend
.\mvnw.cmd test
```

## Run Frontend

Install dependencies:

```powershell
cd BlackHorse-frontend
npm install
```

Start the dev server:

```powershell
npm run dev
```

Frontend URL:

```text
http://localhost:3000
```

Create production build:

```powershell
npm run build
```

## Environment Variables

Backend variables:

```text
PORT=8080
DATABASE_URL=jdbc:postgresql://localhost:5432/blackhorse
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=password
DATABASE_DRIVER=org.postgresql.Driver
DDL_AUTO=update
ADMIN_USERNAME=admin
ADMIN_PASSWORD=change-me
JWT_SECRET=replace-with-secure-secret
CORS_ALLOWED_ORIGINS=http://localhost:3000
SEED_MOCK_DATA=true
```

Frontend variables:

```text
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

If these are not set, the app uses local defaults.

## Public Website Functionality

Navbar:

- Sticky global navigation
- Mobile hamburger menu
- More dropdown
- Active page highlighting

Pages:

- `/home` - hero section, online order CTA, reservation CTA, featured events preview, newsletter signup in footer
- `/open-mic` - session description, rules, upcoming dates, registration form
- `/entertainment` - calendar view and event list
- `/on-tap` - beer list grouped by available backend data
- `/reservations` - date picker, party size, time slots, reservation request form
- `/gift-cards` - coming soon banner
- `/orders` - pickup/delivery toggle, menu item selection, checkout request
- `/contact` - address, map, phone, email, click-to-call
- `/menu` - full menu, wine list, cocktails, category filter
- `/performances` - image and video gallery
- `/news` - article list and links
- `/our-story` - static story page
- `/experiences` - unavailable message
- `/admin` - admin login and dashboard shell

## Reservation Flow

1. User chooses a date.
2. Frontend calls `/reservations/slots?date=YYYY-MM-DD`.
3. Backend returns predefined available slots:

```text
6:00 PM
7:00 PM
8:00 PM
9:00 PM
```

4. User submits a reservation.
5. Reservation is stored with status `PENDING`.
6. Admin approves or rejects the reservation.
7. Approved reservations make that date and time slot unavailable.

## Admin Functionality

Admin login:

```http
POST /auth/login
```

Default local credentials:

```text
username: admin
password: change-me
```

Change these with `ADMIN_USERNAME` and `ADMIN_PASSWORD`.

Protected admin APIs require:

```http
Authorization: Bearer <token>
```

Admin can manage:

- Events
- Open mic sessions
- Open mic registrations
- Menu items
- Beers on tap
- Orders
- Reservations
- Media
- News articles

## Main Backend APIs

Public APIs:

```text
GET  /events
GET  /events/featured
GET  /open-mic/events
POST /open-mic/registrations
GET  /reservations/slots?date=YYYY-MM-DD
POST /reservations
GET  /beers
GET  /menu-items
POST /orders
GET  /news
GET  /media
POST /newsletter
POST /auth/login
```

Admin APIs:

```text
GET    /admin/events
POST   /admin/events
PUT    /admin/events/{id}
DELETE /admin/events/{id}

GET    /admin/open-mic/events
POST   /admin/open-mic/events
PUT    /admin/open-mic/events/{id}
DELETE /admin/open-mic/events/{id}
GET    /admin/open-mic/registrations

GET    /admin/reservations
PUT    /admin/reservations/{id}

GET    /admin/beers
POST   /admin/beers
PUT    /admin/beers/{id}
DELETE /admin/beers/{id}

GET    /admin/menu-items
POST   /admin/menu-items
PUT    /admin/menu-items/{id}
DELETE /admin/menu-items/{id}

GET    /admin/orders
PUT    /admin/orders/{id}

POST   /admin/news
PUT    /admin/news/{id}
DELETE /admin/news/{id}

POST   /admin/media
PUT    /admin/media/{id}
DELETE /admin/media/{id}
```

## Database Tables

The backend creates tables automatically with JPA/Hibernate when `DDL_AUTO=update`.

Main data models:

- `event`
- `open_mic_event`
- `open_mic_registration`
- `reservation`
- `beer`
- `menu_item`
- `customer_order`
- `order_item`
- `news_article`
- `media_item`
- `newsletter_subscriber`

## PostgreSQL Setup

Create a database:

```sql
CREATE DATABASE blackhorse;
```

Set backend environment variables:

```powershell
$env:DATABASE_URL="jdbc:postgresql://localhost:5432/blackhorse"
$env:DATABASE_USERNAME="postgres"
$env:DATABASE_PASSWORD="your-password"
$env:DATABASE_DRIVER="org.postgresql.Driver"
```

Then run:

```powershell
cd BlackHorse-backend
.\mvnw.cmd spring-boot:run
```

## Automatic Mock Data Seeder

The backend includes an automatic mock data seeder. By default, `SEED_MOCK_DATA=true`, so sample records are inserted at startup when each table is empty.

Run the backend:

```powershell
cd BlackHorse-backend
.\mvnw.cmd spring-boot:run
```

Disable automatic mock data:

```powershell
$env:SEED_MOCK_DATA="false"
.\mvnw.cmd spring-boot:run
```

The seeder adds data for:

- `event`
- `open_mic_event`
- `open_mic_registration`
- `reservation`
- `beer`
- `menu_item`
- `customer_order`
- `order_item`
- `news_article`
- `media_item`
- `newsletter_subscriber`

## Manual PostgreSQL Seed Script

There is also a manual PostgreSQL seed script. Run it only if you want to clear and reseed all application tables:

```powershell
cd BlackHorse-backend
psql -U postgres -d blackhorse -f src/main/resources/db/mock-data-postgres.sql
```

The manual SQL script uses `TRUNCATE ... RESTART IDENTITY CASCADE`, so it deletes existing application data before inserting mock records.

## Local Smoke Checks

Check events:

```powershell
Invoke-RestMethod http://localhost:8080/events
```

Check reservation slots:

```powershell
Invoke-RestMethod "http://localhost:8080/reservations/slots?date=2026-05-04"
```

Expected slots when no approved reservations exist:

```json
{
  "date": "2026-05-04",
  "availableSlots": ["6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"]
}
```

## Current Notes

- Electronic gift cards are marked as coming soon.
- Mailchimp, payments, WebSockets, Redis caching, rate limiting, and CDN upload support are planned improvements, not yet implemented.
- The admin page is a dashboard shell; full admin CRUD forms can be expanded on top of the existing protected APIs.
