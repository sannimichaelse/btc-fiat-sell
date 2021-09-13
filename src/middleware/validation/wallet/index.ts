import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validateWalletId = (req: Request, res: Response, next: NextFunction) => {
  let { wallet_id  } = req.body;
  const errorsValidation: ErrorValidation[] = [];

  wallet_id = !wallet_id ? '' : wallet_id;

  if (validator.isEmpty(wallet_id)) {
    errorsValidation.push({ wallet_id: 'Wallet_id is required' });
  }

  if (errorsValidation.length > 0) {
    const customError = new CustomError(400, 'Validation', 'Login validation error', null, null, errorsValidation);
    return next(customError);
  }
  return next();
};


