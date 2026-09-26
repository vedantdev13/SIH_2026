# SAHAKAAR — Labour Cooperative Platform

> A full-stack digital platform connecting customers with skilled artisans through Labour Cooperatives, while enabling cooperative officers to manage workers, bookings, services, earnings, welfare, and workforce demand.

## Overview

**Sahakaar** is a Smart India Hackathon 2026 project designed to digitize the labour cooperative ecosystem.

The platform enables customers to discover and book skilled professionals directly from registered cooperatives, while providing cooperative officers with tools to manage their workforce and operations.

### Key Objectives

* Connect customers with skilled local workers.
* Promote direct and transparent worker earnings.
* Digitize labour cooperative operations.
* Simplify worker discovery and booking management.
* Support workforce planning through demand analytics.

## Features

### Customer Portal

* Browse skilled trade services.
* Discover worker profiles, experience, and ratings.
* View workers through interactive maps.
* Book artisans for required services.
* Track bookings and confirmations.
* Submit reviews and ratings.

### Worker Management

* Worker profiles and trade skills.
* Availability management.
* Worker details and cooperative information.
* Booking assignment and status tracking.

### Cooperative Dashboard

* Workforce overview.
* Worker and member management.
* Service management.
* Booking management.
* Earnings tracking.
* Welfare information.
* Demand forecasting and workforce allocation.

### AI Demand Forecasting

The platform includes a prototype rule-based demand forecasting module that analyzes booking counts across different trades.

It categorizes demand into:

* HIGH
* MEDIUM
* LOW

The module estimates workforce requirements and highlights high-demand areas across Nagpur.

**Note:** The current implementation is a rule-based prototype, not a trained machine-learning model.

### Authentication

* User registration and login.
* Phone/email-based authentication.
* Password hashing using bcrypt.
* JWT-based authentication.
* Protected user profile endpoint.

### Interactive Maps

Leaflet and React Leaflet provide map-based worker and job visualization.

## Tech Stack

| Layer          | Technologies           |
| -------------- | ---------------------- |
| Frontend       | React 18, Vite         |
| Styling        | Tailwind CSS           |
| Routing        | React Router DOM       |
| Maps           | Leaflet, React Leaflet |
| Icons          | Lucide React           |
| Backend        | Node.js, Express.js    |
| Database       | MongoDB, Mongoose      |
| Authentication | JWT, bcryptjs          |
| API            | REST                   |

## Architecture

```text
React + Vite Frontend
        |
        | REST API
        v
Node.js + Express Backend
        |
        | Mongoose
        v
MongoDB Atlas

Frontend fallback:
Mock Data + localStorage
```

## Project Structure

```text
SIH_2026/
├── backend/
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Booking.js
│   │   ├── Cooperative.js
│   │   ├── Review.js
│   │   ├── Service.js
│   │   ├── User.js
│   │   └── Worker.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── healthRoutes.js
│   │   ├── reviewRoutes.js
│   │   ├── serviceRoutes.js
│   │   └── workerRoutes.js
│   ├── seed.js
│   ├── server.js
│   └── package.json
│
├── public/
│   └── images/
│
├── src/
│   ├── api/
│   ├── components/
│   ├── data/
│   ├── pages/
│   │   └── cooperative/
│   │       ├── AIDemandForecast.jsx
│   │       ├── CooperativeBookings.jsx
│   │       ├── CooperativeEarnings.jsx
│   │       ├── CooperativeOverview.jsx
│   │       ├── CooperativeServices.jsx
│   │       ├── CooperativeWelfare.jsx
│   │       └── CooperativeWorkers.jsx
│   ├── utils/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Getting Started

### Prerequisites

* Node.js
* npm
* MongoDB Atlas account or local MongoDB instance

### 1. Clone the Repository

```bash
git clone https://github.com/vedantdev13/SIH_2026.git
cd SIH_2026
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

### 4. Configure Environment Variables

Create a `.env` file inside the `backend` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
```

Never commit real credentials or secrets to GitHub.

### 5. Start the Backend

```bash
cd backend
npm run dev
```

Backend URL:

```text
http://localhost:5000
```

### 6. Start the Frontend

Open another terminal:

```bash
npm run dev
```

Vite will display the frontend development URL, normally:

```text
http://localhost:5173
```

## Database Models

The backend uses MongoDB with Mongoose.

Main models:

* User
* Worker
* Service
* Booking
* Review
* Cooperative

### Seed Data

```bash
cd backend
npm run seed
```

## API Endpoints

All endpoints are served under `/api`.

| Method | Endpoint                   | Description     |
| ------ | -------------------------- | --------------- |
| GET    | `/api/health`              | Backend health  |
| POST   | `/api/auth/register`       | Register user   |
| POST   | `/api/auth/login`          | Login           |
| GET    | `/api/auth/me`             | Current user    |
| GET    | `/api/workers`             | List workers    |
| GET    | `/api/workers/:id`         | Worker details  |
| POST   | `/api/workers`             | Create worker   |
| PUT    | `/api/workers/:id`         | Update worker   |
| GET    | `/api/services`            | List services   |
| POST   | `/api/services`            | Create service  |
| GET    | `/api/bookings`            | List bookings   |
| GET    | `/api/bookings/:id`        | Booking details |
| POST   | `/api/bookings`            | Create booking  |
| PUT    | `/api/bookings/:id`        | Update booking  |
| PUT    | `/api/bookings/:id/assign` | Assign worker   |
| GET    | `/api/reviews`             | List reviews    |
| POST   | `/api/reviews`             | Submit review   |

## Frontend Fallback Mode

The frontend attempts to communicate with the backend first.

If the backend is unavailable, it can fall back to:

* Mock data from `src/data/mockData.js`
* Browser localStorage

This supports local development and demonstrations without requiring an active backend connection.

## Security Considerations

Before production deployment:

* Store database credentials in environment variables.
* Use strong JWT secrets.
* Configure CORS for trusted origins.
* Implement comprehensive request validation.
* Enforce authorization on protected operations.
* Review booking and worker access permissions.
* Never expose private credentials in source code.

## Future Scope

* Machine-learning-based demand forecasting.
* Real-time worker availability.
* SMS and WhatsApp notifications.
* Online payments and digital receipts.
* Advanced geospatial worker matching.
* Multilingual support.
* Worker attendance and service completion tracking.
* Production-grade role-based access control.
* Cloud deployment and CI/CD.
* Advanced cooperative analytics.

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Implement your changes.
4. Test the frontend and backend.
5. Commit your changes.
6. Submit a pull request.

## License

No license has been specified yet. Add an appropriate license before distributing the project under open-source terms.

---

### Built for Smart India Hackathon 2026

**Sahakaar — Connecting skilled workers, customers, and cooperatives through technology.**
