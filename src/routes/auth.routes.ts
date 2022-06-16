import { Router, Request, Response } from 'express';
import { AuthController } from '../controller';
import authSchema from '../schema/auth.validate';

import { celebrate } from 'celebrate';
const router = Router({ mergeParams: true });

const authController = new AuthController();

/**
 * @openapi
 *  /auth/register:
 *    post:
 *      summary: Endpoint for Register User
 *      tags:
 *        - Admin
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              required:
 *                - email
 *                - password
 *                - role
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  example: admin1@gmail.com
 *                password:
 *                  type: string
 *                  example: admin123
 *                role:
 *                  type: string
 *                  example: admin
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
 *                    message: User registered successfully.
 *        400:
 *          $ref: "#/components/responses/AdminValidationError"
 *        500:
 *          $ref: "#/components/responses/iseError"
 */
router.post('/register', celebrate(authSchema.SignupSchema), authController.register);

/**
 * @openapi
 *  /auth/login:
 *    post:
 *      summary: Endpoint for Login User
 *      tags:
 *        - Admin
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              required:
 *                - email
 *                - password
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  example: admin1@gmail.com
 *                password:
 *                  type: string
 *                  example: admin123
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
 *                    message: Signin successfully
 *                    response_data:
 *                      id: 1
 *                      name: User1
 *                      email: admin1@gmail.com
 *                      token: JWT_TOKEN
 *        400:
 *          $ref: "#/components/responses/AdminValidationError"
 *        500:
 *          $ref: "#/components/responses/iseError"
 *        401:
 *          description: UNAUTHORIZED
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/errorResponseSchema"
 *              examples:
 *                SUCCESS:
 *                  value:
 *                    code: 401
 *                    error: UNAUTHORIZED
 *                    message: Email or password is incorrect.
 */
router.post('/login', celebrate(authSchema.SigninSchema), authController.login);

export default router;
