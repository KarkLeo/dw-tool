import { MigrationInterface, QueryRunner } from "typeorm";

export class Character1680905330236 implements MigrationInterface {
    name = 'Character1680905330236'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."characters_class_enum" AS ENUM('bard', 'cleric', 'druid', 'fighter', 'paladin', 'ranger', 'thief', 'wizard')`);
        await queryRunner.query(`CREATE TABLE "characters" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "class" "public"."characters_class_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_19549e828616c4d7f57476eba2a" PRIMARY KEY ("id", "name"))`);
        await queryRunner.query(`ALTER TABLE "characters" ADD CONSTRAINT "FK_7c1bf02092d401b55ecc243ef1f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "characters" DROP CONSTRAINT "FK_7c1bf02092d401b55ecc243ef1f"`);
        await queryRunner.query(`DROP TABLE "characters"`);
        await queryRunner.query(`DROP TYPE "public"."characters_class_enum"`);
    }

}
