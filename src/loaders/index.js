import sequelize from "../config/database.js";
import modelsLoader from "./models.js";

export default async function () {
  try {
    await sequelize.authenticate();
  } catch (error) {
    throw new Error(`Unable to connect to the database: ${error}`);
  }

  modelsLoader();
}
