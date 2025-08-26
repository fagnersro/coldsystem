CREATE TABLE "equipments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"public_id" varchar(50) NOT NULL,
	"name" text NOT NULL,
	"modelo" text NOT NULL,
	"numSerie" text NOT NULL,
	"marca" text NOT NULL,
	"loja" text NOT NULL,
	"setor" text NOT NULL,
	"endereco" text NOT NULL,
	"compressor" text NOT NULL,
	"controlador" text NOT NULL,
	"refrigerante" text NOT NULL,
	"status" text NOT NULL,
	"observacoes" text,
	CONSTRAINT "equipments_public_id_unique" UNIQUE("public_id"),
	CONSTRAINT "equipments_numSerie_unique" UNIQUE("numSerie")
);
