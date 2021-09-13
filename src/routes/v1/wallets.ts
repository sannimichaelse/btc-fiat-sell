import { Router } from 'express';

import { checkJwt } from 'middleware/checkJwt';
import { getAccountWallets, getWalletBalance } from 'controllers/account/wallet';
import { validateWalletId } from 'middleware/validation/wallet';

const router = Router();

router.get('', [checkJwt], getAccountWallets);

router.post('/balance', [checkJwt, validateWalletId], getWalletBalance);

export default router;
