import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCharacterModel1685637270153 implements MigrationInterface {
    name = 'UpdateCharacterModel1685637270153'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "characters" ADD "looks" text NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."characters_race_enum" AS ENUM('elf', 'human', 'halfling', 'dwarf')`);
        await queryRunner.query(`ALTER TABLE "characters" ADD "race" "public"."characters_race_enum" NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."characters_alignment_enum" AS ENUM('lawful', 'good', 'neutral', 'chaotic', 'evil')`);
        await queryRunner.query(`ALTER TABLE "characters" ADD "alignment" "public"."characters_alignment_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "characters" ADD "strength" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "characters" ADD "dexterity" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "characters" ADD "constitution" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "characters" ADD "intelligence" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "characters" ADD "wisdom" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "characters" ADD "charisma" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "characters" DROP COLUMN "charisma"`);
        await queryRunner.query(`ALTER TABLE "characters" DROP COLUMN "wisdom"`);
        await queryRunner.query(`ALTER TABLE "characters" DROP COLUMN "intelligence"`);
        await queryRunner.query(`ALTER TABLE "characters" DROP COLUMN "constitution"`);
        await queryRunner.query(`ALTER TABLE "characters" DROP COLUMN "dexterity"`);
        await queryRunner.query(`ALTER TABLE "characters" DROP COLUMN "strength"`);
        await queryRunner.query(`ALTER TABLE "characters" DROP COLUMN "alignment"`);
        await queryRunner.query(`DROP TYPE "public"."characters_alignment_enum"`);
        await queryRunner.query(`ALTER TABLE "characters" DROP COLUMN "race"`);
        await queryRunner.query(`DROP TYPE "public"."characters_race_enum"`);
        await queryRunner.query(`ALTER TABLE "characters" DROP COLUMN "looks"`);
    }

}
