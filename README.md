## Project Structure

The project follows a clear and organized structure:

src: Contains the core source code of the application.
common: Houses reusable components and utilities shared across the application.
form.jsx: Handles form-related functionalities.
input.jsx: Manages input fields.
like.jsx: Implements the "like" functionality.
listBox.jsx: Provides a list box component.
listGroup.jsx: Displays items in a grouped list.
notFound.jsx: Renders a page for when resources are not found.
paginationBar.jsx: Implements pagination controls.
protectedRoute.jsx: Enforces authentication for protected routes.
searchBox.jsx: Provides a search box component.
table.jsx: Defines a generic table structure.
tableBody.jsx: Creates the table body.
tableHeader.jsx: Renders the table header.
components: Contains reusable UI components.
about.jsx: Displays information about the application.
blogForm.jsx: Provides a form for creating or editing blog posts.
blogs.jsx: Lists blog posts.
blogsTable.jsx: Displays blog posts in a table format.
loginForm.jsx: Handles user login.
logout.jsx: Logs the user out.
navbar.jsx: Implements the navigation bar.
registerForm.jsx: Allows users to register for an account.
services: Houses services that interact with backend APIs.
authService.js: Manages authentication-related services.
blogService.js: Handles interactions with blog posts.
http.js: Provides HTTP request utilities.
logService.js: Manages logging.
typeService.js: Handles interactions with data types.
userService.js: Manages user-related operations.
utils: Contains utility functions.
paginate.js: Provides pagination functionality.
App.css: Styles the main application component.
App.js: The main application component.
App.test.js: Unit tests for the App component.
index.css: Styles the root component.
index.js: The entry point for the application.
logo.svg: The application logo.
reportWebVitals.js: Reports web vitals.
setupTests.js: Sets up test environment.


## Dependencies

The project utilizes various dependencies to enhance functionality and development:

@testing-library/jest-dom: Provides DOM testing utilities for Jest.
@testing-library/react: Simplifies testing React components.
@testing-library/user-event: Simulates user interactions for testing.
axios: Handles HTTP requests.
bootstrap: Provides a framework for styling and responsive design.
font-awesome: Adds icons to the application.
http-proxy-middleware: Provides proxy capabilities for development.
joi-browser: Performs data validation.
jwt-decode: Decodes JSON Web Tokens.
lodash: Provides utility functions for working with data.
prop-types: Enables type checking for props.
query-string: Handles URL query parameters.
react: The core React library.
react-dom: Renders React components into the DOM.
react-router-dom: Enables routing in React applications.
react-scripts: Provides tools for development, testing, and building.
react-toastify: Implements notifications.
react-transition-group: Provides animation and transition utilities.
web-vitals: Collects web vitals for performance analysis.


## Development Setup
To run the application locally, follow these steps:

Clone the repository:
git clone <repository-url>

Install dependencies:
npm install

Start the development server:
npm start