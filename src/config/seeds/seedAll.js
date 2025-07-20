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
      {
        name: "María Ccollcca",
        email: "maria@correo.com",
        password: "pass7",
        is_producer: true,
        avatar_url:
          "https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/drow_ranger.png",
      },
      {
        name: "Raúl Inuma",
        email: "raul@correo.com",
        password: "pass8",
        is_producer: true,
        avatar_url:
          "https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/earthshaker.png",
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
      {
        user_id: 7,
        bio: "Productora andina que promueve el consumo de superalimentos locales.",
        location: "Ayacucho, Perú",
        phone: "+51999999904",
      },
      {
        user_id: 8,
        bio: "Joven emprendedor amazónico enfocado en productos naturales y sostenibles.",
        location: "Pucallpa, Perú",
        phone: "+51999999905",
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
        description: "Productos orgánicos de los Andes y Selva del Cusco.",
        image_url:
          "https://pbs.twimg.com/profile_images/905481136012492802/cSew1E2s_400x400.jpg",
        producer_id: 1,
      },
      {
        name: "Andes Verde",
        description: "Productos orgánicos de altura desde el Valle Sagrado.",
        image_url:
          "https://andeangreattreks.com/wp-content/uploads/sacred-valley-markets-by-andean-great-treks.jpg",
        producer_id: 1,
      },
      {
        name: "Amazonía Viva",
        description:
          "Superalimentos y aceites esenciales del corazón de la selva.",
        image_url:
          "https://produccionsostenible.org.pe/wp-content/uploads/2020/07/13_1120x630.jpg",
        producer_id: 1,
      },
      {
        name: "Raíces de la Tierra",
        description: "Sabores y saberes ancestrales de comunidades quechuas.",
        image_url:
          "https://cdn.www.gob.pe/uploads/document/file/3319876/standard_GRANOS%20ANDINOS%202022.jpg.jpg",
        producer_id: 1,
      },
      {
        name: "Bosque Andino",
        description:
          "Infusiones y plantas medicinales recolectadas en Apurímac.",
        image_url:
          "https://d20f60vzbd93dl.cloudfront.net/uploads/tienda_007833/374bd60c27505d9b8b4ba7c0bc66e51bc6c4badc.jpeg",
        producer_id: 1,
      },
      {
        name: "Sol de la Selva",
        description:
          "Cacao fino y frutas deshidratadas de productores amazónicos.",
        image_url:
          "https://www.peruinforma.com/wp-content/uploads/2021/11/7.jpg",
        producer_id: 1,
      },
      {
        name: "Wiraccocha",
        description: "Alimentos saludables y agroecológicos.",
        image_url:
          "https://dojiw2m9tvv09.cloudfront.net/97848/brand/logos-marcas-319504.png",
        producer_id: 2,
      },
      {
        name: "De la Selva",
        description: "Sabores tropicales directamente del productor.",
        image_url:
          "https://portal.andina.pe/EDPfotografia3/Thumbnail/2024/07/21/001084497W.jpg",
        producer_id: 3,
      },
      {
        name: "Sumaq Kawsay",
        description:
          "Emprendimiento familiar de productos andinos sostenibles.",
        image_url:
          "https://pqs.pe/wp-content/uploads/2021/04/emprendedor-puno-bebidas-nutritivas.jpg",
        producer_id: 7,
      },
      {
        name: "Selva Pura",
        description: "Productos amazónicos directamente desde Pucallpa.",
        image_url:
          "https://portal.andina.pe/EDPfotografia3/Thumbnail/2023/09/22/000997100W.jpg",
        producer_id: 8,
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
        venture_id: 1,
        name: "Harina de Plátano",
        description:
          "Alternativa saludable y sin gluten, ideal para repostería.",
        price: 12.5,
        stock: 80,
        image_url:
          "https://campograndeperu.com/wp-content/uploads/2023/10/venta-por-mayor-y-menor-de-harina-de-platano.jpg",
      },
      {
        venture_id: 1,
        name: "Miel de Abeja Silvestre",
        description: "Recolectada en bosques protegidos, 100% natural.",
        price: 18.0,
        stock: 60,
        image_url:
          "https://allnaturalperu.com/wp-content/uploads/2020/07/MANP0004-600x600.jpg",
      },
      {
        venture_id: 1,
        name: "Aceite de Sacha Inchi",
        description:
          "Rico en omega-3, perfecto para ensaladas y cuidado de la piel.",
        price: 25.0,
        stock: 40,
        image_url:
          "https://santanatura.com.pe/wp-content/uploads/2021/10/aceite-sacha-inti.jpg",
      },
      {
        venture_id: 1,
        name: "Camucamu Deshidratado",
        description: "Fuente natural de vitamina C en formato snack.",
        price: 9.5,
        stock: 100,
        image_url:
          "https://biocenternatural.pe/wp-content/uploads/2023/09/Camu-camu-Bolsa-de-100g.png",
      },
      {
        venture_id: 1,
        name: "Café Orgánico de la Convención",
        description: "Cultivado en sombra y con secado natural.",
        price: 21.0,
        stock: 70,
        image_url:
          "https://delcampoatucasaperu.com/wp-content/uploads/2020/12/CAFE-ECOLOGICO-250GR-S22-600x600.png",
      },
      {
        venture_id: 1,
        name: "Chips de Plátano Verde",
        description:
          "Crocantes y sin conservantes, ideales como snack saludable.",
        price: 6.5,
        stock: 120,
        image_url:
          "https://www.rasilcorp.com/wp-content/uploads/2021/06/platanos-fritos-rasil-500g.jpg",
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
      {
        venture_id: 4,
        name: "Harina de Kiwicha",
        description: "Harina rica en aminoácidos esenciales.",
        price: 14.0,
        stock: 90,
        image_url:
          "https://realplaza.vtexassets.com/arquivos/ids/15531695-800-auto?v=637420023807100000&width=800&height=auto&aspect=true",
      },
      {
        venture_id: 4,
        name: "Té de Muña",
        description: "Infusión natural para aliviar problemas digestivos.",
        price: 6.5,
        stock: 200,
        image_url:
          "https://www.perumarketplace.com/cmm/getImage.do?atchFileId=FILE_6979c847-db47-4f52-814b-fe5c580cb3d0&fileSn=1&thumb=600",
      },
      {
        venture_id: 5,
        name: "Aguaje",
        description: "Fruta amazónica rica en vitamina A.",
        price: 9.5,
        stock: 70,
        image_url:
          "https://imgs.mongabay.com/wp-content/uploads/sites/25/2025/03/17155511/aguaje-768x512.jpg",
      },
      {
        venture_id: 5,
        name: "Sacha Inchi",
        description: "Fuente de omega 3, 6 y 9.",
        price: 22.0,
        stock: 50,
        image_url:
          "https://realplaza.vtexassets.com/arquivos/ids/16331409/image-d2f8b29d4a5145f788d5e134f25b2372.jpg?v=637515367693400000",
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
        user_id: 1,
        rating: 4,
        comment: "Buena calidad, aunque algunas papas llegaron con tierra.",
      },
      {
        product_id: 2,
        user_id: 1,
        rating: 5,
        comment: "Me encanta el sabor auténtico, como las de mi infancia.",
      },
      {
        product_id: 3,
        user_id: 1,
        rating: 3,
        comment: "Interesante producto, pero esperaba un tamaño más uniforme.",
      },
      {
        product_id: 4,
        user_id: 1,
        rating: 5,
        comment: "Excelente para hacer puré y guisos, muy recomendable.",
      },
      {
        product_id: 5,
        user_id: 1,
        rating: 4,
        comment: "Muy buena textura, pero llegaron con retraso.",
      },
      {
        product_id: 6,
        user_id: 1,
        rating: 5,
        comment: "Frescas y con sabor intenso. Me sorprendieron gratamente.",
      },
      {
        product_id: 7,
        user_id: 1,
        rating: 4,
        comment: "Gran producto, aunque deberían mejorar el empaque.",
      },
      {
        product_id: 8,
        user_id: 1,
        rating: 5,
        comment: "Ricas y nutritivas, definitivamente compraré de nuevo.",
      },
      {
        product_id: 9,
        user_id: 1,
        rating: 5,
        comment:
          "Apoyar a los agricultores locales con este nivel de calidad es un placer.",
      },
      {
        product_id: 10,
        user_id: 1,
        rating: 4,
        comment: "Muy buena relación calidad-precio.",
      },
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
      {
        product_id: 7,
        user_id: 7,
        rating: 5,
        comment: "La harina de kiwicha es perfecta para hacer panqueques.",
      },
      {
        product_id: 8,
        user_id: 6,
        rating: 4,
        comment: "Buen sabor y aroma, el empaque podría mejorar.",
      },
      {
        product_id: 9,
        user_id: 4,
        rating: 5,
        comment: "El aguaje llegó muy fresco. Ideal para refrescos.",
      },
      {
        product_id: 10,
        user_id: 5,
        rating: 5,
        comment: "El sacha inchi tiene un sabor único y saludable.",
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
