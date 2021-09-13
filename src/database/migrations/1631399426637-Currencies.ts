import { MigrationInterface, QueryRunner } from 'typeorm';

export class Currencies1631399426637 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "currencies" (
                "id" SERIAL NOT NULL, 
                "name" character varying(256) NOT NULL, 
                "tag" character varying(256) NOT NULL, 
                "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
                CONSTRAINT "UQ_CURRENCY_NAME" UNIQUE ("name"), 
                CONSTRAINT "PK_CURRENCY_ID" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "currencies"`);
  }
}
