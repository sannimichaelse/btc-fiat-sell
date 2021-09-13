import { MigrationInterface, QueryRunner } from 'typeorm';

export class Users1631399412788 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" (
                "id" SERIAL NOT NULL, 
                "email" character varying(256) NOT NULL, 
                "password" character varying(256) NOT NULL, 
                "name" character varying(256),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
                CONSTRAINT "UQ_USER_EMAIL" UNIQUE ("email"), 
                CONSTRAINT "PK_USER_ID" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
