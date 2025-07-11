# 📝 Full Stack Blog Website

A complete full-stack blog web application built using:

- **Frontend**: React, Axios, React Router, Tailwind CSS  
- **Backend**: Express.js, MongoDB, Mongoose, JWT Authentication  
- **Features**: Blog CRUD, User Auth, Profile page, Protected routes, Responsive UI

---

## 🧠 About the Project

This project allows users to:
- Create blog posts ✏️  
- Read blog posts 📖  
- Update their posts 🔁  
- Delete their posts 🗑️  
- Register/Login securely 🔐  
- View a personal profile page with their own blogs 🧑‍💻  

---

## 📁 Project Structure

This is the folder structure:
 - /Frontend → React Frontend
 - /Backend → https://github.com/MrRanjan12/BlogWebsite/Backend

---

### Backend Folder Structure (`/Backend`)
```
/models
├── Blog.js → Blog Schema
└── User.js → User Schema

/controllers
├── blogController.js → Blog CRUD Logic
└── authController.js → Register/Login Logic

/routes
├── blogRoutes.js → Blog API Routes
└── authRoutes.js → Auth API Routes

/middleware
└── authMiddleware.js → JWT Auth Protection

.env → Environment Variables
index.js → Main server entry file

 ```


---

## ⚙️ Technologies Used

| Area     | Stack                                 |
|----------|----------------------------------------|
| Frontend | React, Axios, React Router, Tailwind CSS |
| Backend  | Express.js, MongoDB, Mongoose, JWT     |
| Other    | dotenv, bcryptjs, cors                 |

---

## 🚀 Features

### ✅ Blog CRUD
- Create, Read, Update, Delete posts
- Stored in MongoDB
- Timestamp & author included

### 🔐 User Auth (JWT)
- Register with username & password
- Login gets token saved in localStorage
- Auth token sent in `Authorization` header

### 👤 Profile Page
- View posts by current user
- Edit/Delete only own blogs

### 🧼 Clean UI
- Tailwind-based responsive layout
- Route protection
- Friendly errors

---

### 🖥️ Installation

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/MrRanjan12/BlogWebsite.git
cd blog-app
```
##2️⃣ Backend Setup (/server)
```bash
cd server
npm install

```
Create a .env file in /server:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/blogDB
JWT_SECRET=yourSecretKey123

```
Then start the backend server:
```bash
npm start
```
##3️⃣ Frontend Setup (/client)
```bash
cd ..Frontend
npm install
npm start
```
Runs on: http://localhost:5173
## 🌐 API Endpoints

### 🔒 Auth Routes (`/auth`)

| Method | Endpoint       | Description        |
|--------|----------------|--------------------|
| POST   | `/auth/register` | Register user       |
| POST   | `/auth/login`    | Login & return JWT  |

---

### 📝 Blog Routes (`/posts`)

| Method | Endpoint        | Auth | Description       |
|--------|-----------------|------|-------------------|
| GET    | `/posts`        | ❌    | Get all posts     |
| GET    | `/posts/:id`    | ❌    | Get single post   |
| POST   | `/posts`        | ✅    | Create new post   |
| PUT    | `/posts/:id`    | ✅    | Update post       |
| DELETE | `/posts/:id`    | ✅    | Delete post       |

## 📂 Key Code Files

### 🔧 Backend

- `/models/User.js` – User schema with hashed password  
- `/models/Blog.js` – Blog post schema  
- `/controllers/authController.js` – Login & register logic  
- `/controllers/blogController.js` – Blog CRUD logic  
- `/middleware/authMiddleware.js` – JWT verify middleware  
- `/routes/authRoutes.js` – Routes for register/login  
- `/routes/blogRoutes.js` – Routes for blogs  
- `/index.js` – Main Express entry  

### 🎨 Frontend

- `/src/api/blogApi.js` – Axios CRUD calls (with token)  
- `/src/api/authApi.js` – Axios login/register  
- `/src/pages/Register.jsx` – Register UI  
- `/src/pages/Login.jsx` – Login UI  
- `/src/pages/CreatePost.jsx` – Create new post  
- `/src/pages/Profile.jsx` – View own posts  
- `/src/components/Navbar.jsx` – Navigation + Auth buttons  
- `/src/App.js` – Route configuration  

---

## 🔐 Security Notes

- Passwords hashed using **bcryptjs**  
- Tokens signed using **jsonwebtoken**  
- Protected routes require valid **JWT**  
- Token stored in `localStorage` *(can be upgraded to `httpOnly` cookies for better security)*  

---

## 👀 UI Preview

*Add screenshots or demo GIFs here*

---

## 🛠️ Future Improvements

- Google/Facebook OAuth  
- Rich Text Editor (Quill.js / CKEditor)  
- Blog images/media upload  
- Public user profiles  
- Likes, comments, and share features  
- Blog tags & category filters  
- SEO optimization  

---

## 🧑‍💻 Author

Made with ❤️ by **Ranjan Kumar**  
Inspired by real-world blogging platforms  




