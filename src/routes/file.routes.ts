import { Router, Request, Response } from 'express';
import { FileController } from '../controller';
import { Multer } from '../utils/multer.util';
import { verifyUser, verifyAdmin } from '../middleware';
import { celebrate } from 'celebrate';
import fileSchema from '../schema/file.validate';
const router = Router({ mergeParams: true });

const fileController = new FileController();

const upload = Multer.multer();
/**
 * @openapi
 *  /file/upload:
 *    post:
 *      summary: Endpoint for uploading file
 *      tags:
 *        - Admin
 *      requestBody:
 *        content:
 *          multipart/form-data:
 *            schema:
 *              required:
 *                - file
 *              type: object
 *              properties:
 *                 file:
 *                   type: string
 *                   format: binary
 *        required: true
 *      responses:
 *        200:
 *          description: SUCCESS
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/successResponseSchema"
 *              examples:
 *                SUCCESS:
 *                  value:
 *                    status: 200
 *                    message: File uploaded successfully
 *        400:
 *          $ref: "#/components/responses/AdminValidationError"
 *        500:
 *          $ref: "#/components/responses/iseError"
 */
router.post('/upload', verifyUser, verifyAdmin, upload, fileController.fileUpload);
/**
 * @openapi
 *  /file/progress/{id}:
 *   get:
 *     summary: Endpoint for getting file progress
 *     tags:
 *       - Admin
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: number
 *     responses:
 *       200:
 *         description: SUCCESS
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/successResponseSchema"
 *             examples:
 *               SUCCESS:
 *                 value:
 *                   code: 200
 *                   progress: 100.00 %
 *       500:
 *         $ref: "#/components/responses/iseError"
 *       401:
 *         $ref: "#/components/responses/AdminUnauthorizedError"
 *       404:
 *         description: NOT_FOUND
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/errorResponseSchema"
 *             examples:
 *               SUCCESS:
 *                 value:
 *                   code: 404
 *                   error: NOT_FOUND
 *                   message: File not found.
 *     security:
 *       - AdminAuth: []
 */
router.get('/progress/:id', verifyUser, verifyAdmin, upload, fileController.progress);

/**
 * @openapi
 *  /file:
 *   get:
 *     summary: Endpoint for getting files
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: SUCCESS
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/successResponseSchema"
 *             examples:
 *               SUCCESS:
 *                 value:
 *                   code: 200
 *                   count: 10
 *                   rows:
 *                   - id: 1
 *                     originalName: demo
 *                     fileName: demo-1655377770406.xlsx
 *                     totalRecords: 9
 *       500:
 *         $ref: "#/components/responses/iseError"
 *       401:
 *         $ref: "#/components/responses/AdminUnauthorizedError"
 *     security:
 *       - AdminAuth: []
 */
router.get('/', verifyUser, fileController.listFiles);

/**
 * @openapi
 *  /file/{id}:
 *   get:
 *     summary: Endpoint for reviewing file
 *     tags:
 *       - Admin
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: number
 *     responses:
 *       200:
 *         description: SUCCESS
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/successResponseSchema"
 *             examples:
 *               SUCCESS:
 *                 value:
 *                   code: 200
 *                   message: File reviewed successfully
 *       500:
 *         $ref: "#/components/responses/iseError"
 *       401:
 *         $ref: "#/components/responses/AdminUnauthorizedError"
 *       404:
 *         description: NOT_FOUND
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/errorResponseSchema"
 *             examples:
 *               SUCCESS:
 *                 value:
 *                   code: 404
 *                   error: NOT_FOUND
 *                   message: File not found.
 *     security:
 *       - AdminAuth: []
 */
router.get('/:id', celebrate(fileSchema.FileIDSchema), verifyUser, fileController.reviewFile);

/**
 * @openapi
 *  /file/{id}:
 *    delete:
 *      summary: Endpoint for deleting file
 *      tags:
 *        - Admin
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *          type: number
 *      responses:
 *        200:
 *          description: SUCCESS
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/successResponseSchema"
 *              examples:
 *                SUCCESS:
 *                  value:
 *                    code: 200
 *                    message: File deleted successfully.
 *                    data: true
 *        400:
 *          $ref: "#/components/responses/AdminValidationError"
 *        500:
 *          $ref: "#/components/responses/iseError"
 *        404:
 *          description: NOT_FOUND
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/errorResponseSchema"
 *              examples:
 *                SUCCESS:
 *                  value:
 *                    code: 404
 *                    error: NOT_FOUND
 *                    message: File not found for delete.
 *      security:
 *       - AdminAuth: []
 */
router.delete('/:id', celebrate(fileSchema.FileIDSchema), verifyUser, verifyAdmin, fileController.deleteFile);

export default router;
