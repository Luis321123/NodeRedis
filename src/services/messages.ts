export const ERROR_MESSAGES = {
    INVALID_EMAIL: "Email inválido.",
    REQUIRED_STRING: (fieldName: string) => `${fieldName} es obligatorio y debe ser un string.`,
    INVALID_NUMBER: (fieldName: string) => `${fieldName} debe ser un número.`,
    REQUIRED_ADDRESS: "La dirección es obligatoria.",
    REQUIRED_STREET: "Calle es obligatoria.",
    REQUIRED_CITY: "Ciudad es obligatoria.",
    REQUIRED_COUNTRY: "País es obligatorio.",
    REQUIRED_POSTAL_CODE: "Código postal es obligatorio.",
};