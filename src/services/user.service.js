import { Op } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { UserModel } from "../models/user.model.js";

export class UserService {
  static createUser(user) {
    const { login, password, age } = user;
    const id = uuidv4();

    try {
      return UserModel.create({ id, login, password, age });
    } catch (error) {
      throw new Error(error);
    }
  }

  static getUsersList(loginSubstring, limit) {
    try {
      return UserModel.findAll({
        where: {
          login: {
            [Op.iLike]: `%${loginSubstring}%`,
          },
        },
        order: ["login"],
        limit,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  static getUserById(id) {
    try {
      return UserModel.findByPk(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async updateUserById(id, data) {
    const { login, password, age } = data;

    try {
      const user = await UserModel.findByPk(id);

      if (!user) {
        return;
      }

      user.login = login;
      user.password = password;
      user.age = age;

      await user.save();

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async deleteUserById(id) {
    try {
      const [numberOfUpdatedRows] = await UserModel.update(
        {
          isDeleted: true,
        },
        {
          where: {
            id,
            isDeleted: false,
          },
        }
      );

      return numberOfUpdatedRows;
    } catch (error) {
      throw new Error(error);
    }
  }
}
