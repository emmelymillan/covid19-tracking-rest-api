// PROMISE LIBRARY
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
  user: "postgres",
  host: "localhost",
  database: "covid19_tracking_app",
  password: "12345",
  port: 5432,
};
const db = pgp(cn);

export default db;
