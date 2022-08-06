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

// var cn = {
//   user: "postgres",
//   host: "localhost",
//   database: "covid19_tracking_app",
//   password: "12345",
//   port: 5432,
//   dialect: "postgres",
// };
var cn = {
  user: "wuxnmrhilemklm",
  host: "ec2-3-213-228-206.compute-1.amazonaws.com",
  database: "d5p074an8qrbn5",
  password: "f8f02649453001c870e1075bcb55b9bb22661f9722cca9f9894b298d158e284c",
  port: 5432,
  dialect: "postgres",
};
const db = pgp(cn);

export default db;
