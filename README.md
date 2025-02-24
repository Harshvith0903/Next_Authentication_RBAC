# Next.js Authentication with Role-Based Access Control

## 📌 Project Overview
This project is a **Next.js** application with **Prisma**, **PostgreSQL**, and **NextAuth.js** for user authentication and role-based access control (RBAC). Users can sign up, but they must be assigned a role by an **admin** before accessing protected pages. After signing in, users are redirected based on their roles.

##  Features
- User authentication with **NextAuth.js**
- Password hashing with **bcrypt.js**
- Database integration using **Prisma ORM**
- Role-based access control (**Admin, Upload Team, Draftsman, Site Incharge**)
- Middleware to restrict unauthorized access
- Dynamic redirection based on user roles
- Secure **JWT-based authentication**

---

## 🛠️ Tech Stack
- **Next.js** – Frontend framework
- **Prisma** – Database ORM
- **PostgreSQL** – Database
- **NextAuth.js** – Authentication
- **Tailwind CSS** – Styling
- **bcrypt.js** – Password hashing

---

## ⚙️ Installation & Setup
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/nextjs-auth-role-based.git
cd nextjs-auth-role-based
```

### 2️⃣ Install Dependencies
```bash
yarn install
# or
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root directory and add the following:
```env
DATABASE_URL=your_postgresql_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
```

### 4️⃣ Migrate Database
```bash
npx prisma migrate dev --name init
```

### 5️⃣ Start the Development Server
```bash
yarn dev
# or
npm run dev
```

---

## 🛡️ Authentication & Authorization Flow
### 🔹 Sign Up & Role Assignment
1. Users sign up but **cannot access any pages** until an **admin assigns a role**.
2. The admin assigns roles via the backend.

### 🔹 Role-Based Redirection
- **Admin** → `/dashboard/admin`
- **Upload Team** → `/dashboard/upload`
- **Draftsman** → `/dashboard/draftsman`
- **Site Incharge** → `/dashboard/site-incharge`

### 🔹 Middleware Protection
- **Middleware** restricts unauthorized users from accessing protected routes.
- Users without an assigned role **cannot log in**.

---

## 📂 Folder Structure
```
nextjs-auth-role-based/
├── prisma/              # Prisma schema & migrations
│   ├── schema.prisma   # Database schema
│   ├── migrations/     # Prisma migration files
├── src/
│   ├── app/
│   │   ├── auth/       # Authentication pages
│   │   │   ├── sign-in/
│   │   │   ├── sign-up/
│   │   ├── dashboard/  # Role-based dashboards
│   │   │   ├── admin/
│   │   │   ├── upload/
│   │   │   ├── draftsman/
│   │   │   ├── site-incharge/
│   ├── api/
│   │   ├── auth/       # API routes for authentication
│   │   ├── user/       # API routes for user management
│   │   ├── admin/assign-role/ # Admin role assignment
├── components/         # UI components
├── lib/                # Helper functions (Auth, DB)
├── styles/             # Global styles
├── .env                # Environment variables
├── README.md           # Project documentation
├── package.json        # Dependencies & scripts
└── next.config.js      # Next.js configuration
```

---

## 🔥 API Routes
### 📍 `POST /api/user` – User Registration
- **Registers a user but doesn't assign a role**.

### 📍 `POST /api/auth/signin` – User Login
- **Verifies credentials & restricts users without roles**.

### 📍 `GET /api/protected-route` – Fetch Authenticated User Data
- **Checks JWT & retrieves user details**.

### 📍 `POST /api/admin/assign-role` – Assign Roles (Admin Only)
- **Allows an admin to assign roles to new users**.

---

## 🔐 Role-Based Access Control (RBAC)
### **Admin Privileges**
✅ Assign roles to new users
✅ Access all pages

### **User Restrictions**
🚫 Cannot access admin panel
🚫 Cannot change their own role
🚫 No access until admin assigns a role

---

## ❓ Common Issues & Fixes
**1. "Access Denied: Role not assigned yet" error?**
- Make sure an admin **assigns a role** to the user in the database.

**2. Database not syncing?**
- Run:
  ```bash
  npx prisma migrate reset
  ```

**3. Sign-in not redirecting properly?**
- Ensure `auth.ts` includes role-based redirection.

---

## 🙌 Acknowledgements
Thanks to **Next.js**, **Prisma**, **NextAuth.js**, and **PostgreSQL** for making this project possible!
