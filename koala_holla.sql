-- DATEBASE 'koala_holla'

CREATE TABLE "koalas" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR (100) NOT NULL,
  "age" INT,
  "gender" VARCHAR (1) NOT NULL,
  "ready_for_transfer" BOOLEAN,
  "notes" VARCHAR (250)
);

INSERT INTO "koalas" ("name", "age", "gender", "ready_for_transfer", "notes") 
VALUES  ('Scotty', 4, 'M', TRUE, 'Born in Guatemala'),
        ('Jean', 5, 'F', TRUE, 'Allergic to lots of lava' ),
        ('Ororo', 7, 'F', FALSE, 'Loves listening to Paula (Abdul)'),
        ('Logan', 15, 'M', FALSE, 'Loves the sauna'),
        ('Charlie', 9, 'M', FALSE, 'Favorite band is Nirvana'),
        ('Betsy', 4, 'F', TRUE, 'Has a pet iguana' );

SELECT * FROM "koalas";