import promise from "bluebird";
import pgPromise from "pg-promise";

// OVERRIDING DEFAULT PROMISE LIBRARY
const options = {
  promiseLib: promise,
  query: (e) => {
    console.log(e.query);
  },
};

const pgp = pgPromise(options);

// SET UP THE CONNECTION STRING FOR THE DATABASE
// const connectionString =
//   process.env.DATABASE_URL || "postgres://localhost:5432/covid19_tracking_app";

var cn = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
};
// var cn = {
//   user: "wuxnmrhilemklm",
//   host: "ec2-3-213-228-206.compute-1.amazonaws.com",
//   database: "d5p074an8qrbn5",
//   password: "f8f02649453001c870e1075bcb55b9bb22661f9722cca9f9894b298d158e284c",
//   port: 5432,
//   dialect: "postgres",
// };
const db = pgp(cn);

export default db;
