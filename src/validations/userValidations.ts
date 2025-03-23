import mongoose from 'mongoose';
import { IUser } from '../interfaces/iUsers';
import { validateEmail, validateString, validateNumber, validateAddress } from '../utils/validations';

export const validateUser = (data: IUser): string[] => {
    const errors: string[] = [];

    const emailError = validateEmail(data.email);
    if (emailError) errors.push(emailError);

    const nombreError = validateString(data.nombre, "Nombre");
    if (nombreError) errors.push(nombreError);

    const edadError = validateNumber(data.edad, "Edad");
    if (edadError) errors.push(edadError);

    const addressErrors = validateAddress(data.direccion);
    errors.push(...addressErrors);

    return errors;
};

export const validateUserUpdate = (data: IUser): string[] => {
    const errors: string[] = [];

    if (data.email !== undefined) {
        const emailError = validateEmail(data.email);
        if (emailError) errors.push(emailError);
    }

    if (data.nombre !== undefined) {
        const nombreError = validateString(data.nombre, "Nombre");
        if (nombreError) errors.push(nombreError);
    }

    if (data.edad !== undefined) {
        const edadError = validateNumber(data.edad, "Edad");
        if (edadError) errors.push(edadError);
    }

    if (data.direccion !== undefined) {
        const addressErrors = validateAddress(data.direccion);
        errors.push(...addressErrors);
    }

    return errors;
};


export const isValidUserId = (id: string): boolean => {
    return mongoose.Types.ObjectId.isValid(id);
};