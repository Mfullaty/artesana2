/**
 * An array of accessible routes that does not need typescript
 * These Routes atr accessible for everypone
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * An array of accessible routes that are used for authentication
 * These Routes will redirect users to /admin after logging
 * @type {string[]}
 */
export const authRoutes = ["/login", "/register"];

/**
 * The prefix for api authentication routes
 * Routes with this pregfix are going to be used for api
 * authentication purposes
 * @type {string}
 */
export const apiPrefix = "/api/auth";

/**
 * Default redirect path after logging in
 * 
 * @type {string[]}
 */
export const DEFAULT_LOGIN_REDIRECT = "/admin";
