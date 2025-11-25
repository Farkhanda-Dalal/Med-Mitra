# Med-Mitra

Lightweight pharmacy inventory management system.

## MedMitra in Action

#### Registration and Login
<img src="https://github.com/Farkhanda-Dalal/Med-Mitra/blob/main/Images/WhatsApp%20Image%202025-10-30%20at%2000.22.56_232fcdf0.jpg">
<img src="https://github.com/Farkhanda-Dalal/Med-Mitra/blob/main/Images/WhatsApp%20Image%202025-10-30%20at%2000.22.56_8528f367.jpg">

#### Home
<img src="https://github.com/Farkhanda-Dalal/Med-Mitra/blob/main/Images/WhatsApp%20Image%202025-10-30%20at%2000.22.56_bab1aab0.jpg">

#### Stock Addition
<img src="https://github.com/Farkhanda-Dalal/Med-Mitra/blob/main/Images/WhatsApp%20Image%202025-10-30%20at%2000.22.57_22a94030.jpg">

#### Expiry Report
<img src="https://github.com/Farkhanda-Dalal/Med-Mitra/blob/main/Images/WhatsApp%20Image%202025-10-30%20at%2000.22.58_78ebd23f.jpg">

#### Stock Report
<img src="https://github.com/Farkhanda-Dalal/Med-Mitra/blob/main/Images/WhatsApp%20Image%202025-10-30%20at%2000.22.58_cac7aa2b.jpg">



## Project at a glance

- Main entry: `app.mjs` (ES module)
- Static assets: `Public/`
- Controllers: `Controller/` (InventoryController, TransactionController, UserController)
- Routes: `Routes/` (InventoryRoutes.mjs, TransactionRoutes.mjs, UserRoutes.mjs)
- Models: `Model/` (Medicine.mjs, Transaction.mjs, User.mjs)
- Database connection: `DatabaseConnection/driver.mjs` (uses Mongoose)

## Project at a glance

- Main entry: `app.mjs` (ES module)
- Static assets: `Public/`
- Controllers: `Controller/` (InventoryController, TransactionController, UserController)
- Routes: `Routes/` (InventoryRoutes.mjs, TransactionRoutes.mjs, UserRoutes.mjs)
- Models: `Model/` (Medicine.mjs, Transaction.mjs, User.mjs)
- Database connection: `DatabaseConnection/driver.mjs` (uses Mongoose)

## Key features

- User authentication: signup and login flows (session or token-based logic in `User` controller)
- Inventory management: add, update, delete, and list medicines
- Stock tracking: quantity, reorder/low-stock awareness
- Expiry handling: views/reports for expired or expiring items (see `expstock.ejs` in `View/` if enabled)
- Transactions & billing: create transactions, generate bills, and save sales records
- Reports: stock reports, expired stock reports, and basic transaction reports
- Static frontend: responsive assets under `Public/` (CSS/JS/images)

## Requirements

- Node.js (v14+ recommended; v16+ preferred)
- npm (comes with Node.js)
- MongoDB server (local or remote)

Note: project files use ESM (`.mjs`), so run with `node app.mjs` or add a `start` script.

## Quick install

Open a PowerShell terminal in the project root and run:

```powershell
npm install
```
## Scripts (recommended)

Add these to `package.json` for convenience:

```json
"scripts": {
  "start": "node app.mjs",
  "dev": "nodemon app.mjs"
}
```

Install `nodemon` for development reloads:

```powershell
npm install --save-dev nodemon
```

## API / Routes (summary)

Below are the main route prefixes and typical endpoints. These are derived from the mounted routes in `app.mjs` and the route file names — please inspect the route files for exact parameter names and request/response shapes.

- User (`/user`)

  - POST `/user/signup` — create a new user
  - POST `/user/login` — user login
  - GET `/user/profile` — (protected) get profile / session details

- Inventory (`/inventory`)

  - GET `/inventory` — list items
  - GET `/inventory/:id` — get single item
  - POST `/inventory/add` — add a new medicine
  - PUT `/inventory/:id` — update an item
  - DELETE `/inventory/:id` — remove an item
  - GET `/inventory/expiring` — list expiring/expired items (if implemented)

- Transaction (`/transaction`)
  - POST `/transaction/checkout` — create a transaction / generate bill
  - GET `/transaction/:id` — get transaction details
  - GET `/transaction/report` — get transaction/sales report

Note: the actual route names/paths may vary; check `Routes/*` files for exact definitions.

## Data model (high-level)

These are short, best-effort summaries — check the files in `Model/` for precise fields and validation.

- User (Model/User.mjs)

  - typical fields: name, email, password (hashed), role, createdAt

- Medicine (Model/Medicine.mjs)

  - typical fields: name, brand, batchNo, expiryDate, quantity, price, manufacturer

- Transaction (Model/Transaction.mjs)
  - typical fields: items (array of medicines + qty + price), totalAmount, user, date

