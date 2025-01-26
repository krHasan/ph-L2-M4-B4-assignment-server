# Bike Shop Management API

A **Bike Shop Management API** built with **Node.js**, **Express.js**, **TypeScript**, and **MongoDB** using **Mongoose** for schema validation and data operations. This API allows users to manage bike inventory and order bikes.

## Features

-   **Bike Management:**
    -   Create, read, update, and delete (CRUD) bikes in the inventory.
    -   Validate bike details using Mongoose schemas.
-   **Order Management:**

    -   Place orders for bikes.
    -   Calculate total revenue from all orders using MongoDB aggregation.

-   **TypeScript Integration:**
    -   Strongly typed code for improved development experience and error detection.

## Technologies Used

-   **Node.js**: Backend runtime environment.
-   **Express.js**: Web application framework.
-   **TypeScript**: Type-safe programming language.
-   **MongoDB**: NoSQL database.
-   **Mongoose**: MongoDB ODM for schema validation and data operations.

## Project Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/krHasan/ph-L2-M2-B4-assignment.git
    cd ph-L2-M2-B4-assignment

    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a .env file and configure your MongoDB connection string:

    ```bash
    PORT=5000
    DATABASE_URL=<replace with your mongoDB connection string>
    ```

4. Start the server:

    ```bash
    npm run start:dev
    ```

5. Access the API at http://localhost:5000.

## API Endpoints

### Bike Management

1. Create a Bike

    - Endpoint: /api/products
    - Method: POST
    - Description: Add a new bike to the inventory.
    - Request Body:

    ```bash
    {
    "name": "Mountain Bike",
    "brand": "Trek",
    "price": 1200,
    "category": "Mountain",
    "quantity": 5,
    "description": "A durable mountain bike for rugged terrain.",
    "inStock": true
    }
    ```

2. Get All Bikes

    - Endpoint: /api/products
    - Method: GET
    - Description: Retrieve all bikes from the inventory.

3. Get a Specific Bike

    - Endpoint: /api/products/:productId
    - Method: GET
    - Description: Retrieve a bike by its unique ID.

4. Update a Bike

    - Endpoint: /api/products/:productId
    - Method: PUT
    - Description: Update a bike's details.
    - Request Body:

    ```bash
    {
    "name": "Updated Mountain Bike",
    "price": 1300
    }
    ```

5. Delete a Bike
    - Endpoint: /api/products/:productId
    - Method: DELETE
    - Description: Remove a bike from the inventory.

### Order Management

1. Order a Bike

    - Endpoint: /api/orders
    - Method: POST
    - Description: Place an order for a bike.
    - Request Body:

    ```bash
    {
    "email": "customer@example.com",
    "product": "64ad1234cdef567890123456",
    "quantity": 2,
    "totalPrice": 2400
    }
    ```

2. Calculate Revenue
    - Endpoint: /api/orders/revenue
    - Method: GET
    - Description: Calculate the total revenue from all orders using MongoDB aggregation.

## Folder Structure

```bash
ph-L2-M2-B4-assignment/
├── src/
    ├── app/               # Main application files
        ├── config/        # Project configuration files
        ├── modules/       # Modules container
            ├── order/     # Order related files
            ├── product/   # Product related files
    ├── app.ts             # Express app configuration
    └── server.ts          # Server entry point
├── .env                   # Environment variables
├── .gitignore             # Git ignore file list
├── package.json           # Project metadata and dependencies
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

## Future Enhancements

-   Add user authentication and authorization.
-   Implement search and filter functionality for bikes.
-   Add pagination to API responses.
-   Extend order functionality with status management (e.g., pending, completed).

## Contributing

This `README.md` provides an overview of the project, explains the key features, shows how to set it up and run it, and addresses common issues that could arise. You can adjust it further to suit your needs! Let me know if you'd like to add or change any sections.

## License

MIT (do whatever you want to do :smile: )

Made by [krHasan](https://www.linkedin.com/in/kr-hasan/)
