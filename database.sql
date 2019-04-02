CREATE TABLE "image" (
    "id" SERIAL PRIMARY KEY,
    "image_path" VARCHAR (150) NOT NULL
);

INSERT INTO "image" ("image_path") VALUES
('a7fc3b296a575f9bcb1e9cf03f21feae.jpg'),
('pexels-photo.jpg'),
('photo-1428535172630-fb1c050ac3e0.jpeg'),
('photo-1428550670225-15f007f6f1ba.jpeg'),
('photo-1431887773042-803ed52bed26.jpeg'),
('photo-1433733071959-30cd185d14a8.jpeg'),
('photo-1437422061949-f6efbde0a471.jpeg'),
('photo-1439723680580-bfd9d28ef9b6.jpeg'),
('photo-1439792675105-701e6a4ab6f0.jpeg'),
('photo-1441155472722-d17942a2b76a.jpeg'),
('photo-1442589031151-61d5645469d7.jpeg'),
('photo-1444044205806-38f3ed106c10.jpeg'),
('photo-1446080501695-8e929f879f2b.jpeg'),
('photo-1447958374760-1ce70cf11ee3.jpeg'),
('photo-1449057528837-7ca097b3520c.jpeg'),
('photo-1450849608880-6f787542c88a.jpeg'),
('photo-1451188502541-13943edb6acb.jpeg'),
('photo-1451417379553-15d8e8f49cde.jpeg'),
('photo-1452723312111-3a7d0db0e024.jpeg'),
('photo-1452800185063-6db5e12b8e2e.jpeg'),
('photo-1454982523318-4b6396f39d3a.jpeg'),
('andrew-ridley-78090-unsplash.jpg'),
('andrew-ridley-451447-unsplash.jpg'),
('nasa-89116-unsplash.jpg'),
('nasa-89127-unsplash.jpg'),
('patrick-hendry-39127-unsplash.jpg'),
('scott-rock-49527-unsplash.jpg'),
('teddy-kelley-106391-unsplash.jpg'),
('vadim-sherbakov-41909-unsplash.jpg'),
('andrew-ridley-54228-unsplash.jpg');

CREATE TABLE "genre" (
    "id" SERIAL PRIMARY KEY,
    "genre_name" VARCHAR (150) NOT NULL
);

INSERT INTO "genre" ("genre_name") VALUES
('acoustic'),
('alt-rock'),
('alternative'),
('ambient'),
('bluegrass'),
('bossanova'),
('chill'),
('classical'),
('country'),
('dance'),
('edm'),
('electro'),
('electronic'),
('folk'),
('french'),
('gospel'),
('groove'),
('grunge'),
('hard-rock'),
('hip-hop'),
('idm'),
('indie'),
('indie-pop'),
('industrial'),
('jazz'),
('latin'),
('movies'),
('new-age'),
('piano'),
('pop'),
('r-n-b'),
('reggae'),
('rock'),
('singer-songwriter'),
('soul'),
('soundtracks'),
('spanish'),
('synth-pop'),
('trance'),
('trip-hop'),
('world-music');

CREATE TABLE "activity" (
    "id" SERIAL PRIMARY KEY,
    "activity_name" VARCHAR (150)
);

INSERT INTO "activity" ("activity_name") VALUES
('road-trip'),
('sleep'),
('study');



CREATE TABLE "spotify_user" (
    "id" SERIAL PRIMARY KEY,
    "display_name" VARCHAR (120) NOT NULL,
    "spotify_id" VARCHAR (120) UNIQUE NOT NULL,
    "href" VARCHAR (200)UNIQUE NOT NULL,
    "uri" VARCHAR (200) UNIQUE NOT NULL,
    "country" VARCHAR (20) NOT NULL
);



CREATE TABLE "selection" (
    "id" SERIAL PRIMARY KEY,
    "image_id" INT NOT NULL REFERENCES "image",
    "genre_id" INT NOT NULL REFERENCES "genre",
    "spotify_id" INT NOT NULL REFERENCES "spotify_user",
    "energy_value" FLOAT(4),
    "mood_value" FLOAT(4),
    "genres" VARCHAR (300),
    "date_min" INT,
    "date_max" INT
);


CREATE TABLE "playlist" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR (120),
    "description" VARCHAR (200),
    "playlist_id" VARCHAR (200),
    "snapshot_id" VARCHAR (200),
    "href" VARCHAR (200),
    "selection_id" INT NOT NULL REFERENCES "selection",
    "spotify_id" INT NOT NULL REFERENCES "spotify_user",
    "timestamp" INT NOT NULL,
    "date_created" VARCHAR (150) NOT NULL
);

CREATE TABLE "spotify_current" (
    "id" SERIAL PRIMARY KEY,
    "access_token" VARCHAR (1000),
    "current_user" VARCHAR (255),
    "current_playlist_id" INT REFERENCES "playlist"
);

INSERT INTO "spotify_current" ("id")
VALUES (1);
