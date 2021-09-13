import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { getInstitutionInfo } from './bank-info';
import { generateToAddress, getWalletInfo, sendToAddress } from 'libraries/rpc-lib';
import { getWallet, updateWalletBalance } from './wallet';
import { getAccounts } from 'libraries/plaid-lib';
import { checkIfUserExists } from 'controllers/auth';
import { Transaction } from 'database/entities/Transaction';


const saveTransaction = async ({
  amount,
  address,
  account_id,
  transaction_id,
  id,
  wallet_id,
}: {
  amount: number
  address: string
  account_id: string
  transaction_id: string
  id: number
  wallet_id: string
}) => {
  const transactionRepository = getRepository(Transaction);
  const transaction = new Transaction()
  transaction.amount = amount
  transaction.address = address
  transaction.institution_account_id = account_id
  transaction.transaction_id = transaction_id
  transaction.user_id = id
  transaction.wallet_id = wallet_id
  await transactionRepository.save(transaction)
}


export const createTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id:user_id } = req.jwtPayload;
    const { institution_id, account_id, amount, wallet_id } = req.body
    // check if user exists
    await checkIfUserExists(user_id)
    // get insititutionInfo and wallet ixnfo
    const insititutionInfo = await getInstitutionInfo(institution_id, user_id)
    const walletInfo = await getWallet(wallet_id)
    // Ensure customer have enough fiat/balance in his account
    const accounts = await getAccounts(insititutionInfo.access_token)
    const accountInfo = accounts.find((account) => account.account_id === account_id)
    const accountBalance = accountInfo.balances.available
    if (amount > accountBalance) {
      return res.customResponse(401, `Insufficient funds. You only have ${accountBalance} left in your account`);
    }
    /***
     * 101 is the number of blocks to create. 
     * You can use any integer that's at least 101 as the number of blocks. 
     * You cannot use a smaller integer than 101 if you want to test transactions, 
     * because of the 100 block maturation time.
     * https://bitcoin.stackexchange.com/questions/52988/how-to-get-money-when-using-regtest
     */
    await generateToAddress(101, walletInfo.address, walletInfo.wallet_id)
    // send funds to address
    const response = await sendToAddress(walletInfo.address, amount, walletInfo.wallet_id)
    const transaction_id = response.result
    // get walletInfo immediately and update balance
    const updatedWallet = await getWalletInfo(walletInfo.wallet_id)
    const bitcoinWalletBalance = updatedWallet.result.balance
    // save transaction
    await saveTransaction({
      ...req.body,
      id: user_id,
      address: walletInfo.address,
      transaction_id
    })
    // update wallet balance
    await updateWalletBalance(walletInfo.id, walletInfo.wallet_id, bitcoinWalletBalance)

    res.customResponse(200, 'Transaction completed successfully');
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};

