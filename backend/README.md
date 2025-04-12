
# Invoice Management System - Backend API

This is an enterprise-level REST API for the Invoice Management System built with Node.js, Express, and MongoDB.

## Features

- **Authentication**: JWT-based authentication system
- **Authorization**: Role-based access control
- **Invoice Management**: CRUD operations for both sales and expense invoices
- **GST Support**: Indian GST compliance features
- **Accounting Integration**: Sync with accounting software
- **CSV Export**: Export invoices to CSV format
- **Error Handling**: Centralized error handling with Sentry integration
- **Logging**: Advanced logging with Winston
- **Security**: Implemented with best practices using Helmet, rate limiting, etc.
- **Validation**: Request validation using express-validator

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)
- Sentry account (for error tracking)

### Installation

1. Clone the repository
2. Copy `.env.example` to `.env` and update the variables
3. Install dependencies:
   ```
   npm install
   ```
4. Start the server:
   ```
   npm run dev
   ```

## API Documentation

### Authentication Routes
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Request password reset
- `PUT /api/auth/reset-password/:resetToken` - Reset password

### User Routes
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/change-password` - Change password
- `DELETE /api/users/:id` - Delete user (admin only)

### Sales Invoice Routes
- `GET /api/invoices/sales` - Get all sales invoices
- `GET /api/invoices/sales/:id` - Get sales invoice by ID
- `POST /api/invoices/sales` - Create sales invoice
- `PUT /api/invoices/sales/:id` - Update sales invoice
- `DELETE /api/invoices/sales/:id` - Delete sales invoice
- `PATCH /api/invoices/sales/:id/status` - Update sales invoice status
- `GET /api/invoices/sales/export/csv` - Export sales invoices to CSV
- `POST /api/invoices/sales/sync` - Sync sales invoices with accounting software

### Expense Invoice Routes
- `GET /api/invoices/expenses` - Get all expense invoices
- `GET /api/invoices/expenses/:id` - Get expense invoice by ID
- `POST /api/invoices/expenses` - Create expense invoice
- `PUT /api/invoices/expenses/:id` - Update expense invoice
- `DELETE /api/invoices/expenses/:id` - Delete expense invoice
- `PATCH /api/invoices/expenses/:id/status` - Update expense invoice status
- `POST /api/invoices/expenses/:id/gst-filing` - Process GST filing
- `GET /api/invoices/expenses/export/csv` - Export expense invoices to CSV
- `POST /api/invoices/expenses/sync` - Sync expense invoices with accounting software

## License

This project is licensed under the MIT License.
