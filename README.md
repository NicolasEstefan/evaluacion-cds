# 🧑🏻‍💻 Coding Challenge

This project was created as part of the interviewing process at a Uruguayan software company. The challenge aims to assess basic API programming knowledge in Node.js using the Express.js framework. <br>
You can read the challenge statement [here](./challenge.md).

## 🚀 Running the project 

To run the project you must first create a `.env` file at the root of the project contining two environment variables, `API_KEY` and `PORT`. The first has to be set to a valid [TMDb](https://www.themoviedb.org/) api key with read privileges. You can get a key for free by registering in their website. The latter specifies the port on which to run the application server.
<br>
After the .env file was created, make sure you have [Docker](https://www.docker.com/) installed and run the following command:

```bash
$ docker compose up
```

This should build the docker image for the project and start the development server on the port specified in the [.env](./.env) file. If everything goes well, you should see the following output in the terminal:

```
Attaching to nodejs-coding-challenge
nodejs-coding-challenge  | 
nodejs-coding-challenge  | > y@1.0.0 dev
nodejs-coding-challenge  | > node --watch app.js
nodejs-coding-challenge  | 
nodejs-coding-challenge  | Server started on port 3000
```

## ⚡ API endpoints

All endpoints that receive data expect it in JSON format and endpoints that require authentication expect an *Authorization* header set to an authorization token previously generated by the api.

### `POST` /signup

This endpoint is used for creating new users, the following parameters are expected in the request body:

```json
{
    "email": "youremail@test.com",
    "password": "supersecurepassword",
    "firstName": "John",
    "lastName": "Doe"
}
```

### `POST` /login

This endpoint generates authorization tokens for registered users. It expects the following parameters inside the request body:

```json
{
    "email": "youremail@test.com",
    "password": "supersecurepassword",
}
```

Upon successful authentication, the endpoint returns an authorization token.

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJpb3NpdHkiOiJraWxsZWQgdGhlIGNhdCJ9.USwOMyTmnB4-eE9p52P3-Gt5IpxbnuHj2S7KwnldABE"
}
```

### `POST` /logout

This endpoint is used to invalidate a token. It takes the token provided in the *Authorization* header and invalidates it. This endpoint requires an authorization token.

### `GET` /movies

This endpoint fetches movies from the [TMDb](https://www.themoviedb.org/) API and returns the first page of the results as JSON. It accepts an optional query parameter named `keyword` that, if present, is used as a search query in the request to TMDB. This endpoint requires an authorization token.
<br>
Response example:

```json
{
	"movies": [
		{
			"adult": false,
			"backdrop_path": "/2PuEmuXQF3XQZp8Ki2mGJXUGEOd.jpg",
			"genre_ids": [
				14,
				12,
				35,
				10751
			],
			"id": 2395,
			"original_language": "fr",
			"original_title": "Astérix aux Jeux olympiques",
			"overview": "Astérix and Obélix have to win the Olympic Games in order to help their friend Alafolix marry Princess Irina. Brutus uses every trick in the book to have his own team win the game, and get rid of his father Julius Caesar in the process.",
			"popularity": 2.6,
			"poster_path": "/eNB2SrqmTJLByRDq3akDzA6Z9rC.jpg",
			"release_date": "2008-01-25",
			"title": "Asterix at the Olympic Games",
			"video": false,
			"vote_average": 5.2,
			"vote_count": 2005,
			"suggestionScore": 96.04062200014424
		}]
}
```

### `POST` /movies/add-to-favorites

This endpoint is used to add a movie to the favorites list of the user. The movie id must be provided in the request body under `movieId`. This endpoint requires an authorization token.

```json
{
    "movieId": 42
}
```

### `GET` /movies/favorites

This endpoint is used to fetch the user's favorite movies. This endpoint requires an authorization token.