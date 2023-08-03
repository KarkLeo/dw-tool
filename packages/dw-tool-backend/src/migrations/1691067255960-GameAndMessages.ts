import { MigrationInterface, QueryRunner } from "typeorm";

export class GameAndMessages1691067255960 implements MigrationInterface {
    name = 'GameAndMessages1691067255960'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "connections" ("id" SERIAL NOT NULL, "connectionId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_0a1f844af3122354cbd487a8d03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notifications" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "data" json NOT NULL, "read" boolean NOT NULL DEFAULT false, "toId" integer, "fromId" integer, CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."games_status_enum" AS ENUM('PENDING', 'READY', 'IN_PROGRESS', 'FINISHED', 'PAUSED')`);
        await queryRunner.query(`CREATE TABLE "games" ("id" SERIAL NOT NULL, "status" "public"."games_status_enum" NOT NULL DEFAULT 'PENDING', "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_c9b16b62917b5595af982d66337" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."players_status_enum" AS ENUM('PENDING', 'ACCEPTED', 'REJECTED', 'KICKED', 'LEFT')`);
        await queryRunner.query(`CREATE TABLE "players" ("id" SERIAL NOT NULL, "status" "public"."players_status_enum" NOT NULL DEFAULT 'PENDING', "isOwner" boolean NOT NULL DEFAULT false, "isGM" boolean NOT NULL DEFAULT false, "userId" integer, "characterId" integer, "characterName" character varying, "gameId" integer, CONSTRAINT "PK_de22b8fdeee0c33ab55ae71da3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "connections" ADD CONSTRAINT "FK_c8ee0b9afe383566cbe9243a09f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_f79957ad6239e200b00ab1c6ce0" FOREIGN KEY ("toId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_d5b09649933088707dcc1593313" FOREIGN KEY ("fromId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "players" ADD CONSTRAINT "FK_7c11c744c0601ab432cfa6ff7ad" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "players" ADD CONSTRAINT "FK_0cc10dc938b9a6c9ad4d19f4cd4" FOREIGN KEY ("characterId", "characterName") REFERENCES "characters"("id","name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "players" ADD CONSTRAINT "FK_e987db4cbe03070958e54074005" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "players" DROP CONSTRAINT "FK_e987db4cbe03070958e54074005"`);
        await queryRunner.query(`ALTER TABLE "players" DROP CONSTRAINT "FK_0cc10dc938b9a6c9ad4d19f4cd4"`);
        await queryRunner.query(`ALTER TABLE "players" DROP CONSTRAINT "FK_7c11c744c0601ab432cfa6ff7ad"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_d5b09649933088707dcc1593313"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_f79957ad6239e200b00ab1c6ce0"`);
        await queryRunner.query(`ALTER TABLE "connections" DROP CONSTRAINT "FK_c8ee0b9afe383566cbe9243a09f"`);
        await queryRunner.query(`DROP TABLE "players"`);
        await queryRunner.query(`DROP TYPE "public"."players_status_enum"`);
        await queryRunner.query(`DROP TABLE "games"`);
        await queryRunner.query(`DROP TYPE "public"."games_status_enum"`);
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`DROP TABLE "connections"`);
    }

}
