# Grandshipper API

## Overview

Grandshipper API is a Node.js-based RESTful API designed to handle various functionalities, including user authentication, blog management, and type management. The application uses Express.js as its framework and MongoDB as its database, with Mongoose as the ODM (Object Data Modeling) library.

## Project Structure


### Directories and Files

- **helpers/**: Contains helper functions used across the application.
- **middleware/**: Contains middleware functions for request processing.
- **models/**: Mongoose models for various entities.
  - `blog.js`: Model for blog posts.
  - `types.js`: Model for different types.
  - `user.js`: Model for user information.
- **routes/**: Route handlers for different API endpoints.
  - `auth.js`: Routes for authentication.
  - `blogs.js`: Routes for blog management.
  - `types.js`: Routes for managing types.
  - `users.js`: Routes for user management.
- **startup/**: Initialization scripts for configuration, database connection, logging, production setup, and route setup.
  - `config.js`: Configuration settings.
  - `db.js`: Database connection setup.
  - `logging.js`: Logging setup using Winston.
  - `prod.js`: Production-specific settings.
  - `routes.js`: Route initialization.
- **.env**: Environment variables.
- **index.js**: Entry point for the application.
- **logfile.log**: Log file for application logs.
- **package-lock.json**: Auto-generated file for locking dependencies versions.
- **package.json**: Contains metadata about the project and its dependencies.
- **README.md**: Project documentation (this file).

## Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
2. Install dependencies:
  ``` sh
  npm install
3. Environment Variables:
PORT=3000
MONGODB_URI=<Your MongoDB URI>
JWT_SECRET=<Your JWT Secret>
4. To start the application, run:
npm start

## Dependencies

1. bcrypt: A library to help you hash passwords.
2. compression: Node.js compression middleware.
3. cors: Node.js CORS middleware.
4. dotenv: Loads environment variables from a .env file.
5. eslint: Pluggable JavaScript linter.
6. express: Fast, unopinionated, minimalist web framework for Node.js.
7. express-async-errors: A dead simple ES6 async/await support hack for ExpressJS.
8. helmet: Helps secure your Express apps by setting various HTTP headers.
9. jsonwebtoken: An implementation of JSON Web Tokens.
10. moment: Parse, validate, manipulate, and display dates and times in JavaScript.
11. mongoose: MongoDB object modeling tool.
12. winston: A logger for just about everything.
13. winston-mongodb: A MongoDB transport for Winston.
