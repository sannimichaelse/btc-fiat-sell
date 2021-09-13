import { MigrationInterface, QueryRunner } from 'typeorm';

export class Wallets1631399436939 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "wallets" (
                "id" SERIAL NOT NULL, 
                "user_id" INTEGER NOT NULL, 
                "wallet_id" character varying(256) NOT NULL, 
                "currency_id" INTEGER NOT NULL, 
                "balance" NUMERIC(8,2) NOT NULL, 
                "address" character varying(256) NOT NULL, 
                "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
                CONSTRAINT "UQ_WALLET_ADDRESS" UNIQUE ("address"), 
                CONSTRAINT "PK_WALLET_ID" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "wallets"`);
  }
}
