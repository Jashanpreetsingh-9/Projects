CREATE TABLE "Memberships" (
	"membership_id" INTEGER,
	"membership_status" TEXT NOT NULL,
	PRIMARY KEY ("membership_id")
	);


CREATE TABLE "Players" (
	"player_id" INTEGER,
	"character_name" TEXT NOT NULL,
	"attribute_id" INTEGER NOT NULL,
	"membership_id" INTEGER,
	PRIMARY KEY ("player_id"),
	FOREIGN KEY ("membership_id") REFERENCES "Memberships"("membership_id")
	);
	
CREATE TABLE "Attributes" (
	"attribute_id" INTEGER NOT NULL,
	"level" INTEGER,
	"coin balance" INTEGER,
	"devil_fruit" TEXT,
	PRIMARY KEY ("attribute_id")
	);

CREATE TABLE "Roles" (
	"role_id" INTEGER,
	"role_name" TEXT NOT NULL,
	PRIMARY KEY ("role_id")
	);

CREATE TABLE "Junctions" (
	"player_id" INTEGER,
	"role_id" INTEGER,
	FOREIGN KEY ("player_id") REFERENCES "Players"("player_id"),
	FOREIGN KEY ("role_id") REFERENCES "Roles"("role_id")
	);

INSERT INTO "Memberships" ("membership_id", "membership_status")
SELECT * from "membershipdata";

INSERT INTO "Attributes" ("attribute_id","level","coin balance","devil_fruit")
SELECT * FROM "Attributesdata" ;

INSERT INTO "Players" ("player_id","character_name","attribute_id","membership_id")
SELECT * FROM "Playersdata";

INSERT INTO "Roles" ("role_id" , "role_name")
SELECT * FROM "Rolesdata";

INSERT INTO "Junctions" ("player_id","role_id")
SELECT * FROM "Junctiondata";


CREATE TRIGGER "assign_free_membership"
AFTER INSERT ON Players
BEGIN
   UPDATE "Players"
   SET "membership_id" = (SELECT "membership_id" FROM "Memberships" WHERE "membership_status" = 'Regular')
   WHERE player_id = NEW.player_id;
END;

CREATE VIEW "VIPMembers" AS
SELECT "Players"."player_id", "Players"."character_name", "Memberships"."membership_status"
FROM "Players" 
JOIN "Memberships" ON "Players"."membership_id" = "Memberships"."membership_id"
WHERE "Memberships"."membership_status" = 'VIP';

CREATE INDEX "Character_Username"
ON "Players"("character_name");

BEGIN TRANSACTION;
UPDATE "Attributes" 
SET "coin balance" = "coin balance" - 500
WHERE "attribute_id" = 2 AND "coin balance" >= 500;

ROLLBACK

SELECT "player_id","character_name","level" FROM "Players" JOIN "Attributes" ON "Players"."attribute_id" = "Attributes"."attribute_id" ORDER BY "level" DESC LIMIT 1;
SELECT "Players"."player_id","character_name","role_name" FROM "Players" JOIN "Junctions" ON "Junctions"."player_id" = "Players"."player_id" JOIN "Roles" ON "Junctions"."role_id" = "Roles"."role_id" WHERE "role_name" = "Captain";
SELECT sum("coin balance") FROM "Attributes";
SELECT * from "VIPMembers";
SELECT "player_id","character_name","level"  FROM "Players" JOIN "Attributes" ON "Players"."attribute_id" = "Attributes"."attribute_id" ORDER BY "level" DESC;