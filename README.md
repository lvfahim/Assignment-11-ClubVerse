# ClubSphere: A Full-Stack Club & Community Management Platform

**ClubSphere** is a secure, scalable, and fully organized web application designed for the professional management of clubs, communities, and events. It provides a seamless experience for members to discover and join activities, while offering robust, role-based tools for managers and administrators to maintain an active and compliant platform.

---

## 🌐 Live Demo

👉 Client Link : https://clubverselv.netlify.app
👉 Server Link : https://assigment-11-server-seven.vercel.app


Admin Email : test@user.com
Admin Pass : 123456Testser

---

## ✨ Core Features & Highlights

### 🛡️ Access & Management
* **Role-Based Access Control (RBAC):** Users are assigned one of three roles: **Admin**, **Manager**, or **Member**, ensuring appropriate permissions across the platform.
* **Admin Approval System:** A dedicated flow for Admins to **Approve or Reject new Club and Event creation** requests, maintaining content quality.
* **User Management:** Admin dashboard features to manage user roles and permissions globally.
* **CRUD Operations:** Full C-R-U-D functionality for Club and Event content creation and editing.

### 💰 Finance & Events
* **Integrated Payment System (Stripe):** Secure handling of club membership fees and event ticket purchases.
* **Payment Success Handling:** Dedicated pages for handling payment confirmation and updating user records.
* **Live Analytics:** Manager dashboards feature **live charts and revenue distribution analysis** for clubs and events based on actual payment data.
* **Affordability Sorting:** Specialized module (`MostChipEvent`) to display events sorted by lowest price (`eventFee`).

### 🎨 User Experience
* **Modern & Responsive UI:** Built with **Tailwind CSS and DaisyUI** for a clean, professional, recruiter-friendly look across all devices.
* **Superior Feedback:** Utilizes **SweetAlert2 and React Hot Toast** for impactful and non-intrusive notifications.
* **Smooth Motion:** Enhanced interactions using **GSAP and Framer Motion** for fluid UI transitions.

---

## 🛠️ Technical Stack & Tools

### 💻 Client Side (Frontend)
| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | React | Component-based UI development |
| **Styling** | **Tailwind CSS**, **DaisyUI** | Utility-first CSS framework for rapid styling |
| **State Management** | **@tanstack/react-query** | Real-time, efficient data fetching and caching |
| **Routing** | React Router | Declarative navigation |
| **Authentication** | Firebase Authentication | Secure user sign-up and sign-in |
| **Motion/Animation** | **GSAP, motion** | Advanced animation and UI transitions |
| **Forms** | **react-hook-form** | Efficient form state management and validation |
| **Networking** | **Axios** | HTTP client for API communication |
| **Feedback** | **SweetAlert2**, **react-hot-toast**, **react-toastify** | Enhanced user notification and feedback |

### ⚙️ Server Side (Backend)
| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Runtime** | Node.js | JavaScript server environment |
| **Framework** | Express.js | Fast, minimalist web application framework |
| **Database** | MongoDB | NoSQL database for flexible data storage |
| **Security** | **JWT (JSON Web Token)**, **CORS** | Secure API access and cross-origin communication |
| **Payment Gateway** | **Stripe** | Handling secure credit card and online payments |
| **Configuration** | **dotenv** | Environment variable management |

---

## 🔐 Environment Variable Security

All sensitive credentials are protected using environment variables to ensure security and portability.

### Client-Side Configuration (`.env.local`)
```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
### MongoDB Configuration (Server)

## MongoDB credentials are secured using environment variables:

```env
DB_USER=your_db_user
DB_PASS=your_db_password
JWT_SECRET=your_jwt_secret
```

---

## 📂 Project Structure (Simplified)

```
client/
 ├── src/
 │   ├── components/
 │   ├── pages/
 │   ├── hooks/
 │   ├── routes/
 │   └── main.jsx

server/
 ├── routes/
 ├── middleware/
 ├── controllers/
 └── index.js
```

---


## 🎯 Design Philosophy

* Clean and professional layout
* Proper spacing and alignment
* Pleasant color contrast
* Fully responsive for all devices
* Inspired by platforms like Meetup and Eventbrite (no design copying)

---

## ⚠️ Plagiarism Notice

This project is fully original and not copied from any module, conceptual session, or previous assignment. All logic, UI flow, and features are uniquely implemented.

---

## 👨‍💻 Author

**MD FAHIM**
Aspiring Full-Stack Web Developer

---

⭐ If you like this project, feel free to give it a star!
