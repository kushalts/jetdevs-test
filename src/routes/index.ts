import auth from './auth.routes';
import file from './file.routes';

import { Router } from 'express';
import { Request, Response } from 'express';
const router = Router();

// API Routes

router.get('/', (req: Request, res: Response) => {
  res.send('Status Check');
});
router.use('/auth', auth);
router.use('/file', file);

export default router;
