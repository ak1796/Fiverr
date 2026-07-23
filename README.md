# ConnectUp – Freelance Marketplace

A full-stack freelance marketplace built using the **MERN Stack** that connects clients with freelancers. Inspired by platforms like Fiverr, ConnectUp enables users to create gigs, purchase services, manage orders, exchange real-time messages, and review completed work through an intuitive and responsive interface.

---

## 🚀 Features

### 👤 Authentication & Authorization
- Secure user registration and login
- JWT-based authentication
- Protected routes
- Buyer and Seller accounts

### 💼 Gig Management
- Create new gigs
- Update existing gigs
- Delete gigs
- Browse all available gigs
- View detailed gig information
- Upload gig images

### 🛒 Order Management
- Purchase freelancer services
- View buyer orders
- View seller orders
- Track order status

### 💬 Real-Time Messaging
- One-to-one messaging
- Instant communication using **Socket.io**
- Live conversation updates

### ⭐ Reviews & Ratings
- Leave reviews after completed orders
- Star rating system
- Average rating calculation

### 🔍 Search & Filtering
- Search gigs by keyword
- Filter services by category
- Sort gigs by price and popularity

### 👤 User Profile
- View user profiles
- Manage account information
- Display seller details and ratings

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Vite
- React Router DOM
- Axios
- CSS

## Backend
- Node.js
- Express.js

## Database
- MongoDB
- Mongoose

## Authentication
- JSON Web Token (JWT)
- bcrypt

## Real-Time Communication
- Socket.io

## Additional Packages
- Multer
- Cookie Parser
- dotenv
- CORS

---

# 📁 Project Structure

```text
ConnectUp-freelancer-platform/
│
├── client/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── index.html
│   └── README.md
│
├── server/
│   ├── src/
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
│
└── README.md
```

---

# ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/ak1796/Fiverr.git
```

```bash
cd Fiverr/ConnectUp-freelancer-platform
```

---

### Install frontend dependencies

```bash
cd client
npm install
```

---

### Install backend dependencies

```bash
cd ../server
npm install
```

---

# 🔐 Environment Variables

Create a `.env` file inside the **server** directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLIENT_URL=http://localhost:5173
```

---

# ▶️ Running the Application

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend

```bash
cd client
npm run dev
```

The application will be available at:

```
Frontend: http://localhost:5173

Backend: http://localhost:5000
```

---

# 📡 API Modules

The backend is organized into the following modules:

- Authentication
- Users
- Gigs
- Orders
- Reviews
- Conversations
- Messages

---

# 💬 Real-Time Communication

The application integrates **Socket.io** to provide seamless communication between buyers and sellers.

### Supported Features

- Instant message delivery
- Live conversation updates
- Low-latency communication
- Real-time event synchronization

---

# 🔒 Security Features

- JWT Authentication
- Password hashing with bcrypt
- Protected API routes
- Environment variable management
- Input validation
- Secure authentication flow

---

# 🚀 Future Enhancements

- Stripe payment integration
- Email notifications
- Push notifications
- Online/offline user status
- Typing indicator
- File sharing in chat
- Video calling
- Admin dashboard
- Saved/Favorite gigs
- AI-powered freelancer recommendations
- Dark mode

---

# 🤝 Contributing

Contributions are welcome!

1. Fork this repository
2. Create a new feature branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to your branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 📌 Known Limitations

- Payment gateway is not integrated.
- Email notifications are not implemented.
- Mobile responsiveness can be further enhanced.

---

# 👩‍💻 Author

**Alina Khan**

- GitHub: https://github.com/ak1796

---

# 📄 License

This project is licensed under the **MIT License**.

---

## ⭐ Show Your Support

If you found this project useful, please consider giving it a **⭐ Star** on GitHub.
