import { MigrationInterface, QueryRunner } from 'typeorm';

export class BankAccounts1631399453001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "bank_accounts" (
                "id" SERIAL NOT NULL, 
                "user_id" INTEGER NOT NULL, 
                "institution_id" character varying(256) NOT NULL, 
                "access_token" character varying(256) NOT NULL, 
                "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
                CONSTRAINT "UQ_ACCESS_TOKEN" UNIQUE ("access_token"), 
                CONSTRAINT "PK_BANK_ACCOUNT_ID" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "bank_accounts"`);
  }
}
