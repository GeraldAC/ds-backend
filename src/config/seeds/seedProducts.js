import pool from "../db.js";

const products = [
  {
    venture_id: 1,
    name: "Quinua Roja",
    description: "Rica en proteínas, ideal para dietas saludables.",
    price: 12.5,
    stock: 100,
    image_url:
      "https://perubiodiverso.com/wp-content/uploads/2015/12/800x800IMG_20200813_145443.jpg",
  },
  {
    venture_id: 1,
    name: "Papa Nativa",
    description: "Variedad ancestral cultivada en altura.",
    price: 7.9,
    stock: 150,
    image_url:
      "https://www.agroperu.pe/wp-content/uploads/agroperu-informa_produccion-papas-nativas-peru-1.jpg",
  },
  {
    venture_id: 2,
    name: "Aceite de Coco",
    description: "Prensado en frío, ideal para cocinar y cosmética.",
    price: 25.0,
    stock: 80,
    image_url:
      "https://plazavea.vteximg.com.br/arquivos/ids/7168149-1000-1000/imageUrl_1.jpg",
  },
  {
    venture_id: 2,
    name: "Miel de Abeja",
    description: "Miel pura cosechada en la sierra central.",
    price: 18.5,
    stock: 60,
    image_url:
      "https://apimas.com/wp-content/uploads/2023/11/Miel-La-Reyna-de-Oxapampa-300-gr.jpg",
  },
  {
    venture_id: 3,
    name: "Camu Camu",
    description: "Fuente natural de vitamina C.",
    price: 15.0,
    stock: 40,
    image_url:
      "https://tumercadoperu.com/wp-content/uploads/2020/07/camu-camu.png",
  },
  {
    venture_id: 3,
    name: "Plátano Deshidratado",
    description: "Snack saludable sin azúcar añadida.",
    price: 10.0,
    stock: 120,
    image_url:
      "https://vitallanosperu.com/wp-content/uploads/2020/02/platano-deshidratado-1.jpg",
  },
];

const connection = await pool.getConnection();

try {
  for (const p of products) {
    await connection.query(
      `INSERT INTO products (venture_id, name, description, price, stock, image_url)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [p.venture_id, p.name, p.description, p.price, p.stock, p.image_url],
    );
  }

  console.log("Productos insertados correctamente.");
} catch (err) {
  console.error("Error al insertar productos:", err);
} finally {
  connection.release();
}
