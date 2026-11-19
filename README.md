# Zalex Employee Certification Solution

A React-based web application developed as part of a frontend technical assessment. The application allows employees to submit certificate requests and view existing requests through an external REST API.

This edition uses **Vercel Serverless Functions** as an API proxy to keep the subscription key on the server rather than exposing it in the frontend.

## Live Demo

**[View Live Application](https://zalex-certification-vercel.vercel.app/request-certificate)**

The application is deployed on Vercel, with both certificate submission and request listing integrated with the provided certification API.

## Features

### Request Certificate

- Submit certificate requests using a structured form.
- Client-side validation with inline error messages.
- Required alphanumeric **Address To** field.
- **Purpose** field with a minimum length of 50 characters.
- **Issued On** date restricted to future dates.
- Numeric-only **Employee ID** field.
- Loading, success, and error feedback during submission.
- Form reset after successful submission.

### Certificate Requests

- Display existing certificate requests in a table.
- Filter by reference number, recipient address, and status.
- Sort by issued date or status in ascending and descending order.
- Combine multiple filters with sorting.
- Handle loading, API errors, and empty results.
- Responsive layout for different screen sizes.

## Tech Stack

- **React** — Component-based user interface
- **Vite** — Development server and build tooling
- **JavaScript (ES6+)** — Frontend and serverless API logic
- **React Router** — Client-side navigation
- **Axios** — HTTP requests from the frontend
- **Vercel Serverless Functions** — Server-side API proxy
- **CSS** — Responsive styling
- **Vitest** — Unit testing
- **ESLint** — Code quality and linting

## Getting Started

### Live Application

The recommended way to explore the application is through the deployed version:

**[Zalex Certification — Live Demo](https://zalex-certification-vercel.vercel.app/request-certificate)**

The deployed application includes the React frontend and Vercel Serverless Functions, allowing both GET and POST operations without additional local configuration.

### Local Development

For a standalone local version of the application, refer to the original repository:

**[Zalex Certification — Local Edition](https://github.com/and-neo/zalex-certification)**

The original edition uses direct API integration and includes instructions for installing dependencies, configuring the API subscription key, and running the application locally.

### Running This Repository Locally

This repository can also be cloned for frontend development:

```bash
git clone https://github.com/and-neo/zalex-certification-vercel.git
cd zalex-certification-vercel
npm install
npm run dev
```

The Vite development server runs at `http://localhost:3000`.

**Note:** Running `npm run dev` starts only the frontend. The `/api` endpoints are implemented as Vercel Serverless Functions and are not available through the standalone Vite development server.

### Environment Variables

The deployed serverless functions use the following server-side environment variables:

```env
API_BASE_URL=https://apim-interviews-prod.azure-api.net
API_SUBSCRIPTION_KEY=your_subscription_key_here
```

These variables are configured in the Vercel project settings and are not included in the frontend bundle.

The subscription key must not use the `VITE_` prefix.

## Available Scripts

| Command           | Description                                   |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Start the Vite frontend development server    |
| `npm run build`   | Generate a production build                   |
| `npm run preview` | Preview the frontend production build locally |
| `npm run lint`    | Run ESLint checks                             |
| `npm test`        | Run unit tests with Vitest                    |

## API Integration

The application communicates with the certification API through two Vercel Serverless Functions:

| Method | Frontend Endpoint          | External API Endpoint  |
| ------ | -------------------------- | ---------------------- |
| GET    | `/api/request-list`        | `/request-list`        |
| POST   | `/api/request-certificate` | `/request-certificate` |

API requests are managed through a shared Axios instance in `src/services/certificateService.js`.

The frontend communicates with relative `/api` endpoints. Each serverless function forwards the request to the external certification API using the server-side subscription key.

### Request Flow

```text
React Frontend
      |
      | Axios request (/api)
      v
Vercel Serverless Function
      |
      | Adds subscription key
      v
External Certification API
      |
      | JSON response
      v
Vercel Serverless Function
      |
      v
React Frontend
```

The application provides loading, success, and error feedback based on API responses.

## Security Considerations

The API subscription key is stored in Vercel Environment Variables and accessed through `process.env` inside the serverless functions.

Unlike client-side `VITE_` variables, the key is not embedded in the frontend JavaScript bundle.

The public proxy endpoints are not authenticated or rate-limited in this assessment implementation. In a production environment, additional safeguards such as authentication, authorization, rate limiting, and request validation would be considered.

## Project Structure

```text
api/
├── request-certificate.js  # POST serverless endpoint
└── request-list.js         # GET serverless endpoint

src/
├── assets/
├── components/             # Reusable UI and certificate components
├── layouts/                # Shared page layouts
├── pages/                  # Application pages
├── routes/                 # Client-side routing
├── services/               # Frontend API communication
├── styles/                 # Application styles
├── utils/                  # Validation, date utilities, and tests
└── main.jsx                # Application entry point
```

## Validation and Data Handling

Form validation is implemented through reusable utility functions, separate from UI components.

The certificate requests page uses React state and memoization to manage filtering and sorting. Date values returned by the API are parsed before comparison, and sorting is performed without mutating the original dataset.

## Testing

Unit tests cover:

- Certificate form validation rules
- Date parsing and comparison utilities

Run the test suite:

```bash
npm test
```

## Implementation Notes

- Form fields use controlled React inputs.
- Validation feedback is displayed inline.
- API communication is separated from presentation components.
- Filtering and sorting are performed client-side.
- Asynchronous operations include loading and error handling.
- The application uses semantic HTML and accessibility attributes where appropriate.
- Serverless functions isolate API credentials from the frontend.

## Deployment

The application is deployed on **Vercel**, with the React frontend and serverless functions hosted in the same project.

**Production URL:** https://zalex-certification-vercel.vercel.app/request-certificate

Deployment configuration:

- **Framework:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Serverless Functions:** `api/`
- **Environment Variables:** `API_BASE_URL`, `API_SUBSCRIPTION_KEY`

The production deployment has been tested with successful GET and POST requests against the provided certification API.

## Assessment Context

Developed as a frontend technical assessment using React, with an emphasis on component organization, form validation, REST API integration, data presentation, and maintainable code.

The serverless proxy was added to support server-side API credential handling in the publicly deployed version.
