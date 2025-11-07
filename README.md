🚀 Dynamic RBAC Platform

> **Build**, **Manage**, and **Control** your data models with powerful Role-Based Access Control — all without writing a single line of backend code!

✨ What Makes This Special?

This platform **empowers** you to:

- 🎨 **Design** custom data models visually through an intuitive UI
- 🔐 **Enforce** granular role-based permissions (Admin, Manager, Viewer)
- ⚡ **Generate** REST APIs automatically for your models
- 📊 **Manage** data with full CRUD operations
- 🛡️ **Secure** your application with JWT authentication
- 🎯 **Deploy** rapidly without complex configurations

---

🎬 Quick Demo
 Model Builder in Action
Create models, define fields, and set permissions — all from your browser:

```
📦 Create Model → Add Fields → Configure RBAC → Publish → API Ready! 
```

Dashboard Features
- **View** all your models in a sidebar
- **Create** new records with dynamic forms
- **Edit** existing data inline
- **Delete** records with confirmation
- **Switch** between models seamlessly

---

🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                   Frontend (React)                  │
│  • Model Builder  • Dashboard  • Authentication    │
└───────────────────┬─────────────────────────────────┘
                    │ REST API
┌───────────────────▼─────────────────────────────────┐
│                 Backend (Node.js)                   │
│  • Express Routes  • JWT Auth  • Dynamic CRUD      │
└───────────────────┬─────────────────────────────────┘
                    │ Prisma ORM
┌───────────────────▼─────────────────────────────────┐
│              Database (SQLite)                      │
│  • User Table  • Dynamic Model Tables              │
└─────────────────────────────────────────────────────┘
```

---

🚀 Getting Started

Prerequisites

Ensure you have these installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

Installation Steps

1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/dynamic-rbac-platform.git
cd dynamic-rbac-platform
```

2️⃣ Setup Backend
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run seed
npm run dev
```

The backend will start on **http://localhost:4000**

3️⃣ Setup Frontend (New Terminal)
```bash
cd frontend
npm install
npm run dev
```

The frontend will start on **http://localhost:5173**

4️⃣ Access the Application
Open your browser and navigate to:
```
http://localhost:5173
```

---

 🔑 Test Credentials

Use these credentials to explore different permission levels:

| Role    | Username | Password    | Permissions                        |
|---------|----------|-------------|------------------------------------|
| 👑 Admin | `admin`  | `admin123`  | Full access to all operations      |
| 👔 Manager | `manager` | `manager123` | Create, Read, Update (no Delete) |
| 👀 Viewer | `viewer` | `viewer123` | Read-only access                   |

---

📖 How to Use

Creating Your First Model

1. **Login** with any of the test credentials
2. **Click** "Create New Model" button
3. **Enter** model details:
   - Model Name (e.g., "Product", "Employee")
   - Fields with types (string, number, boolean, date)
   - Set required/unique constraints
4. **Configure** RBAC permissions for each role
5. **Publish** your model
6. **Start** managing data immediately!

Managing Data

1. **Select** a model from the sidebar
2. **Click** "+ Add New" to create records
3. **Edit** by clicking the "Edit" button on any row
4. **Delete** records with the "Delete" button
5. **View** all records in a clean table interface

---

🗂️ Project Structure

```
dynamic-rbac-platform/
│
├── backend/
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── middlewares/    # Auth & RBAC middleware
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── scripts/        # Seed scripts
│   │   └── utils/          # Helper functions
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API integration
│   │   └── main.tsx        # Entry point
│   └── package.json
│
└── README.md
```

---

🎯 Key Features Explained

🔐 Role-Based Access Control (RBAC)
- **Define** permissions per role during model creation
- **Enforce** access control at the API level
- **Customize** what each role can do (Create/Read/Update/Delete)

⚡ Dynamic CRUD Operations
- **Auto-generate** REST endpoints for new models
- **No code changes** required to add new functionality
- **Hot reload** — new models are available instantly

🎨 Visual Model Builder
- **Drag-and-drop** field creation (coming soon!)
- **Type safety** with TypeScript
- **Validation** rules built-in

🔒 JWT Authentication
- **Secure** token-based authentication
- **Automatic** token refresh
- **Protected** routes and API endpoints

---

🛠️ Technology Stack

 Frontend
- **React 19** - Modern UI library
- **TypeScript** - Type-safe development
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Vite** - Lightning-fast build tool

Backend
- **Node.js** - JavaScript runtime
- **Express 5** - Web framework
- **Prisma** - Next-gen ORM
- **JWT** - Secure authentication
- **bcryptjs** - Password hashing

Database
- **SQLite** - Lightweight SQL database (easy to switch to PostgreSQL/MySQL)

---

🚧 Roadmap

- [ ] **Add** support for relationships between models
- [ ] **Implement** data validation rules
- [ ] **Create** API documentation with Swagger
- [ ] **Add** bulk operations (import/export CSV)
- [ ] **Build** dashboard analytics
- [ ] **Support** custom business logic hooks
- [ ] **Enable** audit logging
- [ ] **Add** real-time updates with WebSockets

---

🤝 Contributing

Contributions are what make the open-source community amazing! Any contributions you make are **greatly appreciated**.

1. **Fork** the Project
2. **Create** your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your Changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the Branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request




🌟 Show Your Support

If this project helped you, please give it a ⭐️!

---

**Built with ❤️ by the community**
