# 🎟️ Event Management Platform
An Event Management Platform built with React + Vite where users can browse events, book tickets, manage bookings, and switch between light/dark themes.

#  Features

## 📅 Events Listing & Discovery

- Display all events in card layout
- Search events by title
- Filter events by:
  - Category
  - Date
  - Price Range
- Sort events by:
  - Date
  - Price
- Favorite/Like events
- Responsive event grid

---

## 📖 Event Details Page

- Full event information
- Event description
- Organizer details
- Venue & location
- Ticket types with pricing
- Book Tickets button

---

## 🎫 Ticket Booking System

### Multi-Step Booking Flow

#### Step 1: Ticket Selection
- Select ticket type
- Select quantity
- Real-time total calculation

#### Step 2: Attendee Details
- Name
- Email
- Phone
- Form validation

#### Step 3: Confirmation
- Booking summary
- Booking reference number
- Success notification

---

## 📂 My Bookings

- View all bookings
- Upcoming/Past booking filters
- Cancel upcoming bookings
- Confirmation modal before cancellation

---

## 🌙 Theme Toggle

- Light/Dark mode
- Theme persistence using localStorage

---

# 🛠️ Tech Stack

## Frontend
- React
- Vite
- React Router DOM
- Tailwind CSS
- React Icons
- React Toastify

## Backend
- JSON Server (Mock API)

---
# Folder Structure
src/
│
├── components/
├── pages/
├── context/
├── reducers/
├── services/
├── data/
├── styles/
└── App.jsx
---
# API Endpoints

GET /events
GET /events/:id
GET /bookings?userId=user1
POST /bookings
PATCH /bookings/:id

# Application Pages

- /events
- /events/:id
- /booking/:id
- /my-bookings

---
# Installation

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Run backend:

```bash
npm run server
```

---

# Packages Used

```bash
npm install react-router-dom
npm install react-icons
npm install react-toastify
npm install json-server
npm install tailwindcss @tailwindcss/vite
```
---
# Future Improvements

- User Authentication
- Payment Gateway Integration
- Seat Selection
- Event Reviews & Ratings
- Admin Dashboard
- Email Notifications

# Author
Divya Patel
