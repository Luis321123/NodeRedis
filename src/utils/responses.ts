import { Response } from 'express';

/**
 * Envía una respuesta de éxito con un mensaje y datos opcionales.
 * @param res - Objeto Response de Express.
 * @param data - Datos a enviar en la respuesta.
 * @param message - Mensaje de éxito (opcional).
 * @param statusCode - Código de estado HTTP (opcional, por defecto 200).
 */
export const sendSuccess = (
    res: Response,
    data: any,
    message: string = 'Success',
    statusCode: number = 200
) => {
    res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};

/**
 * Envía una respuesta de error con un mensaje y un código de estado HTTP.
 * @param res - Objeto Response de Express.
 * @param message - Mensaje de error (opcional, por defecto "Internal Server Error").
 * @param statusCode - Código de estado HTTP (opcional, por defecto 500).
 */
export const sendError = (
    res: Response,
    message: string = 'Internal Server Error',
    statusCode: number = 500
) => {
    res.status(statusCode).json({
        success: false,
        message,
    });
};

/**
 * Envía una respuesta de error de validación con los errores específicos.
 * @param res - Objeto Response de Express.
 * @param errors - Lista de errores de validación.
 * @param statusCode - Código de estado HTTP (opcional, por defecto 400).
 */
export const sendValidationError = (
    res: Response,
    errors: string[],
    statusCode: number = 400
) => {
    res.status(statusCode).json({
        success: false,
        message: 'Validation errors',
        errors,
    });
};