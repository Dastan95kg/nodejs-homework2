import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "postgres://eysjuyvp:vYWKqWJTEJ6YwVGN6TrIiK_q0vYc7jUe@isilo.db.elephantsql.com/eysjuyvp",
  { dialect: "postgres" }
);

export default sequelize;
