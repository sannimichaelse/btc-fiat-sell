import { MigrationInterface, QueryRunner } from 'typeorm';

export class Transactions1631430431789 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "transactions" (
                "id" SERIAL NOT NULL, 
                "user_id" INTEGER NOT NULL, 
                "institution_account_id" character varying(256) NOT NULL, 
                "wallet_id" character varying(256) NOT NULL, 
                "address" character varying(256) NOT NULL, 
                "amount" NUMERIC(8,2) NOT NULL,
                "transaction_id" character varying(256),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
                CONSTRAINT "UQ_TRANSACTION_ADDRESS" UNIQUE ("transaction_id"), 
                CONSTRAINT "PK_TRANSACTION_ID" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "transactions"`);
  }
}
