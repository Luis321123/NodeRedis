export const validateEmail = (email: string): string | null => {
    if (!email || typeof email !== "string" || !email.includes("@")) {
        return "Email inválido.";
    }
    return null;
};

export const validateString = (value: any, fieldName: string): string | null => {
    if (!value || typeof value !== "string") {
        return `${fieldName} es obligatorio y debe ser un string.`;
    }
    return null;
};

export const validateNumber = (value: any, fieldName: string): string | null => {
    if (value !== undefined && typeof value !== "number") {
        return `${fieldName} debe ser un número.`;
    }
    return null;
};

export const validateAddress = (direccion: any): string[] => {
    const errors: string[] = [];
    if (!direccion || typeof direccion !== "object") {
        errors.push("La dirección es obligatoria.");
        return errors;
    }

    const { calle, ciudad, pais, codigo_postal } = direccion;
    if (!calle) errors.push("Calle es obligatoria.");
    if (!ciudad) errors.push("Ciudad es obligatoria.");
    if (!pais) errors.push("País es obligatorio.");
    if (!codigo_postal) errors.push("Código postal es obligatorio.");

    return errors;
};