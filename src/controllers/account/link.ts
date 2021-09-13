import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid'
import { getRepository } from 'typeorm';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { getAccounts, getInstitutions, getPlaidAccessToken } from 'libraries/plaid-lib';
import { createWallet, getNewAddressForWallet } from 'libraries/rpc-lib';
import { Wallet } from 'database/entities/Wallet';
import { Currency } from 'database/entities/Currency';
import { BankAccount } from 'database/entities/BankAccount';
import { checkIfUserExists } from 'controllers/auth';


const setupWalletAndAddress = async (userId: number) => {
  const walleId = uuidv4()

  // create wallet on bitcoin node
  await createWallet(walleId)

  // generate address for bitcoin wallet
  const response = await getNewAddressForWallet(walleId)

  // get bitcoin currency id - which is the default currency
  const currencyRepository = getRepository(Currency);
  const currencies = await currencyRepository.find({});

  // get bitcoin currency
  const bitcoin = currencies.find((currency) => currency.name === "BITCOIN")

  const walletRepository = getRepository(Wallet);
  const wallet = new Wallet();
  wallet.address = response.result
  wallet.currency_id = `${bitcoin.id}`
  wallet.wallet_id = walleId
  wallet.balance = 0
  wallet.user_id = userId

  await walletRepository.save(wallet);
}

// this uses a sandbox institution id and sandboxPublicTokenCreate to get public token
// the public token is then used to exhange for access token. This access token can be attached to a user
// for subsequent calls
export const linkBankAccount = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.jwtPayload;
  const { institution_id, products } = req.body

  try {

    await checkIfUserExists(id)
    // The getPlaidAccessToken uses sandboxPublicTokenCreate to obtain accessToken 
    const { access_token } = await getPlaidAccessToken(institution_id, products);
    // setup wallet and address
    await setupWalletAndAddress(id)
    // setup bank info
    const bankRepository = getRepository(BankAccount);
    const bankInfo = new BankAccount();
    bankInfo.user_id = `${id}`
    bankInfo.access_token = access_token
    bankInfo.institution_id = institution_id
    await bankRepository.save(bankInfo);

    res.customResponse(200, 'Sandbox account linked successfully');

  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};


export const listInstitutions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const institutions = await getInstitutions()
    res.customResponse(200, 'Institution fetched successfully', institutions);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};

export const getInstitutionAccounts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.body
    const accounts = await getAccounts(access_token)
    res.customResponse(200, 'Institution accounts fetched successfully', accounts);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};