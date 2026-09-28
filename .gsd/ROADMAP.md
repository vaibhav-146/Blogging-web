---
milestone: MVP
version: 1.0.0
updated: 2026-09-05T19:30:00+05:30
---

# Roadmap

> **Current Phase:** 4 - Integration & Testing
> **Status:** planning

## Must-Haves (from SPEC)

- [x] Complete UI (8 pages) in Vanilla HTML/CSS/JS without frameworks
- [x] Working PostgreSQL database for blogs, comments, messages, and admin
- [x] Node/Express REST API with JWT Auth
- [ ] End-to-end CRUD for blogs, plus comments/likes functionality

---

## Phases

### Phase 1: Foundation & Database
**Status:** ✅ Complete
**Objective:** Set up project structure, environment configuration, and PostgreSQL database schema.
**Requirements:** PostgreSQL, Environment Variables, File Organization

**Plans:**
- [x] Plan 1.1: Create `frontend`, `backend`, and `database` folder structures.
- [x] Plan 1.2: Write `schema.sql` for `admins`, `blogs`, `comments`, and `contact_messages`.
- [x] Plan 1.3: Initialize Node.js backend, install required packages (`express`, `pg`, `bcrypt`, `jsonwebtoken`, `dotenv`, `cors`), and configure `.env.example`.
- [x] Plan 1.4: Implement PostgreSQL database connection module in Express.

---

### Phase 2: Backend APIs
**Status:** ✅ Complete
**Objective:** Build and test all REST APIs for the application.
**Depends on:** Phase 1

**Plans:**
- [x] Plan 2.1: Implement Admin Auth API (login, JWT generation).
- [x] Plan 2.2: Implement Blog CRUD APIs (GET all/id, POST, PUT, DELETE with auth middleware).
- [x] Plan 2.3: Implement Comment APIs (POST comment, GET by blog_id).
- [x] Plan 2.4: Implement Contact API (POST message, GET all messages for admin).
- [x] Plan 2.5: Implement Like API (increment likes on a blog).

---

### Phase 3: Frontend Construction
**Status:** ✅ Complete
**Objective:** Build all 8 static pages with HTML/CSS and make them responsive.
**Depends on:** Phase 1

**Plans:**
- [x] Plan 3.1: Set up global CSS (typography, colors, navbar, footer) and Light/Dark mode via LocalStorage.
- [x] Plan 3.2: Build public pages (Home, About Me, Blogs, Blog Details, Projects, Contact).
- [x] Plan 3.3: Build admin pages (Admin Login, Admin Dashboard).

---

### Phase 4: Integration & Testing
**Status:** ⬜ Not Started
**Objective:** Connect frontend to backend APIs and finalize the project.
**Depends on:** Phase 2, Phase 3

**Plans:**
- [ ] Plan 4.1: Connect public frontend (fetch blogs, submit comments/contact, handle likes).
- [ ] Plan 4.2: Connect admin frontend (login, view/create/edit/delete blogs, view messages).
- [ ] Plan 4.3: Add sample blog data and test all features.
- [ ] Plan 4.4: Write comprehensive README.md.

---

## Progress Summary

| Phase | Status | Plans | Complete |
|-------|--------|-------|----------|
| 1 | ✅ | 4/4 | Done |
| 2 | ✅ | 5/5 | Done |
| 3 | ✅ | 3/3 | Done |
| 4 | ⬜ | 0/4 | — |

---

## Timeline

| Phase | Started | Completed | Duration |
|-------|---------|-----------|----------|
| 1 | 2026-09-05 | 2026-09-05 | Same day |
| 2 | 2026-09-05 | 2026-09-05 | Same day |
| 3 | 2026-09-05 | 2026-09-05 | Same day |
| 4 | — | — | — |
