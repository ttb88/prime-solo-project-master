CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "spotify_token" (
	"id" SERIAL PRIMARY KEY,
    "access_token" VARCHAR (1000)
);