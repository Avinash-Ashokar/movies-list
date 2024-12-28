# Movie List Website

## Overview

The Movie List Website is a web application that allows users to store and manage their movie collections. Users can add, update, and view their movies, providing a simple and intuitive interface for movie enthusiasts.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Architecture](#project-architecture)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Component Documentation](#component-documentation)
  - [Button Component](#button-component)
  - [ImageUpload Component](#imageupload-component)
  - [MovieCard Component](#moviecard-component)
- [Hook Documentation](#hook-documentation)
  - [useKeyPress Hook](#usekeypress-hook)
- [Utility Function Documentation](#utility-function-documentation)
  - [Helper Utility Functions](#helper-utility-functions)
- [General Documentation](#general-documentation)
- [License](#license)

## Features

- User authentication with Firebase
- Add and update movies
- Responsive design for mobile and desktop
- All routes are protected
- Image upload for movie posters
- Image compression for better utilization of firestore
- Infinite scrolling for movie lists
- Notifies the user when there is a error

## Technologies Used

- **Frontend**: React, Next.js, TypeScript, Tailwind CSS
- **Backend**: Firebase (Firestore, Authentication)
- **State Management**: React Context API

## Project Architecture

src/

├── components/ # Reusable UI components

├── context/ # Context API for global state management

├── hooks/ # Custom React hooks

├── pages/ # Next.js pages

├── styles/ # Global styles and Tailwind CSS configuration

├── types/ # TypeScript type definitions

└── utility/ # Utility functions and helpers

## Setup Instructions

To set up the project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/movies-list.git
   cd movies-list
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory and add your Firebase configuration:

   ```plaintext
   NEXT_PUBLIC_API_KEY=your_api_key
   NEXT_PUBLIC_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_PROJECT_ID=your_project_id
   NEXT_PUBLIC_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_APP_ID=your_app_id
   ```

4. **Run the development server**:

   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to `http://localhost:3000` to view the application.

## Usage

- **Sign In**: Users can sign in using their email and password.
- **Add Movie**: Click on the "Add a new movie" button to add a movie to your collection.
- **View Movies**: The movie list will display all movies added by the user.
- **Edit Movie**: Click on a movie to edit its details.

## API Documentation

### Authentication

- **POST /api/auth/login**
  - **Description**: Logs in a user.
  - **Request Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "yourpassword",
      "rememberMe": true
    }
    ```

### Movies

- **GET /api/movies**

  - **Description**: Fetches all movies for the authenticated user.
  - **Headers**:
    - `uid`: User ID of the authenticated user.

- **POST /api/movies**

  - **Description**: Adds a new movie to the user's collection.
  - **Request Body**:
    ```json
    {
      "title": "Movie Title",
      "year": "2023",
      "imageUrl": "http://example.com/image.jpg"
    }
    ```

- **GET /api/movies/[movieId]**

  - **Description**: Fetches details of a specific movie.
  - **Parameters**:
    - `movieId`: ID of the movie to fetch.

- **PUT /api/movies/[movieId]**

  - **Description**: Updates a specific movie.
  - **Request Body**:
    ```json
    {
      "title": "Updated Movie Title",
      "year": "2024",
      "imageUrl": "http://example.com/updated-image.jpg"
    }
    ```

- **DELETE /api/movies/[movieId]**
  - **Description**: Deletes a specific movie.

# Components Documentation

## Button Component

The `Button` component is a reusable button element that can be used throughout the application.

### Props

| Prop      | Type       | Description                                      |
| --------- | ---------- | ------------------------------------------------ |
| `type`    | `string`   | The type of button (e.g., "action", "outline").  |
| `label`   | `string`   | The text to display on the button.               |
| `onClick` | `function` | The function to call when the button is clicked. |

## Example Usage

```typescript
import Button from "@/components/button";

<Button label="Click Me" type="action" onClick={handleClick} />;
```

## ImageUpload Component

The `ImageUpload` component allows users to upload images for their movie posters.

### Props

| Prop           | Type       | Description                                   |
| -------------- | ---------- | --------------------------------------------- |
| `imageFile`    | `string`   | The current image file URL.                   |
| `setImageFile` | `function` | Function to update the image file state.      |
| `hasError`     | `string`   | Error message to display if there's an issue. |

## Example Usage

```typescript
import ImageUpload from "@/components/image-upload";

<ImageUpload
  imageFile={imageFile}
  setImageFile={setImageFile}
  hasError={error}
/>;
```

#### `components/MovieCard.md`

````markdown
# MovieCard Component

The `MovieCard` component displays information about a single movie.

## Props

| Prop        | Type    | Description                                             |
| ----------- | ------- | ------------------------------------------------------- |
| `movieData` | `Movie` | The movie object containing title, year, and image URL. |

## Example Usage

```typescript
import { MovieCard } from "@/components/movie-list/movie-card";

<MovieCard
  movieData={{
    title: "Inception",
    year: "2010",
    imageUrl: "http://example.com/image.jpg",
  }}
/>;
```
````

# Hooks Documentation

## useKeyPress Hook

The `useKeyPress` hook allows you to listen for key press events.

### Parameters

| Parameter   | Type       | Description                                   |
| ----------- | ---------- | --------------------------------------------- |
| `targetKey` | `string`   | The key to listen for (e.g., "Enter").        |
| `callback`  | `function` | The function to call when the key is pressed. |

## Example Usage

```typescript
import useKeyPress from "@/hooks/useKeyPress";

const MyComponent = () => {
  useKeyPress("Enter", () => {
    console.log("Enter key pressed!");
  });

  return <div>Press Enter</div>;
};
```

# Utility Function Documentation

# Helper Utility Functions

This file contains various utility functions used throughout the application.

## Functions

### fetchAllMovies

Fetches all movies for a given user.

#### Parameters

| Parameter | Type     | Description                      |
| --------- | -------- | -------------------------------- |
| `uid`     | `string` | The user ID to fetch movies for. |

#### Returns

- A promise that resolves to an object containing movie data.

#### Example Usage

```typescript
import { fetchAllMovies } from "@/utility/helper";

const fetchMovies = async (userId) => {
  const movies = await fetchAllMovies(userId);
  console.log(movies);
};
```

### fetchMoviesPage

Fetches a specific page of movies for a user.

#### Parameters

| Parameter       | Type     | Description                      |
| --------------- | -------- | -------------------------------- |
| `uid`           | `string` | The user ID to fetch movies for. |
| `currentPage`   | `number` | The current page number.         |
| `moviesPerPage` | `number` | The number of movies per page.   |

#### Returns

- A promise that resolves to an object containing movie data for the specified page.

#### Example Usage

```typescript
import { fetchMoviesPage } from "@/utility/helper";

const fetchPageMovies = async (userId, page) => {
  const movies = await fetchMoviesPage(userId, page, 10);
  console.log(movies);
};
```

# General Documentation

## Project Structure

- **components/**: Contains all reusable UI components.
- **context/**: Contains context providers for global state management.
- **hooks/**: Contains custom React hooks.
- **pages/**: Contains Next.js pages.
- **styles/**: Contains global styles and Tailwind CSS configuration.
- **types/**: Contains TypeScript type definitions.
- **utility/**: Contains utility functions and helpers.

## Coding Standards

- Use TypeScript for type safety.
- Follow this [Movie List Style Guide](https://www.figma.com/design/rsilPqu30TpPX7IOPqLPAf/Movie-list?node-id=2-3&p=f&t=IC04KqXzQvYDkzaD-0) for JavaScript/React code.
- Use meaningful variable and function names.
- Write comments for complex logic.

## Best Practices

- Keep components small and focused on a single responsibility.
- Use hooks for shared logic.
- Document components and hooks for better maintainability.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
