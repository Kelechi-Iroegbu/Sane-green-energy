# Seeing Green Energy — Server

Express + MongoDB REST API for the Seeing Green Energy e-commerce platform.

## Setup

```bash
cd Server
npm install
cp .env.example .env   # then fill in MONGO_URI and JWT_SECRET
npm run seed           # optional: load sample products
npm run dev            # starts on http://localhost:5000
```

## Endpoints

### Auth
- `POST /api/users/register` — `{ name, email, password }`
- `POST /api/users/login` — `{ email, password }` → `{ token, ... }`
- `GET  /api/users/profile` — Bearer token

### Products
- `GET    /api/products` — query: `?category=&search=&featured=true`
- `GET    /api/products/:id`
- `POST   /api/products` — admin
- `PUT    /api/products/:id` — admin
- `DELETE /api/products/:id` — admin

### Cart (auth required)
- `GET    /api/cart`
- `POST   /api/cart` — `{ productId, qty }`
- `PUT    /api/cart/:productId` — `{ qty }`
- `DELETE /api/cart/:productId`
- `DELETE /api/cart`

### Orders (auth required)
- `POST /api/orders` — `{ shippingAddress, paymentMethod }`
- `GET  /api/orders/mine`
- `GET  /api/orders/:id`

## Folder structure

```
Server/
├── Controllers/
├── Models/
├── Routes/
├── config/
├── middleware/
├── app.js
├── seed.js
├── package.json
└── .env.example
```
