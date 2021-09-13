import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validateTransaction = (req: Request, res: Response, next: NextFunction) => {
  let { institution_id, account_id, amount, wallet_id  } = req.body;
  const errorsValidation: ErrorValidation[] = [];

  institution_id = !institution_id ? '' : institution_id;
  account_id = !account_id ? '' : account_id;
  amount = !amount ? '' : amount;
  wallet_id = !wallet_id ? '' : wallet_id;

  if (validator.isEmpty(institution_id)) {
    errorsValidation.push({ institution_id: 'Institution_id field is required' });
  }

  if (validator.isEmpty(account_id)) {
    errorsValidation.push({ account_id: 'Account_id of the institution is required' });
  }

  if (validator.isEmpty(amount)) {
    errorsValidation.push({ amount: 'Amount field is required' });
  }

  if (validator.isEmpty(wallet_id)) {
    errorsValidation.push({ wallet_id: 'Wallet_id field is required' });
  }

  if (errorsValidation.length > 0) {
    const customError = new CustomError(400, 'Validation', 'Login validation error', null, null, errorsValidation);
    return next(customError);
  }
  return next();
};


