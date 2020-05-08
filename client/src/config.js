export const APP_NAME = "MEGA LISTS!";

export const GITHUB_AUTH_ROUTE =
  process.env.NODE_ENV === "production"
    ? "/auth/github/login"
    : "http://localhost:5000/auth/github/login";

export const GOOGLE_AUTH_ROUTE =
  process.env.NODE_ENV === "production"
    ? "/auth/google/login"
    : "http://localhost:5000/auth/github/login";
