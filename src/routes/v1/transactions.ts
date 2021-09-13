import { Router } from 'express';

import { checkJwt } from 'middleware/checkJwt';
import { validateTransaction } from 'middleware/validation/transactions';
import { createTransaction } from 'controllers/account/transaction';

const router = Router();

router.post('', [checkJwt, validateTransaction], createTransaction);

export default router;
