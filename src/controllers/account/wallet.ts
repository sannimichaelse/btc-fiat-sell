import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { Wallet } from 'database/entities/Wallet';
import { checkIfUserExists } from 'controllers/auth';


export const getAccountWallets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.jwtPayload;

    await checkIfUserExists(id)

    const walletRepository = getRepository(Wallet);
    const wallets = await walletRepository.find({ where: { user_id: id } });
    res.customResponse(200, 'Successfully fetched user wallets', wallets);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};

export const getWalletBalance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.jwtPayload;
    const { wallet_id } = req.body

    await checkIfUserExists(id)

    const wallet = await getWallet(wallet_id)
    res.customResponse(200, 'Successfully fetched user wallet', wallet);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};

export const getWallet = async (wallet_id: string) => {
  const walletRepository = getRepository(Wallet);
  const wallet = await walletRepository.findOne({ wallet_id });
  return wallet
};

export const checkIfAddressExist = async (address: string) => {
  const walletRepository = getRepository(Wallet);
  const wallet = await walletRepository.findOne({ address });
  return wallet
};

export const updateWalletBalance = async (id: number, walletId: string, balance: number) => {
  const walletRepository = getRepository(Wallet);
  const wallet = new Wallet()
  wallet.id = id
  wallet.wallet_id = walletId
  wallet.balance = balance
  await walletRepository.save(wallet);
};