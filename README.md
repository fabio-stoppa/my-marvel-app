# Marvelpedia App

This is a web application built with **React**, **Vite** and **TypeScript**. It interacts with the **Marvel API** to list **events** and **characters** from the Marvel universe. The app features filters for searching events and characters, providing an interactive experience for Marvel fans.

## Features

- **Event Listing**: Browse through various Marvel events, with the ability to filter by name, characters, and more.
- **Character Listing**: Explore characters from the Marvel universe, with the option to filter too.
- **Marvel API Integration**: The app consumes data from the official [Marvel API](https://developer.marvel.com/), fetching event and character details.
- **Filter Options**: Both events and characters have search and filter capabilities to make finding specific items easier.

## Tech Stack

- **Vite**: A fast, opinionated build tool for modern web development.
- **SWC**: A Rust-based JavaScript/TypeScript compiler used to speed up the build process, replacing Babel.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
- **Axios**: A promise-based HTTP client for making API requests, used to fetch data from the Marvel API.
- **React Router DOM**: For handling routing and navigation within the app.
- **SWR**: A React Hook for data fetching, caching, and revalidation.
- **Radix UI**: A set of low-level UI components for building accessible, customizable design systems.

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/marvel-events-app.git
cd marvel-events-app
````

### 2. Install dependencies
Needs to have Node installed
```bash
npm install
````

### 3. Set Up Environment Variables
Get them on [Marvel API](https://developer.marvel.com/)
```bash
VITE_MARVEL_API_PUBLIC_KEY=your_public_key_here
VITE_MARVEL_API_PRIVATE_KEY=your_private_key_here
````

### 4. Run the Development Server
```bash
npm run dev
````
