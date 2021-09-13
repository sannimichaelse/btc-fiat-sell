import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorPlaidLink = (req: Request, res: Response, next: NextFunction) => {
  let { institution_id, products } = req.body;
  const errorsValidation: ErrorValidation[] = [];

  institution_id = !institution_id ? '' : institution_id;

  if (validator.isEmpty(institution_id)) {
    errorsValidation.push({ institution_id: 'Institution field is required' });
  }

  if (!products) {
    errorsValidation.push({ products: 'Products field is required' });
  }

  if (products && products.length === 0) {
    errorsValidation.push({ products: 'Products cannot be empty' });
  }

  const allowedProducts = ['auth', 'balance', 'identity', 'investments', 'liabilities', 'payment_initiation', 'transactions', 'credit_details', 'income', 'income_verification', 'deposit_switch', 'standing_orders']

  const checkValidProducts = (product: string) => allowedProducts.indexOf(product) >= 0;

  if (products && !products.every(checkValidProducts)) {
    errorsValidation.push({ products: `You supplied one or more invalid products. Supported products are ${allowedProducts}` });
  }

  if (errorsValidation.length > 0) {
    const customError = new CustomError(400, 'Validation', 'Login validation error', null, null, errorsValidation);
    return next(customError);
  }
  return next();
};


export const validateInstitutionAccessToken = (req: Request, res: Response, next: NextFunction) => {
  let { access_token, } = req.body;
  const errorsValidation: ErrorValidation[] = [];

  access_token = !access_token ? '' : access_token;

  if (validator.isEmpty(access_token)) {
    errorsValidation.push({ access_token: 'Access Token field is required' });
  }

  if (errorsValidation.length > 0) {
    const customError = new CustomError(400, 'Validation', 'Login validation error', null, null, errorsValidation);
    return next(customError);
  }
  return next();
}