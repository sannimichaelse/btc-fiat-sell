import { Router } from 'express';

import { linkBankAccount, listInstitutions, getInstitutionAccounts} from 'controllers/account/link';
import { checkJwt } from 'middleware/checkJwt';
import { validateInstitutionAccessToken, validatorPlaidLink } from 'middleware/validation/link';
import { getLinkedAccounts } from 'controllers/account/bank-info';

const router = Router();

router.get('/linked-accounts', [checkJwt], getLinkedAccounts);
router.get('/institutions', [checkJwt], listInstitutions);
router.post('/institution/accounts', [checkJwt, validateInstitutionAccessToken], getInstitutionAccounts);
router.post('/link', [checkJwt, validatorPlaidLink], linkBankAccount);

export default router;
