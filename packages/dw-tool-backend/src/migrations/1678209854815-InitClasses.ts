import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitClasses1678209854815 implements MigrationInterface {
  name = 'InitClasses1678209854815'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "classes" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_7d41406f4b6b49e4b692e7c19f7" PRIMARY KEY ("id", "name"))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "classes"`)
  }
}
