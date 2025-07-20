import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Soporte para __dirname en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Determina si se está ejecutando pruebas
const isTest = process.env.NODE_ENV === "test";

dotenv.config({
  path: isTest
    ? path.join(__dirname, "../../.env.test")
    : path.join(__dirname, "../../.env"),
});

const required = [
  "PORT",
  "DB_HOST",
  "DB_USER",
  "DB_PASSWORD",
  "DB_NAME",
  "FRONTEND_URL",
];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`FALTA variable de entorno requerida: ${key}`);
  }
}

export const env = {
  port: process.env.PORT,
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
  front: process.env.FRONTEND_URL,
};
