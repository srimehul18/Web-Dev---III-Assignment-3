# Inventory and Data Management System

A RESTful backend application built using **Node.js, Express.js, MongoDB, and Mongoose** to manage products, stock levels, and inventory reports.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv

## Project Structure

```text
Web-Dev-III-Assignment-III/
├── database/
│   └── mongodb.js
├── model/
│   └── productModel.js
├── controller/
│   └── productController.js
├── routes/
│   └── productRoutes.js
├── middleware/
│   ├── validateProduct.js
│   └── errorHandler.js
├── results/
│   └── all results screenshots
├── .env
├── .gitignore
├── server.js
├── package-lock.json
└── package.json
```

## Installation and Setup

1. Install dependencies:

```bash
npm install
```

2. Configure the `.env` file:

```env
PORT=3000
MONGO_URL=mongodb://127.0.0.1:27017/inventoryDB
```

3. Start the server:

```bash
npm run dev
```

Server URL: `http://localhost:3000`

## API Endpoints

Base URL: `/api/products`

| Method | Endpoint | Function |
|---|---|---|
| POST | `/` | Create product |
| GET | `/` | Get all products |
| GET | `/:id` | Get product by ID |
| PUT | `/:id` | Update product |
| DELETE | `/:id` | Delete product |
| PUT | `/:id/stock` | Adjust stock |
| GET | `/low-stock` | Low-stock report |
| GET | `/summary` | Category-wise summary |

## Key Features

- Product creation and management with schema validation.
- Filtering, sorting, searching, and pagination.
- Safe stock increments and decrements.
- Low-stock alerts.
- Category-wise inventory summary using aggregation.
- Input validation and error-handling middleware.
- Environment variable management using dotenv.

## Conclusion

This project demonstrates RESTful API development, MongoDB integration, CRUD operations, data validation, stock management, and aggregation using Node.js and Express.js.

### Author
Mehul Srivastava