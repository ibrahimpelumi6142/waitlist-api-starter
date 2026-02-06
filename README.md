# waitlist-api-starter

A production-ready waitlist API built with Node.js, Express, and MongoDB.  
Designed for startups, landing pages, and SaaS products that need a simple and secure way to collect early users.

---

## Why this exists

Almost every product needs a waitlist, yet most examples online are either incomplete or unsafe for production.

This project provides a clean, minimal backend that you can deploy immediately and extend as your product grows.

---

## Features

- Add users to a waitlist
- Prevent duplicate email signups
- Input validation and sanitization
- Public rate limiting to prevent abuse
- Secure admin-only endpoints
- Export waitlist data as CSV
- Health check endpoint for monitoring

---

## Tech Stack

- Node.js
- Express
- MongoDB with Mongoose
- Helmet for security headers
- Express Rate Limit
- dotenv for configuration

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ibrahimpelumi6142/waitlist-api-starter.git
cd waitlist-api-starter
````

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Update the values inside `.env` as needed.

---

### 4. Run the server

```bash
npm run dev
```

The API will be available at:

```
http://localhost:3001
```

---

## API Endpoints

### Add user to waitlist

**POST** `/api/waitlist`

```json
{
  "email": "user@example.com",
  "firstName": "Ibrahim",
  "incomeRange": "£1k-£3k",
  "interestedFeatures": ["Job alerts", "CV builder"]
}
```

---

### Health check

**GET** `/api/waitlist/health`

Returns a simple status response to confirm the API is running.

---

### Admin: list waitlist entries

**GET** `/api/waitlist/admin/list?limit=50&skip=0`

Header required:

```
x-admin-key: YOUR_ADMIN_API_KEY
```

---

### Admin: export CSV

**GET** `/api/waitlist/admin/export.csv`

Header required:

```
x-admin-key: YOUR_ADMIN_API_KEY
```

Downloads the full waitlist as a CSV file, ready for Excel or Google Sheets.

---

## Security Notes

* Public endpoints are rate limited
* Admin endpoints are protected with an API key
* Duplicate emails are blocked at database level
* Inputs are sanitized before saving

---

## Deployment Notes

This API can be deployed on:

* VPS with Nginx (old or new)
* Render
* Fly.io
* Railway
* Any Node.js compatible hosting

Use a managed MongoDB service or your own MongoDB instance.

---

## Use Cases

* Startup waitlists
* Product launch signups
* Beta access forms
* SaaS onboarding
* Marketing landing pages

---

## License

MIT

---

## Author

Ibrahim Lasisi

Built for real-world use by developers who value clean, practical backend systems.
