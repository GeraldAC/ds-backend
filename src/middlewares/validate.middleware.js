export const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      error: "Datos inválidos",
      details: error.errors.map((e) => e.message),
    });
  }
};
