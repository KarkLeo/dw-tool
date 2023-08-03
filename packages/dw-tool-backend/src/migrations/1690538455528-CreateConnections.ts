import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateConnections1690538455528 implements MigrationInterface {
    name = 'CreateConnections1690538455528'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "connection" ("id" SERIAL NOT NULL, "connectionId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_be611ce8b8cf439091c82a334b2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "connection" ADD CONSTRAINT "FK_3b35155c2968acced66fc326aea" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "connection" DROP CONSTRAINT "FK_3b35155c2968acced66fc326aea"`);
        await queryRunner.query(`DROP TABLE "connection"`);
    }

}
