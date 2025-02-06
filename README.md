# 🏪 Bike Shop - Backend

## 📌 Overview

This is the **backend** of the Bike Shop application, handling user authentication, product management, order processing, and ShurjoPay payment integration.

## 🌍 Live URL

Want to test your own, please use this link
[Live Deployment](https://assignment-4-server-three.vercel.app/)

## 🛠️ Features

- 🔐 **Authentication** (JWT, Password Hashing, Role-Based Access)
- 🛍️ **Product Management** (CRUD Operations)
- 📦 **Order Management** (CRUD, Checkout, Payment)
- 💳 **SurjoPay Integration** (Payment Processing)
- 📡 **RESTful API** with secure middleware

## 🏗️ Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT, bcrypt
- **Payment Gateway**: SurjoPay API

## 🏃‍♂️ Getting Started

1. Clone the repository:
    ```bash
    git clone https://github.com/krHasan/ph-L2-M4-B4-assignment-server.git bike-shop-backend
    cd bike-shop-backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up environment variables in a `.env` file:
    ```env
    NODE_ENV=development
    PORT=5000
    DATABASE_URL=
    BCRYPT_SALT_ROUNDS=
    JWT_ACCESS_SECRET=
    JWT_REFRESH_SECRET=
    JWT_ACCESS_EXPIRES_IN=
    JWT_REFRESH_EXPIRES_IN=
    SP_ENDPOINT=https://sandbox.shurjopayment.com
    SP_USERNAME=sp_sandbox
    SP_PASSWORD=pyyk97hu&6u6
    SP_PREFIX=SP
    SP_RETURN_URL=https://assignment-4-client-neon.vercel.app/customer/dashboard
    ```
4. Start the development server:
    ```bash
    npm run start:dev
    ```

## Contribution

Contributions are welcome! Please fork the repository and create a pull request.

## License

MIT (do whatever you want to do :smile: )

Made by [krHasan](https://www.linkedin.com/in/kr-hasan/)
