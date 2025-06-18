/**
 * Crea un objeto de error personalizado con código de estado HTTP.
 * @param {number} statusCode - Código de estado HTTP (ej. 400, 404, 500).
 * @param {string} message - Mensaje descriptivo del error.
 * @returns {Error} Objeto Error con propiedad statusCode.
 */
export const httpError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};
