# 💰 FinTrack - Personal Finance Management System

[![React](https://img.shields.io/badge/React-19.1.1-blue?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)](https://nodejs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-brightgreen?logo=supabase)](https://supabase.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.14-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

> **A comprehensive full-stack web application for personal finance management with expense tracking, income monitoring, and lending/borrowing records.**

**Live Demo:** [https://finance-tracker-pied-omega.vercel.app](https://finance-tracker-pied-omega.vercel.app)  
**Backend API:** [https://finance-tracker-dxsh.onrender.com](https://finance-tracker-dxsh.onrender.com)

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [System Architecture](#-system-architecture)
- [Database Schema](#-database-schema)
- [Installation & Setup](#-installation--setup)
- [API Documentation](#-api-documentation)
- [Frontend Architecture](#-frontend-architecture)
- [Security Features](#-security-features)
- [Deployment](#-deployment)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**FinTrack** is a modern, responsive personal finance tracker built with the MERN stack (MongoDB alternative: Supabase PostgreSQL). It enables users to efficiently manage their financial activities through an intuitive dashboard with real-time analytics, categorized transactions, and visual data representations.

### Key Highlights:
- 🔐 **Secure Authentication** with JWT tokens via Supabase Auth
- 📊 **Interactive Data Visualization** using Recharts (Pie charts, statistics)
- 💸 **Multi-type Transaction Support** (Income, Expense, Lending/Borrowing)
- 🎨 **Modern UI/UX** with Tailwind CSS, Framer Motion animations
- 📱 **Fully Responsive** design for mobile, tablet, and desktop
- ⚡ **Real-time Updates** and optimized performance
- 🌐 **Production-Ready** deployment on Vercel & Render

---

## ✨ Features

### 🔑 Authentication & User Management
- User registration with email verification bypass (for development)
- Secure login/logout with JWT access tokens
- Protected routes with authentication middleware
- Session management with token persistence
- User profile integration with Supabase Auth
- Account deletion functionality

### 💰 Transaction Management
- **Three Transaction Types:**
  1. **Expenses** - Track spending with categories and notes
  2. **Income** - Monitor earnings with source categorization
  3. **Len/Den** - Manage lending (len) and borrowing (den) records

- **CRUD Operations:**
  - Create transactions with dynamic categorization
  - Read/filter transactions by type
  - Update existing records
  - Delete unwanted transactions

- **Smart Features:**
  - Automatic category creation if non-existent
  - Person/contact auto-creation for len/den transactions
  - Transaction date tracking
  - Detailed notes and descriptions

### 📊 Analytics & Insights
- **Dashboard Overview:**
  - Real-time balance calculation (income - expenses)
  - Total income, expense, lent, and borrowed amounts
  - Visual breakdown with interactive pie charts
  - Category-wise expense and income distribution

- **Financial Metrics:**
  - User balance view (database-level calculation)
  - Category statistics aggregation
  - Person-wise lending/borrowing summary
  - Monthly transaction tracking

### 🎨 User Interface
- **Modern Design System:**
  - Custom Tailwind CSS theme with brand colors
  - Responsive grid layouts
  - Card-based component architecture
  - Loading states with spinners and skeletons
  - Toast notifications for user feedback

- **Interactive Components:**
  - Dynamic transaction forms with type-specific fields
  - Section tabs for filtering
  - Transaction lists with sortable tables
  - Animated landing page with Framer Motion
  - Sticky navigation bar with auth state

### 🔍 Data Management
- **Category System:**
  - User-specific custom categories
  - Type-based categorization (income/expense)
  - Duplicate prevention with unique constraints
  - CRUD operations for categories

- **People Management:**
  - Contact records for lending/borrowing
  - User-scoped people database
  - Optional phone and email fields
  - Duplicate prevention

---

## 🛠 Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.1.1 | UI library with modern hooks |
| **Vite** | 7.1.7 | Fast build tool and dev server |
| **React Router DOM** | 7.9.4 | Client-side routing with protected routes |
| **Axios** | 1.12.2 | HTTP client with interceptors |
| **Recharts** | 3.3.0 | Interactive data visualization charts |
| **Framer Motion** | 11.11.15 | Animation library for smooth transitions |
| **React Hot Toast** | 2.6.0 | Elegant notification system |
| **Tailwind CSS** | 3.4.14 | Utility-first CSS framework |
| **Headless UI** | 2.2.0 | Accessible component primitives |
| **Heroicons** | 2.2.0 | SVG icon library |
| **PostCSS** | 8.4.49 | CSS transformation tool |
| **Autoprefixer** | 10.4.20 | CSS vendor prefix automation |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | Latest | JavaScript runtime environment |
| **Express.js** | 5.1.0 | Web application framework |
| **Supabase JS** | 2.76.1 | PostgreSQL database client & Auth |
| **CORS** | 2.8.5 | Cross-Origin Resource Sharing |
| **Dotenv** | 17.2.3 | Environment variable management |
| **Nodemon** | 3.1.10 | Development auto-reload utility |

### Database
- **Supabase (PostgreSQL)** - Production-grade relational database
  - Row Level Security (RLS)
  - Real-time subscriptions capability
  - Built-in authentication
  - Database views for complex queries
  - Foreign key constraints
  - Indexes for optimized queries

### Development Tools
- **ESLint** - Code linting with React plugins
- **Git** - Version control
- **VS Code** - Primary development environment

### Deployment & Hosting
- **Frontend:** Vercel (https://finance-tracker-pied-omega.vercel.app)
- **Backend:** Render (https://finance-tracker-dxsh.onrender.com)
- **Database:** Supabase Cloud

---

## 🏗 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT SIDE                          │
│  ┌────────────────────────────────────────────────────┐    │
│  │  React Application (Vite)                          │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────┐    │    │
│  │  │ Landing  │  │ AuthPage │  │  Dashboard   │    │    │
│  │  │   Page   │  │          │  │ (Protected)  │    │    │
│  │  └──────────┘  └──────────┘  └──────────────┘    │    │
│  │                                                     │    │
│  │  ┌─────────────────────────────────────────┐      │    │
│  │  │     Transactions Page (Protected)       │      │    │
│  │  └─────────────────────────────────────────┘      │    │
│  │                                                     │    │
│  │  Components: Navbar, Footer, Forms, Charts        │    │
│  │  Utils: API (Axios with interceptors)             │    │
│  │  Styling: Tailwind CSS + Custom Theme             │    │
│  │  State: React Hooks (useState, useEffect, etc.)   │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTPS (CORS Enabled)
┌─────────────────────────────────────────────────────────────┐
│                        SERVER SIDE                          │
│  ┌────────────────────────────────────────────────────┐    │
│  │  Express.js Application                            │    │
│  │                                                     │    │
│  │  ┌───────────────────────────────────────────┐    │    │
│  │  │          Middleware Layer                 │    │    │
│  │  │  • CORS (Multi-origin)                    │    │    │
│  │  │  • JSON Parser                            │    │    │
│  │  │  • Auth Verification (JWT)                │    │    │
│  │  └───────────────────────────────────────────┘    │    │
│  │                                                     │    │
│  │  ┌───────────────────────────────────────────┐    │    │
│  │  │              API Routes                   │    │    │
│  │  │  • /api/auth (Register, Login, Logout)    │    │    │
│  │  │  • /api/transactions (CRUD)               │    │    │
│  │  │  • /api/categories (CRUD)                 │    │    │
│  │  │  • /api/people (CRUD)                     │    │    │
│  │  │  • /api/analytics (Balance, Stats)        │    │    │
│  │  └───────────────────────────────────────────┘    │    │
│  │                                                     │    │
│  │  ┌───────────────────────────────────────────┐    │    │
│  │  │            Controllers                    │    │    │
│  │  │  Business logic and data processing       │    │    │
│  │  └───────────────────────────────────────────┘    │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                   SUPABASE (PostgreSQL)                     │
│  ┌────────────────────────────────────────────────────┐    │
│  │  • auth.users (Supabase Auth built-in)            │    │
│  │  • profiles (User metadata)                        │    │
│  │  • transactions (Main transaction records)         │    │
│  │  • categories (Expense & Income categories)        │    │
│  │  • people (Contacts for len/den)                   │    │
│  │  • expense_details (Linked to transactions)        │    │
│  │  • income_details (Linked to transactions)         │    │
│  │  • len_den_details (Linked to transactions)        │    │
│  │  • user_balance_view (Calculated balance)          │    │
│  │                                                     │    │
│  │  Features: Indexes, Foreign Keys, Constraints,     │    │
│  │           Triggers, Views                          │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### Request Flow:
1. **User Action** → React Component
2. **API Call** → Axios interceptor adds JWT token
3. **Backend Route** → Express router
4. **Middleware** → Authentication verification
5. **Controller** → Business logic execution
6. **Supabase** → Database query/mutation
7. **Response** → JSON data back to client
8. **UI Update** → React state update triggers re-render

---

## 🗄 Database Schema

### Entity Relationship Diagram

```
┌─────────────────┐
│   auth.users    │ (Supabase Auth - Built-in)
│─────────────────│
│ id (uuid) PK    │
│ email           │
│ encrypted_pwd   │
│ user_metadata   │
└─────────────────┘
         │
         │ 1:1
         ↓
┌─────────────────────┐
│      profiles       │
│─────────────────────│
│ id (uuid) PK/FK     │────┐
│ name                │    │
│ avatar_url          │    │
│ email               │    │
│ created_at          │    │
└─────────────────────┘    │
                           │
         ┌─────────────────┼─────────────────┬──────────────────┐
         │                 │                 │                  │
         ↓                 ↓                 ↓                  ↓
┌─────────────────┐ ┌────────────────┐ ┌──────────────┐ ┌─────────────────┐
│   categories    │ │  transactions  │ │    people    │ │user_balance_view│
│─────────────────│ │────────────────│ │──────────────│ │─────────────────│
│ id (serial) PK  │ │ id (uuid) PK   │ │id (uuid) PK  │ │user_id (uuid)   │
│ name            │ │ user_id FK     │ │user_id FK    │ │balance (calc)   │
│ type (enum)     │ │ type (enum)    │ │name          │ └─────────────────┘
│ user_id FK      │ │ amount         │ │phone         │
│ created_at      │ │ transaction_dt │ │email         │
└─────────────────┘ │ created_at     │ │created_at    │
         │          └────────────────┘ └──────────────┘
         │                 │                    │
         │                 ├────────────────────┼──────────────┐
         │                 │                    │              │
         ↓                 ↓                    ↓              ↓
┌──────────────────┐ ┌─────────────────┐ ┌──────────────────────────┐
│ expense_details  │ │ income_details  │ │   len_den_details        │
│──────────────────│ │─────────────────│ │──────────────────────────│
│ transaction_id PK│ │transaction_id PK│ │ transaction_id PK/FK     │
│ category_id FK   │ │category_id FK   │ │ person_id FK             │
│ note             │ │note             │ │ len_den_type (enum)      │
└──────────────────┘ └─────────────────┘ │ description              │
                                         └──────────────────────────┘
```

### Table Descriptions

#### 1. **profiles** (User Information)
```sql
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text,
  avatar_url text,
  email text,
  created_at timestamp DEFAULT now()
);
```
- Extends Supabase Auth users with additional metadata
- Automatically created via trigger when user signs up

#### 2. **categories** (Income/Expense Categories)
```sql
CREATE TABLE categories (
  id serial PRIMARY KEY,
  name text NOT NULL,
  type text CHECK (type IN ('income', 'expense')) NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamp DEFAULT now(),
  CONSTRAINT unique_user_category UNIQUE (user_id, name, type)
);
```
- User-specific categories
- Prevents duplicate categories per user
- Indexed on `user_id`

#### 3. **people** (Contacts for Lending/Borrowing)
```sql
CREATE TABLE people (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  phone text,
  email text,
  created_at timestamp DEFAULT now()
);
```
- Stores contacts for len/den transactions
- Optional contact information
- Indexed on `user_id`

#### 4. **transactions** (Main Transaction Table)
```sql
CREATE TABLE transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  type text CHECK (type IN ('expense', 'income', 'len_den')) NOT NULL,
  amount numeric(12,2) NOT NULL CHECK (amount >= 0),
  transaction_date date DEFAULT current_date,
  created_at timestamp DEFAULT now()
);
```
- Central table for all transaction types
- Enforces positive amounts
- Indexed on `user_id`, `type`, and `transaction_date`

#### 5. **expense_details** (Expense-specific Data)
```sql
CREATE TABLE expense_details (
  transaction_id uuid PRIMARY KEY REFERENCES transactions(id) ON DELETE CASCADE,
  category_id int REFERENCES categories(id),
  note text
);
```

#### 6. **income_details** (Income-specific Data)
```sql
CREATE TABLE income_details (
  transaction_id uuid PRIMARY KEY REFERENCES transactions(id) ON DELETE CASCADE,
  category_id int REFERENCES categories(id),
  note text
);
```

#### 7. **len_den_details** (Lending/Borrowing Data)
```sql
CREATE TABLE len_den_details (
  transaction_id uuid PRIMARY KEY REFERENCES transactions(id) ON DELETE CASCADE,
  person_id uuid REFERENCES people(id),
  len_den_type text CHECK (len_den_type IN ('len', 'den')) NOT NULL,
  description text
);
```
- `len` = money lent (given out)
- `den` = money borrowed (taken in)
- Indexed on `person_id`

#### 8. **user_balance_view** (Calculated Balance View)
```sql
CREATE VIEW user_balance_view AS
SELECT
  u.id AS user_id,
  COALESCE(SUM(
    CASE 
      WHEN t.type = 'income' THEN t.amount
      WHEN t.type = 'expense' THEN -t.amount
      ELSE 0
    END
  ), 0) AS balance
FROM profiles u
LEFT JOIN transactions t ON t.user_id = u.id
GROUP BY u.id;
```
- Real-time balance calculation
- Income adds, expenses subtract
- Excludes len/den from balance

### Database Features

- **Foreign Key Constraints:** Ensures referential integrity
- **Check Constraints:** Validates enum values and amount ranges
- **Unique Constraints:** Prevents duplicate categories
- **Cascade Deletes:** Automatically removes related records
- **Indexes:** Optimizes query performance on frequently accessed columns
- **Database Views:** Pre-calculated aggregations for analytics
- **Triggers:** Auto-creates profile on user signup

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git**
- **Supabase Account** (free tier available)

### 1. Clone the Repository
```bash
git clone https://github.com/Yuji25/Finance-Tracker.git
cd Finance-Tracker
```

### 2. Backend Setup

#### Navigate to Server Directory
```bash
cd Server
```

#### Install Dependencies
```bash
npm install
```

#### Configure Environment Variables
Create a `.env` file in the `Server` directory:
```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Server Configuration
PORT=5000
```

**How to get Supabase credentials:**
1. Create a project at [supabase.com](https://supabase.com)
2. Go to **Settings** → **API**
3. Copy `URL` and `service_role key` (anon key won't work for admin operations)

#### Setup Database Schema
1. Go to Supabase Dashboard → **SQL Editor**
2. Run the SQL files in order:
   - `schema_files/main_schema.sql` (main tables and views)
   - `schema_files/errors_fix.sql` (if any constraint fixes needed)
   - `schema_files/warnings_fix.sql` (optimization patches)
   - `schema_files/same_cat_people_fix.sql` (unique constraints)

#### Start Backend Server
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```
Server will run on `http://localhost:5000`

### 3. Frontend Setup

#### Navigate to Client Directory
```bash
cd ../Client
```

#### Install Dependencies
```bash
npm install
```

#### Configure API Endpoint
Update `src/utils/api.js` if using local backend:
```javascript
const API = axios.create({
  baseURL: "http://localhost:5000/api",  // Local backend
  // baseURL: "https://finance-tracker-dxsh.onrender.com/api", // Production
  withCredentials: true,
});
```

#### Start Development Server
```bash
npm run dev
```
Frontend will run on `http://localhost:5173`

### 4. Access the Application
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000
- **API Test:** http://localhost:5000/run (should return "Backend is running")

---

## 📡 API Documentation

### Base URL
- **Local:** `http://localhost:5000/api`
- **Production:** `https://finance-tracker-dxsh.onrender.com/api`

### Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

### 🔐 Auth Routes (`/api/auth`)

#### 1. Register User
```http
POST /api/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "user_metadata": { "name": "John Doe" }
  }
}
```

#### 2. Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": { /* user object */ },
  "token": "jwt_access_token_here"
}
```

#### 3. Logout User
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "User logged out successfully"
}
```

#### 4. Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "user_metadata": { "name": "John Doe" }
  }
}
```

#### 5. Delete Account
```http
DELETE /api/auth/delete
Authorization: Bearer <token>
```

---

### 💸 Transaction Routes (`/api/transactions`)

#### 1. Create Transaction
```http
POST /api/transactions
Authorization: Bearer <token>
Content-Type: application/json

// For Expense
{
  "type": "expense",
  "amount": 500.00,
  "categoryName": "Food",
  "note": "Dinner at restaurant"
}

// For Income
{
  "type": "income",
  "amount": 5000.00,
  "categoryName": "Salary",
  "note": "Monthly salary"
}

// For Len/Den
{
  "type": "len_den",
  "amount": 1000.00,
  "personName": "John Smith",
  "len_den_type": "len",  // or "den"
  "description": "Borrowed for emergency"
}
```

**Response:**
```json
{
  "success": true,
  "transaction": {
    "id": "uuid",
    "user_id": "uuid",
    "type": "expense",
    "amount": "500.00",
    "transaction_date": "2025-10-25",
    "expense_details": {
      "category_id": 1,
      "note": "Dinner at restaurant",
      "categories": { "name": "Food" }
    }
  }
}
```

#### 2. Get Transactions (with Filter)
```http
GET /api/transactions?type=expense
Authorization: Bearer <token>
```

**Query Parameters:**
- `type` (optional): Filter by `expense`, `income`, or `len_den`

**Response:**
```json
[
  {
    "id": "uuid",
    "amount": "500.00",
    "type": "expense",
    "transaction_date": "2025-10-25",
    "category_name": "Food",
    "note": "Dinner at restaurant"
  }
]
```

#### 3. Update Transaction
```http
PUT /api/transactions/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 600.00,
  "note": "Updated note"
}
```

#### 4. Delete Transaction
```http
DELETE /api/transactions/:id
Authorization: Bearer <token>
```

---

### 📊 Analytics Routes (`/api/analytics`)

#### 1. Get User Balance
```http
GET /api/analytics/balance
Authorization: Bearer <token>
```

**Response:**
```json
{
  "balance": 12500.50
}
```

#### 2. Get Category Statistics
```http
GET /api/analytics/category-stats
Authorization: Bearer <token>
```

**Response:**
```json
{
  "expenseSummary": {
    "Food": 2500.00,
    "Transport": 1200.00,
    "Entertainment": 800.00
  },
  "incomeSummary": {
    "Salary": 50000.00,
    "Freelance": 5000.00
  }
}
```

#### 3. Get Len/Den Summary
```http
GET /api/analytics/len-den-summary
Authorization: Bearer <token>
```

**Response:**
```json
{
  "totalLen": 5000.00,
  "totalDen": 2000.00,
  "personSummary": {
    "John Smith": {
      "totalLen": 3000.00,
      "totalDen": 1000.00,
      "netBalance": 2000.00
    }
  }
}
```

---

### 🏷 Category Routes (`/api/categories`)

#### 1. Create Category
```http
POST /api/categories
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Groceries",
  "type": "expense"  // or "income"
}
```

#### 2. Get All Categories
```http
GET /api/categories
Authorization: Bearer <token>
```

#### 3. Update Category
```http
PUT /api/categories/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Food & Dining",
  "type": "expense"
}
```

#### 4. Delete Category
```http
DELETE /api/categories/:id
Authorization: Bearer <token>
```

---

### 👥 People Routes (`/api/people`)

#### 1. Create Person
```http
POST /api/people
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Doe",
  "phone": "+1234567890",
  "email": "jane@example.com"
}
```

#### 2. Get All People
```http
GET /api/people
Authorization: Bearer <token>
```

#### 3. Update Person
```http
PUT /api/people/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Smith",
  "phone": "+0987654321"
}
```

#### 4. Delete Person
```http
DELETE /api/people/:id
Authorization: Bearer <token>
```

---

### Error Responses

All endpoints return errors in this format:
```json
{
  "success": false,
  "message": "Error description here",
  "error": "Detailed error (in development)"
}
```

**Common Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `409` - Conflict (duplicate entry)
- `500` - Internal Server Error

---

## 🎨 Frontend Architecture

### Component Structure

```
src/
├── components/
│   ├── Container.jsx          # Layout wrapper with max-width
│   ├── Footer.jsx             # Footer with links
│   ├── LoadingSpinner.jsx     # Loading state indicator
│   ├── Navbar.jsx             # Navigation with auth state
│   ├── SectionTabs.jsx        # Tab switcher for filtering
│   ├── Skeleton.jsx           # Loading placeholder
│   ├── StatCard.jsx           # Statistics display card
│   ├── TransactionForm.jsx    # Dynamic form for all transaction types
│   └── TransactionList.jsx    # Table for displaying transactions
│
├── pages/
│   ├── AuthPage.jsx           # Login/Signup page
│   ├── Dashboard.jsx          # Main analytics dashboard
│   ├── Landing.jsx            # Public landing page
│   └── Transactions.jsx       # Transaction management page
│
├── utils/
│   └── api.js                 # Axios instance with interceptors
│
├── App.jsx                    # Main app with routing
├── main.jsx                   # React entry point
└── index.css                  # Global styles + Tailwind
```

### Key Frontend Features

#### 1. **Protected Routes**
```jsx
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
}
```
- Redirects unauthenticated users to landing page
- Preserves token in localStorage

#### 2. **API Interceptor**
```javascript
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});
```
- Automatically attaches JWT token to all requests
- Centralized authentication handling

#### 3. **Dynamic Transaction Form**
- Single component handles all transaction types
- Conditional field rendering based on type
- Real-time validation
- Success callbacks for data refresh

#### 4. **Data Visualization**
- Recharts pie charts for category breakdown
- Responsive containers
- Custom color schemes
- Interactive tooltips and legends

#### 5. **Toast Notifications**
```jsx
import toast from "react-hot-toast";
toast.success("Transaction added!");
toast.error("Failed to load data");
```

#### 6. **Animations**
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
```
- Smooth page transitions
- Element entrance animations
- Enhanced user experience

### State Management
- React Hooks (`useState`, `useEffect`, `useMemo`)
- Local component state
- No global state library needed (simple app structure)

### Styling Approach
- **Tailwind CSS Utility Classes**
- **Custom Theme Configuration:**
  - Brand colors (blue palette)
  - Ink colors (gray palette)
  - Semantic colors (success, warning, danger)
  - Custom font families (Inter, Space Grotesk)
  - Shadow utilities

---

## 🔒 Security Features

### 1. **Authentication & Authorization**
- JWT-based stateless authentication
- Token verification on every protected route
- Supabase Auth security (encrypted passwords, email verification)
- Service role key used only on backend

### 2. **CORS Protection**
```javascript
const allowedOrigins = [
  "http://localhost:5173",
  "https://finance-tracker-pied-omega.vercel.app"
];
```
- Whitelist-based origin validation
- Credentials support for cookies/tokens
- Prevents unauthorized cross-origin requests

### 3. **Database Security**
- Foreign key constraints prevent orphaned records
- Check constraints validate data types
- Cascade deletes maintain referential integrity
- Unique constraints prevent duplicates
- User-scoped queries (all queries filtered by `user_id`)

### 4. **Input Validation**
- Required field validation on frontend
- Type checking (email, number, text)
- Backend validation in controllers
- SQL injection prevention (parameterized queries via Supabase client)

### 5. **Environment Variables**
- Sensitive credentials stored in `.env`
- Not committed to version control (`.gitignore`)
- Different configs for development and production

### 6. **Error Handling**
- Try-catch blocks in all async operations
- Generic error messages to users (no stack traces)
- Detailed logging for debugging

---

## 🌐 Deployment

### Frontend Deployment (Vercel)

#### Prerequisites:
- Vercel account
- GitHub repository connected

#### Steps:
1. **Push code to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import GitHub repository
   - Select `Client` as root directory

3. **Build Configuration:**
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Environment Variables:** (if needed)
   - Add any frontend-specific env vars

5. **Deploy:** Vercel auto-deploys on every push to main

**Live URL:** https://finance-tracker-pied-omega.vercel.app

---

### Backend Deployment (Render)

#### Prerequisites:
- Render account
- GitHub repository

#### Steps:
1. **Create Web Service:**
   - Go to [render.com](https://render.com)
   - New → Web Service
   - Connect GitHub repo

2. **Configuration:**
   ```
   Root Directory: Server
   Build Command: npm install
   Start Command: node app.js
   Environment: Node
   ```

3. **Environment Variables:**
   ```
   SUPABASE_URL=your_production_url
   SUPABASE_SERVICE_ROLE_KEY=your_production_key
   PORT=5000
   ```

4. **Deploy:** Render auto-deploys on push

**Live URL:** https://finance-tracker-dxsh.onrender.com

---

### Database (Supabase)
- Already cloud-hosted
- No additional deployment needed
- Ensure production credentials are used in Render

---

## 📁 Project Structure

```
FinanceTracker/
│
├── Client/                          # Frontend React Application
│   ├── src/
│   │   ├── assets/                  # Images, icons
│   │   ├── components/              # Reusable UI components
│   │   │   ├── Container.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── SectionTabs.jsx
│   │   │   ├── Skeleton.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── TransactionForm.jsx
│   │   │   └── TransactionList.jsx
│   │   ├── pages/                   # Page components
│   │   │   ├── AuthPage.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Landing.jsx
│   │   │   └── Transactions.jsx
│   │   ├── utils/                   # Utility functions
│   │   │   └── api.js               # Axios configuration
│   │   ├── App.css                  # Component styles
│   │   ├── App.jsx                  # Main app component
│   │   ├── index.css                # Global styles + Tailwind
│   │   └── main.jsx                 # React entry point
│   ├── eslint.config.js             # ESLint configuration
│   ├── index.html                   # HTML template
│   ├── package.json                 # Frontend dependencies
│   ├── postcss.config.js            # PostCSS configuration
│   ├── tailwind.config.js           # Tailwind CSS configuration
│   └── vite.config.js               # Vite build configuration
│
├── Server/                          # Backend Express Application
│   ├── config/
│   │   └── supabase.js              # Supabase client setup
│   ├── controllers/                 # Business logic
│   │   ├── analytics.controller.js  # Analytics endpoints
│   │   ├── auth.controller.js       # Authentication logic
│   │   ├── category.controller.js   # Category CRUD
│   │   ├── people.controller.js     # People CRUD
│   │   └── transaction.controller.js # Transaction CRUD
│   ├── middlewares/
│   │   └── auth.middleware.js       # JWT verification
│   ├── routes/                      # Express routes
│   │   ├── analytics.routes.js
│   │   ├── auth.routes.js
│   │   ├── category.routes.js
│   │   ├── people.routes.js
│   │   └── transaction.routes.js
│   ├── schema_files/                # SQL database schemas
│   │   ├── errors_fix.sql
│   │   ├── errors2_fix.sql
│   │   ├── main_schema.sql          # Primary schema
│   │   ├── same_cat_people_fix.sql
│   │   └── warnings_fix.sql
│   ├── app.js                       # Express app entry point
│   └── package.json                 # Backend dependencies
│
└── README.md                        # This file
```

---

## 📸 Screenshots

### 🏠 Landing Page
- Hero section with call-to-action
- Financial facts section
- Responsive design showcase
- Get started and demo buttons

### 🔐 Authentication Page
- Toggle between login/signup
- Email and password fields
- Toast notifications for feedback
- Responsive form design

### 📊 Dashboard (Analytics)
- Current balance display
- Income, Expense, Len, Den stat cards
- Interactive pie charts for category breakdown
- Recent transactions list
- Section tabs for filtering

### 💳 Transactions Page
- Add transaction form (type-specific fields)
- Complete transaction list
- Real-time updates
- CRUD operations

### 📱 Responsive Design
- Mobile-first approach
- Tablet optimization
- Desktop experience
- Sticky navigation

---

## 🚦 Future Enhancements

### Phase 1 (Short-term)
- [ ] **Transaction Search & Filters** - Date range, amount range, keyword search
- [ ] **Export Data** - CSV/PDF export of transactions
- [ ] **Dark Mode** - Theme toggle with localStorage persistence
- [ ] **Budget Goals** - Set monthly budgets with progress tracking
- [ ] **Recurring Transactions** - Auto-add monthly bills

### Phase 2 (Medium-term)
- [ ] **Multi-Currency Support** - Convert and track multiple currencies
- [ ] **Receipt Upload** - Image attachment for transactions
- [ ] **Advanced Analytics** - Line charts, bar graphs, trends over time
- [ ] **Notifications** - Email alerts for budget exceeded
- [ ] **Mobile App** - React Native version

### Phase 3 (Long-term)
- [ ] **Bank Integration** - Auto-import transactions via API
- [ ] **AI Insights** - Spending pattern analysis
- [ ] **Collaborative Finance** - Share budgets with family
- [ ] **Investment Tracking** - Stocks, crypto portfolio
- [ ] **Tax Calculator** - Generate tax reports

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m "Add AmazingFeature"
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Code Style Guidelines
- Follow existing code patterns
- Use ESLint configuration
- Write meaningful commit messages
- Comment complex logic
- Test before submitting

---

## 📝 License

This project is licensed under the **ISC License**.

```
Copyright (c) 2025 Yuji

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.
```

---

## 👨‍💻 Author

**Yuji**  
- GitHub: [@Yuji25](https://github.com/Yuji25)
- Repository: [Finance-Tracker](https://github.com/Yuji25/Finance-Tracker)

---

## 🙏 Acknowledgments

- **Supabase** - For excellent database and auth services
- **React** - For the powerful UI library
- **Tailwind CSS** - For rapid styling
- **Recharts** - For beautiful data visualization
- **Vercel & Render** - For free hosting services

---

## 📞 Support

For questions, issues, or suggestions:
- **GitHub Issues:** [Create an issue](https://github.com/Yuji25/Finance-Tracker/issues)
- **Email:** Contact through GitHub profile

---

## ⭐ Star this Repository

If you find this project helpful, please give it a ⭐ on GitHub!

---

<div align="center">
  <p>Made with ❤️ for MERN Stack Final Project</p>
  <p>© 2025 FinTrack. All rights reserved.</p>
</div>
