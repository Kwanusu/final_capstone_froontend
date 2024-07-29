# Commerce Frontend

This is the React frontend for the Commerce project, which interacts with a Django backend to provide an online commerce platform.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

- Node.js (version 14.x or higher)
- npm (version 6.x or higher) or yarn (version 1.x or higher)

## Installation

1. Clone the repository:
   git clone https://github.com/Kwanusu/final_capstone_froontend.git
   cd commerce-frontend

Install the dependencies:

npm install
# or
yarn install

## Create a .env file in the project root and add the following:

.env

REACT_APP_API_URL=http://localhost:8000/api

Configuration
Environment Variables
The frontend uses environment variables to configure the API URL. You can set these variables in a .env file in the root directory of the project.

REACT_APP_API_URL: The base URL for the API (e.g., http://localhost:8000/api).

Usage:

Development Server
To start the development server, run:

npm start
# or
yarn start
The application will be available at http://localhost:5173.

Build
To build the application for production, run:

npm run build
# or
yarn build

The build artifacts will be stored in the build directory.

Project Structure:

The project structure is organized as follows:

commerce-frontend/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Cart/
│   │   ├── Wishlist/
│   │   ├── ProductDetail/
│   │   └── ...
│   ├── contexts/
│   │   ├── CartContext.js
│   │   ├── WishlistContext.js
│   │   └── ...
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Cart.js
│   │   ├── Wishlist.js
│   │   └── ...
│   ├── App.js
│   ├── index.js
│   └── ...
├── .env
├── package.json
├── README.md
└── ...
1. public/: Contains the static files and the HTML template.
2. src/: Contains the React components, contexts, and pages.
3. components/: Reusable UI components.
4. contexts/: Context providers for managing global state (e.g., cart, wishlist).
5. pages/: Pages of the application.
6. App.js: The main component that sets up routing.
7. index.js: Entry point of the application.

## Contributing:

Contributions are welcome! Please follow these steps to contribute:

## Fork the repository.
1. Create a new branch (git checkout -b feature/foo).
2. Make your changes.
3. Commit your changes (git commit -am 'Add some foo').
4. Push to the branch (git push origin feature/foo).
5. Open a pull request.

# License:

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact
Your Name - kwanusujoseph@gmail.com

Project Link: https://github.com/Kwanusu/final_capstone_froontend.git