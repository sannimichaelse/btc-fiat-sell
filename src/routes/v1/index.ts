import { Router } from 'express';

import auth from './auth';
import link from './link';
import wallets from './wallets';
import transactions from './transactions';

const router = Router();

router.use('/auth', auth);
router.use('/plaid', link);
router.use('/wallets', wallets);
router.use('/transactions', transactions);


export default router;
