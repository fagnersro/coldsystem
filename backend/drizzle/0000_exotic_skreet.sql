CREATE TABLE "equipments" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"public_id" varchar(50) NOT NULL,
	"identification" jsonb NOT NULL,
	"location" jsonb NOT NULL,
	"specs" jsonb NOT NULL,
	"status" text NOT NULL,
	"photos" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"history" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"observacoes" text
);
