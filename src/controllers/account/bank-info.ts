import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { BankAccount } from 'database/entities/BankAccount';
import { checkIfUserExists } from 'controllers/auth';


export const getLinkedAccounts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.jwtPayload;

    await checkIfUserExists(id)

    const bankRepository = getRepository(BankAccount);
    const linkedAccounts = await bankRepository.find({ where: { user_id: id } });
    res.customResponse(200, 'Successfully fetched linked accounts', linkedAccounts);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};

export const getInstitutionInfo = async (institution_id: string, user_id: number) => {
  const bankRepository = getRepository(BankAccount);
  const institutionInfo = await bankRepository.findOne({ where : { institution_id, user_id }});
  return institutionInfo
};