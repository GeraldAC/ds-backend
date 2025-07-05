import pool from "../db.js";
import bcrypt from "bcryptjs";

const seedAll = async () => {
  const connection = await pool.getConnection();

  try {
    // 1. USERS
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

    for (const user of users) {
      const password_hash = await bcrypt.hash(user.password, 10);
      await connection.query(
        `INSERT INTO users (name, email, password_hash, is_producer, avatar_url) VALUES (?, ?, ?, ?, ?)`,
        [
          user.name,
          user.email,
          password_hash,
          user.is_producer,
          user.avatar_url,
        ],
      );
    }
    console.log("> Usuarios insertados");

    // 2. PRODUCERS_INFO
    const producers_info = [
      {
        user_id: 1,
        bio: "Agricultora de Cusco dedicada a productos orgánicos andinos.",
        location: "Cusco, Perú",
        phone: "+51999999901",
      },
      {
        user_id: 2,
        bio: "Fundador de Organik, una iniciativa agroecológica de la costa peruana.",
        location: "Lima, Perú",
        phone: "+51999999902",
      },
      {
        user_id: 3,
        bio: "Emprendedora rural especializada en frutas tropicales.",
        location: "Tarapoto, Perú",
        phone: "+51999999903",
      },
    ];

    for (const p of producers_info) {
      await connection.query(
        `INSERT INTO producers_info (user_id, bio, location, phone) VALUES (?, ?, ?, ?)`,
        [p.user_id, p.bio, p.location, p.phone],
      );
    }
    console.log("> Producers_info insertados");

    // 3. VENTURES
    const ventures = [
      {
        name: "EcoAndino",
        description: "Productos orgánicos de los Andes peruanos.",
        image_url:
          "https://scontent.fcuz2-1.fna.fbcdn.net/v/t39.30808-6/289996671_488711243059186_3181301956516631774_n.png?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=kXonSpP-ZV8Q7kNvwHnA5Ig&_nc_oc=AdlKMHsVs0_fquMNMKDqnNBjBGj6etwA0fw1ssfEZ9WvqDUd5VatWLlEoIy3aWyJCYYtMBGU7g0rFyJx6RG29slv&_nc_zt=23&_nc_ht=scontent.fcuz2-1.fna&_nc_gid=54IUb0rH3WWv3CPZzDPYMg&oh=00_AfQK5dvtVFFZtR3TwnMXY4dPUxj_yjhklXgZChHeZO0hYw&oe=686E19BD",
        producer_id: 1,
      },
      {
        name: "Wiraccocha",
        description: "Alimentos saludables y agroecológicos.",
        image_url:
          "https://scontent.fcuz2-1.fna.fbcdn.net/v/t39.30808-6/486940515_1078685267610936_4186589355967150479_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeHaHcA44gESyf_6fYU71AfFn89hnkyWhU-fz2GeTJaFT2u-oqD15kZK1Dtt6Wx2JEnuci06nKQQIHe4EFkoPIVI&_nc_ohc=CN-GJr_Kfa0Q7kNvwHXEDWX&_nc_oc=AdmXqVZ4xKdM5qQNpRkY1J7CXQ7Ws7ZH1mHeoUSiKGn_1Uh0BkfGcUKvN1hrivx5qjWhjXAs6H-CeourBWX4C2e8&_nc_zt=23&_nc_ht=scontent.fcuz2-1.fna&_nc_gid=6OA9DXo1f-6MZ2Epamqkow&oh=00_AfT2Y2BXE-Fq-NB8rzQi5UhJl4IKyax4dbiczikEvUJyYg&oe=686E237E",
        producer_id: 2,
      },
      {
        name: "De la Selva",
        description: "Sabores tropicales directamente del productor.",
        image_url:
          "https://scontent.fcuz2-1.fna.fbcdn.net/v/t39.30808-6/405306000_845363904264243_130979765248851425_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHHIHMWXV7TzjEm0GGvGghbDKgi1x2qIlgMqCLXHaoiWAdU7QoF8Y3UcseTbrDjV5K2Lbb2Ney49iYOtxj26EMR&_nc_ohc=WvzxAwSO6vQQ7kNvwHoWx_v&_nc_oc=AdnDA5AYV0fJ6q3aH2IxkDv_2Z-OA9iIhjjmO8tt-skcyuW_hWO7lj1Q5GQUm8aQKLSNySCJmCnH6k9VwTnpxThF&_nc_zt=23&_nc_ht=scontent.fcuz2-1.fna&_nc_gid=Ntix6v9JQAm-AjYaYGawzA&oh=00_AfSpYD7js2ufbKI2fncLKwN2-cpA1UL6k5ti1F9rkwhgNQ&oe=686E37E9",
        producer_id: 3,
      },
    ];

    for (const v of ventures) {
      await connection.query(
        `INSERT INTO ventures (name, description, image_url, producer_id) VALUES (?, ?, ?, ?)`,
        [v.name, v.description, v.image_url, v.producer_id],
      );
    }
    console.log("> Ventures insertados");

    // 4. PRODUCTS
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
          "https://portal.andina.pe/EDPfotografia3/Thumbnail/2019/05/29/000589545W.jpg",
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
          "https://ferianativa.com/tienda/2262-medium_default/miel-de-abeja-pura-eco-origen.jpg",
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

    for (const p of products) {
      await connection.query(
        `INSERT INTO products (venture_id, name, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?, ?)`,
        [p.venture_id, p.name, p.description, p.price, p.stock, p.image_url],
      );
    }
    console.log("> Products insertados");

    // 5. REVIEWS
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

    for (const r of reviews) {
      await connection.query(
        `INSERT INTO reviews (product_id, user_id, rating, comment) VALUES (?, ?, ?, ?)`,
        [r.product_id, r.user_id, r.rating, r.comment],
      );
    }
    console.log("> Reviews insertadas");
  } catch (error) {
    console.error("Error al insertar datos:", error);
  } finally {
    connection.release();
  }
};

export default seedAll;
