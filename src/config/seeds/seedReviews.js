import pool from "../db.js";

const reviews = [
  {
    product_id: 1,
    user_id: 4,
    rating: 5,
    comment: "Excelente quinua, se cocina rápido y tiene buen sabor.",
  },
  {
    product_id: 2,
    user_id: 5,
    rating: 4,
    comment: "Las papas llegaron frescas, aunque algo pequeñas.",
  },
  {
    product_id: 3,
    user_id: 6,
    rating: 5,
    comment: "El aceite de coco tiene un aroma delicioso.",
  },
  {
    product_id: 4,
    user_id: 4,
    rating: 3,
    comment: "Buena miel, pero llegó con el frasco dañado.",
  },
  {
    product_id: 5,
    user_id: 5,
    rating: 5,
    comment: "¡El camu camu es potente! Ideal para jugos.",
  },
  {
    product_id: 6,
    user_id: 6,
    rating: 4,
    comment: "Buen snack, aunque algo caro.",
  },
];

const connection = await pool.getConnection();

try {
  for (const r of reviews) {
    await connection.query(
      `INSERT INTO reviews (product_id, user_id, rating, comment)
       VALUES (?, ?, ?, ?)`,
      [r.product_id, r.user_id, r.rating, r.comment],
    );
  }

  console.log("Reviews insertadas correctamente.");
} catch (err) {
  console.error("Error al insertar reviews:", err);
} finally {
  connection.release();
}
