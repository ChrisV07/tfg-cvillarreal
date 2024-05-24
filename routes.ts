/**
 * An Array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
    "/order/cafe",
    "/order/hamburguesa",
    "/order/pizza",
    "/order/dona",
    "/order/pastel",
    "/order/galletas",
]

/**
 * An Array of routes that are used for authentication
 * These routes will redirect logged in users to /admin/products
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
]

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/admin/products"