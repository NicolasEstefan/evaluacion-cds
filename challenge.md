# NodeJS Evaluation - 2025

## Requirements
Develop an API capable of supporting the following actions, which will be consumed by client applications:

- Register user
- Authenticate user
- Retrieve movies (with an optional keyword search)
- Add a movie to favorites
- Retrieve favorite movies

The "Endpoint Details" section describes the specific requirements for each action.

Both the implementation itself and the clarity and simplicity of execution will be valued.

**Notes:**
- A client application does not need to be developed; the API endpoints can be tested using tools like Postman, Curl, or Insomnia.
- Node.js version 18 is recommended.
- Express is suggested as the framework for the server implementation.
- The implemented API must integrate with an external API to fetch movie listings: [The Movie Database API](https://www.themoviedb.org/documentation/api?language=en)
- Registration on the site is required to obtain an API key (FREE). If there are issues with this step, contact ***the software company***.
- If integration issues arise with The Movie Database API, movie retrieval can be simulated from a local source (e.g., a `movies.txt` file stored in the project containing a list of movies).
- A real database setup is not required, but storage of received API data (registered users and favorites) is necessary.
- A simple database simulation using stored files (`users.txt` and `favorites.txt`) in the project root folder is suggested.
- If preferred, libraries like SQLite3 can be used for local storage (avoid full database setups, as it complicates testing).
- Authentication does not need to support multiple users, meaning that the "authenticated" user will have access to all data.
- Input validation (e.g., empty fields, email format) is optional and does not affect evaluation if omitted.

## Endpoint Details

**Register User**
A `POST` request must be possible to a defined URL to register a user.

The request body must contain a JSON with the following fields:
- `email`
- `firstName`
- `lastName`
- `password`

Expected API behavior:
- Check if a user with the provided email is already registered.
- If not, store the user in `users.txt` or the chosen storage method without deleting previously created users.
- If the user exists, return an error.

**Optional:** Password encryption before storage is not required but can be implemented if desired.

**Authenticate User**
A `POST` request must be possible to a defined URL to authenticate a previously registered user.

The request body must contain a JSON with the following fields:
- `email`
- `password`

Expected API behavior:
- Check if the user is registered.
- Return an error if not.
- Verify the password.
- Return an error if incorrect.
- If successful, return a "token" for future authentication.

**Retrieve Movies**
A `GET` request must be possible to a defined URL to retrieve a list of movies.

A `keyword` parameter (optional) should be allowed in the request to filter search results.

Expected API behavior:
- Verify that the requester is authenticated.
- Return an error if not.
- Request movie data from The Movie Database API (including the `keyword` for filtering, if applicable).
- Only the first page of results is needed.
- Add a new field `suggestionScore` (random number between 0 and 99) to each movie.
- Return the list sorted by `suggestionScore`.

**Add Movie to Favorites**
A `POST` request must be possible to a defined URL to add a movie to the authenticated user's favorites.

The request body must contain a JSON representing a movie from the "Retrieve Movies" response.

Expected API behavior:
- Verify authentication.
- Return an error if unauthenticated.
- Insert the movie JSON into `favorites.txt` with an additional `addedAt` field (timestamp of addition).
- Return success or failure response.

**Retrieve Favorite Movies**
A `GET` request must be possible to a defined URL to retrieve the authenticated user's favorite movies.

Expected API behavior:
- Verify authentication.
- Return an error if unauthenticated.
- Retrieve the user's favorites from `favorites.txt` or chosen storage.
- Add a `suggestionForTodayScore` field (random number between 0 and 99) to each movie.
- Return the list sorted by `suggestionForTodayScore`.

## Optional Features
- Password encryption.
- Input validation (e.g., valid email, password length, empty fields).
- Multi-user support:
  - Each authenticated user should only have access to their favorites list.
- Logout functionality:
  - Create an endpoint to invalidate an authentication "token."
- Unit tests for some endpoints.

