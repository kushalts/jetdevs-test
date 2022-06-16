import { Router, Request, Response } from 'express';
import { FileController } from '../controller';
import { Multer } from '../utils/multer.util';
import { verifyUser, verifyAdmin } from '../middleware';
import { celebrate } from 'celebrate';
import fileSchema from '../schema/file.validate';
const router = Router({ mergeParams: true });

const fileController = new FileController();

const upload = Multer.multer();

router.post('/upload', verifyUser, verifyAdmin, upload, fileController.fileUpload);
router.get('/progress/:id', verifyUser, verifyAdmin, upload, fileController.progress);

router.get('/', verifyUser, fileController.listFiles);

router.get('/:id', celebrate(fileSchema.FileIDSchema), verifyUser, fileController.reviewFile);
router.delete('/:id', celebrate(fileSchema.FileIDSchema), verifyUser, verifyAdmin, fileController.deleteFile);

export default router;
