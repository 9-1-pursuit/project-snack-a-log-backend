// http://vitaly-t.github.io/pg-promise/module-pg-promise.html
const pgp = require("pg-promise")();
require("dotenv").config();

const { DATABASE_URL, PG_HOST, PG_PORT, PG_DATABASE, PG_USER, PG_PASSWORD } =
  process.env;
// https://github.com/vitaly-t/pg-promise/wiki/Connection-Syntax#configuration-object
const cn = DATABASE_URL
  ? {
      connectionString: DATABASE_URL,
      max: 30,
      ssl: {
        rejectUnauthorized: false,
      },
    }
  : {
      host: PG_HOST,
      port: PG_PORT,
      database: PG_DATABASE,
      user: PG_USER,
      password: PG_PASSWORD,
    };

// alt from express docs
// var db = pgp('postgres://username:password@host:port/database')

const db = pgp(cn);

const resetTableIfExists = `DROP TABLE IF EXISTS snacks;`;
const createTable = `CREATE TABLE snacks (
    id SERIAL PRIMARY KEY, 
    name TEXT, 
    image TEXT DEFAULT 'https://dummyimage.com/400x400/6e6c6e/e9e9f5.png&text=No+Image',
    fiber INT DEFAULT 0,
    protein INT DEFAULT 0,
    added_sugar INT DEFAULT 0, 
    is_healthy BOOLEAN
);
`;

const insertVales = `INSERT INTO snacks (name, fiber, protein, added_sugar, is_healthy, image) VALUES ('Strawberries', 20, 10, 0, true, 'https://picsum.photos/id/1080/300/300'),
('Raspberries', 16, 4, 0, true, 'https://picsum.photos/id/102/300/300'),
('Honey Covered Granola',  30, 12, 22, false, 'https://picsum.photos/id/312/300/300'),
('New Wave Nuts', 11, 55, 9, true, 'https://picsum.photos/id/139/300/300'),
('Raw Onions & Turnips', 11, 9, 9, true, 'https://picsum.photos/id/292/300/300'),
('Healthy Birthday Cake Square', 4, 8, 19, false, 'https://content.nutrisystem.com/images/products/alc/large/BirthdayCakeSquare_L.jpg');
`;

async function dbInitAndSeed(reset, create, insert) {
  await db.none(reset);
  await db.none(create);
  await db.none(insert);
  return;
}

async function testQuery() {
  const data = db.any("SELECT * FROM snacks;");
  console.log(data);
  return data;
}

async function run() {
  await dbInitAndSeed(resetTableIfExists, createTable, insertVales);
  const result = await testQuery();
  console.log(result);
  return result;
}

run().catch((error) => console.log(error));

module.exports = db;
