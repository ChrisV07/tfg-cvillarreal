/**
 * An Array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/menu/cafe",
    "/menu/hamburguesa",
    "/menu/pizza",
    "/menu/dona",
    "/menu/pastel",
    "/menu/galletas",
    "/auth/new-verification",
    
]

/**
 * An Array of routes that are accessible to the Resto-Admin role
 * These routes require authentication and RESTO ADMIN role
 * @type {string[]}
 */
export const adminRoutes = [
    "/admin",
    "/admin/products",
    "/admin/tables"
]


/**
 * An Array of routes that are used for authentication
 * These routes will redirect logged in users to /admin/products
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password",
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
export const DEFAULT_LOGIN_REDIRECT = "/"