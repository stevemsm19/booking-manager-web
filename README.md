# SofBook

A web application built with Angular 20.

## Prerequisites

- Node.js (v18 or higher recommended)
- Angular CLI

**Install Angular CLI globally if you haven’t already:**

```bash
npm install -g @angular/cli
```

**Installation**

Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd myapp
npm install
```

## Configuration

This project uses Angular environments to manage API URLs and other settings.

Before running the app, create/update your environment file:

```ts
// src/environments/environment.development.ts

export const environment = {
  apiUrl: 'http://localhost:3000/'
};
```

## Development Server

Start the local development server:

```bash
ng serve
```

Open your browser at:

http://localhost:4200/

The app will automatically reload on file changes.

## Project Structure

```
src
├── app
│   ├── core
│   │   ├── layout
│   │   │   ├── header
│   │   │   ├── models
│   │   │   └── services
│   │   ├── features
│   │   │   ├── home/components
│   │   │   │   ├── my-bookings
│   │   │   │   │   ├── components
│   │   │   │   │   ├── models
│   │   │   │   │   └── service
│   │   │   │   ├── new-bookings
│   │   │   │   │   ├── components
│   │   │   │   │   ├── models
│   │   │   │   │   └── services
│   │   │   │   ├── search-bar
│   │   │   │   │   ├── component
│   │   │   │   │   ├── models
│   │   │   │   │   └── services
│   │   │   │   └── search-hotels
│   │   │   │       ├── components
│   │   │   │       ├── models
│   │   │   │       └── services
│   │   │   └── shared
│   │   │       ├── components
│   │   │       ├── utils
│   │   │       └── validators
│   │   ├── app.config.ts
│   │   ├── app.html
│   │   ├── app.routes.ts
│   │   ├── app.scss
│   │   ├── app.spec.ts
│   │   └── app.ts
├── assets
└── environments
    ├── environment.development.ts
    └── environment.ts
```

# Log of Changes

- **V1.0 August 30, 2025**: Initial version -> Oscar Steven Munoz