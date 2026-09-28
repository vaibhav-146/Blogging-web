# SPEC.md — Project Specification

> **Status**: `FINALIZED`
>
> ⚠️ **Planning Lock**: No code may be written until this spec is marked `FINALIZED`.

## Vision
**Jeet's Journal** is a complete full-stack personal blogging and portfolio website built from scratch. It serves as a platform to share learning journeys, technology articles, web development knowledge, AI topics, projects, and ideas, featuring a bespoke admin dashboard for content management.

## Goals
1. **Public Website** — A responsive, modern, and tech-inspired portfolio presenting the author's skills, projects, and latest blogs, including dark/light mode toggle.
2. **Blog System** — A functional blog displaying articles fetched from PostgreSQL, with search, category filters, reading time calculation, likes, and a comment system.
3. **Contact System** — A functional contact form that saves incoming messages directly to the PostgreSQL database.
4. **Admin Dashboard** — A secure interface protected by JWT and bcrypt for the admin to create, read, update, and delete (CRUD) blogs, as well as manage comments and view contact messages.

## Non-Goals (Out of Scope)
- Do NOT use React, Vue, Angular, or any frontend framework.
- Do NOT use TypeScript.
- Do NOT use MongoDB, Firebase, or any NoSQL databases.
- Do NOT use LocalStorage as a database for application data (LocalStorage is ONLY permitted for saving the UI theme preference).

## Constraints
- **Frontend:** Pure HTML, CSS, and Vanilla JavaScript.
- **Backend:** Node.js with Express.js REST API.
- **Database:** PostgreSQL for all data (admins, blogs, comments, contact_messages).
- **Design:** Modern, professional, minimal, responsive, and mobile-friendly with semantic HTML.
- **Security:** Passwords must be hashed via bcrypt, and admin sessions managed via JWT.
- **Architecture:** Keep frontend, backend, and database folders properly organized. Use parameterized SQL queries and environment variables for credentials.

## Success Criteria
- [ ] 8 required pages are built and functional (Home, About Me, Blogs, Blog Details, Projects, Contact, Admin Login, Admin Dashboard).
- [ ] Database schema is defined in `schema.sql` and `comments` table links to `blogs` via a foreign key.
- [ ] REST API endpoints for all CRUD operations are successfully built and tested.
- [ ] Frontend successfully consumes the backend REST APIs.
- [ ] No broken links, incomplete features, or unhandled database/API errors.
- [ ] A detailed `README.md` is provided explaining installation, setup, and execution.

## Technical Requirements

| Requirement | Priority | Notes |
|-------------|----------|-------|
| PostgreSQL | Must-have | The only data store for the application. |
| Express REST API | Must-have | Handles all core business logic and database connections. |
| JWT Authentication | Must-have | Required to access the Admin Dashboard routes. |
| bcrypt | Must-have | For hashing admin passwords securely in the database. |
| Vanilla JS + CSS | Must-have | Strict adherence to framework-less frontend development. |

---

*Last updated: 2026-09-05*
