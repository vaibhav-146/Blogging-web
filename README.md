# Jeet's Journal

A full-stack personal blogging and portfolio website built from scratch with **Node.js**, **Express**, **PostgreSQL**, and **Vanilla HTML/CSS/JavaScript** (no frontend frameworks).

---

## Features

- 🌓 **Light / Dark Mode** — Theme toggle persisted across sessions via `localStorage` with OS preference detection
- 📝 **Blog System** — Articles with reading time, category filtering, search, tags, and like counter
- 💬 **Comment System** — Nested comments under blog posts
- 📬 **Contact Form** — Direct message submission saved to database
- 🔒 **Admin Dashboard** — Protected by JWT authentication and bcrypt password hashing:
  - Create, read, update, and delete (CRUD) blog posts (with live slug generation)
  - View all user comments across all blogs
  - Read incoming contact messages with read/unread status
- 📱 **Responsive Design** — Fully mobile-friendly layout built with semantic HTML and CSS Grid/Flexbox

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Vanilla HTML5, CSS3 (Custom Properties), Vanilla JavaScript (ES6+) |
| **Backend** | Node.js, Express.js REST API |
| **Database** | PostgreSQL with parameterized queries |
| **Auth** | JSON Web Tokens (JWT), bcrypt |

---

## Project Structure

```
.
├── backend/
│   ├── middleware/
│   │   └── auth.js          # JWT verification middleware
│   ├── routes/
│   │   ├── auth.js          # POST /api/auth/login
│   │   ├── blogs.js         # GET /api/blogs, POST, PUT, DELETE
│   │   ├── comments.js      # GET /api/comments/:blog_id, POST
│   │   ├── contact.js       # POST /api/contact, GET (admin)
│   │   └── likes.js         # POST /api/likes/:blog_id/like
│   ├── .env.example         # Environment variable template
│   ├── db.js                # PostgreSQL connection pool
│   ├── package.json
│   └── server.js            # Express server & static file serving
├── database/
│   ├── schema.sql           # Database tables and indexes
│   └── seed.sql             # Initial seed data (admin + sample blogs)
├── frontend/
│   ├── css/
│   │   └── global.css       # Theme tokens, navbar, footer, typography
│   ├── js/
│   │   └── theme.js         # Light/dark mode toggle logic
│   ├── index.html           # Home page
│   ├── about.html           # About Me page
│   ├── blogs.html           # Blog listing with search & filters
│   ├── blog-detail.html     # Single post, comments, likes
│   ├── projects.html        # Projects showcase
│   ├── contact.html         # Contact form
│   ├── admin-login.html     # Admin login
│   └── admin-dashboard.html # Admin CRUD dashboard
├── setup-db.ps1             # PowerShell database setup script
├── setup-db.sh              # Bash database setup script
└── README.md
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [PostgreSQL](https://www.postgresql.org/) (v12 or higher)

### 1. Clone & Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Copy `backend/.env.example` to `backend/.env`:

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` with your PostgreSQL credentials:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=jeets_journal
DB_USER=postgres
DB_PASSWORD=your_postgres_password
JWT_SECRET=your_super_secret_jwt_key_here
PORT=3000
NODE_ENV=development
```

### 3. Initialize the Database

#### On Windows (PowerShell):
```powershell
.\setup-db.ps1
```

#### On Linux / macOS (Bash):
```bash
chmod +x setup-db.sh
./setup-db.sh
```

Or manually using `psql`:
```bash
psql -U postgres -c "CREATE DATABASE jeets_journal;"
psql -U postgres -d jeets_journal -f database/schema.sql
psql -U postgres -d jeets_journal -f database/seed.sql
```

### 4. Start the Application

```bash
cd backend
npm start
```

For development with auto-restart:
```bash
npm run dev
```

The application will be available at: **`http://localhost:3000`**

---

## Default Admin Credentials

| Field | Value |
|---|---|
| **URL** | `http://localhost:3000/admin-login.html` |
| **Username** | `admin` |
| **Password** | `admin123` |

---

## API Endpoints Reference

### Public Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check endpoint |
| `GET` | `/api/blogs` | List published blogs (supports `?category=` and `?search=`) |
| `GET` | `/api/blogs/:slug` | Get single published blog by slug |
| `POST` | `/api/comments` | Submit a comment (`{ blog_id, author_name, author_email, comment_text }`) |
| `GET` | `/api/comments/:blog_id` | Get comments for a blog post |
| `POST` | `/api/contact` | Submit a contact message (`{ name, email, subject, message }`) |
| `POST` | `/api/likes/:blog_id/like` | Increment like counter for a blog |

### Admin Endpoints (Protected by JWT)

Include header: `Authorization: Bearer <token>`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Admin login (`{ username, password }`) |
| `GET` | `/api/blogs/all` | Get all blogs including drafts |
| `POST` | `/api/blogs` | Create a new blog post |
| `PUT` | `/api/blogs/:id` | Update an existing blog post |
| `DELETE` | `/api/blogs/:id` | Delete a blog post |
| `GET` | `/api/contact` | Get all contact messages |

---

## License

ISC License — Developed for Jeet's Journal.
