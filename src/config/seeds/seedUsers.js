import bcrypt from "bcrypt";
import pool from "../db.js";

const users = [
  {
    name: "Ana Torres",
    email: "ana@bioandes.pe",
    password: "pass1",
    is_producer: true,
    avatar_url:
      "https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/marci.png",
  },
  {
    name: "Luis Mendoza",
    email: "luis@organik.pe",
    password: "pass2",
    is_producer: true,
    avatar_url:
      "https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/chen.png",
  },
  {
    name: "Carmen Díaz",
    email: "carmen@tierraviva.pe",
    password: "pass3",
    is_producer: true,
    avatar_url:
      "https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/crystal_maiden.png",
  },
  {
    name: "Pedro Salas",
    email: "pedro@correo.com",
    password: "pass4",
    is_producer: false,
    avatar_url:
      "https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/kunkka.png",
  },
  {
    name: "Lucía Gamarra",
    email: "lucia@correo.com",
    password: "pass5",
    is_producer: false,
    avatar_url:
      "https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/luna.png",
  },
  {
    name: "Jorge Villanueva",
    email: "jorge@correo.com",
    password: "pass6",
    is_producer: false,
    avatar_url:
      "https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/omniknight.png",
  },
];

async function insertUsers() {
  const connection = await pool.getConnection();

  try {
    for (const user of users) {
      const hashed = await bcrypt.hash(user.password, 10);
      await connection.execute(
        `INSERT INTO users (name, email, password_hash, is_producer, avatar_url)
         VALUES (?, ?, ?, ?, ?)`,
        [user.name, user.email, hashed, user.is_producer, user.avatar_url],
      );
    }

    console.log("Usuarios insertados correctamente.");
  } catch (err) {
    console.error("Error al insertar usuarios:", err);
  } finally {
    connection.release();
  }
}

insertUsers();
