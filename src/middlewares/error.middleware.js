import { ZodError } from "zod";

export const errorMiddleware = (err, req, res, next) => {
  void next;
  console.error("[ERROR]", err);

  // Errores de validación Zod
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Error de validación",
      details: err.errors.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      })),
    });
  }

  // Errores personalizados con status
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      error: err.message || "Error",
    });
  }

  // Error genérico inesperado
  return res.status(500).json({
    error: "Error interno del servidor",
  });
};
