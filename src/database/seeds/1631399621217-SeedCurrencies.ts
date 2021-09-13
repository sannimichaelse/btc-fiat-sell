import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';

import { Currency } from '../entities/Currency';

export class SeedCurrencies1631399621217 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const currencyRepository = getRepository(Currency);
    let currency = new Currency();
    currency.name = 'BITCOIN';
    currency.tag = 'CC_BITCOIN';
    await currencyRepository.save(currency);

    currency = new Currency();
    currency.name = 'LITECOIN';
    currency.tag = 'CC_LITECOIN';
    await currencyRepository.save(currency);

    currency = new Currency();
    currency.name = 'DASH';
    currency.tag = 'CC_DASH';
    await currencyRepository.save(currency);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('Not implemented');
  }
}
