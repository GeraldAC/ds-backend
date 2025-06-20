import dotenv from "dotenv";

dotenv.config();

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
