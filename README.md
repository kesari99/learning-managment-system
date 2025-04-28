# 🎓 Learning Management System (LMS) 


A full-stack LMS platform where **Instructors** upload courses and **Students** purchase/watch content. Features Cloudinary media storage, PayPal payments, and a modern UI with shadcnUI + TailwindCSS.

## ✨ Features

### 👨‍🏫 Instructor Features
- 📤 Upload courses (videos, PDFs, code) via **Cloudinary**
- 🛠️ Manage content (edit/delete/update)
- 💰 Track sales with **PayPal integration**
- 📊 Dashboard analytics

### 👨‍🎓 Student Features
- 🛒 Browse & purchase courses
- ▶️ Watch lectures (secure streaming)
- 📈 Track progress

### 🛡️ Security & UX
- 🔐 JWT authentication (RBAC)
- 📱 Responsive design (shadcnUI + Tailwind)
- 💳 PayPal sandbox/live mode
- ☁️ Cloudinary media storage

## 🛠️ Tech Stack

| Category          | Technologies Used                     |
|-------------------|---------------------------------------|
| **Frontend**      | React, shadcnUI, TailwindCSS          |
| **State**         | React Context API                     |
| **Backend**       | Node.js, Express                      |
| **Database**      | MongoDB (Mongoose)                    |
| **Authentication**| JWT, Bcrypt                           |
| **Payments**      | PayPal REST API                       |
| **Media**         | Cloudinary                            |

## 🚀 Installation

```bash
# Clone repo
git clone https://github.com/your-username/lms.git


# Backend setup
cd server
npm install
npm run dev

# Frontend setup
cd client
npm install
npm run dev
