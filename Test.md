# Test Plan — SC-BMS-Server

Checklist-driven tests for the app after recent changes (error middleware, env validation, auth flow, validate normalization).

## Setup

- [ ] Set environment variables in `.env` or environment:
  - `JWT_SECRET` (required)
  - `MONGODB_URI` (required)
  - `PORT` (optional)
  - `NODE_ENV` (optional, `development` by default)

Commands to run the server locally:

```bash
npm install
npm run dev
```

Health check:

- [ ] GET `/` returns 200 and success message
- [ ] GET `/health` returns 200 and JSON containing `status`, `uptime`, `timestamp`

## Authentication

- [ ] POST `/api/auth/login` with valid credentials returns 200 and `{ token, user }`
  - Example body: `{ "email": "admin@example.com", "password": "secret" }`
- [ ] POST `/api/auth/login` with invalid credentials returns 401
- [ ] POST `/api/auth/login` with missing fields returns 400 and validation details
- [ ] GET `/api/auth/me` without `Authorization` header returns 401
- [ ] GET `/api/auth/me` with invalid token returns 401
- [ ] GET `/api/auth/me` with expired token returns 401 (simulate by issuing short-lived token)
- [ ] GET `/api/auth/me` with valid token returns 200 and user profile

## Users (management — protected)

Note: user creation is restricted to authenticated users (management app behavior).

Create / Read / Update / Delete flow:

- [ ] POST `/api/users` without `Authorization` returns 401 (creation is protected)
- [ ] POST `/api/users` with valid admin token and valid body returns 201 and created user (password must not be in response)
  - Body example: `{ "name": "Alice", "email": "alice@example.com", "password": "pass123" }`
- [ ] POST `/api/users` with duplicate email returns 400 and duplicate field details
- [ ] POST `/api/users` with invalid data (short password, bad email) returns 400 with validation details
- [ ] GET `/api/users` without token returns 401
- [ ] GET `/api/users` with valid token returns 200 and array of users (only `isDeleted: false`)
- [ ] PUT `/api/users/:id` with valid token updates fields and returns 200 with updated user
- [ ] PUT `/api/users/:id` with invalid `:id` (malformed ObjectId) returns 400 (CastError handled)
- [ ] PUT `/api/users/:id` for non-existing id returns 404
- [ ] DELETE `/api/users/:id` with valid token sets `isDeleted: true` and returns 200
- [ ] After delete, GET `/api/users` does not include the deleted user

Password & security:

- [ ] Verify stored password is hashed in database (check `password` field in DB; it should not equal plaintext)
- [ ] Attempt login with created user using plaintext password succeeds
- [ ] Confirm `password` field is not returned by API responses (ensure `select: false` works)
- [ ] Ensure pre-save hook does not re-hash when password not modified (update e.g., name only)

## Validation & Error Middleware

- [ ] Send request with invalid payload to any endpoint validated by Zod — response should be 400 with `details` listing validation issues
- [ ] Trigger a Mongoose validation error (e.g., creating user with missing required field at model-level) — response 400 with details
- [ ] Trigger a duplicate key error (create same email twice) — response 400 and message contains the duplicate field name
- [ ] Trigger a CastError (use malformed id) — response 400 with message `Invalid ID format`
- [ ] Induce an unexpected server error (throw new Error in a handler) — response 500 with `message: Internal Server Error`; when `NODE_ENV !== production`, response includes `stack`
- [ ] When headers have already been sent, error middleware should forward the error to `next()` (hard to simulate with curl; verify no unhandled exception in logs)

## Env & Startup

- [ ] Start app without `JWT_SECRET` — server should fail fast with a descriptive error
- [ ] Start app without `MONGODB_URI` — server should fail fast with a descriptive error
- [ ] Provide non-numeric `PORT` and verify `env.PORT` resolves to default `5000` or parsed number

## Security & Middleware

- [ ] Confirm `helmet()` is applied (check response headers for common helmet protections)
- [ ] Confirm `cors` origin is set per `CORS_ORIGIN` env, and wildcard `*` not used in production
- [ ] Confirm `morgan` logs requests (development only)

## Edge cases

- [ ] Attempt to create a user while DB is down — server should return 500 and logs show connection error
- [ ] Concurrent creation of same email (racy duplicate) — ensure one succeeds, other gets duplicate error
- [ ] Very large payloads — ensure `express.json()` limits (if configured) handle gracefully (otherwise consider adding limit)
- [ ] Sending unexpected content-type (e.g., text/plain) — ensure JSON body parsing failures are handled

## Optional / Future tests

- [ ] Add rate-limiting tests for `/auth/login` (throttling)
- [ ] Add token revocation/refresh token flow tests (if implemented)
- [ ] Add tests for role-based access if roles are introduced (admin vs manager)

## Example curl snippets

Login (replace URL/port):

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@example.com","password":"secret"}'
```

Create user (protected):

```bash
curl -X POST http://localhost:5000/api/users \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <TOKEN>' \
  -d '{"name":"Bob","email":"bob@example.com","password":"pass123"}'
```

Get current user:

```bash
curl -H 'Authorization: Bearer <TOKEN>' http://localhost:5000/api/auth/me
```

---

If you want, I can:

- Convert these checks into runnable integration tests (Jest + Supertest) and add them to the repo.
- Add a small helper to format Zod errors into `errors: string[]` and wire it into controllers.

Which next step should I take?
